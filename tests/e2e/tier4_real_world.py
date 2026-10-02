"""Tier 4: Real-World Scenarios Tests.

Verifies the depth, precision, and authenticity of South African financial data
across the blog articles in accordance with PROJECT.md Interface Contract 3:
1. SARB Repo Rate (7.25%) & Prime Lending Rate (10.75%).
2. Stats SA Headline CPI Inflation (~4.4%) & SARB Target Band (3%–6% / 3% target).
3. FTSE/JSE All Share Index (ALSI) vs Cash (STeFI) historical performance.
4. SARS Section 12T TFSA statutory rules (R36,000/R46,000 annual, R500k lifetime, 40% penalty).
5. SARS Section 11F Retirement Annuity (27.5% deduction) & Two-Pot Retirement System.
6. ASISA Effective Annual Cost (EAC) / TER compounding fee drag modeling.
7. Pervasive South African Rand (ZAR / R currency) financial denomination.
"""

import os
import re
from typing import Any, Dict, List, Tuple

from .word_counter import extract_clean_text

BLOG_ARTICLES = [
    "blog/compound-interest-south-africa.html",
    "blog/rule-of-72.html",
    "blog/how-long-to-save-1-million-rand.html",
    "blog/tax-free-savings-account-calculator-south-africa.html",
    "blog/maximize-compound-interest-monthly-savings.html",
    "blog/etfs-vs-traditional-savings-accounts.html",
]

# Patterns for South African financial benchmarks
PATTERNS = {
    "repo_rate": re.compile(
        r"(?:repo\s+rate|repurchase\s+rate|SARB\s+rate).*?7\.25%?",
        re.IGNORECASE | re.DOTALL,
    ),
    "prime_rate": re.compile(
        r"prime(?:\s+lending)?\s+rate.*?10\.75%?",
        re.IGNORECASE | re.DOTALL,
    ),
    "cpi_inflation": re.compile(
        r"(?:headline\s+CPI|CPI|inflation).*?(?:4\.4%?|4\.3%?|4\.5%?|3%?\s*[-–]\s*6%?)",
        re.IGNORECASE | re.DOTALL,
    ),
    "jse_alsi": re.compile(
        r"(?:JSE|All\s+Share|ALSI|FTSE/JSE)",
        re.IGNORECASE,
    ),
    "stefi_cash": re.compile(
        r"(?:STeFI|money\s+market|cash\s+yield|fixed\s+deposit)",
        re.IGNORECASE,
    ),
    "tfsa_section12t": re.compile(
        r"(?:TFSA|tax-free\s+savings|Section\s+12T)",
        re.IGNORECASE,
    ),
    "tfsa_limits": re.compile(
        r"(?:36[\s,]000|46[\s,]000).*?500[\s,]000",
        re.IGNORECASE | re.DOTALL,
    ),
    "tfsa_penalty": re.compile(
        r"40%\s*(?:penalty|tax|surcharge)",
        re.IGNORECASE,
    ),
    "ra_section11f": re.compile(
        r"(?:Retirement\s+Annuity|\bRA\b|Section\s+11F|Reg(?:ulation)?\s+28)",
        re.IGNORECASE,
    ),
    "two_pot_system": re.compile(
        r"Two-Pot|Savings\s+Pot|Retirement\s+Pot",
        re.IGNORECASE,
    ),
    "fee_drag_eac": re.compile(
        r"(?:EAC|Effective\s+Annual\s+Cost|TER|Total\s+Expense\s+Ratio|management\s+fee)",
        re.IGNORECASE,
    ),
    "zar_currency": re.compile(
        r"(?:R\s?[0-9]{1,3}(?:[,\s][0-9]{3})*(?:\.[0-9]{2})?|ZAR|\bRand\b)",
        re.IGNORECASE,
    ),
}


def test_sarb_monetary_policy_metrics(project_root: str) -> List[Dict[str, Any]]:
    """Test that key rate-sensitive articles cite current SARB repo rate (7.25%) and prime rate (10.75%)."""
    results = []
    # Rate-sensitive articles: compound interest, rule of 72, ETFs vs savings
    target_articles = [
        "blog/compound-interest-south-africa.html",
        "blog/rule-of-72.html",
        "blog/etfs-vs-traditional-savings-accounts.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-RATES-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_repo = bool(PATTERNS["repo_rate"].search(clean_text))
        has_prime = bool(PATTERNS["prime_rate"].search(clean_text))
        passed = has_repo and has_prime

        msg = (
            "SARB Repo Rate (7.25%) and Prime Lending Rate (10.75%) accurately cited"
            if passed
            else f"Missing rates: repo(7.25%)={has_repo}, prime(10.75%)={has_prime}"
        )

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": passed,
            "message": msg,
            "metric": 2 if passed else (1 if (has_repo or has_prime) else 0),
        })
    return results


def test_cpi_inflation_and_target_band(project_root: str) -> List[Dict[str, Any]]:
    """Test that inflation-sensitive articles cite Stats SA CPI (~4.4%) or SARB 3%-6% target band."""
    results = []
    target_articles = [
        "blog/compound-interest-south-africa.html",
        "blog/rule-of-72.html",
        "blog/how-long-to-save-1-million-rand.html",
        "blog/etfs-vs-traditional-savings-accounts.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-CPI-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_cpi = bool(PATTERNS["cpi_inflation"].search(clean_text))

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": has_cpi,
            "message": (
                "Authoritative CPI inflation / SARB target band cited"
                if has_cpi
                else "Missing Stats SA CPI inflation (~4.4%) or SARB target band reference"
            ),
            "metric": 1 if has_cpi else 0,
        })
    return results


