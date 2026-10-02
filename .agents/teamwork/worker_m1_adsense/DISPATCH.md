# Dispatch for Worker M1: CSS & AdSense Layout Standardization

You are worker_m1_adsense.
Working directory: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m1_adsense/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md

Background reports to read:
- /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_2/handoff.md (Detailed CSS rules and DOM placement map)

Exclusive file ownership:
- `assets/css/styles.css`
- `index.html`
- `investment-goal-calculator.html`
- `retirement-calculator.html`
- `compare-investments.html`
- `blog/index.html`
- `blog/blog-template.html`
Do NOT touch the 6 individual blog articles in `blog/*.html` (they are owned by other workers).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. Update `assets/css/styles.css`:
   - Add `.ad-placeholder` support harmonized with `.ad-slot` (e.g. `.ad-placeholder, .ad-slot { ... }`).
   - Ensure explicit min-height reservations for CLS prevention (e.g. min-height 120px for leaderboard, 300px for rectangle, 140px for in-article, 330px for sticky sidebar, 350px for multiplex).
   - Ensure `max-width: 100%`, `overflow: hidden`, and clean editorial presentation.
   - Maintain the collapse rule when ads are unfilled in production:
     `.ad-slot:has(ins[data-ad-status="unfilled"]), .ad-placeholder:has(ins[data-ad-status="unfilled"]) { display: none; }`
2. Update the calculator pages with `class="ad-placeholder ad-slot ..."`:
   - `index.html`: Update the existing ad container in Grow tab to `class="ad-placeholder ad-slot ad-rectangle"`. Add `.ad-placeholder.ad-slot.ad-leaderboard` in natural visual pause locations for Goal tab (after breakdown metrics) and Compare tab (below winner box).
   - `investment-goal-calculator.html`: Update line ~164 to `class="ad-placeholder ad-slot ad-leaderboard"`.
   - `retirement-calculator.html`: Update line ~201 to `class="ad-placeholder ad-slot ad-leaderboard"`.
   - `compare-investments.html`: Update line ~202 to `class="ad-placeholder ad-slot ad-leaderboard"`.
3. Update blog hub & template:
   - `blog/index.html`: Update line ~107 to `class="ad-placeholder ad-slot ad-multiplex"`.
   - `blog/blog-template.html`: Ensure ad slots have `class="ad-placeholder ad-slot ..."`, including Break 1 (after 2nd h2), Break 2 (after mid-article table/content), and sidebar.
4. Verify all updated pages for HTML syntax, visual layout stability, and responsiveness.
5. Write your handoff report to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m1_adsense/handoff.md and report back via send_message.

## 2026-10-01T18:04:27Z
Received dispatch message:
You are worker_m1_adsense.
Working directory: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m1_adsense/
Project root: /Users/alikora/dev/AntiG/CompCalc
Authoritative user request: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/ORIGINAL_REQUEST.md
Project plan: /Users/alikora/dev/AntiG/CompCalc/PROJECT.md
Your dispatch instructions: /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m1_adsense/DISPATCH.md
Exclusive file ownership:
`assets/css/styles.css`, `index.html`, `investment-goal-calculator.html`, `retirement-calculator.html`, `compare-investments.html`, `blog/index.html`, `blog/blog-template.html`.
Do NOT touch `blog/*.html` articles.
Execute Milestone M1:
1. Update `assets/css/styles.css` with responsive `.ad-placeholder` rules, CLS prevention, min-height fallbacks, and collapse styles.
2. Update calculator pages and blog hub/template with `class="ad-placeholder ad-slot ..."` in natural ad break locations.
3. Verify CSS and HTML layout across desktop and mobile viewports.
4. Write handoff to /Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/worker_m1_adsense/handoff.md and report back via send_message.
