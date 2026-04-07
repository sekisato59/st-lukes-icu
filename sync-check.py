#!/usr/bin/env python3
"""
sync-check.py — Check consistency between disease-topic pages (dt-*.html)
and their source guideline pages (articles-gl-*.html).

Scans dt-source links, extracts the referenced GL section, and compares
numbers, score cards, stat-grid values, and drug dosages.

Usage:
    python3 sync-check.py                   # check all dt pages
    python3 sync-check.py dt-aki            # check a single dt page
    python3 sync-check.py --mismatches-only # only show warnings
"""

import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DT_DIR = BASE_DIR / "pages" / "disease-topics"
GL_DIR = BASE_DIR / "pages"

# ---------------------------------------------------------------------------
# HTML tag stripping
# ---------------------------------------------------------------------------

class _TagStripper(HTMLParser):
    """Strip HTML tags, returning plain text."""

    def __init__(self):
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data):
        self.parts.append(data)

    def get_text(self) -> str:
        return "".join(self.parts)


def strip_tags(html: str) -> str:
    s = _TagStripper()
    s.feed(html)
    return s.get_text()


# ---------------------------------------------------------------------------
# Number extraction
# ---------------------------------------------------------------------------

# Pattern matches:  42  3.5  42%  0.3%  42-70%  ≥0.5  <30  HR 0.72  12/24
_NUM_PATTERN = re.compile(
    r"""
    (?:HR|OR|RR|NNT|CI|p)\s*[=:≦≧<>≤≥]?\s*   # optional stat prefix
    (?:\d+[\.\,]?\d*(?:\s*[-〜–]\s*\d+[\.\,]?\d*)?%?)  # number or range
    |
    [≥≤<>]\s*\d+[\.\,]?\d*%?                     # prefixed number
    |
    \d+[\.\,]?\d*\s*[-〜–]\s*\d+[\.\,]?\d*%?     # range
    |
    \d+/\d+                                        # fraction
    |
    \d+[\.\,]?\d*%                                 # percentage
    |
    \d+[\.\,]\d+                                   # decimal
    |
    \d{2,}                                         # integers >= 10
    """,
    re.VERBOSE,
)

# Dosage patterns:  60mg  0.5mg/kg  100units/kg  4μg/kg/min
_DOSE_PATTERN = re.compile(
    r"\d+[\.\,]?\d*\s*(?:mg|g|μg|mcg|mL|units?|U)"
    r"(?:/(?:kg|hr|h|min|day|日|回|d))*",
    re.IGNORECASE,
)


_YEAR_PATTERN = re.compile(r"^(19|20)\d{2}$")
_NOISE_INTEGERS = {
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
}


def extract_numbers(text: str) -> list[str]:
    """Return a sorted, deduplicated list of number tokens from *text*."""
    text = strip_tags(text)
    # Normalise some chars
    text = text.replace("\u3000", " ").replace("\xa0", " ")
    matches = _NUM_PATTERN.findall(text)
    # Also pick up dosages
    matches += _DOSE_PATTERN.findall(text)
    # Normalise: strip whitespace, unify dashes
    normalised = set()
    for m in matches:
        m = m.strip()
        m = re.sub(r"\s+", "", m)
        m = m.replace("–", "-").replace("〜", "-")
        m = m.replace(",", "")
        # Normalise stat prefixes: "HR 0.79" -> "HR0.79"
        m = re.sub(r"^(HR|OR|RR|NNT|CI|p)\s*", lambda x: x.group(1), m)
        if not m:
            continue
        # Filter out years (2019-2026) — they are not clinical data
        if _YEAR_PATTERN.match(m):
            continue
        # Filter out small bare integers that are likely section/step numbers
        if m in _NOISE_INTEGERS:
            continue
        normalised.add(m)
    return sorted(normalised)


# ---------------------------------------------------------------------------
# Score card extraction
# ---------------------------------------------------------------------------

