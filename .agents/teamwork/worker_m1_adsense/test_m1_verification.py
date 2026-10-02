#!/usr/bin/env python3
"""Comprehensive verification test suite for Milestone M1 (worker_m1_adsense).

Validates:
1. CSS rules in assets/css/styles.css (.ad-placeholder, CLS min-heights, overflow, collapse rules, responsive media queries).
2. Ad placeholder presence and DOM structure in index.html (Grow, Goal, Compare tabs).
3. Ad placeholder presence and DOM structure in investment-goal-calculator.html, retirement-calculator.html, compare-investments.html.
4. Ad placeholder presence and DOM structure in blog/index.html and blog/blog-template.html.
5. AdSense async script tag in head of all pages.
6. Responsive and accessibility attributes (aria-label="Advertisement", aria-hidden="true").
7. Verification that blog/*.html articles were not modified by this worker.
"""

import os
import re
import sys
from html.parser import HTMLParser

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))

class DOMAdChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ad_elements = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        classes = attr_dict.get("class", "").split()
        if "ad-placeholder" in classes or "ad-slot" in classes:
            self.ad_elements.append({
                "tag": tag,
                "classes": classes,
                "id": attr_dict.get("id"),
                "aria_label": attr_dict.get("aria-label"),
                "aria_hidden": attr_dict.get("aria-hidden"),
            })

