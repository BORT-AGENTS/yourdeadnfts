# yourdeadnfts — Design System

> "Your NFTs are dead. Turn them into AI agents."

## What is it

**yourdeadnfts** is a single-page BNB Chain web app that scans any wallet for *dead NFTs* — tokens that have been sitting idle for over a year — and lets their owner upgrade each one into a **BAP-578 AI agent** (Hunter, Trading, or CTO templates). A cousin/companion to **bortagent.xyz**, powered by **BORT**.

The product is small in scope but sharp in voice: forensic, slightly gothic, obituary-for-your-jpegs. Rust + bone on warm black, serif headlines that read like grave markers, mono meta labels that read like chain-of-custody tags.

## Source material

- **Codebase (local mount):** `yourdeadnfts/` — Vite + React 19 SPA. Key files:
  - `src/App.jsx` — top-level state (scan, results, upgrade modal)
  - `src/components/{Header,AddressInput,ScanResults,NFTCard,UpgradeModal}.jsx`
  - `src/styles/index.css` — full CSS (the design system originated here)
  - `src/config/contracts.js` — BNB Chain contracts + agent templates
  - `src/utils/formatting.js` — truncate address, format "dead for ___"
  - `public/{favicon.svg,topography.svg,topography.jpg}`
- **No Figma** provided.
- **No slides** provided.

## The product in one scroll

1. **Hero** — "Your NFTs are dead." Paste a BNB wallet OR connect MetaMask.
2. **Scan** — walks the wallet for ERC-721s idle >1 year. Progress label updates live.
3. **Results** — a forensic report: `SCAN 0x1234...5678 · your wallet | ← return`, then a serif obituary line (`N dead across M collections`), then a grid of NFT cards with a skewed `DEAD · 2y` stamp.
4. **Upgrade modal** — pick one of three agent templates (Hunter / Trading / CTO), approve, pay the portal fee, done.

---

## CONTENT FUNDAMENTALS

**Voice.** Dry, morbid, deadpan. The product personifies dead NFTs as corpses and the app as the coroner. Never cute. Never hypey. No exclamation points, no rocket emoji, no "let's go".

**Casing.**
- Product name is always lowercase: **yourdeadnfts**.
- Buttons and page titles use Sentence case: *Scan*, *Connect Wallet*, *Upgrade to Agent*, *No dead NFTs*.
- Meta labels and navigation bits use UPPERCASE with 0.2em letter-spacing in mono: `SCAN`, `DEAD · 2Y`, `CONNECTED`, `BORTAGENT.XYZ`.

**Pronoun.** Second person, addressing the holder directly: *Your NFTs are dead. / Paste a wallet to see dead NFTs. / Your dead NFT is now a BAP-578 AI agent.*

**Punctuation & glyphs.**
- Mid-dot `·` separates meta fragments: `Dead · 2y`, `· your wallet`.
- Arrow `←` for back: `← return`.
- Ellipsis `...` in truncated addresses (`0x1234...5678`) and loading states (`Scanning...`).
- **No emoji anywhere.** A skull icon (Lucide) stands in for any urge to use 💀.

**Specific copy examples (from the codebase — lift these verbatim when in doubt):**
- Hero: *Your NFTs are dead.* · *Paste a wallet to see dead NFTs* · *Scan* · *or connect your wallet*
- Meta: *Scan* · *← return* · *your wallet*
- Obituary: *12 dead across 3 collections*
- Empty state: *No dead NFTs* / *This wallet doesn't have any NFTs sitting idle for over a year.*
- Card: *Dead · 2y* · *Upgrade to Agent* / *Connect & Upgrade*
- Upgrade modal: *Choose agent type* · *Upgrade fee: 0.015 BNB* · *Reactivation fee: 0.005 BNB*
- Success: *NFT Upgraded* / *Your dead NFT is now a BAP-578 AI agent.* / *Manage on bortagent.xyz*
- Footer: *Powered by BORT*

**Tone don'ts.** No crypto-bro phrasing. No "WAGMI", no "ser", no "gm", no "🫡". The whole voice is the quiet undertaker, not the degen.

---