_SCORE_HEAD = re.compile(r'class="ie-score-head"[^>]*>(.*?)</div>', re.S)
_SCORE_ITEM = re.compile(r'class="ie-score-item"[^>]*>(.*?)</div>', re.S)
_SCORE_FOOT = re.compile(r'class="ie-score-foot"[^>]*>(.*?)</div>', re.S)


def extract_score_cards(html: str) -> list[dict]:
    cards = []
    for card_m in re.finditer(r'class="ie-score-card"', html):
        start = card_m.start()
        # Find the closing block — look for next ie-score-card or end of grid
        next_card = re.search(r'class="ie-score-card"', html[start + 1:])
        end_grid = re.search(r'</div>\s*</div>\s*(?=<)', html[start + 50:])
        end = len(html)
        if next_card:
            end = min(end, start + 1 + next_card.start())
        block = html[start:end]

        head_m = _SCORE_HEAD.search(block)
        foot_m = _SCORE_FOOT.search(block)
        items = _SCORE_ITEM.findall(block)

        cards.append({
            "head": strip_tags(head_m.group(1)).strip() if head_m else "",
            "item_count": len(items),
            "items_text": [strip_tags(i).strip() for i in items],
            "foot": strip_tags(foot_m.group(1)).strip() if foot_m else "",
        })
    return cards


# ---------------------------------------------------------------------------
# Stat-grid extraction
# ---------------------------------------------------------------------------

_STAT_VAL = re.compile(r'class="ie-stat-val"[^>]*>(.*?)</div>', re.S)
_STAT_LABEL = re.compile(r'class="ie-stat-label"[^>]*>(.*?)</div>', re.S)


def extract_stat_vals(html: str) -> list[dict]:
    vals = _STAT_VAL.findall(html)
    labels = _STAT_LABEL.findall(html)
    result = []
    for i, v in enumerate(vals):
        label = strip_tags(labels[i]).strip() if i < len(labels) else ""
        result.append({
            "val": strip_tags(v).strip(),
            "label": label,
        })
    return result


# ---------------------------------------------------------------------------
# Card extraction (the card ABOVE a dt-source link)
# ---------------------------------------------------------------------------

def extract_card_above(html: str, source_pos: int) -> tuple[str, str]:
    """Return (card_title, card_html) for the card immediately before *source_pos*."""
    # Look backward for the last </div> of class="card"
    # The dt-source div comes right after the card's closing </div>
    # We search for the card opening: <div class="card"
    before = html[:source_pos]
    # Find last card opening
    card_starts = [m.start() for m in re.finditer(r'<div\s+class="card"', before)]
    if not card_starts:
        return ("(unknown)", before[-2000:])
    card_start = card_starts[-1]
    card_html = html[card_start:source_pos]

    # Extract title
    title_m = re.search(r'class="rule-title"[^>]*>(.*?)</h3>', card_html, re.S)
    title = strip_tags(title_m.group(1)).strip() if title_m else "(no title)"
    return (title, card_html)


# ---------------------------------------------------------------------------
# GL section extraction
# ---------------------------------------------------------------------------

# Cache for GL file contents
_gl_cache: dict[str, str] = {}


def read_gl_file(path: Path) -> str:
    key = str(path)
    if key not in _gl_cache:
        if not path.exists():
            _gl_cache[key] = ""
        else:
            _gl_cache[key] = path.read_text(encoding="utf-8")
    return _gl_cache[key]


def extract_gl_section(gl_path: Path, anchor: str) -> str:
    """Extract the GL section starting at *anchor* until the next h3/section heading or chapter banner."""
    html = read_gl_file(gl_path)
    if not html:
        return ""

    # Find the anchor
    anchor_pat = re.compile(rf'id="{re.escape(anchor)}"', re.IGNORECASE)
    m = anchor_pat.search(html)
    if not m:
        return ""

    start = m.start()
    # Find the next section boundary: h3 id= or chapter banner div
    rest = html[start + len(m.group()):]
    # Look for next h3 with id, or next chapter banner, or next SUMMARY heading
    boundary = re.search(
        r'<h3\s+id="|<div\s+id="[^"]*"\s+style="background:linear-gradient',
        rest,
    )
    if boundary:
        end = start + len(m.group()) + boundary.start()
    else:
        end = len(html)

    return html[start:end]


