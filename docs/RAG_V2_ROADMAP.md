# RAG Pipeline Visualizer V2 — Implementation Roadmap (Phase 3)

> Status: **awaiting approval** · Companion: `RAG_V2_ARCHITECTURE.md`
> Rule of engagement: **one milestone at a time, approval between milestones, V1 must
> keep working after every milestone** (each ends with the V1 regression suite green
> and a deployable build).

Legend — Complexity: **S** (≤ ½ day) · **M** (~1 day) · **L** (2–3 days) · **XL** (3–5 days).
Every milestone ends with the same **standing gate**: `tsc --noEmit` clean · lint clean ·
unit tests green · V1 E2E regression green · `next build --webpack` clean · manual smoke
on mobile viewport. Only *additional* checks are listed per milestone.

Educational objective coverage (architecture §A6) is enforced from M1 onward — a
milestone that ships a feature without its objective entry fails its own tests.

---

## M0 · Foundations & Safety Net

**Objectives:** Test infrastructure and internal refactors that make the next 13
milestones safe. Zero visible change.
- Add **Vitest** + @testing-library/react (jsdom) and **Playwright** (checked into
  `e2e/`, `/api/rag/*` route-interception fixtures so CI needs no OpenAI key + one
  env-gated live smoke spec).
- Write the **V1 regression suite** first (characterization tests: ingest sample → ask →
  answer with citations; param staleness; play mode transport; export) — this is the
  contract every later milestone must keep green.
- Refactor `ragStore.ts` into slices (`pipelineSlice` + placeholders) preserving the
  public API; add `lib/persist.ts` (versioned localStorage helper); extend `theme.ts`
  with depth tokens + cinema palette (unused as yet); add `FeatureId`/`UiMode` types.

**Files:** `package.json`, `vitest.config.ts`, `playwright.config.ts`, `e2e/*`,
`ragStore.ts` (split), `lib/persist.ts`, `theme.ts`, unit tests for `text.ts`,
`retrieval.ts` (golden fixtures for cosine/BM25/PCA).
**Dependencies:** none.
**Risks:** store refactor subtly changing behavior (mitigated by writing the
characterization tests *before* refactoring); Vitest/Next 16/React 19 config friction;
webpack-only constraint must hold.
**Complexity:** L
**Acceptance criteria:** V1 pixel-identical and behaviour-identical; regression suite
green against both pre- and post-refactor store; `npm test` + `npm run e2e` are one-command.
**Testing checklist:** ☐ unit: text/retrieval/store actions ☐ E2E: full sample run
(mocked) ☐ E2E: live smoke (local only) ☐ export JSON unchanged shape.

---

## M1 · Education Core — Concepts, Objectives, Personas

**Objectives:** Pillar A's spine, before any new visualization exists to hang on it.
- `education/concepts.ts` — full registry (~30 entries, all fields) covering every
  StageId and every RagParams key.
- `education/objectives.ts` — objective map + `SCREEN_ANSWERS`; **CI completeness tests**.
- `<Concept>` card component (hover/tap, four-question layout, "adjust it →" deep-links)
  wired into the existing Inspector, ParamsPanel, MetricsPanel labels.
- **Persona system**: `personas.ts` profiles, `usePersona()`, `uiSlice.persona`,
  `PersonaPicker` (first-visit welcome + header switcher). Applied to *existing* V1
  surfaces: copy composition in Inspector/narration, engineer's **JSON artifact tab** in
  the Inspector, executive's collapsed-pipeline outcome strip (v1 of the outcome card:
  real cost/latency/eval only; ROI card arrives M8).
- `learningMoments.ts` engine + first 6 rules (threshold rejections, rerank promotion,
  context under-utilization, overlap zero, empty retrieval, high hallucination risk).

**Files:** `education/*`, `journey/` types only, `core/Inspector.tsx` (JSON tab +
concept wrappers), `RagShell.tsx` (picker, persona chrome), `uiSlice`, tests.
**Dependencies:** M0.
**Risks:** copy volume (30 concepts × 5 fields is real writing — budget it); persona
conditionals leaking into components (mitigation: `usePersona()` only, enforced in review);
over-triggering learning moments (frequency cap + dismissal memory from day one).
**Complexity:** XL (half of it is authoring quality copy)
**Acceptance criteria:** every stage/param term in the existing UI is concept-wrapped;
switching personas visibly re-lenses Inspector + metrics without reload; objective tests
fail if a concept/objective is missing; JSON tab shows real artifacts for every stage.
**Testing checklist:** ☐ registry completeness (CI) ☐ objectives coverage (CI)
☐ persona switch E2E (5 personas × key screens) ☐ ConceptCard keyboard + screen-reader
☐ moments fire on real fixtures, capped, dismissible.