## VISUAL FOUNDATIONS

**Color philosophy.** Warm near-black palette (`#0a0907` → `#433d33`) instead of cool grey-black. Text is **bone** (`#d9d2bf`), not white. The only accents are **rust** (`#a85a3e`, primary), **moss green** (`#6b8e5c`, "alive" signal), **muted blood red** (`#8b2a2a`, "dead" signal). No bright colors. No neon. No purples.

**Type.** IBM Plex, all three cuts:
- **Plex Sans** for body, UI, buttons (400–800).
- **Plex Serif** for obituary headlines and the big numeric stat in results (400/600). Serif = gravitas, not decoration.
- **Plex Mono** for addresses, token IDs, meta labels, uppercase-tracked nav (0.2em letter-spacing).

Hero title uses a `linear-gradient(135deg, bone 40%, rust 100%)` clipped to text — the one place text "fades out".

**Backgrounds.** Every page sits on a fixed full-viewport topographic map (`assets/topography.svg`, cream lines on `#0d1013`). On top of that, three blurred radial color orbs (red, rust, green) drift with a 30s `float` keyframe at `filter: blur(180px); opacity: 0.06` — a subtle sub-surface glow, not a gradient flourish. The header has `backdrop-filter: blur(12px)` over `rgba(11,14,17,0.6)` to frost it against the topo map.

**Animation.**
- Entries: `fadeInUp` (0.5s ease-out, 24px translateY).
- Spinner: 0.8s linear rotate; small variant for button-internal.
- Orb drift: `float` 30s ease-in-out with staggered 10s / 20s delays.
- Status dots: 2s `pulse` (opacity 1 ↔ 0.4).
- No bouncy springs. No scale-on-enter. Easing is plain `ease` or `ease-out`.

**Hover states.**
- Buttons: `translateY(-1px)` + background lighten + colored shadow (rust glow for primary, border-color shift for secondary).
- Cards: border-color shifts to `rgba(168,90,62,0.35)` — no lift, no shadow change.
- Links/meta: color shifts from `--text-muted` to `--color-primary`.
- Logo: `opacity: 0.8` on hover.

**Press / focus.**
- Inputs: border flips to rust + `box-shadow: 0 0 0 3px rgba(168,90,62,0.1)` ring.
- No separate active state — just the transition tail of hover.

**Borders & dividers.**
- Default border: `1px solid var(--border-primary)` (`#2a2620`). Always hairline.
- Dashed border used only for empty-state cards.
- Uppercase meta block under the `SCAN` line is separated by a single `1px solid border-primary` bottom rule.

**Shadows.**
- Cards: **no shadow.** They rely on border + bg contrast.
- Elevated modal: `0 8px 32px rgba(0,0,0,0.5)`.
- Primary button hover: colored `rgba(168,90,62,0.3)` glow.
- No inner shadows. No neumorphism.

**Layout rules.**
- Max content width: **1100px**, centered, 48px gutters (24/16px at mobile breakpoints).
- Header and footer are **fixed-height, hairline-bottom** bars; main content sits between.
- Hero: vertical stack, centered, 640px max, 120px top padding.
- Results: meta line → obituary → grid. No stat cards. No hero image.
- NFT grid: `auto-fill, minmax(260px, 1fr)`, 20px gap.

**Transparency & blur.** Used sparingly but deliberately:
- Header: frosted glass (`backdrop-filter: blur(12px)` on 60%-opacity surface).
- Modal overlay: 75% black + `blur(6px)`.
- Dead badge: 55%-opacity black + `blur(4px)` — so the NFT art reads through it.
- Orbs: 6% opacity, 180px blur — pure atmosphere.

**Imagery vibe.** Warm, desaturated, archival. NFT art is shown at `object-fit: cover` with no filter, but the placeholder (for missing images) is a literal hand-drawn skull glyph in `#433d33` on `#14120e`. The topographic map background is monochrome.

**Corner radii.** Small and consistent: 6 / 8 / 12 / 16px. Buttons use 8px. Cards 12px. Modal 16px. Pills (eyebrow, status) use 100px (full round). The dead stamp is **radius 0** + rotated -3° with only top/bottom borders — it looks like a rubber stamp, not a pill.

