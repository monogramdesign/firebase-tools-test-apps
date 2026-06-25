#!/usr/bin/env bash
# Deploy each Astro test app (v2-v6) twice to Firebase Hosting preview channels:
#   <vN>-broken : globally-installed firebase-tools (npm latest, 15.20.0 - no fix, flat copy)
#   <vN>-fixed  : local main build (PR #10537 merged - nested server/)
# Same app source each time; only the CLI doing codegen differs.
#
# Run this yourself. Requires: logged in + webframeworks experiment enabled.
set -uo pipefail

PROJECT=fb-tools-dev
BROKEN_CLI="firebase"                                              # global npm (15.20.0, no fix)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"              # this script's dir (astro/)
FIREBASE_TOOLS="${FIREBASE_TOOLS:-$ROOT/../../firebase-tools}"    # override to your firebase-tools checkout
FIXED_CLI="node $FIREBASE_TOOLS/lib/bin/firebase.js"             # local build (the fix)

VERSIONS=(v2 v3 v4 v5 v6)
MODE="${1:-both}"   # both | broken | fixed

deploy() {
  local app="$1" cli="$2" channel="$3"
  echo ""
  echo "=============================================================="
  echo ">>> $channel   ($app)   [$cli]"
  echo "=============================================================="
  ( cd "$ROOT/$app" && $cli hosting:channel:deploy "$channel" --project "$PROJECT" --expires 7d )
}

for v in "${VERSIONS[@]}"; do
  [ "$MODE" = "fixed" ]  || deploy "$v" "$BROKEN_CLI" "${v}-broken"
  [ "$MODE" = "broken" ] || deploy "$v" "$FIXED_CLI"  "${v}-fixed"
done

echo ""
echo "Done. Test each preview URL (root / and /api/hello):"
echo "  curl -i <preview-url>/api/hello   # *-broken: v6 -> 500, others 200 ; *-fixed: all 200"
