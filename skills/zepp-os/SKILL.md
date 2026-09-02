---
name: zepp-os
description: Guides an agent writing Zepp OS code to check runtime/API_LEVEL compatibility against this knowledge base before suggesting an API.
---

# Zepp OS

Before suggesting any Zepp OS API:

1. Identify the target runtime: Device App, App-side, Side Service, Settings, Watchface, or Workout Extension.
2. Identify the target `API_LEVEL`.
3. Check the symbol's compatibility in `../../compatibility/` and `../../api/` before recommending it.
4. Prefer official docs and samples (confidence tier OFFICIAL/OBSERVED) over inferred content.
5. Never assume a browser or Node.js API exists on the Zepp OS runtime.
6. If the knowledge base doesn't cover a symbol or the answer is unclear, say so explicitly rather than guessing.