# ---------------------------------------------------------------------------
# Comparison logic
# ---------------------------------------------------------------------------

class CheckResult:
    def __init__(self, source_ref: str, card_title: str):
        self.source_ref = source_ref
        self.card_title = card_title
        self.messages: list[tuple[str, str]] = []  # (icon, message)

    def ok(self, msg: str):
        self.messages.append(("\u2705", msg))

    def warn(self, msg: str):
        self.messages.append(("\u26a0\ufe0f", msg))

    def info(self, msg: str):
        self.messages.append(("\u2139\ufe0f", msg))

    @property
    def has_mismatch(self) -> bool:
        return any(icon == "\u26a0\ufe0f" for icon, _ in self.messages)


def _is_clinically_significant(num: str) -> bool:
    """Return True if this number is likely clinically significant (%, stat, dose, range)."""
    # Percentages, decimals, stat measures, dosages, ranges are significant
    if "%" in num:
        return True
    if any(p in num for p in ("HR", "OR", "RR", "NNT", "CI", "p=")):
        return True
    if re.search(r"mg|g|μg|mcg|mL|unit|U", num, re.I):
        return True
    if "-" in num:  # range
        return True
    if "." in num:  # decimal
        return True
    if "/" in num:  # fraction
        return True
    if any(c in num for c in "≥≤<>"):
        return True
    return False


def compare_numbers(dt_html: str, gl_html: str, result: CheckResult,
                    gl_path: Path | None = None, anchor: str = ""):
    dt_nums = extract_numbers(dt_html)
    gl_nums = extract_numbers(gl_html)

    if not dt_nums:
        result.info("No numbers found in dt card")
        return

    dt_set = set(dt_nums)
    gl_set = set(gl_nums)

    only_dt = dt_set - gl_set
    matched = dt_set & gl_set

    if not only_dt:
        result.ok(f"Numbers match ({len(matched)} values checked)")
        return

    # Fallback: check the full GL page for numbers not in the specific section
    if gl_path:
        full_gl = read_gl_file(gl_path)
        full_gl_text = strip_tags(full_gl)
        still_missing = set()
        for num in only_dt:
            # Check if the raw number string appears somewhere in the full GL page text
            if num in full_gl_text:
                matched.add(num)
            else:
                still_missing.add(num)
        only_dt = still_missing

    if not only_dt:
        result.ok(f"Numbers match ({len(matched)} values checked, some found in broader GL context)")
        return

    # Only report clinically significant mismatches as warnings
    significant = sorted(n for n in only_dt if _is_clinically_significant(n))
    non_significant = only_dt - set(significant)

    if significant:
        result.warn(
            f"Numbers in dt but not in GL: {', '.join(significant)}  "
            f"(matched: {len(matched)}, dt-only significant: {len(significant)})"
        )
    elif non_significant:
        result.ok(
            f"Numbers match ({len(matched)} values checked; "
            f"{len(non_significant)} minor dt-only integers ignored)"
        )
    else:
        result.ok(f"Numbers match ({len(matched)} values checked)")