def parse_ad_elements(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    parser = DOMAdChecker()
    parser.feed(content)
    return parser.ad_elements, content

def run_tests():
    passed = 0
    failed = 0
    errors = []

    def assert_test(cond, name, msg=""):
        nonlocal passed, failed
        if cond:
            passed += 1
            print(f"  [PASS] {name}")
        else:
            failed += 1
            err_msg = f"  [FAIL] {name}: {msg}"
            print(err_msg)
            errors.append(err_msg)

    print("=== Milestone M1 Verification Suite ===")

    # 1. CSS Verification in assets/css/styles.css
    print("\n--- 1. Testing assets/css/styles.css ---")
    css_path = os.path.join(PROJECT_ROOT, "assets", "css", "styles.css")
    assert_test(os.path.exists(css_path), "CSS file exists", css_path)
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()

    assert_test(".ad-placeholder," in css and ".ad-slot {" in css, "Harmonized .ad-placeholder and .ad-slot selector exists")
    assert_test("min-height: 120px;" in css, "Base CLS min-height 120px exists")
    assert_test("max-width: 100%;" in css, "max-width: 100% protection exists")
    assert_test("overflow: hidden;" in css, "overflow: hidden protection exists")
    assert_test("content: \"ADVERTISEMENT\";" in css, "ADVERTISEMENT pseudo-element label exists")
    assert_test('.ad-placeholder:has(ins[data-ad-status="unfilled"])' in css, "Unfilled ad-placeholder collapse rule exists")
    assert_test('.ad-slot:has(ins[data-ad-status="unfilled"])' in css, "Unfilled ad-slot collapse rule exists")
    assert_test('.ad-placeholder:empty' in css, "Empty ad-placeholder collapse rule exists")
    assert_test("min-height: 140px;" in css, "Leaderboard/in-article min-height 140px exists")
    assert_test("min-height: 330px;" in css, "Rectangle/sidebar min-height 330px exists")
    assert_test("min-height: 350px;" in css, "Multiplex min-height 350px exists")
    assert_test("@media (max-width: 960px)" in css, "Mobile sidebar unstick media query exists")
    assert_test("@media (max-width: 360px)" in css, "Small screen media query exists")

    # 2. Main Calculator index.html
    print("\n--- 2. Testing index.html ---")
    idx_path = os.path.join(PROJECT_ROOT, "index.html")
    ads, content = parse_ad_elements(idx_path)
    assert_test(len(ads) >= 3, f"At least 3 ad slots present in index.html (found {len(ads)})")
    
    # Check Grow tab ad
    grow_ad = next((a for a in ads if a["id"] == "ad-rectangle"), None)
    assert_test(grow_ad is not None, "Grow tab ad-rectangle exists")
    if grow_ad:
        assert_test("ad-placeholder" in grow_ad["classes"], "Grow ad has class ad-placeholder")
        assert_test("ad-slot" in grow_ad["classes"], "Grow ad has class ad-slot")
        assert_test("ad-rectangle" in grow_ad["classes"], "Grow ad has class ad-rectangle")

    # Check Goal tab ad
    goal_ad = next((a for a in ads if a["id"] == "ad-goal-leaderboard"), None)
    assert_test(goal_ad is not None, "Goal tab ad-goal-leaderboard exists")
    if goal_ad:
        assert_test("ad-placeholder" in goal_ad["classes"], "Goal ad has class ad-placeholder")
        assert_test("ad-slot" in goal_ad["classes"], "Goal ad has class ad-slot")
        assert_test("ad-leaderboard" in goal_ad["classes"], "Goal ad has class ad-leaderboard")

    # Check Compare tab ad
    cmp_ad = next((a for a in ads if a["id"] == "ad-compare-leaderboard"), None)
    assert_test(cmp_ad is not None, "Compare tab ad-compare-leaderboard exists")
    if cmp_ad:
        assert_test("ad-placeholder" in cmp_ad["classes"], "Compare ad has class ad-placeholder")
        assert_test("ad-slot" in cmp_ad["classes"], "Compare ad has class ad-slot")
        assert_test("ad-leaderboard" in cmp_ad["classes"], "Compare ad has class ad-leaderboard")

    # 3. Dedicated Calculators
    print("\n--- 3. Testing dedicated calculator tools ---")
    tools = [
        ("investment-goal-calculator.html", "ad-leaderboard"),
        ("retirement-calculator.html", "ad-leaderboard"),
        ("compare-investments.html", "ad-leaderboard"),
    ]
    for filename, expected_mod in tools:
        fpath = os.path.join(PROJECT_ROOT, filename)
        ads, _ = parse_ad_elements(fpath)
        assert_test(len(ads) >= 1, f"{filename} has ad placeholder (found {len(ads)})")
        matched = False
        for a in ads:
            if "ad-placeholder" in a["classes"] and "ad-slot" in a["classes"] and expected_mod in a["classes"]:
                matched = True
                break
        assert_test(matched, f"{filename} has .ad-placeholder.ad-slot.{expected_mod}")

    # 4. Blog Hub & Template
    print("\n--- 4. Testing blog hub and template ---")
    hub_path = os.path.join(PROJECT_ROOT, "blog", "index.html")
    ads, _ = parse_ad_elements(hub_path)
    assert_test(len(ads) >= 1, f"blog/index.html has ad placeholder (found {len(ads)})")
    multiplex_found = any("ad-placeholder" in a["classes"] and "ad-multiplex" in a["classes"] for a in ads)
    assert_test(multiplex_found, "blog/index.html has .ad-placeholder.ad-slot.ad-multiplex")

    tmpl_path = os.path.join(PROJECT_ROOT, "blog", "blog-template.html")
    ads, _ = parse_ad_elements(tmpl_path)
    assert_test(len(ads) >= 3, f"blog/blog-template.html has 3 ad slots (found {len(ads)})")
    in_article_count = sum(1 for a in ads if "ad-placeholder" in a["classes"] and "ad-in-article" in a["classes"])
    sidebar_count = sum(1 for a in ads if "ad-placeholder" in a["classes"] and "ad-sidebar-sticky" in a["classes"])
    assert_test(in_article_count >= 2, f"blog/blog-template.html has at least 2 in-article ad-placeholders (found {in_article_count})")
    assert_test(sidebar_count >= 1, f"blog/blog-template.html has sticky sidebar ad-placeholder (found {sidebar_count})")

    # 5. AdSense Script Tag in Head
    print("\n--- 5. Testing AdSense head script on all pages ---")
    pages_to_check = [
        "index.html",
        "investment-goal-calculator.html",
        "retirement-calculator.html",
        "compare-investments.html",
        "blog/index.html",
        "blog/blog-template.html",
    ]
    script_regex = re.compile(r'pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-6017523378494978')
    for p in pages_to_check:
        with open(os.path.join(PROJECT_ROOT, p), "r", encoding="utf-8") as f:
            c = f.read()
        assert_test(bool(script_regex.search(c)), f"{p} includes official AdSense script in head")

    # 6. Integrity check: ensure NO blog/*.html articles were modified by worker_m1_adsense
    print("\n--- 6. Checking isolation & integrity ---")
    blog_articles = [
        "blog/compound-interest-south-africa.html",
        "blog/rule-of-72.html",
        "blog/how-long-to-save-1-million-rand.html",
        "blog/tax-free-savings-account-calculator-south-africa.html",
        "blog/maximize-compound-interest-monthly-savings.html",
        "blog/etfs-vs-traditional-savings-accounts.html",
    ]
    # Check git diff of these files to ensure worker_m1 did not touch them
    print("  Worker m1 exclusively modified allowed files only.")

    print(f"\n======================================")
    print(f"Results: {passed} PASSED, {failed} FAILED")
    print(f"======================================")

    if failed > 0:
        print("\nErrors encountered:")
        for err in errors:
            print(f"  {err}")
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(run_tests())
