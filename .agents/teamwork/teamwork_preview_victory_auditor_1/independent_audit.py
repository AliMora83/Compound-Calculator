#!/usr/bin/env python3
"""Independent Victory Auditor Verification Script.

Zero-dependency verification tool written independently by the Victory Auditor.
Tests R1, R2, R3 and adversarial anti-cheating criteria.
"""

import html
import json
import os
import re
from html.parser import HTMLParser
from typing import Dict, List, Set, Tuple

PROJECT_ROOT = "/Users/alikora/dev/AntiG/CompCalc"

BLOG_FILES = [
    "blog/compound-interest-south-africa.html",
    "blog/rule-of-72.html",
    "blog/how-long-to-save-1-million-rand.html",
    "blog/tax-free-savings-account-calculator-south-africa.html",
    "blog/maximize-compound-interest-monthly-savings.html",
    "blog/etfs-vs-traditional-savings-accounts.html",
]

CALC_FILES = [
    "index.html",
    "investment-goal-calculator.html",
    "retirement-calculator.html",
    "compare-investments.html",
]

OTHER_FILES = [
    "blog/index.html",
    "blog/blog-template.html",
]


class StrictProseExtractor(HTMLParser):
    """Extracts text strictly from article body, ignoring navigation, footer, head, scripts, styles."""
    IGNORED_TAGS = {"head", "script", "style", "noscript", "svg", "nav", "footer"}

    def __init__(self):
        super().__init__()
        self.text_chunks = []
        self._ignore_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth += 1

    def handle_endtag(self, tag):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth = max(0, self._ignore_depth - 1)

    def handle_data(self, data):
        if self._ignore_depth == 0:
            cleaned = data.strip()
            if cleaned:
                self.text_chunks.append(cleaned)

    def get_text(self) -> str:
        raw = " ".join(self.text_chunks)
        unescaped = html.unescape(raw)
        return re.sub(r"\s+", " ", unescaped).strip()


class GeneralTextExtractor(HTMLParser):
    """Standard extractor ignoring head, script, style, noscript, svg."""
    IGNORED_TAGS = {"head", "script", "style", "noscript", "svg"}

    def __init__(self):
        super().__init__()
        self.text_chunks = []
        self._ignore_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth += 1

    def handle_endtag(self, tag):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth = max(0, self._ignore_depth - 1)

    def handle_data(self, data):
        if self._ignore_depth == 0:
            cleaned = data.strip()
            if cleaned:
                self.text_chunks.append(cleaned)

    def get_text(self) -> str:
        raw = " ".join(self.text_chunks)
        unescaped = html.unescape(raw)
        return re.sub(r"\s+", " ", unescaped).strip()


def check_r1_word_counts():
    print("\n" + "=" * 60)
    print("CHECK R1: CONTENT VOLUME (> 1,500 words per article)")
    print("=" * 60)
    r1_pass = True
    results = {}

    for rel_path in BLOG_FILES:
        full_path = os.path.join(PROJECT_ROOT, rel_path)
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Method A: General visible text (all body text excluding script/style/head)
        gen_parser = GeneralTextExtractor()
        gen_parser.feed(content)
        gen_text = gen_parser.get_text()
        gen_words = len(gen_text.split())

        # Method B: Strict prose (excluding nav, footer, scripts, styles)
        strict_parser = StrictProseExtractor()
        strict_parser.feed(content)
        strict_text = strict_parser.get_text()
        strict_words = len(strict_text.split())

        # Method C: Pure alpha words (ignoring numbers, pure symbols)
        alpha_words = len(re.findall(r"\b[A-Za-z]{2,}\b", strict_text))

        # Check for paragraph repetition / duplicate sentences
        sentences = [s.strip() for s in re.split(r"[.!?]+", strict_text) if len(s.strip()) > 30]
        sentence_counts = {}
        for s in sentences:
            sentence_counts[s] = sentence_counts.get(s, 0) + 1
        duplicates = {s: c for s, c in sentence_counts.items() if c > 2}

        passed = (gen_words > 1500) and (strict_words > 1500)
        if not passed:
            r1_pass = False

        results[rel_path] = {
            "gen_words": gen_words,
            "strict_words": strict_words,
            "alpha_words": alpha_words,
            "passed": passed,
            "duplicate_sentences": len(duplicates),
        }

        print(f"File: {rel_path}")
        print(f"  - General Text Words: {gen_words} (Target: >1500) -> {'PASS' if gen_words > 1500 else 'FAIL'}")
        print(f"  - Strict Prose Words: {strict_words} (Target: >1500) -> {'PASS' if strict_words > 1500 else 'FAIL'}")
        print(f"  - Alpha Prose Words:  {alpha_words}")
        print(f"  - Duplicated Sentences (>2x): {len(duplicates)}")
        if duplicates:
            print(f"    WARNING: Found duplicate sentences: {duplicates}")

    print(f"\nR1 OVERALL RESULT: {'PASS' if r1_pass else 'FAIL'}")
    return r1_pass, results


