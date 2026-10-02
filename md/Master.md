# CompoundCalc — Master Project Document

**Site:** [compoundcalc.co.za](https://compoundcalc.co.za)  
**Repo:** [github.com/AliMora83/Compound-Calculator](https://github.com/AliMora83/Compound-Calculator)  
**Stack:** Vanilla HTML · CSS · JavaScript (no framework)  
**Hosting:** Netlify  
**Last Updated:** October 2026  

---

## 1. Product Overview

**CompoundCalc** is a free, fast, and production-ready financial calculator suite designed specifically for South African retail investors. Built with vanilla web technologies for maximum performance and SEO visibility, the platform helps users visualize the power of compounding and plan their financial futures.

**Core Features:**
- **Compound Interest Calculator:** Projects growth with monthly contributions, inflation adjustments, and multiple currencies (focusing heavily on ZAR). Features dynamic charts and milestone badges (e.g., "2x your money in Year X").
- **Investment Goal Calculator:** Allows users to reverse-engineer their savings plan to find out exactly how much they need to contribute monthly to hit a target.
- **Compare Investments:** A side-by-side comparison tool for evaluating two different financial scenarios simultaneously.
- **Retirement Calculator:** Helps users plan for long-term retirement goals.
- **Financial Blog (SEO Engine):** A dedicated `/blog/` hub featuring in-depth, long-form content tailored to the South African context (e.g., Rule of 72, TFSAs, ETFs) to drive organic traffic and support ad monetization.

---

## 2. Recently Completed (October 2026)

We recently executed a massive sprint to resolve a Google AdSense "thin content" rejection and prepare the site for monetization.

- **Blog Content Expansion (SEO & Monetization Push):** 
  - Expanded all 6 existing blog articles from a baseline of ~7,500 total words to nearly **17,000 words**.
  - Every article now strictly exceeds the **1,500-word target**, packed with highly relevant 2026 South African financial data (SARB repo rate at 7.25%, CPI inflation at 4.4%, JSE vs STeFI benchmarks, and the new Two-Pot retirement rules).
  - *Articles expanded:* Compound Interest, ETFs vs Savings Accounts, Saving R1 Million, Maximizing Monthly Savings, Rule of 72, and TFSA.
- **AdSense Architecture & Layout Preparation:**
  - Standardized `.ad-placeholder` and `.ad-slot` CSS classes with explicit min-height reservations (120px–350px) to prevent Cumulative Layout Shift (CLS) and maintain excellent Core Web Vitals.
  - Deployed **28 responsive ad placement slots** across all 4 calculator pages and the 6 blog articles in natural reading breakpoints.
  - Successfully ran a 105-test suite ensuring word counts and layout stability.

---

## 3. Possible Upgrades & Roadmap

### A. Near-Term (Monetization & Traffic)
- **Activate AdSense:** Once Google approves the site, inject the actual AdSense publisher script tag into the `<head>` of the site so Auto Ads can populate the new placeholders.
- **SEO Metadata Audit:** Review and optimize the `<title>` and `<meta description>` tags of the newly expanded blog posts to ensure they rank high for local South African search intent.
- **Internal Linking Strategy:** Programmatically link keywords in the blog posts (e.g., "compound interest", "retirement") directly back to the specific calculators to drive user engagement.

### B. Medium-Term (Features & UX)
- **New Calculators:** Build a "Two-Pot System Retirement Withdrawer" calculator or a "Home Loan / Bond Repayment" calculator, as these are highly searched topics in SA.
- **PDF Export / Lead Magnet Revamp:** Enhance the existing `jsPDF` email capture flow to offer a branded "Financial Freedom Blueprint" in exchange for user emails.
- **Dark Mode:** Implement a CSS variable-based dark theme, which is highly requested by users spending a lot of time analyzing data.

### C. Long-Term (Platform Evolution)
- **Progressive Web App (PWA):** Add a manifest and service worker so users can "install" the calculator directly to their phone's home screen for offline use.
- **User Accounts (Firebase / Supabase):** Transition from a static site to an authenticated app where users can save their scenarios, track real-time portfolio growth, and unlock premium tier insights.
