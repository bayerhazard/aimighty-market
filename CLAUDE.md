# aimighty-market

Custom Olares app store, served by Cloudflare Pages Functions.

## Catalog files
- App entries: `functions/_apps.ts` (metadata name, version, title, entrances).
- Chart keys: `functions/_lib.ts`, named `<name>-<version>.tgz`.
- API: `/api/v1/applications/info` (catalog), `/api/v1/applications/<app>/chart` (chart download), `/api/v1/appstore/info` and `/hash`.

## Access from Claude sessions
- The Claude GitHub App is installed on `bayerhazard`, limited to `aimighty-market`. Sessions act as `ska1walker`, who has write access. No extra token is needed.
- Credentials added to an environment only reach sessions started afterwards.
- Cloud sessions cannot reach `aimighty-market.pages.dev` (egress policy); check the live catalog in a browser.

## Shipping an app update
1. Branch in the fork `ska1walker/aimighty-market`, change `functions/_apps.ts` and `functions/_lib.ts`.
2. Open a PR against `bayerhazard/aimighty-market:main`. There are no PR checks.
3. Squash-merge (repo convention, title ends with `(#N)`).
4. "Deploy to Cloudflare Pages" (`.github/workflows/deploy.yml`) runs on every push to `main` and takes about 20 s; the job log ends with "Deployment complete".

Relay commits are pushed straight to `main` by OpenCode on the Olares box.

## Olares
- A new app name is a new app: installed copies of the old name keep running but get no updates (Beacon became Rocket 26.9.1 in #81).
- A changed catalog hash makes Olares pick up the new catalog on its next sync.
