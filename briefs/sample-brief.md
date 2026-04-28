# HCP Engagement Brief — Arventix Hypertension Education Initiative

**Brand:** Arventix (Meridian Therapeutics) [FICTIONAL BRAND — real drug class: ARB/antihypertensive]
**Indication:** Uncontrolled Hypertension in high-cardiovascular-risk patients
**Brief owner:** Brand Marketing — HCP Engagement
**Date:** Q2 2026
**Status:** Draft for cross-functional review

---

## Campaign Objective

Increase primary-care and cardiology HCP awareness of updated hypertension treatment guidelines and the clinical profile of Arventix (a fictional ARB) as an option for patients with uncontrolled blood pressure and elevated cardiovascular risk. Initiative is **education-led** — focused on the point of clinical decision, not promotional conversion.

**Primary success metric:** Rx lift — measurable increase in Arventix prescribing among engaged HCPs within 90 days of first content exposure, benchmarked against a matched non-exposed control cohort.

---

## Target Audience

### KOL Prioritization
- **Tier 1 (KOL Influence Score ≥ 7.0):** Priority for EHR point-of-care placement. High peer network reach — engaging these HCPs creates a cascade effect across connected prescribers.
- **Tier 2 (KOL Score 4.0–6.9):** On-demand CME track. Monitor for Rx lift signal.
- **Tier 3 (KOL Score < 4.0):** Exclude from initial wave. Revisit in Phase 2.

### Specialty Targets
- **Primary:** Internal medicine and family medicine physicians who manage hypertension in primary care.
- **Secondary:** Cardiologists receiving referrals from primary care for resistant hypertension cases.
- **MIPS signal:** Prioritize HCPs who score below the national benchmark on MIPS Quality Measure #236 — Controlling High Blood Pressure. These providers have the highest patient population need and are most likely to be receptive to updated treatment education.

### Geography
- Southeast US — prioritize Florida, Georgia, Tennessee, North Carolina, South Carolina.
- **Care setting:** Outpatient primary care clinics, multi-specialty groups, community health centers. Exclude inpatient and ED.

---

## EHR Trigger Logic

Display the Arventix education sidebar card at the **point of clinical decision** when all of the following conditions are met:

1. HCP specialty = Internal Medicine OR Family Medicine OR Cardiology
2. Patient encounter includes ICD-10 code **I10** (Essential Hypertension)
3. Most recent documented blood pressure reading > 140/90 mmHg (uncontrolled signal)
4. HCP KOL Influence Score ≥ 4.0 (Tier 1 or Tier 2)
5. HCP has not received this card in the prior 7 days (frequency cap — pending confirmation)
6. HCP has fewer than 20 Arventix Rx written in the past 90 days (suppress for already-converted prescribers)

**KOL cascade branch:** If HCP KOL Score ≥ 7.0 AND peer network includes ≥ 50 other target-segment HCPs, flag for coordinated KOL outreach — this HCP is a network amplifier.

**Next-best-action logic:** If HCP views the EHR card but does not engage within 48 hours, queue a follow-up on-demand CME invitation via email.

---

## Channel Mix

1. **EHR point-of-care messaging** — sidebar education card surfaced at clinical trigger (I10 + uncontrolled BP signal). Short-form (60–90s). Fair-balance language required.
2. **On-demand CME modules** — 10–15 minute accredited video modules on updated hypertension guidelines and ARB class profile. Peer-reviewed, neutral tone.
3. **Follow-up email** — triggered 48 hours after EHR card exposure with no engagement. Links to CME module.

Rep-delivered detail aids and paid display are explicitly out of scope for this initiative.

---

## Measurement Plan

| Metric | Definition | Target |
|---|---|---|
| **Rx lift (primary)** | % increase in Arventix Rx among engaged HCPs vs. matched control | ≥ 12% lift at 90 days |
| EHR card engagement rate | % of triggered cards opened or expanded | ≥ 20% |
| CME module completion | % of HCPs who started a module and completed it | ≥ 55% |
| Email click-through | % of follow-up emails resulting in CME module open | ≥ 14% |
| KOL cascade coefficient | Avg. peer Rx change per Tier 1 HCP engaged | Baseline in Phase 1 |
| Time-to-first-Rx | Days from first content exposure to first Arventix Rx | Track only |