def compare_scores(dt_html: str, gl_html: str, result: CheckResult):
    dt_scores = extract_score_cards(dt_html)
    if not dt_scores:
        return

    gl_scores = extract_score_cards(gl_html)

    for i, dt_sc in enumerate(dt_scores):
        if i < len(gl_scores):
            gl_sc = gl_scores[i]
            if dt_sc["item_count"] != gl_sc["item_count"]:
                result.warn(
                    f'Score "{dt_sc["head"][:40]}": dt has {dt_sc["item_count"]} items, '
                    f'GL has {gl_sc["item_count"]} items'
                )
            else:
                result.ok(
                    f'Score "{dt_sc["head"][:40]}": {dt_sc["item_count"]} items match'
                )
            # Compare foot
            dt_foot = dt_sc["foot"]
            gl_foot = gl_sc["foot"]
            if dt_foot and gl_foot:
                dt_foot_nums = extract_numbers(dt_foot)
                gl_foot_nums = extract_numbers(gl_foot)
                if set(dt_foot_nums) != set(gl_foot_nums):
                    result.warn(
                        f'Score footer mismatch: dt="{dt_foot[:60]}" vs GL="{gl_foot[:60]}"'
                    )
        else:
            result.info(
                f'Score "{dt_sc["head"][:40]}" ({dt_sc["item_count"]} items) — '
                f"no matching score card in GL section"
            )


def _has_digit(s: str) -> bool:
    return any(c.isdigit() for c in s)


def compare_stat_vals(dt_html: str, gl_html: str, result: CheckResult,
                      gl_path: Path | None = None):
    dt_stats = extract_stat_vals(dt_html)
    if not dt_stats:
        return

    gl_stats = extract_stat_vals(gl_html)
    gl_stat_vals = {s["val"] for s in gl_stats}

    for ds in dt_stats:
        val = ds["val"]
        # Skip non-numeric stat values (text labels like "ΔAG ≫ ΔHCO₃⁻")
        if not _has_digit(val):
            continue

        if val in gl_stat_vals:
            result.ok(f'stat-grid "{val}" matches GL')
        else:
            # Check if the value exists in GL section text
            gl_text = strip_tags(gl_html)
            if val in gl_text:
                result.ok(f'stat-grid "{val}" found in GL text')
            elif gl_path:
                # Fallback: check full GL page
                full_text = strip_tags(read_gl_file(gl_path))
                if val in full_text:
                    result.ok(f'stat-grid "{val}" found in broader GL context')
                else:
                    result.warn(
                        f'stat-grid "{val}" ({ds["label"]}) not found in GL'
                    )
            else:
                result.warn(
                    f'stat-grid "{val}" ({ds["label"]}) not found in GL section'
                )


def compare_dosages(dt_html: str, gl_html: str, result: CheckResult):
    dt_text = strip_tags(dt_html)
    gl_text = strip_tags(gl_html)
    dt_doses = set(_DOSE_PATTERN.findall(dt_text))
    if not dt_doses:
        return

    gl_doses = set(_DOSE_PATTERN.findall(gl_text))
    only_dt = dt_doses - gl_doses

    if not only_dt:
        result.ok(f"Drug dosages match ({len(dt_doses)} checked)")
    else:
        # Normalise and retry
        def norm(d):
            return re.sub(r"\s+", "", d).lower()

        gl_normed = {norm(d) for d in gl_doses}
        real_miss = [d for d in only_dt if norm(d) not in gl_normed]
        if real_miss:
            result.warn(f"Dosages in dt but not in GL: {', '.join(sorted(real_miss))}")
        else:
            result.ok(f"Drug dosages match ({len(dt_doses)} checked)")


# ---------------------------------------------------------------------------
# Main scanning logic
# ---------------------------------------------------------------------------

_DT_SOURCE_PATTERN = re.compile(
    r'<div\s+class="dt-source">(.*?)</div>',
    re.S,
)
_HREF_PATTERN = re.compile(
    r'href="([^"]*)"',
)


def _parse_href(href: str) -> tuple[Path, str]:
    """Parse a dt-source href into (gl_path, anchor)."""
    if "#" in href:
        file_part, anchor = href.rsplit("#", 1)
    else:
        file_part = href
        anchor = ""
    file_part = file_part.lstrip("./")
    if file_part.startswith("../"):
        file_part = file_part[3:]
    return GL_DIR / file_part, anchor