---

## M2 · Learning Journey & Onboarding

**Objectives:** progressive disclosure for first-time users.
- `journey/curriculum.ts` (8 chapters), `useJourney()` with **event-detected
  completion**, `JourneyChip` progress ring, `ChapterCard`, soft-gated collapsed docks
  for journey-enabled personas, "restart journey", persistence.
- First-visit flow: persona pick → chapter 1 spotlight on "load sample".

**Files:** `journey/*`, `RagShell.tsx`, `uiSlice`/`journeySlice`, tests.
**Dependencies:** M1 (personas, concepts). Chapters 4/6/7 reference features that ship
later — they render as "coming in this lab soon" placeholders? **No — never placeholder**:
the curriculum ships with chapters 1–3 + 5 active and later chapters *registered but
hidden*, activated in M9/M12 when their features land.
**Risks:** journey nagging (never modal, one nudge per chapter); completion detection
false-positives (unit-test the detectors against event fixtures).
**Complexity:** M
**Acceptance criteria:** fresh profile sees welcome → persona → guided first ingestion;
chapter completion only via real actions; journey fully ignorable; engineer persona
defaults journey-off.
**Testing checklist:** ☐ detector units ☐ E2E first-visit flow ☐ persistence across
reload ☐ soft-gate open-now affordance works.

---

## M3 · Living Data Flow (F1)

**Objectives:** the canvas comes alive; motion grammar's first consumers.
- `motion/grammar.ts` + `reducedMotion.ts`; `canvas/useNodeRects.ts` (ResizeObserver),
  `canvas/EdgeLayer.tsx` (SVG paths), `canvas/PacketSystem.ts` (rAF, store-subscribed
  outside React, typed packet glyphs bound to real artifact counts).
- Node states adopt grammar tokens (`pulse`/`settle`/`recede`/`shake`); V1's `Edge`
  component retired.

**Files:** `canvas/*`, `motion/grammar.ts`, `core/PipelineCanvas.tsx`, tests.
**Dependencies:** M0 (M1 for packet concept-tooltips, soft).
**Risks:** rects drift on resize/mobile stacking (observer + rAF re-measure); packet
loop leaking after unmount (strict lifecycle test); 60 fps on low-end (transform-only
writes, batch above 40 packets).
**Complexity:** L
**Acceptance criteria:** packets flow per real transition with payload-shaped glyphs
(pages→chunks→vectors); error stage shakes red; reduced-motion swaps to static edge
highlights; no dropped frames in DevTools perf trace during full ingestion.
**Testing checklist:** ☐ unit: packet scheduling from event fixtures ☐ E2E: packets
present during run, absent after ☐ reduced-motion E2E ☐ manual FPS trace ☐ mobile
vertical layout edges correct.

---

## M4 · Replay Timeline (F2)

**Objectives:** event sourcing + scrubbable history.
- `lib/events.ts` (`PipelineEvent`, `withRecording(gate)` — wired into *all* runs),
  `eventsSlice`, `timeline/useTimelineProjection.ts`, **`usePipelineView()`** adopted by
  every visualization component (Inspector views, canvas, answer panel read
  projection-or-live), `TimelineDock` (D3 ruler, duration blocks, scrub head,
  return-to-live, transport).

**Files:** `lib/events.ts`, `timeline/*`, `eventsSlice`, touch-every-visual-component
(read path only), tests.
**Dependencies:** M0; M3 (canvas replays packets on scrub — nice, not blocking).
**Risks:** the read-path migration is wide (mechanical but touches ~10 components — the
V1 regression suite is the net); mutation sneaking into artifacts breaking snapshots
(add a dev-mode freeze on snapshot refs); scrub during in-flight run (explicit banner +
pause semantics, tested).
**Complexity:** XL
**Acceptance criteria:** after any run, scrubbing to any point shows exactly the
artifacts that existed then (chunks/vectors/answer vanish when scrubbed before their
stage); live run unaffected by scrubbing; params always edit live state; memory stable
across 10 successive runs (refs, not copies).
**Testing checklist:** ☐ unit: projection at every seq of a fixture run ☐ unit: recording
wraps manual + play + experiment runs ☐ E2E: scrub back → artifacts disappear → return
to live ☐ E2E: scrub mid-run banner ☐ heap snapshot sanity.

