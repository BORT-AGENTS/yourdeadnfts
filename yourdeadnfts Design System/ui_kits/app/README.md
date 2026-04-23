# UI kit — yourdeadnfts app

Interactive click-thru recreation of the shipped yourdeadnfts SPA. Mirrors the structure of `src/App.jsx` exactly — same state machine (`idle` → `scanning` → `done`), same component boundaries, same copy.

## Files

| File | What it is |
|---|---|
| `index.html` | Wires everything together. Mocks scan + connect + tx timing. Loads React 18 + Lucide via CDN. |
| `Header.jsx` | Skull logo + wordmark · `Connected` pill or `Connect` link · `bortagent.xyz` outlink. |
| `AddressInput.jsx` | Hero: `Your NFTs are dead.` + address field + `or connect your wallet`. Exposes a dashed "try:" demo row that is **not** part of the shipped product. |
| `NFTCard.jsx` | NFT grid tile with the rotated `Dead · 2y` rubber stamp, collection name, token id, contract link, upgrade button. |
| `ScanResults.jsx` | Forensic meta line (`SCAN 0x…  · your wallet | ← return`), obituary line, grid — or scanning/empty states. |
| `UpgradeModal.jsx` | 4-step modal: `connect` → `pick` → `upgrading` → `done`. Faked on-chain calls, faithful copy. |
| `mock-data.js` | Sample wallets, sample NFT list with inline SVG art, Lucide icon keys for agent templates, `truncateAddress` + `formatDeadDuration` helpers, skull placeholder. |
| `topography.svg` | Background texture (copied from the repo's `public/`). |

## Try it

Two demo wallets are wired in, reachable from dashed buttons below the hero:
- `0x742d…F0bEb` — returns 6 dead NFTs across 5 collections.
- `0x9a8b…0000` — the empty-state path.

Click **Upgrade to Agent** on any card to open the upgrade modal; click any template to watch the fake confirmation → success flow.

## Shortcuts vs the real app

- No `ethers.js`. Address validation is a plain regex; connect and upgrade just advance state after a timeout.
- No toasts (the real app uses `react-toastify`). Errors surface inline in the modal, same as the shipped error path.
- Lucide is loaded via the vanilla CDN build and rendered via `data-lucide` attributes + a `lucide.createIcons()` call on every React render — visually identical to the React-wrapped icons in the repo.
- Icon sizes and colors are passed through `window.Icon`, not the React binding, but specs match (`stroke-width: 2`, sizes 11–22).
- The `modal-nft-preview` always shows an image (the skull placeholder if the NFT has no art) — the real app only renders the `<img>` when a URL exists.

## What this kit is **not**

A storybook. Every piece you see is composed into the actual product shape — scan a wallet, see the grid, upgrade a token — so you can riff on the full product from one file.
