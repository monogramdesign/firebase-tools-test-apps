# Issue #5847 / #5832 — Express `bootstrap.js` ESM + `app`-factory codegen

Repro app for two related bugs in the code-generated Express `bootstrap.js`:

- [firebase/firebase-tools#5847](https://github.com/firebase/firebase-tools/issues/5847) —
  when the app's `package.json` has `"type": "module"`, the generated `bootstrap.js` is an
  ES module but was emitted with CommonJS syntax (`require`/`exports`), so the deployed SSR
  function throws **`exports is not defined in ES module scope`**.
- [firebase/firebase-tools#5832](https://github.com/firebase/firebase-tools/issues/5832) —
  for an app that exports an `app` **factory**, the bootstrap invoked the factory with
  `(req, res)` on every request, discarding the Express instance it returns.

## Apps

| Dir | Framework | Exercises |
| --- | --- | --- |
| [`express/`](./express) | Express (ESM, SSR) | `package.json` `"type": "module"` **and** `export function app()` — hits both #5847 (ESM bootstrap) and #5832 (factory call-once) in one deploy |

`express/server.js` is an ES module that exports an `app()` factory returning an Express
instance with a dynamic `GET /ssr` JSON route.

## The fix

`generateBootstrapScript(name, isEsm, shape, prelude)` in
`src/frameworks/express/index.ts` (firebase-tools):

- emits `import(...)` / `export const handle` when `package.json` `type === "module"`,
  CommonJS otherwise;
- for the `app` shape, resolves the factory **once** (`.then((it) => it.app())`) and routes
  requests to the returned instance (`(await bootstrap)(req, res)`).

Branch: `fix/express-bootstrap-esm-and-app-factory`.

> Review follow-up: detection should reuse `relativeRequire` (honors the `exports` field +
> `.mjs` extension) instead of `join(root, main || "index.js")` + `type`-only ESM detection.

## Run

Web frameworks SSR needs a Cloud Function, so this is verified with a **channel deploy** to a
real Blaze project (set `.firebaserc` / `--project` to your own). From the firebase-tools
checkout, build the CLI under test:

```
npx tsc
npm run copyfiles
```

Then from this app dir:

```
cd express
npm install
FIREBASE_CLI_EXPERIMENTS=webframeworks node /path/to/firebase-tools/lib/bin/firebase.js hosting:channel:deploy esm-test --expires 1d --non-interactive
```

## Verify

```
curl -s https://<project>--esm-test-<hash>.web.app/ssr
```

- **Fixed:** `200 {"ssr":true,"message":"SSR OK","node":"v20..."}` — the ESM `bootstrap.js`
  loaded and the `app` factory routed correctly.
- **Broken (before the fix):** the deploy fails in codegen, or the SSR function 500s at
  runtime with `exports is not defined in ES module scope`.
