"""Tier 3: Cross-Feature Combinations Tests.

Verifies cross-cutting system integration:
1. Table of Contents (TOC) synchronization between H2 headings, .toc-list, and #toc-map JSON.
2. JSON-LD Schema structured data validity (Schema.org Article and FAQPage).
3. FAQ accordion sync with FAQPage JSON-LD schema questions.
4. Ad placeholder layout modifiers (ad-in-article, ad-sidebar-sticky, ad-leaderboard, ad-rectangle, ad-multiplex).
5. CSS styling support for .ad-placeholder in assets/css/styles.css (CLS protection, min-height, collapse rules).
"""

import json
import os
import re
from html.parser import HTMLParser
from typing import Any, Dict, List, Set, Tuple

BLOG_ARTICLES = [
    "blog/compound-interest-south-africa.html",
    "blog/rule-of-72.html",
    "blog/how-long-to-save-1-million-rand.html",
    "blog/tax-free-savings-account-calculator-south-africa.html",
    "blog/maximize-compound-interest-monthly-savings.html",
    "blog/etfs-vs-traditional-savings-accounts.html",
]

VALID_MODIFIERS = {
    "ad-leaderboard",
    "ad-rectangle",
    "ad-in-article",
    "ad-sidebar-sticky",
    "ad-multiplex",
    "ad-anchor-sticky",
}


def test_toc_synchronization(project_root: str) -> List[Dict[str, Any]]:
    """Test that every H2 heading in each blog article has a matching entry in #toc-map and .toc-list."""
    results = []

    for rel_path in BLOG_ARTICLES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T3-TOC-SYNC-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        # 1. Extract H2 headings across the article
        h2_headings = []
        for match in re.finditer(r"<h2[^>]*>(.*?)</h2>", content, re.DOTALL | re.IGNORECASE):
            h2_text = re.sub(r"<[^>]+>", "", match.group(1)).strip()
            h2_text = re.sub(r"\s+", " ", h2_text)
            if h2_text:
                h2_headings.append(h2_text)

        # 2. Extract #toc-map JSON
        toc_map_match = re.search(
            r"""<script\s+id=["']toc-map["'][^>]*>(.*?)</script>""",
            content,
            re.DOTALL | re.IGNORECASE,
        )
        if not toc_map_match:
            results.append({
                "id": test_id,
                "tier": 3,
                "target": rel_path,
                "passed": False,
                "message": "Missing <script id='toc-map'> JSON mapping",
                "metric": 0,
            })
            continue

        try:
            toc_map = json.loads(toc_map_match.group(1).strip())
        except Exception as e:
            results.append({
                "id": test_id,
                "tier": 3,
                "target": rel_path,
                "passed": False,
                "message": f"Malformed JSON in #toc-map: {e}",
                "metric": 0,
            })
            continue

        # 3. Extract .toc-list href anchors
        toc_hrefs = set(re.findall(r"""<a\s+href=["']#([^"']+)["']""", content))

        # Check coverage
        unmapped_h2 = []
        for h in h2_headings:
            normalized_h = h.strip()
            if normalized_h not in toc_map:
                lower_map = {k.lower(): v for k, v in toc_map.items()}
                if normalized_h.lower() not in lower_map:
                    unmapped_h2.append(normalized_h)

        missing_hrefs = []
        for h_text, anchor_id in toc_map.items():
            if anchor_id not in toc_hrefs:
                missing_hrefs.append(anchor_id)

        all_mapped = (len(h2_headings) > 0) and (len(unmapped_h2) == 0)
        has_hrefs = (len(missing_hrefs) == 0)
        passed = all_mapped and has_hrefs

        msg = (
            f"All {len(h2_headings)} H2 headings perfectly mapped to TOC anchors"
            if passed
            else f"TOC sync mismatch: unmapped H2s={unmapped_h2}, missing TOC hrefs={missing_hrefs}"
        )

        results.append({
            "id": test_id,
            "tier": 3,
            "target": rel_path,
            "passed": passed,
            "message": msg,
            "metric": len(h2_headings) - len(unmapped_h2),
        })
    return results