def scan_dt_page(dt_path: Path) -> list[CheckResult]:
    html = dt_path.read_text(encoding="utf-8")
    results = []

    for src_m in _DT_SOURCE_PATTERN.finditer(html):
        source_div = src_m.group(1)
        source_pos = src_m.start()

        # Extract all hrefs in this dt-source (may have multiple sources)
        hrefs = _HREF_PATTERN.findall(source_div)

        # Get the card above this dt-source
        card_title, card_html = extract_card_above(html, source_pos)

        # Parse all source references
        sources: list[tuple[Path, str]] = []
        for href in hrefs:
            gl_path, anchor = _parse_href(href)
            sources.append((gl_path, anchor))

        # Collect all GL sections for this card (for combined checking)
        combined_gl_html = ""
        all_gl_paths: list[Path] = []
        source_labels: list[str] = []

        for gl_path, anchor in sources:
            label = (
                f"{gl_path.name}#{anchor}" if anchor
                else gl_path.name
            )
            source_labels.append(label)

            if not gl_path.exists() or not anchor:
                continue
            section = extract_gl_section(gl_path, anchor)
            if section:
                combined_gl_html += section + "\n"
                all_gl_paths.append(gl_path)

        source_label = " / ".join(source_labels)
        result = CheckResult(source_label, card_title)

        # Check for broken links
        for gl_path, anchor in sources:
            if not gl_path.exists():
                result.warn(f"GL file not found: {gl_path.name}")
            elif anchor and not extract_gl_section(gl_path, anchor):
                result.warn(f"Anchor #{anchor} not found in {gl_path.name}")

        if not combined_gl_html:
            if not result.messages:
                result.info("No GL sections resolved — skipping content comparison")
            results.append(result)
            continue

        # Use the first GL path for full-page fallback
        primary_gl = all_gl_paths[0] if all_gl_paths else None

        # Run comparisons against combined GL sections
        compare_numbers(card_html, combined_gl_html, result,
                        gl_path=primary_gl, anchor="")
        compare_scores(card_html, combined_gl_html, result)
        compare_stat_vals(card_html, combined_gl_html, result,
                          gl_path=primary_gl)
        compare_dosages(card_html, combined_gl_html, result)

        if not result.messages:
            result.ok("Card checked (no comparable data found)")

        results.append(result)

    return results


def main():
    # Parse args
    args = sys.argv[1:]
    mismatches_only = "--mismatches-only" in args
    args = [a for a in args if not a.startswith("--")]

    # Determine which dt pages to scan
    if args:
        name = args[0]
        if not name.endswith(".html"):
            name = name + ".html"
        targets = [DT_DIR / name]
    else:
        targets = sorted(DT_DIR.glob("dt-*.html"))

    if not targets:
        print("No dt-*.html files found.")
        sys.exit(1)

    total_pages = 0
    total_cards = 0
    total_matches = 0
    total_mismatches = 0

    for dt_path in targets:
        if not dt_path.exists():
            print(f"File not found: {dt_path}")
            continue

        results = scan_dt_page(dt_path)
        if not results:
            continue

        total_pages += 1
        page_has_mismatch = any(r.has_mismatch for r in results)

        if mismatches_only and not page_has_mismatch:
            # Still count cards
            for r in results:
                total_cards += 1
                total_matches += 1
            continue

        print(f"\n=== {dt_path.name} ===")

        for r in results:
            total_cards += 1
            if r.has_mismatch:
                total_mismatches += 1
            else:
                total_matches += 1

            if mismatches_only and not r.has_mismatch:
                continue

            print(f'  Source: {r.source_ref}')
            print(f'  Card: "{r.card_title}"')
            for icon, msg in r.messages:
                print(f"  {icon} {msg}")
            print()

    print("=" * 50)
    print("=== SUMMARY ===")
    print(f"\U0001F4CA Pages checked: {total_pages}")
    print(f"\U0001F4CA Cards checked: {total_cards}")
    print(f"\u2705 Matches: {total_matches}")
    print(f"\u26a0\ufe0f  Mismatches: {total_mismatches}")


if __name__ == "__main__":
    main()