def check_r2_south_african_context():
    print("\n" + "=" * 60)
    print("CHECK R2: SOUTH AFRICAN FINANCIAL QUALITY & RELEVANCE")
    print("=" * 60)
    r2_pass = True
    results = {}

    benchmarks = {
        "Repo Rate (7.25%)": r"7\.25%?",
        "Prime Rate (10.75%)": r"10\.75%?",
        "CPI Inflation (4.4% / 3-6%)": r"(?:4\.4%?|4\.3%?|4\.5%?|3%?\s*[-–]\s*6%?)",
        "JSE / ALSI": r"(?:JSE|All\s+Share|ALSI|FTSE/JSE)",
        "TFSA (Section 12T)": r"(?:TFSA|tax-free\s+savings|Section\s+12T)",
        "TFSA Limits (R36k/R46k / R500k)": r"(?:36[\s,]000|46[\s,]000).*?500[\s,]000",
        "TFSA 40% Penalty": r"40%\s*(?:penalty|tax|surcharge)",
        "Retirement Annuity / Sec 11F": r"(?:Retirement\s+Annuity|\bRA\b|Section\s+11F)",
        "Two-Pot System": r"(?:Two-Pot|Savings\s+Pot|Retirement\s+Pot)",
        "Fee Drag (EAC / TER)": r"(?:EAC|Effective\s+Annual\s+Cost|TER|Total\s+Expense\s+Ratio)",
        "ZAR / Rand Currency": r"(?:R\s?[0-9]{1,3}(?:[,\s][0-9]{3})*|ZAR|\bRand\b)",
    }

    for rel_path in BLOG_FILES:
        full_path = os.path.join(PROJECT_ROOT, rel_path)
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        matched_benchmarks = []
        for name, pattern in benchmarks.items():
            if re.search(pattern, content, re.IGNORECASE | re.DOTALL):
                matched_benchmarks.append(name)

        zar_count = len(re.findall(r"(?:R\s?[0-9]{1,3}(?:[,\s][0-9]{3})*|ZAR|\bRand\b)", content))

        # Each article should have rich SA context (at least 5 key benchmarks and strong ZAR currency presence)
        passed = len(matched_benchmarks) >= 5 and zar_count >= 15
        if not passed:
            r2_pass = False

        results[rel_path] = {
            "matched_count": len(matched_benchmarks),
            "matched_benchmarks": matched_benchmarks,
            "zar_count": zar_count,
            "passed": passed,
        }

        print(f"File: {rel_path}")
        print(f"  - Matched Benchmarks: {len(matched_benchmarks)} / {len(benchmarks)}")
        print(f"  - Rand/ZAR Occurrences: {zar_count}")
        print(f"  - Verified Benchmarks: {', '.join(matched_benchmarks)}")
        print(f"  - Result: {'PASS' if passed else 'FAIL'}")

    print(f"\nR2 OVERALL RESULT: {'PASS' if r2_pass else 'FAIL'}")
    return r2_pass, results


