# Dispatch for Worker M2-A: Blog Expansion (Articles 2 & 3)

You are worker_m2_blogs_a.
Working directory: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_a/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md

Background reports to study:
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_1/handoff.md (Detailed expansion blueprint and component design)
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/spec_miner_survey_1/handoff.md (Accurate 2026 South African financial metrics)
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_2/handoff.md (Ad placeholder markup specifications)

Exclusive file ownership:
- `blog/rule-of-72.html`
- `blog/how-long-to-save-1-million-rand.html`
Do NOT modify any other files.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. Expand `blog/rule-of-72.html` to AT LEAST 1650 core words (excluding HTML tags):
   - Maintain the site's typography, palette, and CSS component structure (`.formula-block`, `.img-text-block`, `.table-wrap > table.blog-table`, `.callout`, `.faq-accordion`).
   - Add mathematical depth: Rule of 72 vs Rule of 70 vs Rule of 69.3, precision error tables at various interest rates (2% to 30%).
   - Add South African financial realities:
     * High-interest debt trap under the National Credit Act (credit cards up to 21.25%, unsecured personal loans up to 28.25% - debt doubling every 2.5 to 3.4 years).
     * Inflation erosion using Rule of 72 (CPI ~4.4%, SARB target band 3%-6% - halving purchasing power in ~16 years).
     * Compounding investment asset classes in ZAR: JSE ALSI (10.5%-12%), Balanced Funds (9%-10%), RSA Retail Bonds (8.5%-9.5%), Money Market / STeFI (7.5%-8.25%).
   - Add a 5-question interactive FAQ accordion (`.faq-accordion > .faq-item`).
   - Add Schema.org JSON-LD (`Article` and `FAQPage`).
   - Integrate 2 in-article ad placeholders (`class="ad-placeholder ad-slot ad-in-article"`) at natural break points (~30% and ~70%) and ensure sidebar ad has `class="ad-placeholder ad-slot ad-sidebar-sticky"`.
   - Update `.toc-list` and `<script id="toc-map" type="application/json">` to mirror all `<h2>` headings.

2. Expand `blog/how-long-to-save-1-million-rand.html` to AT LEAST 1650 core words (excluding HTML tags):
   - Maintain design system components: `.img-text-block`, `.scenario-card`, `.table-wrap > table.blog-table`, `.callout`, `.faq-accordion`.
   - Add comprehensive monthly contribution matrices (R500, R1,000, R2,500, R5,000, R10,000, R20,000) across 3 return profiles (Cash 7.5%, Balanced 9.5%, Equities/ETFs 11.5%).
   - Add in-depth section: "The First R100,000 is the Hardest" (mathematical breakdown demonstrating the shift from contribution-driven growth to compound-interest-driven growth).
   - Add South African local context:
     * Two-Pot Retirement System (effective September 2024: 1/3 Savings Pot vs 2/3 Retirement Pot) and why preserving compounding protects against retirement poverty.
     * Tax efficiency with Section 12T TFSAs (R36k/R46k annual limits) to grow R1,000,000 completely tax-free.
     * SARS interest exemption thresholds (R23,800 under 65, R34,500 65+) and capital gains tax rules.
   - Add a 5-question interactive FAQ accordion (`.faq-accordion > .faq-item`).
   - Add Schema.org JSON-LD (`Article` and `FAQPage`).
   - Integrate 2 in-article ad placeholders (`class="ad-placeholder ad-slot ad-in-article"`) and update sidebar ad to include `ad-placeholder`.
   - Update `.toc-list` and `<script id="toc-map" type="application/json">` to match all `<h2>` headings.

3. Verify word counts programmatically by writing and running a short check script. Ensure both files exceed 1600 words of clean text.
4. Verify HTML syntax and responsive rendering.
5. Write your handoff report to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_a/handoff.md and report back via send_message.

## 2026-10-01T18:04:27Z
[Message] timestamp=2026-10-01T18:04:27Z sender=f5869b68-300f-442a-8f5f-542634ccf79e priority=MESSAGE_PRIORITY_HIGH content=You are worker_m2_blogs_a.
Your working directory is /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_a/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md
Your dispatch instructions: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_a/DISPATCH.md

Read ORIGINAL_REQUEST.md, PROJECT.md, and DISPATCH.md.
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusive file ownership:
`blog/rule-of-72.html`, `blog/how-long-to-save-1-million-rand.html`.
Do NOT touch any other files.

Execute Expansion for Articles 2 & 3:
1. Expand `blog/rule-of-72.html` to >1650 core words (clean text without HTML tags) using South African financial data, debt calculations, inflation, formula comparison, 5-question FAQ, Schema.org, and dual in-article `.ad-placeholder` elements.
2. Expand `blog/how-long-to-save-1-million-rand.html` to >1650 core words using contribution matrices, "The First R100k is the Hardest" deep dive, Two-Pot retirement system, TFSA rules, 5-question FAQ, Schema.org, and dual in-article `.ad-placeholder` elements.
3. Synchronize TOC list and `#toc-map` JSON scripts.
4. Programmatically verify both files exceed 1600 core words.
5. Write handoff to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m2_blogs_a/handoff.md and report back via send_message.
