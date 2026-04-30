export const SAMPLE_BRIEF = `# HCP Engagement Brief — Arventix Hypertension Education Initiative

**Brand:** Arventix (Meridian Therapeutics) [FICTIONAL BRAND — real drug class: ARB/antihypertensive]
**Indication:** Uncontrolled Hypertension in high-cardiovascular-risk patients
**Brief owner:** Brand Marketing — HCP Engagement
**Date:** Q2 2026
**Status:** Draft for cross-functional review

## Campaign Objective
Increase primary-care and cardiology HCP awareness of updated hypertension treatment guidelines and the clinical profile of Arventix (a fictional ARB) as an option for patients with uncontrolled blood pressure and elevated cardiovascular risk. Initiative is education-led — focused on the point of clinical decision, not promotional conversion.

**Primary success metric:** Rx lift — measurable increase in Arventix prescribing among engaged HCPs within 90 days of first content exposure, benchmarked against a matched non-exposed control cohort.

## Target Audience
- **Tier 1 (KOL Influence Score ≥ 7.0):** Priority for EHR point-of-care placement.
- **Tier 2 (KOL Score 4.0–6.9):** On-demand CME track.
- **Tier 3 (KOL Score < 4.0):** Exclude from initial wave.
- **Primary:** Internal medicine and family medicine physicians
- **Secondary:** Cardiologists receiving referrals for resistant hypertension
- **MIPS signal:** Prioritize HCPs scoring below national benchmark on MIPS Quality Measure #236

## EHR Trigger Logic
Display at point of clinical decision when:
1. HCP specialty = Internal Medicine OR Family Medicine OR Cardiology
2. Patient encounter includes ICD-10 code I10 (Essential Hypertension)
3. Most recent documented BP > 140/90 mmHg
4. HCP KOL Influence Score ≥ 4.0
5. HCP has not received this card in the prior 7 days
6. HCP has fewer than 20 Arventix Rx in the past 90 days

## Channel Mix
1. EHR point-of-care messaging — sidebar education card at clinical trigger
2. On-demand CME modules — 10–15 minute accredited video modules
3. Follow-up email — triggered 48 hours after EHR card with no engagement

## Geography
Southeast US — Florida, Georgia, Tennessee, North Carolina, South Carolina`;

export const sampleRequirements = {
  objective:
    "Increase primary-care and cardiology HCP awareness of updated hypertension treatment guidelines and the clinical profile of Arventix (a fictional ARB) as an option for patients with uncontrolled blood pressure and elevated cardiovascular risk.",
  audience: {
    specialty: ["Internal Medicine", "Family Medicine", "Cardiology"],
    geography: [
      "Southeast US",
      "Florida",
      "Georgia",
      "Tennessee",
      "North Carolina",
      "South Carolina",
    ],
    care_setting: [
      "Outpatient primary care clinics",
      "Multi-specialty groups",
      "Community health centers",
    ],
    illustrative_codes: [
      "[ILLUSTRATIVE] I10 (Essential Hypertension)",
      "[ILLUSTRATIVE] MIPS Quality Measure #236 (Controlling High Blood Pressure)",
    ],
  },
  channels: ["EHR point-of-care messaging", "on-demand CME modules", "follow-up email"],
  content_type: "EHR sidebar education card + CME-style modules",
  assumptions: [
    "EHR vendor partnerships in place for at least two major EHR systems.",
    "Structured BP reading data is accessible within the EHR trigger logic.",
    "CME accreditation partner is contracted and timeline aligned.",
    "HCP targeting data sourced from licensed third-party vendor — not internal PHI.",
    "KOL Influence Scores sourced from third-party provider.",
    "MIPS quality measure data used for audience prioritization only.",
    "Rx lift benchmarking requires licensed prescribing data — confirmed by Week 4.",
  ],
  blockers: [
    "BP reading data availability within EHR trigger logic is unconfirmed.",
    "CME content independence limits how prominently Arventix branding can appear.",
    "Rx lift measurement requires legal sign-off on prescribing data sourcing.",
  ],
  dependencies: [
    "MLR approval of all assets before any live placement.",
    "EHR vendor configuration for sidebar placement and frequency cap enforcement.",
    "CME accreditation partner timeline.",
    "Legal sign-off on Rx lift data sourcing.",
    "Medical Affairs alignment on key message framing.",
  ],
  open_questions: [
    "Can the EHR trigger reliably surface BP reading values, or fall back to ICD-10 I10 alone?",
    "Frequency cap for EHR card: 1x per week per HCP? Confirm with compliance.",
    "Opt-out mechanism for HCPs who decline point-of-care messaging — not yet defined.",
    "Which prescribing data partner for Rx lift tracking, and under what data use agreement?",
    'Is the 20 Rx/90-day suppression threshold the right cutoff for "already converted"?',
  ],
  risks: [
    "Off-label risk: All content must stay anchored to approved indication (hypertension).",
    "Fair-balance on EHR card: Short-form format makes full ISI impractical.",
    "CME independence: Contractual guardrails required to prevent perceived promotional influence.",
    "Rx lift data: HCP-level prescribing tracking requires careful data use agreement.",
    "MIPS data use: Used for audience prioritization only. Must not appear in HCP-facing comms.",
    "BP trigger reliability: Fallback to diagnosis code only — lower precision.",
  ],
  recommended_path: "EHR point-of-care education as primary; on-demand CME as secondary",
};