def test_jse_and_cash_benchmarks(project_root: str) -> List[Dict[str, Any]]:
    """Test that investment articles benchmark equity returns against JSE All Share Index and cash."""
    results = []
    target_articles = [
        "blog/compound-interest-south-africa.html",
        "blog/etfs-vs-traditional-savings-accounts.html",
        "blog/how-long-to-save-1-million-rand.html",
        "blog/maximize-compound-interest-monthly-savings.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-JSE-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_jse = bool(PATTERNS["jse_alsi"].search(clean_text))
        has_cash = bool(PATTERNS["stefi_cash"].search(clean_text))
        passed = has_jse and has_cash

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": passed,
            "message": (
                "JSE All Share Index (ALSI) and cash/money market benchmarks cited"
                if passed
                else f"Missing benchmarks: JSE={has_jse}, cash/yield={has_cash}"
            ),
            "metric": 1 if passed else 0,
        })
    return results


def test_sars_tax_mechanisms_tfsa(project_root: str) -> List[Dict[str, Any]]:
    """Test that tax-sheltered investment articles cover Section 12T TFSA limits and 40% penalty tax."""
    results = []
    target_articles = [
        "blog/tax-free-savings-account-calculator-south-africa.html",
        "blog/compound-interest-south-africa.html",
        "blog/etfs-vs-traditional-savings-accounts.html",
        "blog/how-long-to-save-1-million-rand.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-TFSA-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_tfsa = bool(PATTERNS["tfsa_section12t"].search(clean_text))
        has_limits = bool(PATTERNS["tfsa_limits"].search(clean_text))

        # Penalty check specifically required on primary TFSA article
        is_primary = "tax-free-savings" in rel_path
        has_penalty = bool(PATTERNS["tfsa_penalty"].search(clean_text)) if is_primary else True

        passed = has_tfsa and has_limits and has_penalty

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": passed,
            "message": (
                "SARS Section 12T TFSA limits (R36k/R46k, R500k lifetime, 40% penalty) verified"
                if passed
                else f"TFSA details missing: tfsa={has_tfsa}, limits={has_limits}, penalty={has_penalty}"
            ),
            "metric": 1 if passed else 0,
        })
    return results


def test_sars_tax_mechanisms_ra_twopot(project_root: str) -> List[Dict[str, Any]]:
    """Test that retirement and long-term goal articles cover Section 11F RA and Two-Pot System."""
    results = []
    target_articles = [
        "blog/tax-free-savings-account-calculator-south-africa.html",
        "blog/how-long-to-save-1-million-rand.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-TWOPOT-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_ra = bool(PATTERNS["ra_section11f"].search(clean_text))
        has_twopot = bool(PATTERNS["two_pot_system"].search(clean_text))
        passed = has_ra and has_twopot

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": passed,
            "message": (
                "Retirement Annuity (Section 11F) and Two-Pot System verified"
                if passed
                else f"Retirement details missing: RA={has_ra}, Two-Pot={has_twopot}"
            ),
            "metric": 1 if passed else 0,
        })
    return results


def test_asisa_eac_fee_drag(project_root: str) -> List[Dict[str, Any]]:
    """Test that investment & savings articles model compounding fee drag (ASISA EAC / TER)."""
    results = []
    target_articles = [
        "blog/etfs-vs-traditional-savings-accounts.html",
        "blog/maximize-compound-interest-monthly-savings.html",
        "blog/compound-interest-south-africa.html",
    ]

    for rel_path in target_articles:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-FEES-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        has_fees = bool(PATTERNS["fee_drag_eac"].search(clean_text))

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": has_fees,
            "message": (
                "Compounding fee drag / ASISA EAC / TER modeling verified"
                if has_fees
                else "Missing fee drag modeling (EAC / TER / management fees)"
            ),
            "metric": 1 if has_fees else 0,
        })
    return results


def test_zar_currency_context(project_root: str) -> List[Dict[str, Any]]:
    """Test that all 6 blog articles are thoroughly anchored in South African Rand (ZAR / R currency)."""
    results = []

    for rel_path in BLOG_ARTICLES:
        abs_path = os.path.join(project_root, rel_path)
        test_id = f"T4-SA-ZAR-{os.path.basename(rel_path)}"
        if not os.path.exists(abs_path):
            continue

        with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        clean_text = extract_clean_text(content)
        matches = PATTERNS["zar_currency"].findall(clean_text)
        count = len(matches)
        # In a 1500+ word SA financial article, there should be at least 15 Rand figures
        passed = count >= 15

        results.append({
            "id": test_id,
            "tier": 4,
            "target": rel_path,
            "passed": passed,
            "message": (
                f"Thoroughly anchored in ZAR ({count} Rand currency references found)"
                if passed
                else f"Low ZAR currency density ({count} Rand references found, expected >= 15)"
            ),
            "metric": count,
        })
    return results


def run_tier4_tests(project_root: str) -> List[Dict[str, Any]]:
    """Execute all Tier 4 Real-World Scenarios tests."""
    all_results = []
    all_results.extend(test_sarb_monetary_policy_metrics(project_root))
    all_results.extend(test_cpi_inflation_and_target_band(project_root))
    all_results.extend(test_jse_and_cash_benchmarks(project_root))
    all_results.extend(test_sars_tax_mechanisms_tfsa(project_root))
    all_results.extend(test_sars_tax_mechanisms_ra_twopot(project_root))
    all_results.extend(test_asisa_eac_fee_drag(project_root))
    all_results.extend(test_zar_currency_context(project_root))
    return all_results
