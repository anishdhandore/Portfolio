# Design References — Portfolio Redesign

Notes from reviewing two reference sites (Nov 5, 2026) for the portfolio rebuild.
Goal: move from "new grad / student portfolio" to "founder / product company" feel.

Screenshots live in [`design-references/`](design-references/). Fonts, colors, and
sizes below were read from the live pages' computed styles, not guessed.

---

## 1. milan.us — the primary reference

**Stack:** Next.js (Turbopack build), Tailwind. No GSAP or Lenis detected — motion is
CSS + likely Motion/React (71 elements carry inline `transform` styles).

### Positioning
A business analyst who presents like a product engineer. Every project is treated as a
**named product with its own brand** (Caelis, Takeover, Countersign, Driftless, Circa,
4TH…), not a "project". Current role is "Lead product engineer, The Neural Horn".

### Page structure
| # | Section | Notes |
|---|---------|-------|
| 1 | Sticky header | `MILAN PATEL` left · `WORK  ABOUT  CV` centered · black pill email button right. All caps, 16px/600. |
| 2 | Hero | Portrait (B&W illustration, circle) left; giant 2-line title right ("Business / Analyst"); 2 short paragraphs; one-line availability ("Open to Business Analyst roles."). |
| 3 | Mockup band | Full-bleed **black rounded panel (64px radius)** with a row of phone mockups for different products, each with its own brand color and tagline. |
| 4 | Featured work | Huge sticky title "Featured work" (208px) pinned full-screen with "(SCROLL TO EXPLORE)" — product screenshot cards **float up past it, alternating left/right**, overlapping the type. |
| 5 | About | Short story → **dated timeline**: date range left column, `Company, Role.` + location (gray) + one sentence right column. |
| 6 | CTA | Hairline divider, then giant centered "Let's talk about your next hire." + email pill. |
| 7 | Footer | `LI  GH  X  CV` as gray text abbreviations left, `MILAN PATEL © 2026` right. |

Screens: `milan-hero.png`, `milan-mockups.png`, `milan-featured-work.png`,
`milan-timeline.png`, `milan-cta.png`

### Typography
| Role | Font | Size | Weight | Tracking |
|------|------|------|--------|----------|
| Display (h1/h2) | **Inter Tight** | 127px (h1), 208px (Featured work) | 500 | **-3% (≈ -3.8px / -6.2px)**, line-height 1.0 |
| Body / lead | Inter | 20px lead, 16px body | 500 / 400 | normal |
| Nav, buttons, labels | Inter | 16px | 600 | normal, **UPPERCASE** |

Takeaway: one family (Inter + Inter Tight), with all the character coming from **extreme
scale contrast** (16px ↔ 208px) and tight negative tracking on display type.

### Color
- Page: pure white `#FFFFFF`, text near-black `#0E0E0E`, secondary gray `#6D6D6D`.
- Dark panels: `#0E0E0E` / `#0B0B0D`.
- **No site-wide accent.** Color comes only from the product mockups (yellow `#FFD43B`,
  lavender `#D2CBF7`, olive `#4B5A2C`, orange `#EE9A5E`, blue `#5B8DEF`).
  → The work provides the color; the shell stays monochrome.

### Shape & surface
- Radii: 24px cards, 64px big panels, full pill buttons, 1px hairlines.
- Product screenshots shown in a **browser-chrome frame** (traffic-light dots).

### Motion & interactions (observed)
- **Split/masked text reveal** on every big heading (headings are duplicated in DOM — classic line-mask technique).
- **Sticky pinned title + parallax cards** in Featured work (`.work-title sticky top-0 h-screen`).
- **Frosted sticky header**: `backdrop-filter: blur(15px)` over `rgba(255,255,255,.8)`.
- **Scroll progress ruler** on the left edge — thin tick marks, active tick turns blue.
- **Copy-email button**: click swaps label to "EMAIL COPIED!"; transition `scale .15s cubic-bezier(0.23, 1, 0.32, 1)` (press-down feel).

### Case study page (`/work/caelis/`) — `milan-case-study.png`
- Big product name left; one-line outcome right (≈36px, tight tracking).
- Meta grid: **ROLE · TIMELINE · LINK** (gray caps label, black value).
- Full-bleed dark band with the product in a browser frame.
- Narrow reading column (~690px): **The problem → What I did → The outcome**.
- Ends with **"Next project"** link → continuous browsing.

