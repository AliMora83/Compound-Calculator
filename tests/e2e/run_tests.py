#!/usr/bin/env python3
"""CompoundCalc Comprehensive E2E Test Suite Runner.

Executes all 4 test tiers:
- Tier 1: Feature Coverage (Word counts >1500, ad placeholders, head scripts)
- Tier 2: Boundary & Corner Cases (HTML stripping, whitespace normalization, DOM nesting)
- Tier 3: Cross-Feature Combinations (TOC sync, JSON-LD schema, CSS architecture)
- Tier 4: Real-World Scenarios (Authoritative South African financial metrics)

Usage:
    python3 tests/e2e/run_tests.py [--tier 1,2,3,4] [--verbose] [--json]

Exit codes:
    0: All executed tests passed
    1: One or more tests failed
"""

import argparse
import json
import os
import sys
import time
from typing import Any, Dict, List

# Ensure package imports work regardless of working directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "../.."))

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from tests.e2e.tier1_feature_coverage import run_tier1_tests
from tests.e2e.tier2_boundary_corner import run_tier2_tests
from tests.e2e.tier3_cross_feature import run_tier3_tests
from tests.e2e.tier4_real_world import run_tier4_tests

# Terminal color codes (safe with fallback)
USE_COLOR = sys.stdout.isatty() and os.name != "nt"
GREEN = "\033[92m" if USE_COLOR else ""
RED = "\033[91m" if USE_COLOR else ""
YELLOW = "\033[93m" if USE_COLOR else ""
CYAN = "\033[96m" if USE_COLOR else ""
BOLD = "\033[1m" if USE_COLOR else ""
RESET = "\033[0m" if USE_COLOR else ""


def print_header(title: str):
    width = 76
    print(f"\n{CYAN}{'=' * width}{RESET}")
    print(f"{BOLD}{title.center(width)}{RESET}")
    print(f"{CYAN}{'=' * width}{RESET}")


def format_status(passed: bool) -> str:
    if passed:
        return f"{GREEN}[PASS]{RESET}"
    return f"{RED}[FAIL]{RESET}"


def run_suite(tiers_to_run: List[int], verbose: bool = False) -> Dict[str, Any]:
    start_time = time.time()
    results_by_tier: Dict[int, List[Dict[str, Any]]] = {1: [], 2: [], 3: [], 4: []}

    print_header("COMPOUNDCALC E2E VERIFICATION TEST SUITE")
    print(f"Project Root: {PROJECT_ROOT}")
    print(f"Executing Tiers: {', '.join(str(t) for t in tiers_to_run)}")

    # Tier 1
    if 1 in tiers_to_run:
        print(f"\n{BOLD}── Tier 1: Feature Coverage (Word Counts, Ad Placeholders, Scripts) ──{RESET}")
        tier1_results = run_tier1_tests(PROJECT_ROOT)
        results_by_tier[1] = tier1_results
        for r in tier1_results:
            status = format_status(r["passed"])
            print(f"  {status} {r['id']:<28} {r['target']:<40} {r['message']}")

    # Tier 2
    if 2 in tiers_to_run:
        print(f"\n{BOLD}── Tier 2: Boundary & Corner Cases (Parser Rigor & DOM Hierarchy) ──{RESET}")
        tier2_results = run_tier2_tests(PROJECT_ROOT)
        results_by_tier[2] = tier2_results
        for r in tier2_results:
            status = format_status(r["passed"])
            print(f"  {status} {r['id']:<28} {r['target']:<40} {r['message']}")

    # Tier 3
    if 3 in tiers_to_run:
        print(f"\n{BOLD}── Tier 3: Cross-Feature Combinations (TOC Sync, Schema, CSS Rules) ──{RESET}")
        tier3_results = run_tier3_tests(PROJECT_ROOT)
        results_by_tier[3] = tier3_results
        for r in tier3_results:
            status = format_status(r["passed"])
            print(f"  {status} {r['id']:<28} {r['target']:<40} {r['message']}")

    # Tier 4
    if 4 in tiers_to_run:
        print(f"\n{BOLD}── Tier 4: Real-World Scenarios (Authoritative SA Financial Metrics) ──{RESET}")
        tier4_results = run_tier4_tests(PROJECT_ROOT)
        results_by_tier[4] = tier4_results
        for r in tier4_results:
            status = format_status(r["passed"])
            print(f"  {status} {r['id']:<28} {r['target']:<40} {r['message']}")

    duration = time.time() - start_time

    # Summary calculations
    total_tests = 0
    total_passed = 0
    total_failed = 0
    tier_summaries = {}

    for tier_num in tiers_to_run:
        t_res = results_by_tier[tier_num]
        t_count = len(t_res)
        t_pass = sum(1 for x in t_res if x["passed"])
        t_fail = t_count - t_pass
        total_tests += t_count
        total_passed += t_pass
        total_failed += t_fail
        tier_summaries[tier_num] = {
            "total": t_count,
            "passed": t_pass,
            "failed": t_fail,
            "status": "PASS" if t_fail == 0 else "FAIL",
        }

    overall_passed = total_failed == 0

    print_header("TEST SUITE EXECUTION SUMMARY")
    print(f"{'Tier':<10} {'Name':<35} {'Passed':<10} {'Failed':<10} {'Status':<10}")
    print("-" * 76)

    tier_names = {
        1: "Feature Coverage (Req AC)",
        2: "Boundary & Corner Cases",
        3: "Cross-Feature Combinations",
        4: "Real-World SA Financial Data",
    }

    for tier_num in tiers_to_run:
        s = tier_summaries[tier_num]
        st_color = GREEN if s["status"] == "PASS" else RED
        print(
            f"Tier {tier_num:<5} {tier_names.get(tier_num, ''):<35} "
            f"{s['passed']:<10} {s['failed']:<10} "
            f"{st_color}{s['status']:<10}{RESET}"
        )

    print("-" * 76)
    final_status_str = f"{GREEN}PASSED (100% SUCCESS){RESET}" if overall_passed else f"{RED}FAILED ({total_failed} FAILING TESTS){RESET}"
    print(f"Total: {total_tests} tests | Passed: {total_passed} | Failed: {total_failed} | Time: {duration:.2f}s")
    print(f"Overall Result: {final_status_str}\n")

    return {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "duration_seconds": round(duration, 3),
        "overall_passed": overall_passed,
        "total_tests": total_tests,
        "total_passed": total_passed,
        "total_failed": total_failed,
        "tier_summaries": tier_summaries,
        "results_by_tier": results_by_tier,
    }


def main():
    parser = argparse.ArgumentParser(description="CompoundCalc E2E Test Suite Runner")
    parser.add_argument(
        "--tier",
        type=str,
        default="1,2,3,4",
        help="Comma-separated tier numbers to execute (e.g. 1,2,3,4)",
    )
    parser.add_argument("--verbose", action="store_true", help="Enable verbose diagnostics")
    parser.add_argument("--json", action="store_true", help="Output summary in JSON format")

    args = parser.parse_args()

    try:
        tiers = [int(t.strip()) for t in args.tier.split(",") if t.strip()]
    except ValueError:
        print(f"{RED}Invalid --tier argument. Expected comma-separated integers (e.g. 1,2,3,4){RESET}")
        sys.exit(2)

    suite_summary = run_suite(tiers, verbose=args.verbose)

    if args.json:
        print(json.dumps(suite_summary, indent=2))

    sys.exit(0 if suite_summary["overall_passed"] else 1)


if __name__ == "__main__":
    main()