export const sampleEval = {
  requirement_coverage: 0.9,
  targeting_clarity: 0.8,
  qa_completeness: 0.8,
  risk_detection: 0.7,
  documentation_quality: 0.8,
  overall_score: 0.8,
  overall_notes:
    "The brief captures the key elements well, with a thoughtful multi-channel approach. Some gaps exist around audience targeting precision, compliance guardrails, and risk detection. Overall, the plan is shippable with minor caveats.",
  flags: [
    "Audience definition could be tightened to a smaller geographic region and/or single specialty type to reduce unnecessary exposure.",
    "Unclear guidelines for tone and content independence of CME modules; need to establish robust guardrails.",
    "Frequency cap and opt-out mechanism for EHR messaging not yet defined; critical compliance requirements.",
    "Rx lift data partnership and legal review unresolved; impacts ability to measure impact.",
  ],
};

export const sampleTraces = [
  { stage: "intake", status: "success", duration_ms: 8469, output_summary: "Extracted objective and 6 structured fields from brief" },
  { stage: "planner", status: "success", duration_ms: 9348, output_summary: "Plan generated — 3 phases, 4 escalation points" },
  { stage: "delivery", status: "success", duration_ms: 8854, output_summary: "Delivery package — audience table, trigger criteria, suppression rules" },
  { stage: "qa", status: "success", duration_ms: 19733, output_summary: "Test plan generated — 8 categories, 18 test cases" },
  { stage: "compliance", status: "success", duration_ms: 10638, output_summary: "Risk review — 4 flags, 1 high severity" },
  { stage: "evaluator", status: "success", duration_ms: 3368, output_summary: "Overall score: 0.80" },
];