### Copy voice
Short, outcome-first, product-tagline style:
- "One scan. Every detail."
- "Every card payment, checked in microseconds. Every decline, explained."
- "2,000 seeded runs. 43,410 injected crashes and partitions. Zero broken invariants."
- "Scan the back of any ID at the front desk — everything filled in, in three seconds."
- Bio: "I learn how a business really runs, then turn it into clear reports, simpler processes and, when it helps, the software that fixes the problem."

---

## 2. oshahelawan.framer.website — secondary reference

**Stack:** Framer (no-code). "Made in Framer" badge visible.

### Positioning
Independent product designer, approachable and personal. Feels like a working
freelancer rather than a job-seeker.

### Page structure
1. **Status strip** — `Local time 12:34 PM` (live) left · green dot `Available for work` right.
2. **3-column intro** — "Hi there, I'm Osha" + Socials list · "Product Designer based in Indonesia" + Services list · short bio.
3. **Bento grid** of mixed-width cards (2:3 and 3:2 splits alternating), each with a **category chip** (Works / Project / Exploration / Album / Side Project), title, one-liner, arrow button, and a live preview cropped at the bottom edge.
4. A playable **Snake game** card (personality piece).
5. CTA card inside the grid: "Got a project idea? Let's build something that looks great and gets results!" + full-width black "Lets talk ↗" button.
6. Centered tiny footer: © · Featured on Indofolio · Last updated June 2025.

Screens: `osha-hero.png`, `osha-bento.png`, `osha-hover.png`, `osha-mobile.png`

### Typography
- **Inter** throughout (16px labels, 24px intro, ~34px cards); **IBM Plex Mono** for small UI details.
- Signature trick: **two-tone text** — key words in black, connective words in 50% gray
  (`rgba(10,10,10,.5)`). "a designer who transforms **blank rectangles** into **beautiful** and **functional** products."

### Color & surface
- White page, cards `#F3F3F3`, black `#0A0A0A` buttons, one purple/pink gradient card as the loud moment.
- Radii: 24px cards, 8px chips/buttons. No shadows — flat tonal surfaces.

### Motion & interactions (observed)
- **Hover expands the arrow icon into a labeled pill** ("↗" → "Visit Website ↗", "See Gallery ↗").
- **Hover re-arranges preview content** (gallery photos fan/shuffle; screenshot shifts).
- Live clock, interactive game widget.

### Mobile
Collapses cleanly to single column; status strip stays on top; Socials/Services become two side-by-side lists.

### Weak spots (don't copy)
Lorem ipsum left in a card, typos ("Photograper"), "Lets talk" opens a raw Gmail compose URL, Framer badge overlays content.

---

## What to take for Anish's site

**From Milan (structure + polish):**
- Product-ify every flagship project: own name, wordmark/color, outcome tagline, metrics.
- Extreme type scale, one tight display face, monochrome shell — let project visuals carry color.
- Pinned "Featured work" title with cards scrolling past it.
- Case study template: Role / Timeline / Link → Problem / What I did / Outcome → Next project.
- Dated timeline for experience instead of a skills grid.
- Copy-email pill, frosted header, left-edge scroll progress.

**From Osha (warmth + signals):**
- Status strip: local time (San Diego) + "Available for…" / "Currently building…".
- Two-tone gray/black text in the intro paragraph.
- Category chips + arrow-to-label hover on cards.
- Optional bento for secondary stuff (side projects, writing, photos) below flagship work.

**Avoid:** skills icon grids, typewriter effects, falling-code canvas, equal-weight sections,
listing every class project, purple-neon default palette, tech-stack-first descriptions.

## Animation shortlist (React)
| Effect | Seen on | Tool |
|--------|---------|------|
| Line-masked heading reveal | Milan | Motion (`motion/react`) |
| Pinned title + parallax cards | Milan | Motion `useScroll` / CSS `position: sticky` |
| Frosted sticky header | Milan | CSS `backdrop-filter` |
| Scroll progress ticks | Milan | Motion `useScroll` |
| Press-scale buttons, copy-email swap | Milan | CSS / Motion `AnimatePresence` |
| Arrow → labeled pill on hover | Osha | Motion `layout` |
| Hover-shuffled previews | Osha | Motion variants |
| Smooth scroll | — | Lenis |
| Page transitions to case studies | — | Motion `AnimatePresence` |

All motion respects `prefers-reduced-motion`.
