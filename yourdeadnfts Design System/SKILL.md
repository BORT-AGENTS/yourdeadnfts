---
name: yourdeadnfts-design
description: Use this skill to generate well-branded interfaces and assets for yourdeadnfts, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

yourdeadnfts is a BNB Chain web app that scans wallets for dead NFTs (idle >1 year) and upgrades them into BAP-578 AI agents. The visual identity is **forensic, archival, gothic-industrial** — rust + bone on warm black, IBM Plex (Sans/Serif/Mono), topographic-map backgrounds, skewed rubber-stamp "DEAD" badges, obituary-style serif headlines.

**Core tokens (from `colors_and_type.css`):**
- Primary: `#a85a3e` (rust), Accent: `#6b8e5c` (moss), Danger: `#8b2a2a` (blood)
- Text: `#d9d2bf` (bone) / `#8a867b` (ash) / `#5c5a51` (dim)
- Bg: `#0a0907` → `#2a2620` (warm near-blacks)
- Fonts: IBM Plex Sans (body) / Serif (obituary headlines) / Mono (addresses + uppercase meta)

**Tone:** dry, morbid, deadpan. Second person. Lowercase product name (yourdeadnfts). No emoji, no hype.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and `preview/`, link `colors_and_type.css`, and create static HTML files for the user to view. Reference `ui_kits/app/` for a working click-thru recreation of the shipped product.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