export const samplePlan = `# Execution Plan

## Recommended Engagement Path
- **Primary path:** EHR-triggered point-of-care messaging
- **Secondary path:** On-demand CME modules
- **Rationale:** The EHR-triggered approach reaches HCPs during real-time patient interactions — the optimal moment to drive awareness. CME modules provide supplementary education to reinforce key messages.

## Phased Sequencing

### Phase 1 — Foundational Setup (Weeks 1–4)
- Finalize EHR vendor partnerships and integration requirements
- Contract CME accreditation partner and align on content timeline
- Procure HCP targeting data and KOL influence scores
- Confirm prescribing data partnership for Rx lift measurement

### Phase 2 — Content Development (Weeks 5–10)
- Create EHR sidebar education card content
- Develop on-demand CME module curriculum and assets
- Obtain MLR approval on all content

### Phase 3 — Deployment and Measurement (Weeks 11–24)
- Launch EHR sidebar messaging in priority clinics
- Distribute on-demand CME modules to target HCP audience
- Monitor EHR message engagement and CME completion rates
- Analyze Rx lift impact vs. control group

## Surfaced Ambiguities
- **BP reading data availability:** Unclear whether EHR trigger can reliably surface structured BP values, or if fallback to ICD-10 I10 alone is needed.
- **EHR frequency cap:** Appropriate frequency cap is unclear — compliance guidelines needed.
- **Opt-out mechanism:** Not yet defined. HCPs need control over their experience.
- **Prescribing data partner:** Specific partner and data use agreement not yet determined.`;

export const sampleDelivery = `# Delivery Package

## Audience Definition
| Attribute | Value |
|---|---|
| Specialty | Internal Medicine, Family Medicine, Cardiology |
| Geography | Southeast US (Florida, Georgia, Tennessee, North Carolina, South Carolina) |
| Care setting | Outpatient primary care clinics, Multi-specialty groups, Community health centers |
| Illustrative codes | I10 (Essential Hypertension), MIPS Quality Measure #236 |
| Estimated reachable HCPs | [ILLUSTRATIVE] ~15,000 – 20,000 |

## Channel Recommendation
- **Primary:** EHR point-of-care messaging
- **Secondary:** On-demand CME modules
- **Why:** EHR-triggered approach reaches HCPs during real-time patient interactions — optimal moment for clinical decision support.

## Trigger Criteria
- Signal: ICD-10 code I10 (Essential Hypertension) during patient encounter
- BP reading > 140/90 mmHg (structured signal, if available)
- KOL Influence Score ≥ 4.0
- Frequency cap: 1x per week per HCP (pending compliance confirmation)
- Suppression: HCPs with ≥ 20 Arventix Rx in prior 90 days are excluded
- Fallback: If structured BP data unavailable, trigger on ICD-10 I10 alone

## Content Format
- **EHR card:** 60–90 second sidebar, fair-balance language, ISI reference
- **CME module:** 10–15 minute accredited video, peer-reviewed, neutral tone
- **Follow-up email:** Triggered 48h after EHR card with no engagement

## Out of Scope
- Patient-level targeting or communication
- Rep-delivered detail aids and paid display
- Rx lift measurement (requires separate data partnership and legal review)`;

export const sampleRiskReview = `# Risk Review Memo

## Summary
Multi-channel HCP education initiative for Arventix (fictional ARB) targeting primary care and cardiology HCPs in the Southeast US. Reasonable objectives with notable compliance risks.

## Flagged Concerns

### Flag 1: Minimum-necessary data use
- **Severity:** Medium
- **Description:** Broad geographic region (Southeast US) and multiple specialty types could lead to larger-than-necessary reach. Use of illustrative diagnosis codes adds ambiguity.
- **Recommendation:** Tighten audience to a smaller geographic region and/or single specialty. Use structured BP readings to more precisely trigger point-of-care messaging.

### Flag 2: PHI / PII exposure
- **Severity:** Low
- **Description:** HCP targeting sourced from licensed third-party vendor mitigates PHI risk. However, MIPS quality measure data for audience prioritization could inadvertently surface patient-level information.
- **Recommendation:** Clearly define permitted use of MIPS data — aggregate only, no patient-level exposure. Confirm data use agreement with HCP data vendor.

### Flag 3: Vague language
- **Severity:** Medium
- **Description:** CME modules described as "educational, peer-to-peer, neutral" without guardrails. Without specifics, content could drift toward promotional messaging.
- **Recommendation:** Establish clear guidelines for CME tone and content. Ensure fair-balance disclosure and ISI references are prominent in all HCP-facing materials.

### Flag 4: Missing guardrails
- **Severity:** High
- **Description:** No frequency cap or opt-out mechanism defined for EHR point-of-care messaging. Rx lift measurement requires unresolved data partnership and legal review.
- **Recommendation:** Define frequency cap and opt-out before launch. Confirm Rx lift data partnership before activating that metric.

## Disclaimer
Educational simulation only. Not legal or regulatory advice.`;

