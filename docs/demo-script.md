# Demo Script — HCP Brief Workflow Web Demo
# hcp-brief-demo.vercel.app | ~5–8 minutes

Keep this open on the side. Speak conversationally — don't read it verbatim.

---

## OPENING (30 sec)
**[Screen: homepage]**

> "I built this as a prototype to explore what an HCP engagement brief intake-to-delivery
> pipeline looks like when you wire it together with AI agents. Everything is fictional —
> no real PHI, no real brand — but the structure mirrors how a real brief moves through
> planning, compliance, QA, and evaluation at a place like Relevate."

One line if they ask why: *"I wanted something tangible I could show, not just describe."*

---

## THE HOMEPAGE (1 min)
**[Screen: homepage — hero + pipeline strip]**

Point to the 6-stage pipeline strip:

> "Six agents in sequence. Each one is a single focused LLM call — Brief Intake,
> Strategy Planner, Delivery, then QA and Compliance run in parallel, and finally
> an Evaluator that scores the full output."

Key point to land:
> "The parallelization isn't cosmetic. QA and Compliance both only need the
> requirements and the delivery package — they don't depend on each other —
> so running them simultaneously cuts total runtime by about 40%."

**[Scroll to brief cards]**

> "I built two briefs on purpose. Cardivex is well-scoped — good trigger logic,
> clear KOL tiering, defined metrics. Glucavance is intentionally underspecified —
> a first-draft brief a brand team might actually send over. Running both shows
> how the pipeline responds to input quality."

---

## RUN CARDIVEX (2 min)
**[Click: Run Cardivex Pipeline]**

While the pipeline animates:
> "Each stage fires in order. You can see the output summary as it lands — what
> the agent actually produced, not just that it ran."

Point out PARALLEL label when QA + Compliance run:
> "There — QA and Compliance are running simultaneously. Both finish before
> the Evaluator can start."

**[Pipeline completes — scroll to results]**

> "Score of 80. ADEQUATE. Five quality dimensions — requirement coverage,
> targeting clarity, QA completeness, risk detection, documentation quality.
> The evaluator isn't self-congratulatory: targeting clarity scores 80 because
> the KOL tiering criteria could be tighter. That's honest."

Point to Pipeline Insight callout:
> "The 4 flags are real pre-launch blockers — unresolved Rx lift data partnership,
> frequency cap not specified. In a production system, a flag count above a threshold
> would trigger a mandatory human review checkpoint before any asset goes to MLR."

Point to the artifact tabs (Plan / Delivery / Compliance):
> "These aren't raw JSON — they're the actual formatted documents the agents produced.
> The Plan is what a strategist would review. The Delivery package is what ops would
> execute against. The Compliance tab is the risk memo."

---

## RUN GLUCAVANCE (1–2 min)
**[Navigate back → Run Glucavance Pipeline]**

> "Now the weak brief. Same pipeline, weaker input."

When results load:
> "54. RISK. Eight flags versus four — including a critical one: the CME is
> co-developed with the brand team, which is an independence violation. There's
> also a PHI risk because the brief uses patient BMI as a targeting signal, and
> an off-label risk from weight loss messaging for a diabetes drug."

Land the key point:
> "In a production system, anything below 65 triggers mandatory human review.
> That's the value of a calibrated evaluator — it's not just generating outputs,
> it's telling you which outputs you shouldn't trust yet."

---

## UNDER THE HOOD (1 min — only if they ask)

> "The backend is TypeScript with the Anthropic SDK. Six agents, each a focused
> LLM call. Prompts live in markdown files separate from the code — a brand ops
> person can tighten the compliance prompt without touching TypeScript."

> "The frontend is Next.js with Server-Sent Events for the live stage animation.
> Pre-run mode replays real artifact data with simulated delays — keeps it under
> Vercel's timeout limit while still showing the actual pipeline behavior."

> "The eval scores aren't calibrated against a labeled human-review set — that's
> the honest limitation. In production you'd run 50–100 reviewed briefs through
> it and tune the rubric."

---

## CLOSING (30 sec)

> "What I wanted to show is the shape of the problem: how an AI workflow takes
> an unstructured brief and produces structured, reviewable, auditable outputs —
> including the unflattering parts. The compliance flags, the surfaced ambiguities,
> the calibrated scores. That precision layer is what makes this trustworthy at
> the scale Relevate operates at."

---

## QUICK ANSWERS — if asked

| Question | Answer |
|---|---|
| Why not stream live API calls? | Vercel free tier has a 10s function timeout — pre-run mode replays real outputs with delays. Same result, no cold-start risk during a demo. |
| Why two briefs? | Shows the pipeline is discriminating, not just generative. A pipeline that scores everything 85+ tells you nothing. |
| Why parallel QA + Compliance? | They share inputs (requirements + delivery) but have no shared outputs — safe to parallelize, cuts runtime ~40%. |
| What would make this production-ready? | Structured outputs via tool use (not regex JSON), human-in-loop checkpoint at compliance, calibrated eval against labeled runs, resumable checkpointing, real HCP data connectors. |
| What didn't work? | JSON parsing was brittle early on — regex on LLM output breaks. Switched to stricter prompting + validation. Also the evaluator is self-graded — honest limitation. |
