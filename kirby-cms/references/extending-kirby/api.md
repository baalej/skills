<!--
source: https://getkirby.com/docs/guide/api
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# API

Kirby exposes a built-in REST API (`/api/...`) for reading/writing content programmatically — what the Panel itself uses under the hood. Authenticated via the same login system as the Panel (session or Bearer token), configurable/restrictable via the `api` config option.

**When this is relevant:** building a decoupled frontend (SPA, mobile app) against this Kirby install as a backend, or scripting bulk content operations. For a standard server-rendered template project (this project's default), you typically won't touch this directly — routes + controllers (see `configuration/routes.md`) cover custom endpoint needs without exposing the full content API.

## Sub-pages
- Authentication → https://getkirby.com/docs/guide/api/authentication
- Data (structure of API responses/requests) → https://getkirby.com/docs/guide/api/data

→ Main page: https://getkirby.com/docs/guide/api