---

## M5 · Director, Stories & Cinematic Play (F3 upgrade)

**Objectives:** attention choreography; Play Mode becomes the five-minute lesson.
- `motion/director.ts` (GSAP master timelines: `spotlight`, `flyTo` via CameraRig
  CSS-transform wrapper, `fadeChrome`, `beat`, `sequence`, `seek`), `canvas/CameraRig.tsx`.
- `stories/*` — arcs 1 & 2 with persona-voice narration beats quoting the registry.
- Play Mode upgrade: gates drive Director; narration card redesigned; **Finale Summary**
  (timings ribbon, eval bars for now, cost, top coach slots reserved).
- Timeline scrub can `seek` Director sequences (F2 ∪ F3).

**Files:** `motion/director.ts`, `canvas/CameraRig.tsx`, `stories/*`,
`core/PlayMode.tsx`, `presentation/SummarySlide.tsx` (shared early), tests.
**Dependencies:** M3 (canvas/grammar), M4 (seek), M1 (voice).
**Risks:** GSAP + Framer Motion fighting over transforms (strict ownership: Director
owns the rig wrapper only); camera zoom vs sticky/fixed elements (rig wraps canvas only,
chrome fades instead of scaling); pause/speed/step interplay with GSAP timescale
(reuse existing dwell logic as the clock, GSAP follows).
**Complexity:** XL
**Acceptance criteria:** Play on the sample = a coherent narrated film: camera moves to
each stage, others recede, narration matches persona voice, finale summary shows real
numbers; 0.5/1/2×, pause, step, skip all work; Esc always exits cleanly; reduced-motion
= cuts, not pans.
**Testing checklist:** ☐ unit: story beats reference valid stages/concepts ☐ E2E: full
play run (mocked, fast dwell) hits all 14 beats + finale ☐ E2E: transport controls
☐ reduced-motion ☐ FPS trace during flight.

---

## M6 · Performance Core

**Objectives:** the floor for 1,000 chunks — before the Universe demands it.
- `lib/workers/analysis.worker.ts` + `workerClient.ts` (PCA, k-means, BM25 index;
  transferable Float32Arrays); embeddings migrate to one `Float32Array` with accessor;
  batched embed calls (100/request) with real progress into the packet system;
  windowing hook + adoption in ChunkView/IndexView; `MAX_CHUNKS` 150 → 1,000.

**Files:** `lib/workers/*`, `lib/retrieval.ts` (typed-array paths), `lib/pipeline.ts`
(batching), `pipelineSlice` (storage shape), ChunkView/IndexView, tests.
**Dependencies:** M0 (fixtures verify identical math); independent of M3–M5.
**Risks:** worker bundling under webpack/Next 16 (spike first — `new Worker(new URL(...))`
pattern; fallback: inline-thread module if bundler fights); float32 precision drift vs
fixtures (tolerance-based assertions); large-PDF chunk counts hitting API cost —
batching shows a cost preview above 300 chunks.
**Complexity:** L
**Acceptance criteria:** 1,000-chunk synthetic doc ingests with UI never blocking >16 ms
(main-thread long-task trace); math results match V1 fixtures within 1e-4; chunk lists
scroll smoothly at 1,000 rows; 150-chunk behaviour byte-identical.
**Testing checklist:** ☐ unit: worker math vs golden fixtures ☐ unit: batching splits +
reassembles ☐ perf: long-task trace on 1k ingest ☐ E2E unchanged on sample doc.

---

## M7 · Embedding Universe (F4)

**Objectives:** the centerpiece "meaning has geometry" scene.
- `universe/*`: lazy R3F canvas, `InstancedChunks` (instanced mesh + per-instance
  color/scale), `ClusterHalos` (k-means from worker, TF-term labels), `QueryShip`
  (Catmull-Rom flight, Director-drivable), retrieval glow + trace lines, instanceId
  raycast tooltip (chunk/page/tokens/sim/retrieved/cited), OrbitControls + flyTo,
  degradation ladder, **`UniverseDataView`** table fallback (a11y/no-WebGL/low-end).
- Replaces `EmbeddingSpace.tsx` inside EmbedView; also opens as a featured mode surface.

