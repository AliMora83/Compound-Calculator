"""Tier 1: Feature Coverage Tests.

Verifies the foundational acceptance criteria:
1. Programmatic word counts strictly > 1,500 words for all 6 blog articles.
2. Structural presence of .ad-placeholder elements across all calculator pages.
3. Structural presence of .ad-placeholder elements across all blog articles.
4. AdSense asynchronous script tag integration in <head> across all core pages.
"""

import os
import re
from html.parser import HTMLParser
from typing import Any, Dict, List, Tuple

from .word_counter import count_words, get_file_word_count

BLOG_ARTICLES = [
    "blog/compound-interest-south-africa.html",
    "blog/rule-of-72.html",
    "blog/how-long-to-save-1-million-rand.html",
    "blog/tax-free-savings-account-calculator-south-africa.html",
    "blog/maximize-compound-interest-monthly-savings.html",
    "blog/etfs-vs-traditional-savings-accounts.html",
]

CALCULATOR_PAGES = [
    "index.html",
    "investment-goal-calculator.html",
    "retirement-calculator.html",
    "compare-investments.html",
]

BLOG_HUB_AND_TEMPLATE = [
    "blog/index.html",
    "blog/blog-template.html",
]


class AdPlaceholderFinder(HTMLParser):
    """Parses HTML to find elements having the 'ad-placeholder' CSS class."""

    def __init__(self):
        super().__init__()
        self.reset()
        self.placeholders: List[Dict[str, Any]] = []

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Any]]):
        attr_dict = dict(attrs)
        classes = attr_dict.get("class", "").split()
        if "ad-placeholder" in classes:
            self.placeholders.append({
                "tag": tag,
                "classes": classes,
                "id": attr_dict.get("id"),
                "aria_label": attr_dict.get("aria-label"),
                "aria_hidden": attr_dict.get("aria-hidden"),
            })


def find_ad_placeholders(html_content: str) -> List[Dict[str, Any]]:
    """Return all elements containing class 'ad-placeholder'."""
    parser = AdPlaceholderFinder()
    parser.feed(html_content)
    return parser.placeholders


def test_blog_word_counts(project_root: str) -> List[Dict[str, Any]]:
    """Test that all 6 blog articles strictly exceed 1,500 words."""
    results = []
    min_required_words = 1500

    for rel_path in BLOG_ARTICLES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T1-WORD-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            results.append({
                "id": test_id,
                "tier": 1,
                "target": rel_path,
                "passed": False,
                "message": f"File does not exist: {rel_path}",
                "metric": 0,
            })
            continue

        word_count = get_file_word_count(abs_path)
        passed = word_count > min_required_words
        diff = word_count - min_required_words
        diff_str = f"+{diff} words" if diff > 0 else f"{diff} words"

        results.append({
            "id": test_id,
            "tier": 1,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Word count: {word_count:,} words ({diff_str} vs {min_required_words:,} threshold)"
                if passed
                else f"Word count deficit: {word_count:,} words ({diff_str} vs {min_required_words:,} threshold)"
            ),
            "metric": word_count,
        })
    return results


def test_calculator_ad_placeholders(project_root: str) -> List[Dict[str, Any]]:
    """Test that each calculator page contains at least one .ad-placeholder container."""
    results = []
    for rel_path in CALCULATOR_PAGES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T1-AD-CALC-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            results.append({
                "id": test_id,
                "tier": 1,
                "target": rel_path,
                "passed": False,
                "message": f"File does not exist: {rel_path}",
                "metric": 0,
            })
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        placeholders = find_ad_placeholders(content)
        count = len(placeholders)
        passed = count > 0

        results.append({
            "id": test_id,
            "tier": 1,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Found {count} .ad-placeholder element(s)"
                if passed
                else "Missing required .ad-placeholder container"
            ),
            "metric": count,
        })
    return results


def test_blog_ad_placeholders(project_root: str) -> List[Dict[str, Any]]:
    """Test that each blog article contains at least one .ad-placeholder container."""
    results = []
    for rel_path in BLOG_ARTICLES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T1-AD-BLOG-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            results.append({
                "id": test_id,
                "tier": 1,
                "target": rel_path,
                "passed": False,
                "message": f"File does not exist: {rel_path}",
                "metric": 0,
            })
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        placeholders = find_ad_placeholders(content)
        count = len(placeholders)
        passed = count > 0

        results.append({
            "id": test_id,
            "tier": 1,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Found {count} .ad-placeholder element(s)"
                if passed
                else "Missing required .ad-placeholder container"
            ),
            "metric": count,
        })
    return results


def test_hub_and_template_ad_placeholders(project_root: str) -> List[Dict[str, Any]]:
    """Test that blog/index.html and blog/blog-template.html contain .ad-placeholder containers."""
    results = []
    for rel_path in BLOG_HUB_AND_TEMPLATE:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T1-AD-HUB-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            results.append({
                "id": test_id,
                "tier": 1,
                "target": rel_path,
                "passed": False,
                "message": f"File does not exist: {rel_path}",
                "metric": 0,
            })
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        placeholders = find_ad_placeholders(content)
        count = len(placeholders)
        passed = count > 0

        results.append({
            "id": test_id,
            "tier": 1,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Found {count} .ad-placeholder element(s)"
                if passed
                else "Missing required .ad-placeholder container"
            ),
            "metric": count,
        })
    return results


def test_adsense_head_scripts(project_root: str) -> List[Dict[str, Any]]:
    """Test that all 10 core pages load the official Google AdSense script tag in <head>."""
    results = []
    target_pages = CALCULATOR_PAGES + BLOG_ARTICLES
    adsense_pattern = re.compile(
        r'<script[^>]*src=[\'"][^\'"]*pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-6017523378494978[\'"][^>]*>',
        re.IGNORECASE,
    )

    for rel_path in target_pages:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T1-SCRIPT-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            results.append({
                "id": test_id,
                "tier": 1,
                "target": rel_path,
                "passed": False,
                "message": f"File does not exist: {rel_path}",
                "metric": 0,
            })
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        # Check script inside head
        head_match = re.search(r"<head[^>]*>(.*?)</head>", content, re.DOTALL | re.IGNORECASE)
        head_content = head_match.group(1) if head_match else content

        has_script = bool(adsense_pattern.search(head_content))
        results.append({
            "id": test_id,
            "tier": 1,
            "target": rel_path,
            "passed": has_script,
            "message": (
                "AdSense client script (ca-pub-6017523378494978) present in <head>"
                if has_script
                else "Missing Google AdSense script tag in <head>"
            ),
            "metric": 1 if has_script else 0,
        })
    return results


def run_tier1_tests(project_root: str) -> List[Dict[str, Any]]:
    """Execute all Tier 1 Feature Coverage tests."""
    all_results = []
    all_results.extend(test_blog_word_counts(project_root))
    all_results.extend(test_calculator_ad_placeholders(project_root))
    all_results.extend(test_blog_ad_placeholders(project_root))
    all_results.extend(test_hub_and_template_ad_placeholders(project_root))
    all_results.extend(test_adsense_head_scripts(project_root))
    return all_results