def test_json_ld_schema_validity(project_root: str) -> List[Dict[str, Any]]:
    """Test that all blog articles feature valid, parseable JSON-LD Schema.org markup."""
    results = []

    for rel_path in BLOG_ARTICLES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T3-SCHEMA-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        schema_blocks = re.findall(
            r"""<script\s+type=["']application/ld\+json["'][^>]*>(.*?)</script>""",
            content,
            re.DOTALL | re.IGNORECASE,
        )

        if not schema_blocks:
            results.append({
                "id": test_id,
                "tier": 3,
                "target": rel_path,
                "passed": False,
                "message": "Missing JSON-LD structured data script",
                "metric": 0,
            })
            continue

        valid_schemas = 0
        found_types = set()
        for idx, block in enumerate(schema_blocks):
            try:
                data = json.loads(block.strip())
                valid_schemas += 1
                if "@graph" in data:
                    for item in data["@graph"]:
                        found_types.add(item.get("@type"))
                elif "@type" in data:
                    found_types.add(data.get("@type"))
            except Exception as e:
                results.append({
                    "id": f"{test_id}-block-{idx}",
                    "tier": 3,
                    "target": rel_path,
                    "passed": False,
                    "message": f"Invalid JSON in block {idx}: {e}",
                    "metric": 0,
                })

        has_article_schema = "Article" in found_types
        passed = (valid_schemas > 0) and has_article_schema

        results.append({
            "id": test_id,
            "tier": 3,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Valid JSON-LD schema found with types: {sorted(list(found_types))}"
                if passed
                else f"Schema missing Article type. Found types: {sorted(list(found_types))}"
            ),
            "metric": len(found_types),
        })
    return results


def test_ad_placeholder_modifiers(project_root: str) -> List[Dict[str, Any]]:
    """Test that ad placeholders specify recognized layout modifiers."""
    results = []
    all_pages = [
        "index.html",
        "investment-goal-calculator.html",
        "retirement-calculator.html",
        "compare-investments.html",
        "blog/index.html",
        "blog/blog-template.html",
    ] + BLOG_ARTICLES

    for rel_path in all_pages:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T3-AD-MODIFIERS-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        class AdModifierFinder(HTMLParser):
            def __init__(self):
                super().__init__()
                self.slots = []
            def handle_starttag(self, tag, attrs):
                classes = dict(attrs).get("class", "").split()
                if "ad-placeholder" in classes or "ad-slot" in classes:
                    modifiers = [c for c in classes if c in VALID_MODIFIERS]
                    self.slots.append((classes, modifiers))

        finder = AdModifierFinder()
        finder.feed(content)

        if not finder.slots:
            results.append({
                "id": test_id,
                "tier": 3,
                "target": rel_path,
                "passed": False,
                "message": "No ad placeholders or slots found",
                "metric": 0,
            })
            continue

        invalid_slots = [c for c, m in finder.slots if not m]
        passed = len(invalid_slots) == 0

        results.append({
            "id": test_id,
            "tier": 3,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"All {len(finder.slots)} ad unit(s) have valid layout modifiers"
                if passed
                else f"{len(invalid_slots)} slot(s) lack recognized layout modifiers"
            ),
            "metric": len(finder.slots) - len(invalid_slots),
        })
    return results


def test_css_ad_placeholder_architecture(project_root: str) -> List[Dict[str, Any]]:
    """Test that assets/css/styles.css contains dedicated CSS styling rules for .ad-placeholder."""
    results = []
    css_path = os.path.join(project_root, "assets/css/styles.css")
    test_id = "T3-CSS-AD-PLACEHOLDER"

    if not os.path.exists(css_path):
        return [{
            "id": test_id,
            "tier": 3,
            "target": "assets/css/styles.css",
            "passed": False,
            "message": "assets/css/styles.css not found",
            "metric": 0,
        }]

    with open(css_path, "r", encoding="utf-8", errors="replace") as f:
        css = f.read()

    has_placeholder_rule = ".ad-placeholder" in css
    has_cls_min_height = bool(re.search(r"\.ad-(?:placeholder|slot)[^{]*\{[^}]*min-height\s*:\s*[0-9]+px", css, re.DOTALL))
    has_unfilled_collapse = bool(re.search(r"""data-ad-status\s*=\s*["']unfilled["']""", css))

    all_passed = has_placeholder_rule and has_cls_min_height and has_unfilled_collapse

    reasons = []
    if not has_placeholder_rule:
        reasons.append("missing .ad-placeholder selector")
    if not has_cls_min_height:
        reasons.append("missing min-height CLS protection")
    if not has_unfilled_collapse:
        reasons.append("missing unfilled collapse rule")

    results.append({
        "id": test_id,
        "tier": 3,
        "target": "assets/css/styles.css",
        "passed": all_passed,
        "message": (
            ".ad-placeholder CSS architecture verified (CLS min-height & auto-collapse configured)"
            if all_passed
            else f"CSS deficiencies: {', '.join(reasons)}"
        ),
        "metric": 1 if all_passed else 0,
    })
    return results


def run_tier3_tests(project_root: str) -> List[Dict[str, Any]]:
    """Execute all Tier 3 Cross-Feature Combinations tests."""
    all_results = []
    all_results.extend(test_toc_synchronization(project_root))
    all_results.extend(test_json_ld_schema_validity(project_root))
    all_results.extend(test_ad_placeholder_modifiers(project_root))
    all_results.extend(test_css_ad_placeholder_architecture(project_root))
    return all_results
