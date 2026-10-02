# Original User Request

## Initial Request — 2026-10-01T17:55:40Z

Expand six existing blog posts to over 1500 words each to resolve a Google AdSense "thin content" rejection, using up-to-date South African financial data, and prepare the site layout for AdSense integration.

Working directory: /Users/alikora/dev/AntiG/CompCalc
Integrity mode: development

## Requirements

### R1. Expand Blog Articles
Expand the 6 existing HTML blog articles in the `blog/` directory to at least 1500 words each. The expansion must maintain the current HTML structure and styling, adding new sections seamlessly.

### R2. Use Live South African Data
Use web search to gather current South African financial statistics, interest rates, and market data to ensure the expanded content is highly relevant, original, and authoritative.

### R3. AdSense Preparation
Integrate structural placeholders across the site (both the calculators and blogs) to ensure a seamless layout once AdSense is activated.

## Acceptance Criteria

### Content Volume
- [ ] A programmatic word count of the text content (excluding HTML tags) for all 6 articles in `blog/` must evaluate to > 1500 words per article.

### Content Quality & Relevance
- [ ] An independent reviewer must confirm that the new content contains specific, up-to-date references to the South African financial context (e.g., current repo rates, local index performance, ZAR values).

### AdSense Readiness
- [ ] The HTML files must contain clear placeholder elements (e.g., dedicated `div`s with an `ad-placeholder` class) in natural ad-break locations, without breaking the visual layout.