**Cards.**
- 1px border, 12px radius, transparent background (so topo map shows through).
- On hover: border shifts rust.
- Body is a flex column. Image sits on `--bg-surface` for a slightly darker frame.

**Iconography vibe.** Lucide React icons, `strokeWidth={2}`, 11–22px. Stroke, never fill. The only decorative graphic is the **skull** (Lucide) — used in the header and the placeholder.

---

## ICONOGRAPHY

**Library:** [`lucide-react`](https://lucide.dev/) is the codebase's only icon source. Stroke weight 2, size 11–22px. Colored via the parent's `color` or explicitly (`#a85a3e` rust, `#6b8e5c` moss, bone/ash tones).

**Icons actually used in the product** (lift from here first — do not substitute):
- `Skull` — logo + NFT-image fallback
- `Search` — wallet input leading icon
- `Wallet` — connect-wallet buttons
- `ExternalLink` — outbound links (bscscan, bortagent.xyz, tx)
- `CheckCircle2` — empty-state "no dead NFTs"
- `Check` — upgrade success
- `X` — modal close
- `TrendingUp` — Trading agent template
- `Users` — CTO agent template
- `Zap` — Hunter agent template

**For this design system:** Lucide is consumed via CDN (`https://unpkg.com/lucide@latest` or `https://cdn.jsdelivr.net/npm/lucide@latest`). See `ui_kits/app/index.html` for usage. All icons fetched this way — we do NOT bundle an icon font or SVG sprite locally (the repo's `public/icons.svg` is an empty `<svg>` placeholder and shouldn't be used).

**Emoji / unicode.** None. The only non-icon glyphs in the UI are `·` (mid-dot separator), `←` (back arrow), `#` (token prefix), `...` (truncation).

**Logos / illustrations.**
- `assets/favicon.svg` — **BORT** purple diamond-and-blur mark (the powered-by brand; used in the footer, not the main header).
- `assets/hero.png` — a floating purple-and-white cube illustration; **legacy asset**, not used in the shipped UI. Kept in the system as a reference.
- `assets/topography.svg` + `assets/topography.jpg` — full-viewport topographic background. Used as `background: url(...)` on the fixed `.topo-bg` layer.
- **No human illustrations. No 3D renders. No mascots.** The skull icon and the topo map carry the visual identity.

---

## Index — what's in this system

```
README.md                         ← you are here
SKILL.md                          ← Agent Skills-compatible entry point
colors_and_type.css               ← CSS vars for colors, type, spacing, shadows

assets/
├── favicon.svg                   BORT purple-diamond mark
├── hero.png                      Legacy isometric cube (unused in shipped UI)
├── topography.svg                Full-viewport background (primary)
├── topography.jpg                JPG fallback of the above
└── icons.svg                     Empty placeholder from public/ (not used)

preview/                          ← cards for the Design System tab
├── colors-palette.html
├── colors-semantic.html
├── type-families.html
├── type-scale.html
├── spacing-radii.html
├── shadows.html
├── buttons.html
├── inputs.html
├── badges-status.html
├── nft-card.html
├── background-system.html
└── iconography.html

ui_kits/
└── app/                          ← the yourdeadnfts SPA, rebuilt
    ├── README.md
    ├── index.html                Interactive click-thru (idle → scanning → results → modal)
    ├── Header.jsx
    ├── AddressInput.jsx
    ├── ScanResults.jsx
    ├── NFTCard.jsx
    ├── UpgradeModal.jsx
    └── mock-data.js
```

There are no slides — no deck was provided, and the product has no marketing deck that we could infer from the codebase.

---

## Caveats

- **Fonts:** IBM Plex Sans / Serif / Mono — all loaded from Google Fonts CDN (same as the source repo). No local `.ttf` files copied; there was nothing to copy.
- **Icons:** Lucide via CDN. The repo uses `lucide-react`; we substitute the vanilla `lucide` CDN for HTML previews — identical glyphs, same stroke weight.
- **No Figma / slide deck** was provided, so the system is derived entirely from code + running behaviors.
