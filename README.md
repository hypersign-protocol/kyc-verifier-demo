**Verifier**


Copy the env block below into `.env` at the project root:

```env
HYPERSIGN_DASHBOARD_SERVICE_BASE_URL='https://api.entity.dashboard.hypersign.id'
ID_SERVICE_BASE_URL='https://api.cavach.hypersign.id'
WIDGET_URL='https://verify.hypersign.id'
KYB_WIDGET_URL='https://verify.business.hypersign.id'
PORT=6006
```

Start the server:

```bash
npm install
npm start
```

The server injects these envs into the client at runtime.


- Build and deploy:

	```bash
	npm run build
	npm run deploy
	```

- This publishes the `dist` folder to the `gh-pages` branch. Note: the Express server's runtime env injection will not run on GitHub Pages; if your client needs runtime config, bake it into the build or host behind a server.

The repo's Express wrapper injects envs at runtime when you run the Node server.




If you deploy only the static `dist` the server-side injection in `index.js` will not run; set client config at build time instead.
KYC Verifier Demo

A small single-page app served by a tiny Express server. The server reads a `.env` file at runtime and injects the values into the page.

Environment

Copy this into a `.env` file at the project root:

```env
HYPERSIGN_DASHBOARD_SERVICE_BASE_URL='https://api.entity.dashboard.hypersign.id'
ID_SERVICE_BASE_URL='https://api.cavach.hypersign.id'
WIDGET_URL='https://verify.hypersign.id'
KYB_WIDGET_URL='https://verify.business.hypersign.id'
PORT=6006
```

Run locally

```bash
cp .env.example .env   # optional
npm install
npm start
```

Deploy to GitHub Pages

- (Optional) Add a `homepage` field to `package.json` with your Pages URL, e.g. `https://<user>.github.io/<repo>`.
- Build and publish the `dist` folder:

```bash
npm run build
npm run deploy
```

Notes

- When you run the Node server locally, it injects the `.env` values into the page at runtime.
- If you publish only the static `dist` (for example to GitHub Pages), that runtime injection won't run — include any needed config at build time.

Files to look at

- `index.js` — server and runtime env injection
- `build.js` — build script
- `Dockerfile` — example container
- `package.json` — scripts and deps

Want me to commit this change or add `docker-compose.yml` for easier local runs?
If you'd like, I can commit this change or add a `docker-compose.yml`. Which would you prefer next?

