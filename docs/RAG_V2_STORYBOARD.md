# RAG Pipeline Visualizer V2 — Storyboard

*The Interactive AI Museum, scene by scene. Every screen answers the four
questions (What is happening? Why? How does it affect answer quality? How
can I improve it?) and every animation is bound to real pipeline data.*

---

## The arc of a first visit (student persona, journey on)

1. **Welcome** — "Who's exploring today?" Five lenses over one pipeline.
   Pick Student → the guided journey begins, chapter 1 spotlighting *load
   sample* with a breathing ring.
2. **Ingest** (journey ch.1) — the top row lights up left to right; typed
   packets (`▣ → ▤ → ▦ → ⟨⟩`) flow along measured SVG edges as a PDF
   becomes pages, chunks, vectors. The replay timeline fills with
   duration blocks — embedding is visibly the slow one.
3. **Ask** (ch.2) — the question becomes a vector; the query ship flies
   in the Embedding Universe to the retrieved centroid; nearest chunks
   glow in rank order with trace lines. A grounded answer assembles,
   sentences tinted by the judge's per-sentence verdict.
4. **Open a node** (ch.3) — any stage opens its inspector: real
   artifacts, a concept card in the persona's voice, "adjust it →" chips
   that jump to the exact slider.
5. **Trace an answer** (ch.4) — the Evidence Detective walks one sentence
   backwards: claim → evidence → prompt slot → retrieval scores → the
   page. Unsupported claims get an evidence hunt that diagnoses the
   failure.
6. **Tune & re-ask** (ch.5) — move a dial, watch retrieval, the prompt
   vessel, and the answer re-flow. The Coach surfaces a ranked, one-click
   suggestion quoting the numbers that triggered it.
7. **Break it** (ch.6) — the AI Lab runs a sabotage preset, hypothesis
   first; the A/B verdict shows the measured damage.
8. **Compare** (ch.7) — pin A, change a dial, run B; radar overlay and
   an explanation engine that quotes only measured diffs settle the
   argument.
9. **Present** (ch.8) — Play Mode / Presentation Mode narrate the whole
   pipeline end to end, finishing on a finale recap of the run's real
   numbers and the Coach's top three suggestions.

---

## The three narrative arcs (`stories/`)

- **Arc 1 — The journey of a document** (upload → index): two-phase beats,
  intro quotes the Concept Registry in the persona's voice, payoff quotes
  the real numbers the stage just produced.
- **Arc 2 — The journey of a question** (query → evaluate).
- **Arc 3 — The anatomy of an answer** (backwards): shared by the
  Detective and Inside GPT's Brain.

## Motion grammar (`motion/grammar.ts`)

Nine tokens, each mapping a *meaning* to a *motion* bound to real data,
each with a reduced-motion variant: `packet-flow`, `pulse`, `settle`,
`recede`, `attract`, `fill`, `overflow`, `trace`, `shake`.

## The honesty contract

- Every metric is measured; no fabricated numbers anywhere.
- The Executive ROI card separates real measurements from user-editable,
  visible assumptions; projected figures are labelled "estimate".
- Inside GPT's Brain carries a persistent **Educational Simulation**
  badge and visualizes only observable stages — never hidden reasoning.
- Evaluation is labelled "LLM judgment, not ground truth" everywhere it
  appears; malformed judge output degrades to document-level scores.
