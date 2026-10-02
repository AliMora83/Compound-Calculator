# Execution Plan: AdSense Content Expansion & Structural Layout

## Mission
Expand 6 existing HTML blog articles in `blog/` to >1500 words each (excluding HTML tags) using up-to-date South African financial data, and integrate structural AdSense placeholders (`ad-placeholder` class) across calculators and blogs without breaking visual layout.

## Phase 0: Survey & Exploration
- Spawn Explorers to survey the project repository:
  - Identify all 6 blog articles in `blog/` (paths, existing word counts, structure, CSS styling, headings).
  - Identify all calculator pages and templates in the repository (paths, layout structure, natural ad insertion points).
  - Inspect existing CSS classes and styling to ensure `ad-placeholder` adheres to site look and feel.
- Formulate `PROJECT.md` with full architecture, feature inventory, code layout, and milestones.

## Phase 1: Dual Track Initiation
### Track A: E2E Testing Track
- Test infrastructure setup to automatically verify:
  - Programmatic word count for each of the 6 blog articles (>1500 words of text, tags stripped).
  - Presence of current South African financial terms and data points (repo rate, SARB, inflation, JSE, tax-free investment thresholds, ZAR).
  - Presence and validity of `ad-placeholder` divs across calculators and blogs without visual regression or broken layout.
- Publish `TEST_READY.md`.

### Track B: Implementation Track
- Milestone 1: South African Financial Data Synthesis
  - Current SARB repo rate & prime lending rate.
  - CPI / inflation metrics.
  - JSE historical/recent returns, ZAR exchange rates, Section 12T TFSA limits (R36k/annual, R500k/lifetime), retirement annuity tax deductions (s11F 27.5% up to R350k).
- Milestone 2: Blog Article Expansion
  - Articles expanded to 1500-2000+ words each with deep, high-value, locally relevant financial analysis.
  - Consistent typography, HTML formatting, tables, callout boxes, and links to calculators.
- Milestone 3: AdSense Placeholder Layout Integration
  - CSS definition for `.ad-placeholder` ensuring responsive, unobtrusive display.
  - Insertion into natural ad break points in calculator tools (header banner, sidebar/under-results, footer) and blog posts (in-article breaks).

## Phase 2: Verification & Audit Gate
- Run E2E Test Suite (100% passing).
- Independent Reviewers (APPROVE).
- Empirical Challengers (empirical verification of word counts, rendering, responsiveness).
- Forensic Integrity Auditor (clean verdict, no dummy/cheating content).

## Phase 3: Reporting & Victory Claim
- Synthesize all findings and evidence.
- Send completion message to parent caller with full victory claim.
