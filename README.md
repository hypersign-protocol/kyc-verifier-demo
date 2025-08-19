## KYC Verifier Demo (Static)

A static, single-page KYC verifier UI located in `public/index.html`. It supports dynamic configuration from a local JSON file and from a remote API (with cookies), shows a sandbox banner, and enforces Chrome-only flows with a clean modal.

### Run locally (no Node.js required)
Serve the `public/` folder with any static server so URL paths work (for `/:id`). Options:

- VS Code Live Server: Open the project and "Go Live" on the `public/` folder
- Python 3 (from the project root):
  - `cd public`
  - `python -m http.server 8000`
  - Open `http://localhost:8000/` or `http://localhost:8000/<id>`
- npx serve (from the project root):
  - `npx serve public -l 6006`
  - Open `http://localhost:6006/` or `http://localhost:6006/<id>`

### How it works
- Frontend: `public/index.html`
  - TailwindCSS UI with compact layout and steps
  - Theme system (vibrant, dark, grey, light) via CSS variables
  - Sandbox banner at top (dismissible)
  - Chrome-only check; if not Chrome, a clean Tailwind modal is shown
  - Start KYC button triggers the verification widget flow in a centered popup window

- Optional Node/Express dev server: `index.js`
  - You can also run `npm install && npm start` to serve the `public/` folder on `http://localhost:6006/`.
  - This is optional; any static server works.

### Configuration sources (loaded on page load)
On window load, the page loads configuration from BOTH sources in this order:
1. Local JSON: `public/tokenDetail.json`
   - Extracted by matching the `id` from the URL path (`/:id`).
   - Sets tokens and tenant:
     - `ssiAccessToken`
     - `kycAccessToken`
     - `teneantUrl` (note the legacy spelling retained for compatibility)
   - Also updates the logo if `logoUrl` is present.

2. Remote API (with cookies):
   - `GET https://api.entity.dashboard.hypersign.id/api/v1/app/{id}/kyc-webpage-config`
   - Called with `credentials: 'include'` so existing cookies are sent
   - Expected response (example):
     ```json
     {
       "_id": "68a2cb9a90374759bdb5e379",
       "themeColor": "vibrant",
       "expiryType": "6months",
       "serviceId": "13f70faf7f5c5d03520b71181136b595f7c6",
       "expiryDate": "2026-02-14T11:20:20.634Z",
       "pageDescription": "Please read the Terms & Condition before proceding",
       "pageTitle": "NIbiID verification",
       "pageType": "kyc",
       "tenantUrl": "https//:ent-4c71874.api.cavach.hypersign.id",
       "generatedUrl": "https://verifier.hypersign.id/68a2cb9a90374759bdb5e379"
     }
     ```
   - Used to update UI dynamically:
     - Page title (`pageTitle`)
     - Description (`pageDescription`)
     - Theme (`themeColor`) if it matches one of the predefined themes
     - Tenant URL (`tenantUrl`) if provided
   - API failures are non-blocking; local JSON data remains in effect.

### Theming
- Themes are applied via CSS variables and the `data-theme` attribute on `<body>`.
- Elements use theme-aware utility classes (e.g., `theme-title`, `theme-subtitle`, `theme-card`, `theme-button`).
- The theme selector exists in the DOM; it can be shown/hidden as needed.

### Browser enforcement
- A Chrome check runs on load. If the browser is not Chrome, a Tailwind modal informs the user and provides a close action.

### Sandbox banner
- A dismissible banner at the top indicates sandbox mode.
- The page adds top padding to keep content visible beneath the fixed banner.

### URL patterns
- `http://localhost:8000/` (or your chosen port) -> default view
- `http://localhost:8000/<id>` -> the `<id>` is consumed by the frontend to look up local JSON and call the API

### Files of interest
- `public/index.html` – Main UI + scripts (theme, KYC flow, config loaders, Chrome modal)
- `public/tokenDetail.json` – Local configuration map used by `loadJSONData()`
- `public/chain.json` – Static asset referenced by the page
- `index.js` – Optional Express server to serve `public/` (not required)

### Notes for API usage
- Cookies must be available for the domain of the API for `credentials: 'include'` to send them.
- When developing locally, consider proxying or matching domains to ensure cookies are attached correctly.
- If CORS is enabled on the API, it must allow credentials and the origin of the page.

### Troubleshooting
- "Chrome required" modal keeps showing: open the page in Chrome.
- API config not applied: ensure you are authenticated in a context where cookies are set for the API domain; check DevTools network and console for CORS or auth errors.
- Local JSON not applied: verify `public/tokenDetail.json` contains an entry whose `id` matches the URL path segment.

### Scripts
- `npm start` – Starts the Express server on port 6006