**Files:** `universe/*`, `core/Inspector.tsx` (EmbedView swap), `stories/` beat update,
delete `EmbeddingSpace.tsx`, tests.
**Dependencies:** M6 (worker, typed arrays), M5 (Director flight), M1 (persona copy).
**Risks:** the one V1-replacement in the plan (keep `EmbeddingSpace` in tree until
acceptance passes, then delete); instancing + raycast edge cases (hover flicker —
throttle + hysteresis); mobile GPU (cap 400 instances, halos off, data-view-first
heuristic).
**Complexity:** XL
**Acceptance criteria:** 1,000 chunks at 60 fps desktop (≤ 2 draw calls for chunks);
ship flies to retrieved centroid on ask and neighbours glow in rank order; hover
tooltip accurate vs store; clusters labeled with real TF terms; data view carries
identical information; student persona sees analogy caption, researcher sees dim/cluster
stats.
**Testing checklist:** ☐ unit: k-means/TF labels on fixtures ☐ E2E: ask → retrieved ids
match glowing ids (via data view) ☐ WebGL-off fallback ☐ FPS trace 1k ☐ mobile touch
orbit smoke.

---

## M8 · Comprehension Cluster — Prompt MRI, Context Container, Cost Meter, Executive Lens (F8 · F9 · F10)

**Objectives:** make the prompt, the context limit, and the money tangible.
- `prompt/PromptMRI.tsx` (expandable blocks, token donut, per-chunk sub-blocks with
  trace-hover), `prompt/ContextContainer.tsx` (SVG vessel, `fill`/`overflow` grammar,
  live re-flow on budget drag + learning moment), `metrics/CostMeter.tsx` (countup
  odometers, embed/generate split, today via `persist`, monthly estimate labeled),
  **Executive ROI card** (real accuracy/latency/cost + editable visible assumptions).

