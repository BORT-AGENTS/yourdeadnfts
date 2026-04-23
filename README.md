# yourdeadnfts

> Your NFTs are dead. We bring them back as BORT agents.

Scan any BNB Chain wallet for dead NFTs and upgrade them into working [BAP-578](https://bortagent.xyz) AI agents via the NFTUpgradePortal. Non-custodial. No sell, no burn — the original stays in your wallet, the agent mints alongside it.

Live at **[yourdeadnfts.com](https://yourdeadnfts.com)**.

## Stack

- **Frontend** — Vite + React 19 SPA, pure JavaScript
- **Styling** — hand-rolled CSS with IBM Plex (Sans / Serif / Mono), design tokens in [`src/styles/tokens.css`](src/styles/tokens.css)
- **Wallet** — ethers v5 (MetaMask / EIP-1193)
- **Data** — [Moralis Web3 Data API](https://moralis.com) for ERC-721 transfer history on BSC
- **Chain** — BNB Smart Chain (chainId 56)
- **Host** — Vercel

## Contracts

| Contract | Address |
| --- | --- |
| NFTUpgradePortal | [`0xe427…FC7B`](https://bscscan.com/address/0xe427E631a51a864c93A7c5d0afB4d2cd01fCa884) |
| Hunter Agent (logic) | [`0x4F35…AE81`](https://bscscan.com/address/0x4F35D6B3DEdecfe3aD6600b39A705BcD53E2aE81) |
| Trading Agent (logic) | [`0x61b3…9C52`](https://bscscan.com/address/0x61b3F08579237DA6247DE20af1F5a4e5a95D9C52) |
| CTO Agent (logic) | [`0xbF9e…1C67`](https://bscscan.com/address/0xbF9e07F7EA47e40d7845534B8840A4b7225D1C67) |

## Running locally

```bash
# 1. Install
npm install

# 2. Get a Moralis Web3 Data API key (free tier works)
#    https://admin.moralis.com
cp .env.example .env
#    then edit .env and paste your key into VITE_MORALIS_API_KEYS

# 3. Dev server
npm run dev
```

`VITE_MORALIS_API_KEYS` accepts a comma-separated list — the scanner rotates to the next key automatically when one hits its daily CU limit.

## Project layout

```
src/
├── App.jsx                # top-level state: scan / results / upgrade modal
├── main.jsx               # React root
├── components/
│   ├── Header.jsx         # logo + connect pill
│   ├── AddressInput.jsx   # landing hero + wallet input
│   ├── ScanResults.jsx    # forensic report + NFT grid
│   ├── NFTCard.jsx        # single dead-NFT card with rubber-stamp badge
│   └── UpgradeModal.jsx   # agent template picker + approve + upgrade tx
├── config/
│   └── contracts.js       # addresses, ABIs, agent templates, Moralis env
├── utils/
│   ├── scanner.js         # Moralis transfer-history walk → ownership map → metadata
│   └── formatting.js      # address truncation, IPFS gateway rewrite, duration
└── styles/
    ├── tokens.css         # palette, type, radii, shadow, spacing vars
    └── index.css          # component CSS

public/
├── banners.html           # pixel-perfect social banner exports (1500×500 etc.)
├── robots.txt             # explicit AI-crawler allow rules + Content-Signal
├── sitemap.xml
├── pitch.pdf              # 10-page pitch deck
└── …                      # logo, topography.svg, favicon

yourdeadnfts Design System/
└── …                      # full design system — tokens, previews, UI kit
```

## Design system

`yourdeadnfts Design System/` contains the canonical source of truth for the visual identity — palette, type scale, component specs, banner templates, a rebuilt UI kit in `ui_kits/app/`. Useful if you want to skin another BNB collection's revival flow with the same voice.

Voice is **forensic / obituary / coroner-of-jpegs**. Rust + bone on warm black. Serif italic display, mono uppercase meta labels, rubber-stamp badges. No emoji.

## License

MIT — see [LICENSE](LICENSE).

## Credits

Built for the [BORT](https://bortagent.xyz) agent ecosystem and the [BAP-578](https://bortagent.xyz) standard.
