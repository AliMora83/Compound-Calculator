# Dispatch for E2E Test Suite Writer

You are test_writer_e2e.
Working directory: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/test_writer_e2e/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan & specifications: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md

Background reports to read:
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_1/handoff.md (Blog analysis & word counts)
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_2/handoff.md (Site layout & ad slot inventory)
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/spec_miner_survey_1/handoff.md (SA financial metrics & test specifications)

Exclusive file ownership:
- You own `/Users/alikora/dev/AntiG/CompCalc/tests/e2e/` (create runner and test files)
- You own `/Users/alikora/dev/AntiG/CompCalc/TEST_INFRA.md`
- You own `/Users/alikora/dev/AntiG/CompCalc/TEST_READY.md`
Do NOT modify any HTML or CSS files in the project.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. Read ORIGINAL_REQUEST.md and the survey handoff reports.
2. Create `TEST_INFRA.md` at project root adhering to the 4-tier methodology:
   - Tier 1: Feature Coverage (programmatic word counts >1500 for each of the 6 articles, ad-placeholder presence across all calculators and blogs)
   - Tier 2: Boundary & Corner Cases (exact HTML tag stripping, script/style exclusion, whitespace normalization, CSS class syntax, DOM nesting)
   - Tier 3: Cross-Feature Combinations (validity of ad-placeholder inside responsive layouts, TOC sync with h2 anchors, schema markup validity)
   - Tier 4: Real-World Scenarios (authoritative SA financial metrics presence: SARB repo rate, prime rate, CPI, JSE, TFSA, RA, ZAR currency context)
3. Implement an executable Python test runner `tests/e2e/run_tests.py` that can be run with `python3 tests/e2e/run_tests.py`:
   - Must output clear pass/fail status for each test tier.
   - Must evaluate the true programmatic word count (excluding HTML tags and non-content elements) for all 6 articles.
   - Must check for `.ad-placeholder` elements across calculator pages and blog articles.
   - Must verify the presence of authoritative South African financial data.
   - Must exit with code 0 if all tests pass, non-zero if any test fails.
4. Execute the test runner to establish baseline results (document current failures vs passes).
5. Publish `/Users/alikora/dev/AntiG/CompCalc/TEST_READY.md` summarizing the test runner command, tiers, test count, and baseline status.
6. Write your handoff report to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/test_writer_e2e/handoff.md and report back via send_message.

## 2026-10-01T18:04:27Z
You are test_writer_e2e.
Your working directory is /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/test_writer_e2e/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan & specifications: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md
Your dispatch instructions: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/test_writer_e2e/DISPATCH.md

Read ORIGINAL_REQUEST.md, PROJECT.md, and DISPATCH.md.
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Design the comprehensive E2E test suite:
1. Create /Users/alikora/dev/AntiG/CompCalc/TEST_INFRA.md using the 4-tier test case design methodology.
2. Build an executable Python test runner in `tests/e2e/run_tests.py` that verifies:
   - Programmatic word count (>1500 words excluding HTML tags) for each of the 6 blog articles in `blog/`.
   - Structural presence of `.ad-placeholder` elements across calculator pages and blog articles in natural ad-break locations.
   - Authoritative South African financial context and metrics (SARB repo rate, prime rate, CPI, JSE, TFSA, RA, ZAR currency context).
3. Run `python3 tests/e2e/run_tests.py` to document the initial baseline.
4. Publish /Users/alikora/dev/AntiG/CompCalc/TEST_READY.md.
5. Write your handoff to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/test_writer_e2e/handoff.md and report back via send_message.