**Files:** `prompt/*`, `metrics/CostMeter.tsx`, `core/Inspector.tsx` (PromptView swap),
`core/MetricsPanel.tsx` (composition), `historySlice` (costDays only), tests.
**Dependencies:** M1 (concepts/personas/lens), M0. Independent of universe/timeline.
**Risks:** vessel animation binding drift vs actual trimming logic (single source: the
prompt stage's `kept` computation extracted to a pure function both consume); ROI card
credibility (assumptions always visible, "estimate" labels).
**Complexity:** L
**Acceptance criteria:** dragging contextBudget re-flows blocks instantly and matches
what the next real prompt actually contains; an over-budget chunk visibly fails to fit
and the moment explains it; costs tick up on every real API response; executive persona
sees the outcome card leading and internals collapsed; every metric concept-wrapped.
**Testing checklist:** ☐ unit: trim function fixtures (vessel = prompt truth) ☐ unit:
day-bucket cost persistence ☐ E2E: budget drag → prompt stage respects it ☐ E2E:
executive lens ☐ countup reduced-motion (jump to value).

---

## M9 · Trust Cluster — Hallucination Radar + AI Detective (F13 · F5)

**Objectives:** trust becomes inspectable, per sentence.
- `evaluate` route extended: per-sentence `{support, evidenceChunkIds}` (≤ 25 sentences,
  JSON mode, malformed-safe); `radar/EvalRadar.tsx` (D3 polygon; researcher keeps bars
  alongside); answer sentences tinted by support (color + underline style, never
  color-only); `radar/SentenceEvidence.tsx` (nearest-chunk evidence for unsupported
  sentences via one sentence-embed call + coach-rule suggestions);
  `detective/*` — Director-driven backward walk (arc 3): sentence → citations → prompt
  block → score comparison → universe inset → PDF page region highlight; entered from
  answer card; unsupported sentences route into evidence view. Journey chapter 4 activates.

**Files:** `src/app/api/rag/evaluate/route.ts`, `radar/*`, `detective/*`,
`stories/answerAnatomy.ts`, `core/AnswerPanel.tsx` (tints + entry points),
`journey/curriculum.ts` (activate ch. 4), tests.
**Dependencies:** M5 (Director), M7 (universe inset — degradable to skip), M1.
**Risks:** judge classification quality (prompt-engineer with explicit rubric; verdicts
labeled "LLM judgment, not ground truth" — honesty rule); evaluate latency growth (cap
sentences, single call); PDF region highlight requires char-offset → page-position
mapping (approximate by text-item matching; degrade to whole-page highlight if match
confidence low — never a wrong highlight).
**Complexity:** XL
**Acceptance criteria:** every answer sentence carries a support tint with an evidence
path; detective walk runs end-to-end on the sample answer with real data at every step;
radar matches scores; malformed judge output degrades to V1 behaviour (doc-level only).
**Testing checklist:** ☐ unit: sentence-verdict parsing (incl. malformed) ☐ unit: radar
geometry ☐ E2E: detective full walk (mocked) ☐ E2E: unsupported-sentence evidence flow
☐ a11y: tints not color-only ☐ live smoke: real judge run.

---

## M10 · Inside GPT's Brain (F18)

**Objectives:** the honest generation theater.
- `generate` route gains **streaming mode** (SSE/ReadableStream token deltas; non-stream
  path kept for compatibility); pipeline generate stage consumes the stream (answer
  builds incrementally in store — timeline event on completion unchanged).
- `brain/*`: `SimulationBadge` (persistent honesty label), five acts — prompt ingestion
  (blocks flow into vessel, real token counts), context working set, **live token
  stream**, evidence selection (citation markers streaming → trace lines to chunks),
  grounded assembly (sentences settle with post-hoc support tints). Live mode + replay
  mode (from event log). Engineer persona: tokens/sec, TTFT, completion meter.

**Files:** `src/app/api/rag/generate/route.ts`, `_lib/openai.ts` (stream helper),
`lib/pipeline.ts` (generate stage), `brain/*`, `canvas` entry point on generate node,
tests.
**Dependencies:** M4 (replay), M9 (act-5 support tints — degradable), M5 (Director).
**Risks:** SSE through Vercel serverless (supported on Node runtime via ReadableStream —
spike first; fallback: chunked polling, visuals identical); stream error mid-answer
(partial answer discarded cleanly, stage errors per V1 semantics); narration accidentally
implying cognition (copy review against the honesty contract is an acceptance item).
**Complexity:** L (visuals) + M (streaming plumbing) → **XL** combined
**Acceptance criteria:** tokens appear in true model order (live smoke verifies vs final
text); badge visible in every brain state; citations light traces as they stream; replay
mode reproduces the last generation without an API call; all copy passes the
observable-only review; non-brain generate path byte-compatible with V1.
**Testing checklist:** ☐ unit: SSE parser (split-token frames) ☐ unit: citation-in-stream
detection ☐ E2E: brain live run (mocked stream) ☐ E2E: replay without network ☐ live
smoke streaming ☐ copy audit vs honesty contract.

---

## M11 · Memory Cluster — Chunk Life Story + Retrieval Heat Map (F6 · F7)

**Objectives:** the document develops a history; parameters connect to *which text ever
gets used*. Researcher persona's latency distributions land here too.
- `lib/history.ts` + `historySlice` full build-out (per-chunk lifecycle across queries,
  page heat, per-stage latency samples across runs); `ChunkProfile.tsx` (identity,
  similarity sparkline, counters, lifecycle mini-timeline) opened from any chunk card;
  `heatmap/*` (page strip, D3 sequential tint, click-to-zoom with per-chunk regions);
  researcher **latency distribution** view (strip/violin per stage from real samples).

**Files:** `lib/history.ts`, `historySlice`, `ChunkProfile.tsx`, `heatmap/*`,
`metrics/` (distributions), chunk-card entry points across Inspector/AnswerPanel/
universe tooltip, tests.
**Dependencies:** M4 (events feed history), M1. Universe/PDF pieces reuse existing infra.
**Risks:** history growing unbounded (cap samples per chunk, ring buffers); heat map
misread as importance (legend copy: "frequently *retrieved for your questions* — ask
different questions, the map changes" — itself the lesson).
**Complexity:** L
**Acceptance criteria:** after 3+ different questions, chunk profiles show accurate
per-query similarity history and counts; heat map matches retrieval logs exactly; new
document resets history; researcher sees real latency distributions after ≥ 3 runs.
**Testing checklist:** ☐ unit: accumulator from event fixtures ☐ unit: heat scale
mapping ☐ E2E: 3-question session → profile + heat assertions ☐ memory cap test.

---

## M12 · Experimentation Cluster — A/B Playground, AI Lab, Smart Coach (F11 · F12 · F14)

**Objectives:** the "how can I improve it" loop closes; journey chapters 6–7 activate.
- `compareSlice` + `playground/*` (pin-as-A, param-diff highlight, embed-reuse detection
  + cost preview, `DiffView` with radar overlay / latency bars / retrieved-Venn / both
  answers); `lab/experiments.ts` (9 presets with hypothesis-first flow) +
  `ExplanationEngine.ts` (deterministic diff heuristics vs pinned baseline; optional LLM
  rephrase, engineer sees raw heuristics); `coach/insights.ts` rules + `CoachPanel`
  (ambient badge, ranked cards, one-click apply via existing param plumbing) + coach
  slots in Finale Summary (reserved in M5) go live.

**Files:** `playground/*`, `lab/*`, `coach/*`, `compareSlice`, `coachSlice`,
`ParamsPanel` (pin/apply hooks), `SummarySlide` (coach slots), `journey` (ch. 6–7),
tests.
**Dependencies:** M11 (history for coach rules), M9 (radar overlay), M8 (cost preview),
M4 (RunRecords from events).
**Risks:** A/B cost surprises (preview + embed-reuse tested hard); explanation engine
overclaiming (every sentence template cites the numeric diff it's built from — unit-
tested template↔data binding); coach nagging (severity threshold, collapse-by-default).
**Complexity:** XL
**Acceptance criteria:** pin → change chunk size → compare shows real diffs including
re-embed cost that matches actual usage delta; unchanged-chunk comparison costs $0 extra
on embeddings; every lab preset runs, and its explanation quotes only measured values;
coach suggestions apply correctly and disappear once addressed.
**Testing checklist:** ☐ unit: embed-reuse detection ☐ unit: explanation templates from
fixture diffs (no unbound claims) ☐ unit: coach rules ☐ E2E: full A/B flow (mocked)
☐ E2E: hypothesis-first lab preset ☐ cost accounting reconciliation test.

---

## M13 · Presentation, Kiosk, Sound & Final Hardening (Pillar C · F16 · F17 polish)

**Objectives:** the show, and the ship.
- `presentation/*`: fullscreen shell (cinema dark variant, chrome fade, big-type
  narration, hotkeys with on-screen legend), **speaker notes** (presenter persona:
  story beats + talking-point notes rendered to a side rail / second-window-friendly
  layout), kiosk loop (auto-restart, rotating sample questions, idle reset), portrait
  card-deck variant.
- `audio/sound.ts` (synthesized cues mapped to grammar tokens, default OFF, persisted
  toggle) + presentation pad.
- Final hardening: full a11y audit (axe in Playwright across all modes), FPS audit on
  the three heaviest scenes, bundle-size report vs budget (explore ≤ V1+60 kB gz),
  cross-browser pass (Chrome/Safari/Firefox), copy proofread, `docs/RAG_V2_STORYBOARD.md`
  finalized, README for the feature.

**Files:** `presentation/*`, `audio/*`, `theme.ts` (cinema set live), `RagShell.tsx`
(mode entry), e2e additions, docs.
**Dependencies:** M5 (Director/arcs), M12 (summary content complete).
**Risks:** fullscreen API quirks (Safari); dark-variant contrast regressions (separate
AA audit); sound annoying (default off, instant-mute hotkey).
**Complexity:** L
**Acceptance criteria:** presenter persona lands directly in a demo-able fullscreen
experience with working hotkeys + speaker notes; kiosk survives an hour unattended
(memory + reset checked); sound off by default and fully redundant; all budgets met;
axe clean; the Five-Minute Test passes with a naive tester (manual, recorded).
**Testing checklist:** ☐ E2E: presentation run + hotkeys ☐ E2E: kiosk loop ×3 cycles
☐ axe across modes ☐ bundle report ☐ FPS traces archived ☐ manual five-minute test.

---

## Sequencing at a glance

```
M0 ──▶ M1 ──▶ M2
 │      └────────────┐
 ├──▶ M3 ──▶ M4 ──▶ M5 ─────────────▶ M9 ──▶ M10
 ├──────────▶ M6 ──▶ M7 ──────────────┘       │
 │                    M8 (parallel-safe) ─────┤
 │                    M11 ◀── M4              │
 │                    M12 ◀── M8/M9/M11 ──────┴──▶ M13
```

Deployment cadence: the feature ships behind the existing `/learn/rag` route the whole
time; each milestone is deployable (V1 regression green), so pushing to GitHub after any
approved milestone is safe. Recommended visible-release points: after M5 (the new
cinematic core), after M10 (the wow cluster), after M13 (V2 complete).