def check_r3_adsense_readiness():
    print("\n" + "=" * 60)
    print("CHECK R3: ADSENSE READINESS & LAYOUT INTEGRITY")
    print("=" * 60)
    r3_pass = True
    results = {}

    all_pages = BLOG_FILES + CALC_FILES + OTHER_FILES

    # 1. Check CSS rules in assets/css/styles.css
    css_path = os.path.join(PROJECT_ROOT, "assets/css/styles.css")
    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    css_checks = {
        ".ad-placeholder defined": ".ad-placeholder" in css_content,
        "min-height CLS safeguard": "min-height: 120px" in css_content or "min-height:120px" in css_content,
        "max-width 100% safeguard": "max-width: 100%" in css_content or "max-width:100%" in css_content,
        "auto-collapse on unfilled": ':has(ins[data-ad-status="unfilled"])' in css_content,
        "auto-collapse on empty": ".ad-placeholder:empty" in css_content,
        "sidebar sticky styling": ".ad-placeholder.ad-sidebar-sticky" in css_content,
    }

    css_pass = all(css_checks.values())
    if not css_pass:
        r3_pass = False

    print("CSS Architecture Checks:")
    for k, v in css_checks.items():
        print(f"  - {k}: {'PASS' if v else 'FAIL'}")

    # 2. Check AdSense script in head & ad placeholders per page
    adsense_script_pattern = re.compile(
        r'<script[^>]*src=[\'"][^\'"]*pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-6017523378494978[\'"][^>]*>',
        re.IGNORECASE,
    )

    page_results = {}
    for rel_path in all_pages:
        full_path = os.path.join(PROJECT_ROOT, rel_path)
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        head_match = re.search(r"<head[^>]*>(.*?)</head>", content, re.DOTALL | re.IGNORECASE)
        has_script = bool(head_match and adsense_script_pattern.search(head_match.group(1)))

        # Find ad-placeholder tags
        # Find all tags with class containing ad-placeholder
        placeholders = re.findall(
            r'<([a-zA-Z0-9]+)\s+[^>]*class=[\'"][^\'"]*\bad-placeholder\b[^\'"]*[\'"][^>]*>',
            content,
            re.IGNORECASE,
        )

        has_placeholders = len(placeholders) > 0

        # Check aria attributes
        aria_matches = re.findall(
            r'class=[\'"][^\'"]*\bad-placeholder\b[^\'"]*[\'"][^>]*aria-label=[\'"]Advertisement[\'"]',
            content,
            re.IGNORECASE,
        )

        passed = has_script and has_placeholders
        if not passed:
            r3_pass = False

        page_results[rel_path] = {
            "has_script": has_script,
            "placeholder_count": len(placeholders),
            "aria_count": len(aria_matches),
            "passed": passed,
        }

        print(f"Page: {rel_path}")
        print(f"  - Head Script: {'PASS' if has_script else 'FAIL'}")
        print(f"  - Ad Placeholders: {len(placeholders)} found")
        print(f"  - ARIA Label Matches: {len(aria_matches)}")
        print(f"  - Page Result: {'PASS' if passed else 'FAIL'}")

    print(f"\nR3 OVERALL RESULT: {'PASS' if r3_pass else 'FAIL'}")
    return r3_pass, {"css": css_checks, "pages": page_results}


def main():
    print("=" * 70)
    print("STARTING INDEPENDENT VICTORY AUDIT VERIFICATION")
    print("=" * 70)

    r1_pass, r1_details = check_r1_word_counts()
    r2_pass, r2_details = check_r2_south_african_context()
    r3_pass, r3_details = check_r3_adsense_readiness()

    overall_pass = r1_pass and r2_pass and r3_pass

    print("\n" + "=" * 70)
    print("FINAL INDEPENDENT AUDIT SUMMARY")
    print("=" * 70)
    print(f"R1 Content Volume (>1500 words): {'PASS' if r1_pass else 'FAIL'}")
    print(f"R2 South African Relevance:     {'PASS' if r2_pass else 'FAIL'}")
    print(f"R3 AdSense Readiness:           {'PASS' if r3_pass else 'FAIL'}")
    print(f"OVERALL VERDICT:                {'VICTORY CONFIRMED' if overall_pass else 'VICTORY REJECTED'}")
    print("=" * 70)


if __name__ == "__main__":
    main()
