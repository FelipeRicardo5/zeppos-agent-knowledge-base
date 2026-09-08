# HeartSync — eval task 01 artefact

Built for `eval/task-01-health-sync.md` from `zeppos-knowledge` alone. Not built,
not run, not shippable — see `../task-01-2026-09-08.md` for the verdict and the
ranked gaps. This README is a map of what is cited and what is invented.

## Files

| File | Runtime | State |
| --- | --- | --- |
| `app.json` | — | `targets` cited; everything else assumed (G03, G07, G08) |
| `app.js` | Device App | cited except the transport import (G02) and `App` framing (G05) |
| `page/index.js` | Device App | cited except widget-text update (G14) and `setProperty` form (G13) |
| `page/index.style.js` | Device App | cited; the four style namespaces carry no API_LEVEL (G04) |
| `page/heart-rate.adapter.js` | Device App | **the sensor read is invented** (G01) |
| `app-side/index.js` | Side Service | names cited, `fetch` contract assumed (G11), globals assumed (G05, G10) |
| `setting/index.js` | Settings App | **entry point and every prop invented** (G03, G12) |
| `shared/*.js` | both | **hard block** — three files the KB names but does not carry (G02) |

## Does it run on an Amazfit Bip 5?

**No — and the knowledge base answers this cleanly.**

`compatibility/devices.md` puts the Bip 5 at `API_LEVEL` 2.1 (square, 320 x 380,
1 key, "205 of 353" symbols) and the Bip 6 at 4.2 (square, 390 x 450, 2 keys).
Checking every symbol this project uses against 2.1:

- `@zos/storage.LocalStorage` is `>= 3` (`compatibility/zos-storage.md`, under
  "## API_LEVEL 3"). It is how requirement 4 — the endpoint surviving app close —
  is implemented, and it is the one symbol here that the Bip 5 does not reach.
- The level-2 alternatives do not substitute. `@zos/storage.sessionStorage` is
  `>= 2` but api/zos-storage.md describes it as "data is cleared after exiting
  the Mini Program", which is the opposite of the requirement.
  `@zos/storage.localStorage-instance` is `>= 2` and describes persistence
  correctly, but it is not a symbol a developer can import — see gap G15.
- Everything else the app uses that states a level is `>= 2` and so within reach.

So: the Device App would run on a Bip 5 with persistence removed. As specified,
it does not. Separately, the 320 x 380 screen needs its own `targets` entry with
its own `designWidth` (`patterns/multi-screen-adaption.md` — `px` scales against
`designWidth`), and the Bip 5 has 1 key against the Bip 6's 2.

Caveat the KB itself asks for: `compatibility/devices.md` records each device's
*latest* level, so this assumes an updated watch — "It says nothing about the
firmware a given user is on".
