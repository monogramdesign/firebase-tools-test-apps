# Issue #9319 — Next.js deploy fails creating api functions (esbuild install ERESOLVE)

Repro app for [firebase/firebase-tools#9319](https://github.com/firebase/firebase-tools/issues/9319):
when bundling `next.config.js` for the SSR function, the adapter installs esbuild on demand
with `npm install esbuild --no-save` **inside the user's project**. If that project's
dependency tree has a peer-dependency conflict (npm `ERESOLVE`) unrelated to esbuild, the
install aborts and config bundling silently degrades / the deploy fails.

## Apps

| Dir | Framework | Exercises |
| --- | --- | --- |
| [`nextjs/`](./nextjs) | Next.js 14 (SSR) | `react-mathjax@1.0.1` (peer `react@^16`) vs `react@18` → `ERESOLVE` on the on-demand esbuild install |

Key detail: the conflicting dep is a **`devDependency`**, so it trips the esbuild install (run
in the project root, which sees devDeps) but is **excluded** from the generated function's
`npm i --omit dev` install — letting the deploy complete and isolating the esbuild path under
test. Install the app with `npm install --legacy-peer-deps` so `node_modules` exists; leave
esbuild absent so the on-demand install path fires.

## The fix

`installEsbuild` in `src/frameworks/next/utils.ts` (firebase-tools) retries the install with
`--legacy-peer-deps` when the first attempt fails (esbuild has no peer deps of its own).

Branch: `fix/next-esbuild-legacy-peer-deps`.

> Review follow-ups: gate the retry on a detected `ERESOLVE` (currently retries on any error,
> masking network/disk failures); and the sibling function-deps install
> (`npm i --omit dev`, `src/frameworks/index.ts`) has the same exposure and is not yet fixed.

## Run

Needs a **channel deploy** to a real Blaze project (the esbuild install runs during deploy
codegen). Build the CLI under test from the firebase-tools checkout:

```
npx tsc
npm run copyfiles
```

Then from this app dir:

```
cd nextjs
npm install --legacy-peer-deps
FIREBASE_CLI_EXPERIMENTS=webframeworks node /path/to/firebase-tools/lib/bin/firebase.js hosting:channel:deploy esbuild-test --expires 1d --non-interactive
```

## Verify

Watch the deploy log:

- **Fixed:** `esbuild not found, installing...` → `npm error code ERESOLVE` → retry →
  `added 2 packages` → `Deploy complete`; the channel `/` renders live SSR.
- **Broken (before the fix):** the first `ERESOLVE` aborts the install; config bundling falls
  back to the raw `next.config.js` (or the deploy errors), and SSR can break.
