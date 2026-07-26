# CompoundCalc — Product Roadmap
**Updated: 23 July 2026 · Structure: Phases → Sprints · Owner: Ali (solo)**

**Duty legend:**
- **Claude (this chat):** strategy, specs, drafts, briefs, QA checklists — planning layer
- **Ali + Claude Code:** all code execution, commits, deploys
- **Ali (admin):** accounts, applications, dashboards, publishing, final review

Sprint numbering continues the Master.md history (Sprints 1–10 complete).

---

## Status Overview

Site live: 3 calculators (+ retirement page), 6 indexed articles, secured email capture, GA4, EasyEquities affiliate. **Sprint 11 design overhaul: SHIPPED** — Phases A–C landed 19–21 July (`18279eb`, `f430ac1`, `5641c4f`), completion delta (icon sprite, button consolidation) landed 25 July (Sprint 11.1). **Blockers:** AdSense rejected on content depth — Sprint 12 writing stream is the unblock.

**Capacity rule:** One code sprint + one writing stream in parallel, max. Writing never blocks code.

---

## PHASE 1 — Editorial Foundation & Revenue Unblock *(NOW: July–August)*

The design system base plus the AdSense fix. Nothing new gets built until this phase is done.

### Sprint 11 — Design Tokens & Base Restyle
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Phase 1 token spec (done — includes Fraunces self-host, CSS tokens, legacy aliases) | ✅ Written | | |
| Add to spec: 2-button system (`.btn-primary` / `.btn-secondary`), line-icon SVG sprite, green/paper contrast check | ✅ Written (Sprint11.1-Delta) | | |
| Execute: tokens, fonts, base elements, retire gradient results panel, buttons, icon sprite | | ✅ DONE (Phases A–C + Sprint 11.1) | |
| QA: visual regression, Lighthouse, contrast, focus states, mobile 360px | ✅ Checklist in spec | ✅ Run (contrast 7.5:1, focus-visible added) | Final visual review on live site — pending |

### Sprint 12 — Article Depth Expansion (parallel writing stream)
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Expansion briefs for all 6 articles (target depth, new sections, FAQ schema, internal links) | Write briefs + full draft copy in brand voice | | Review + edit drafts |
| Update article HTML (copy, JSON-LD, meta, sitemap lastmod) | Provide exact HTML blocks | 🟡 2 of 6 done — 12.1 compound-interest, 12.2 TFSA (12.1b absorbed into 12.2, not run separately) | |
| Verify indexing | | | Request recrawl in Search Console — pending |

**Phase 1 exit criteria:** Tokens live site-wide, ≥4 of 6 articles expanded and recrawled.

---

## PHASE 2 — Design Completion *(August–September)*

### Sprint 13 — Nav, Footer, Logo, Hero
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Sprint spec incl. cookie banner restyle + emoji→icon swaps in these components + selector guardrail list | Write spec | | |
| Execute + deploy | | ✅ | |
| QA + mobile checks | Checklist | Run | Review live |

### Sprint 14 — Calculator Page (the big one)
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Spec: editorial results block, chart palette, **conversion re-sequence** (results → milestones → email → affiliate), scroll-gate on email trigger, table default-open 10 rows, button demotion (Clear/Share), email form restyle, internal links to blog *(both bundled bug fixes — `switchTab()` data-tab refactor, `clearInputs()` defaults — already landed in Sprint 11C; removed from this scope)* | Write spec | | |
| Execute + deploy | | ✅ | |
| Functional QA: PDF export, email capture, GA4 events, share URLs all still fire | Checklist | Run + verify in GA4 DebugView | Confirm test email received |

### Sprint 15 — Blog Restyle
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Spec: typographic cards (replace AI images), article template, share-button icons | Write spec | | |
| Execute + deploy | | ✅ | |

**Phase 2 exit criteria:** Full site coherent in editorial style; conversion stack re-sequenced. → **Ali (admin): resubmit AdSense** once articles have been indexed 2–4 weeks.

---

## PHASE 3 — Bond Repayment Calculator *(September–October)*

Hard rule: tool and supporting articles ship the same day.

### Sprint 16 — Bond Calculator Build
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| Full implementation spec: 3 panels (repayment, affordability, extra payments), ZAR formatting, share URLs, PDF, email capture, GA4, ooba/BetterBond CTA placeholders, selector guardrails | Write spec | | |
| Execute + deploy (behind no-index until content ready) | | ✅ | |

### Sprint 17 — Bond Content & Launch
| Task | Claude | Ali + Claude Code | Ali (admin) |
|---|---|---|---|
| 2–3 bond/home-loan articles: full drafts, SEO metadata, schema, sitemap entries | Write | Insert + deploy | Review, publish, submit sitemap |
| Najia_Os launch posts (first-person voice per brand guidelines) | Draft captions + image prompts | | Generate + schedule |
| Micro-task: eToro SA affiliate application | | | 15 min, any Friday |

**Phase 3 exit criteria:** Bond calculator + articles live and indexed; GA4 tracking confirmed.

---

## PHASE 4 — Growth & Partnerships *(Q4, trigger-gated)*

| Item | Trigger | Claude | Ali |
|---|---|---|---|
| 10X Investments pitch (drafted) | GA4 shows citable monthly sessions | Finalise email with real numbers | Send + manage relationship |
| ooba/BetterBond direct pitch | 2–3 months bond calculator traffic | Draft pitch with traffic data | Send |
| Retirement Calculator (Tab 4, spec written) | Bond calculator shows traffic | Refresh spec to editorial system | Execute via Claude Code |
| White-label SaaS exploration | Monetisation layers 1–3 proven | Market/pricing brief | Decision |

---

## Key Dependencies

- **AdSense ← article depth ← Sprint 12.** Protect the writing stream above all else.
- **Bond SEO value ← Sprint 17 shipping with Sprint 16.** Never launch the bare tool.
- **Partnership pitches ← traffic data.** Premature outreach burns the one shot at a direct deal.
- **Sprint 14 is the bundling moment:** conversion re-sequence + internal links in one diff (the two known bugs already landed in Sprint 11C).

## Changes This Update

- Restructured to numbered Phases containing Sprints (11–17), continuing Master.md numbering
- Per-sprint duty split: Claude (specs/drafts) vs Ali + Claude Code (execution) vs Ali (admin)
- Design decisions folded in: 2-button system and icon sprite now Sprint 11 scope; emoji swaps and cookie banner in Sprint 13; conversion re-sequence in Sprint 14
- AdSense resubmission pinned to Phase 2 exit