**Note:** Rx lift tracking requires HCP-level prescribing data from a licensed data partner. Legal must confirm data use agreement before this metric is activated. No patient-level data is used anywhere in this initiative.

---

## Content Requirements

- All assets must be MLR-approved before any live placement.
- EHR card: Short-form (60–90s), must include fair-balance and ISI reference. Format constraints for the EHR sidebar require design review to fit required disclosures.
- CME module: Peer-reviewed, accreditation partner must confirm independence from promotional content.
- All content must reference updated hypertension guidelines (2023 AHA/ACC) as the educational anchor — not Arventix efficacy data.

---

## Key Messages

1. Uncontrolled hypertension in high-CV-risk patients carries elevated morbidity risk — updated guidelines support earlier intensification.
2. ARB class profile: mechanism, tolerability, and patient population fit.
3. Clinical decision support: when to consider treatment adjustment at the point of care.

---

## Timeline

| Milestone | Target Week |
|---|---|
| Brief approval | Week 0 |
| MLR / CME accreditation review | Weeks 1–4 |
| Asset production | Weeks 3–7 |
| EHR trigger QA and vendor configuration | Weeks 5–7 |
| Soft launch (Tier 1 HCPs, 2 EHR partners) | Week 8 |
| Email follow-up activation | Week 9 |
| Rx lift baseline locked | Week 10 |
| Full rollout (Tier 1 + Tier 2) | Week 12 |
| 90-day Rx lift readout | Week 22 |

---

## Assumptions

- EHR vendor partnerships in place for at least two major EHR systems with sidebar placement capability.
- Structured BP reading data is accessible within the EHR trigger logic (not all EHR systems surface this consistently — verify with vendor).
- CME accreditation partner is contracted and timeline aligned.
- HCP targeting data sourced from licensed third-party HCP data vendor — not internal PHI.
- KOL Influence Scores sourced from third-party provider.
- MIPS quality measure data used for audience prioritization only — not for patient-level targeting.
- Rx lift benchmarking requires licensed prescribing data — partnership must be confirmed by Week 4.

---

## Known Blockers

- BP reading data availability within EHR trigger logic is unconfirmed — may require manual rule fallback using ICD-10 I10 alone.
- CME content independence requirements limit how prominently Arventix branding can appear in module content.
- Rx lift measurement requires legal sign-off on prescribing data sourcing — currently unresolved.

---

## Dependencies

- MLR approval of all assets before any live placement.
- EHR vendor configuration for sidebar placement and frequency cap enforcement.
- CME accreditation partner timeline.
- Legal sign-off on Rx lift data sourcing.
- Medical Affairs alignment on key message framing.

---

## Open Questions

1. Can the EHR trigger reliably surface BP reading values, or do we fall back to ICD-10 I10 alone?
2. Frequency cap for EHR card: 1x per week per HCP? Confirm with compliance.
3. Opt-out mechanism for HCPs who decline point-of-care messaging — design not yet defined.
4. Which prescribing data partner for Rx lift tracking, and under what data use agreement?
5. Is the 20 Rx/90-day suppression threshold the right cutoff for "already converted"?

---

## Risks and Compliance Notes

- **Off-label risk:** All content must stay anchored to approved indication (hypertension). No cardiovascular outcomes claims unless label supports them.
- **Fair-balance on EHR card:** Short-form format makes full ISI impractical — agree on abbreviated ISI approach with regulatory.
- **CME independence:** Contractual guardrails required to prevent perceived promotional influence on accredited content.
- **Rx lift data:** Prescribing behavior tracking at HCP level requires careful data use agreement — confirm no patient-level data flows.
- **MIPS data use:** Used for audience prioritization only. Must not be referenced in any HCP-facing communication.
- **BP trigger reliability:** If structured BP data is unavailable, the trigger falls back to diagnosis code only — lower precision, higher false-positive exposure rate.
- **No PHI:** This initiative targets at the HCP level only. No patient-level data is used in triggering, targeting, or measurement.