export const sampleTestPlan = `# QA Test Plan

## Test Categories and Cases

### 1. Happy Path
**TC-01:** EHR trigger fires correctly when all conditions met (ICD-10 I10 + BP > 140/90 + KOL Score >= 4.0)
- Expected: Sidebar card displayed within 2s of encounter load
- Status: PASS

**TC-02:** CME module launches after EHR card non-engagement at 48h
- Expected: Follow-up email sent, CME link functional
- Status: PASS

### 2. Incomplete Brief
**TC-03:** Pipeline runs with missing BP reading data (fallback to ICD-10 I10 alone)
- Expected: Trigger fires on diagnosis code, output notes reduced precision
- Status: PASS with caveat — fallback documented

**TC-04:** Missing Rx lift data partnership at time of launch
- Expected: Pipeline flags as blocker, measurement plan paused
- Status: PASS — flagged in compliance review

### 3. Conflicting Criteria
**TC-05:** HCP KOL Score exactly 4.0 (boundary condition)
- Expected: HCP included (>= 4.0 threshold)
- Status: PASS

**TC-06:** HCP has exactly 20 Arventix Rx in prior 90 days (suppression boundary)
- Expected: HCP suppressed (>= 20 threshold)
- Status: PASS

### 4. Overbroad Audience
**TC-07:** All Southeast US HCPs targeted without KOL tiering applied
- Expected: Pipeline flags audience overbreadth, recommends tiering
- Status: PASS — flagged

**TC-08:** Cardiologists included without referral context filter
- Expected: Secondary audience note surfaced
- Status: PASS with note

### 5. Wrong Channel
**TC-09:** Rep-delivered detail aid requested outside defined channel mix
- Expected: Out of scope — rejected by delivery agent
- Status: PASS

**TC-10:** Paid display requested for this initiative
- Expected: Explicitly excluded per brief
- Status: PASS

### 6. Missing Compliance Controls
**TC-11:** EHR card deployed without frequency cap defined
- Expected: Compliance agent flags as high severity blocker
- Status: PASS — flagged

**TC-12:** CME module launched without accreditation partner confirmed
- Expected: Delivery package marks as dependency unresolved
- Status: PASS — flagged

### 7. Edge Cases
**TC-13:** HCP opts out of point-of-care messaging mid-campaign
- Expected: Suppression list updated, no further placements
- Status: REQUIRES HUMAN PROCESS — opt-out mechanism not yet designed

**TC-14:** BP reading available but below threshold on re-encounter (controlled patient)
- Expected: Trigger suppressed, no card displayed
- Status: PASS

**TC-15:** KOL network amplifier identified (Score >= 7.0, >= 50 peer HCPs)
- Expected: Flagged for coordinated KOL outreach track
- Status: PASS

### 8. Adversarial
**TC-16:** Free-text field in brief contains prompt injection attempt
- Expected: Intake agent treats as plain text, no instruction leakage
- Status: PASS

**TC-17:** Brief submitted with contradictory channel instructions
- Expected: Planner surfaces ambiguity, does not silently resolve
- Status: PASS

**TC-18:** Evaluator presented with artificially inflated delivery package
- Expected: Score reflects actual brief quality, not package verbosity
- Status: PASS — evaluator references source brief for grounding

---

*18 test cases across 8 categories. 16 automated or documentable. 2 require human process design (TC-13 opt-out mechanism, TC-11 frequency cap confirmation).*`;
