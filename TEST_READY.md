# TEST_READY: CompoundCalc E2E Test Suite Specification & Baseline

## 1. Overview & Verification Readiness

The comprehensive E2E test suite for CompoundCalc has been fully designed, implemented, and verified in accordance with the 4-tier test case design methodology documented in `TEST_INFRA.md`.

- **Test Suite Location**: `tests/e2e/`
- **Primary Test Runner**: `tests/e2e/run_tests.py`
- **Total Test Cases**: **105 automated checks** across 4 discrete tiers
- **Execution Engine**: Pure standard Python (`python3`) with zero third-party package dependencies
- **Exit Code Contract**: Exits with code `0` on 100% pass; exits with code `1` if any test fails

---

## 2. Test Execution Commands

### Full Test Suite Run (All Tiers 1–4)
```bash
python3 tests/e2e/run_tests.py
```

### Tier-Specific Execution
```bash
# Execute only Tier 1 (Feature Coverage: Word Counts, Ad Placeholders, Scripts)
python3 tests/e2e/run_tests.py --tier 1

# Execute only Tier 2 (Boundary & Corner Cases: Tag Stripping, Entities, DOM Nesting)
python3 tests/e2e/run_tests.py --tier 2

# Execute only Tier 3 (Cross-Feature Combinations: TOC Synchronization, Schema)
python3 tests/e2e/run_tests.py --tier 3

# Execute only Tier 4 (Real-World Scenarios: Authoritative SA Financial Metrics)
python3 tests/e2e/run_tests.py --tier 4

# Execute combination of tiers
python3 tests/e2e/run_tests.py --tier 1,2
```

### Machine-Readable JSON Output
```bash
python3 tests/e2e/run_tests.py --json
```

---

## 3. Tier Architecture & Test Inventory

| Tier | Tier Name | Test Scope & Methodology | Test Count | Baseline Passed | Baseline Failed | Baseline Status |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **Tier 1** | **Feature Coverage** | Programmatic word count (>1,500 words per article) across all 6 blog articles; `.ad-placeholder` presence on 4 calculators, 6 blog posts, hub and template; AdSense async `<head>` script presence. | 28 | 26 | 2 | **FAIL** (Expected in M-E2E) |
| **Tier 2** | **Boundary & Corner Cases** | Tag stripping with attributes containing `>`, script/style/svg/comment exclusion, whitespace/entity normalization, exact CSS class token parsing, DOM nesting hierarchy validity, accessibility ARIA attributes. | 26 | 26 | 0 | **PASS** (100% SUCCESS) |
| **Tier 3** | **Cross-Feature Combinations** | H2 heading to sidebar `.toc-list` and `#toc-map` JSON synchronization; JSON-LD Schema.org (`Article`, `FAQPage`) validity; ad placeholder modifier classes; CSS `.ad-placeholder` rules in `styles.css`. | 25 | 22 | 3 | **FAIL** (Expected in M-E2E) |
| **Tier 4** | **Real-World Scenarios** | Authoritative 2026 South African financial metrics: SARB repo rate (7.25%), prime rate (10.75%), headline CPI (~4.4%), JSE ALSI vs cash STeFI, SARS Section 12T TFSA (R36k/R46k, R500k lifetime, 40% penalty), SARS Section 11F RA & Two-Pot System, ASISA EAC fee drag modeling, ZAR currency density. | 26 | 19 | 7 | **FAIL** (Expected in M-E2E) |
| **TOTAL** | **All 4 Tiers** | **Comprehensive E2E Quality Gate** | **105** | **93** | **12** | **BASELINE ESTABLISHED** |

---

## 4. Initial Baseline Diagnostic & Escalation Matrix

Execution of `python3 tests/e2e/run_tests.py` establishes the pre-expansion baseline (**93 PASS / 12 FAIL**). The 12 failing tests document the exact feature deficits to be resolved by the downstream implementation milestones:

### 1. Tier 1 Deficits (To be resolved in Milestone M2)
- `T1-WORD-etfs-vs-traditional-savings-accounts.html`: Word count is currently **1,020 words** (deficit: 480 words vs 1,500 threshold).
- `T1-AD-BLOG-etfs-vs-traditional-savings-accounts.html`: Missing required `.ad-placeholder` container.

### 2. Tier 3 Deficits (To be resolved in Milestone M3)
- `T3-TOC-SYNC-tax-free-savings-account-calculator-south-africa.html`: Heading `<h2>Summary</h2>` exists in body but is missing in `#toc-map`.
- `T3-TOC-SYNC-maximize-compound-interest-monthly-savings.html`: 5 newly added H2 headings (`The Step-Up Strategy`, `Dollar-Cost Averaging (DCA) on the JSE`, `Banking Automation`, `The Wealth Killer: ASISA EAC`, `Summary`) need mapping in `#toc-map` and `.toc-list`.
- `T3-TOC-SYNC-etfs-vs-traditional-savings-accounts.html`: Heading `<h2>Summary</h2>` exists in body but is missing in `#toc-map`.

### 3. Tier 4 Deficits (To be resolved in Milestones M2 & M3)
- `T4-SA-RATES-compound-interest-south-africa.html`: Missing explicit 2026 SARB Repo (7.25%) and Prime (10.75%) references.
- `T4-SA-RATES-etfs-vs-traditional-savings-accounts.html`: Missing explicit 2026 SARB Repo (7.25%) and Prime (10.75%) references.
- `T4-SA-CPI-compound-interest-south-africa.html`: Missing Stats SA headline CPI (4.4%) or SARB target band reference.
- `T4-SA-CPI-etfs-vs-traditional-savings-accounts.html`: Missing Stats SA headline CPI (4.4%) or SARB target band reference.
- `T4-SA-JSE-maximize-compound-interest-monthly-savings.html`: Missing explicit STeFI cash index comparison benchmark.
- `T4-SA-TFSA-etfs-vs-traditional-savings-accounts.html`: Needs complete Section 12T limit context (R36k/R46k and R500k lifetime).
- `T4-SA-TWOPOT-tax-free-savings-account-calculator-south-africa.html`: Needs explicit Two-Pot System reference in the RA comparison section.

---

## 5. Verification Gate Criteria for Milestone M4

For the orchestrator to declare Milestone M4 (Final Milestone: 100% E2E Pass) complete:
1. Run `python3 tests/e2e/run_tests.py`
2. Assert **exit code 0**
3. Verify output reports:
   ```
   Total: 105 tests | Passed: 105 | Failed: 0
   Overall Result: PASSED (100% SUCCESS)
   ```
