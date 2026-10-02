# Dispatch for Worker M2-B (Replacement / Gen 2)

You are worker_m2_blogs_b_gen2 (replacement worker for worker_m2_blogs_b).
Working directory: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_b_gen2/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md
E2E Test Specifications & Baseline: /Users/alikora/dev/AntiG/CompCalc/TEST_READY.md

Predecessor progress report:
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_b/progress.md
(Predecessor already added .ad-placeholder and 2nd in-article slot to Articles 1 & 4, but crashed before completing Articles 5 & 6 and full E2E pass).

Exclusive file ownership:
- `blog/maximize-compound-interest-monthly-savings.html`
- `blog/etfs-vs-traditional-savings-accounts.html`
- `blog/compound-interest-south-africa.html`
- `blog/tax-free-savings-account-calculator-south-africa.html`
Do NOT modify any other files.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. Expand `blog/maximize-compound-interest-monthly-savings.html` to AT LEAST 1650 core words (excluding HTML tags):
   - Upgrade typography & components: Add `.img-text-block`, wrap tables in `.table-wrap > table.blog-table`, add `.callout`.
   - Add mathematical analysis of annual contribution escalations (e.g. 5%, 8%, 10% annual escalation matching salary increases vs flat contributions over 20-30 years in ZAR).
   - Add practical SA banking & debit order automation strategies ("Pay Yourself First" via Capitec, FNB, Standard Bank, Nedbank, Investec).
   - Add in-depth analysis of ASISA Effective Annual Cost (EAC) fee drag: How 1%-2% extra in fees destroys 25%-35% of total accumulated wealth over a 30-year horizon.
   - Include benchmark comparison of JSE ALSI returns vs STeFI cash index.
   - Expand FAQ accordion to 5 detailed questions and verify Schema.org markup.
   - Integrate 2 in-article ad placeholders (`class="ad-placeholder ad-slot ad-in-article"`) and update sidebar ad to include `ad-placeholder`.
   - Update `.toc-list` and `<script id="toc-map" type="application/json">` to mirror all `<h2>` headings.

2. Expand `blog/etfs-vs-traditional-savings-accounts.html` to AT LEAST 1650 core words (excluding HTML tags):
   - Upgrade components: Add `.img-text-block`, wrap tables in `.table-wrap > table.blog-table`, add `.callout`.
   - Multi-decade South African performance: JSE Top 40 / ALSI index (Satrix 40, Sygnia Itrix Top 40) at ~11-12% nominal return vs STeFI cash index at ~7-8% nominal (and negative real returns after tax and inflation).
   - 2026 SARB Repo rate (7.25%) and Prime rate (10.75%), headline CPI (~4.4%) or SARB target band.
   - Tax drag analysis on traditional savings accounts: SARS interest exemption (Section 10(1)(i): R23,800 under 65, R34,500 65+) threshold breach and taxation at marginal rates (up to 45%) vs ETF capital gains tax benefits (40% inclusion, max 18% effective rate).
   - Complete Section 12T TFSA context (R36k statutory / R46k allowance and R500,000 lifetime limit).
   - Low-cost investing platforms in SA: EasyEquities, Shyft, SatrixNOW with low TERs (0.10%-0.35%) vs legacy retail unit trusts (2.0%-3.0% EAC).
   - Framework for cash emergency funds (3-6 months in high-yield money market / 32-day notice) vs ETF wealth generation (5+ years).
   - Expand FAQ accordion to 5 questions and verify Schema.org markup.
   - Integrate 2 in-article ad placeholders (`class="ad-placeholder ad-slot ad-in-article"`) and update sidebar ad to include `ad-placeholder`.
   - Update `.toc-list` and `<script id="toc-map" type="application/json">` to mirror all `<h2>` headings.

3. Complete any remaining requirements for `blog/compound-interest-south-africa.html` and `blog/tax-free-savings-account-calculator-south-africa.html`:
   - In `compound-interest-south-africa.html`: Ensure explicit 2026 SARB Repo (7.25%), Prime (10.75%), and Stats SA headline CPI (4.4%) references are included.
   - In `tax-free-savings-account-calculator-south-africa.html`: Ensure the `<h2>Summary</h2>` heading is present in `#toc-map`, and the Two-Pot Retirement System is explicitly referenced in the RA comparison section.
   - Ensure all ad containers in both files have `class="ad-placeholder ad-slot ..."`.

4. Run `python3 tests/e2e/run_tests.py` and verify all tests pass for your 4 files!
5. Write handoff to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_b_gen2/handoff.md and report back via send_message.
