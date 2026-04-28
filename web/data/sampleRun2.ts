export const VELTOZA_BRIEF = `# HCP Engagement Brief — Veltoza Diabetes Management Campaign

**Brand:** Veltoza (MedCore Therapeutics) [FICTIONAL — GLP-1 agonist class]
**Indication:** Type 2 diabetes with comorbid obesity
**Brief owner:** Digital Marketing
**Date:** Q2 2026
**Status:** DRAFT — initial pass, not yet cross-functionally reviewed

---

## Campaign Objective
Drive awareness of Veltoza among primary care physicians managing diabetes patients.
Highlight the weight management benefits and once-weekly dosing convenience.
Position Veltoza as the preferred option for patients who haven't responded to metformin.

**Primary metric:** TBD — either script lift or engagement rate, to be decided later.

---

## Target Audience
- All primary care physicians in the US
- Nurses and physician assistants who manage diabetes patients
- Any HCP seeing patients with BMI > 30

---

## Channel Mix
- EHR point-of-care messaging (vendor and trigger details TBD)
- Email blasts to purchased HCP list
- Programmatic digital display ads
- Co-developed CME module with Veltoza brand team

---

## Measurement
Track patient outcomes where possible — A1c improvement, weight loss data.
Tie engagement metrics back to individual prescriber behavior over time.

---

## Timeline
Launch within 4 weeks. Marketing leadership wants to move fast.

---

## Open Questions
None identified at this time.`;

export const veltozaRequirements = {
  objective:
    "Drive awareness of Veltoza among primary care physicians managing Type 2 diabetes patients, with emphasis on weight management benefits and once-weekly dosing.",
  audience: {
    specialty: ["Primary Care", "Internal Medicine", "Nursing", "Physician Assistants"],
    geography: ["Nationwide — all US regions"],
    care_setting: ["All outpatient settings", "Any HCP seeing patients with BMI > 30"],
    illustrative_codes: [
      "[ILLUSTRATIVE] E11 (Type 2 Diabetes Mellitus)",
      "[ILLUSTRATIVE] BMI > 30 — patient-level clinical signal",
    ],
  },
  channels: [
    "EHR point-of-care messaging (details TBD)",
    "Email blasts to purchased HCP list",
    "Programmatic digital display ads",
    "Co-developed CME module with brand team",
  ],
  content_type: "EHR card + email + display + co-branded CME",
  assumptions: [
    "EHR vendor and trigger logic to be determined after launch.",
    "Purchased HCP list available from marketing database.",
    "CME module co-developed with Veltoza brand team for authenticity.",
  ],
  blockers: [
    "No defined EHR trigger criteria.",
    "Measurement plan references patient-level outcomes — data use not reviewed.",
    "CME co-development arrangement conflicts with accreditation independence requirements.",
  ],
  dependencies: [
    "Marketing leadership sign-off on timeline.",
    "Purchased HCP list procurement.",
    "CME co-development partner agreement.",
  ],
  open_questions: [
    "What is the actual primary metric — Rx lift or engagement rate?",
    "Which EHR vendors are in scope and what are the trigger criteria?",
    "Is weight loss messaging within the approved label indication?",
    "How is patient BMI data being used to identify HCPs — is this permissible?",
    "What data use agreement governs the purchased HCP email list?",
  ],
  risks: [
    "Off-label risk: weight management messaging may exceed approved T2D indication.",
    "Overbroad targeting: nationwide + all PCPs + nurses/PAs lacks segmentation precision.",
    "PHI risk: using patient BMI > 30 as an HCP targeting signal surfaces patient-level data.",
    "CME independence: co-developed modules with brand team cannot receive ACCME accreditation.",
    "Patient-level measurement: tracking A1c and weight outcomes from HCP engagement is impermissible without specific data agreements.",
    "Timeline infeasibility: 4-week launch cannot accommodate MLR review, EHR vendor configuration, or CME accreditation.",
    "Purchased HCP list: data provenance and permissible use not reviewed.",
    "No frequency cap or opt-out mechanism defined.",
  ],
  recommended_path: "",
};

export const veltozaEval = {
  requirement_coverage: 0.6,
  targeting_clarity: 0.4,
  qa_completeness: 0.65,
  risk_detection: 0.55,
  documentation_quality: 0.5,
  overall_score: 0.54,
  overall_notes:
    "This brief has significant structural gaps that would block production deployment. The targeting is overbroad with no segmentation rationale, the measurement plan involves impermissible patient-level data, the CME co-development arrangement violates accreditation independence requirements, and the 4-week timeline is not feasible given required review cycles. The pipeline has surfaced 8 flags — this brief requires a full cross-functional review and substantial rework before any asset enters MLR.",
  flags: [
    "Off-label risk: weight management and BMI messaging requires explicit label support for the T2D indication — confirm with Medical Affairs before any content is drafted.",
    "Overbroad targeting: 'all PCPs nationwide' with no KOL tiering, specialty segmentation, or geographic prioritization — precision targeting is required before EHR trigger configuration.",
    "PHI exposure: using patient BMI > 30 as an HCP targeting signal constitutes indirect patient-level data use — Legal must review before this signal is incorporated into any trigger logic.",
    "CME independence violation: modules co-developed with the Veltoza brand team cannot receive ACCME accreditation — independence boundary must be contractually established.",
    "Impermissible measurement: tracking A1c improvement and weight loss outcomes from HCP engagement requires a specific patient data use agreement that is not in place.",
    "Purchased HCP list: data provenance, permissible use, and opt-out status of the purchased email list have not been reviewed — do not activate until Legal confirms.",
    "Timeline infeasibility: 4-week launch cannot accommodate MLR review cycles, EHR vendor configuration, or CME accreditation timelines — realistic minimum is 12–16 weeks.",
    "Missing guardrails: no frequency cap, no opt-out mechanism, and no suppression logic defined — these are required compliance controls before any live HCP-facing placement.",
  ],
};

export const veltozaTraces = [
  { stage: "intake", status: "success", duration_ms: 7821, output_summary: "Extracted objective — significant gaps detected: 8 missing or underspecified fields" },
  { stage: "planner", status: "success", duration_ms: 9102, output_summary: "Plan generated — 6 escalation points flagged before Phase 1 can begin" },
  { stage: "delivery", status: "success", duration_ms: 8430, output_summary: "Delivery package drafted with 5 UNRESOLVED markers — cannot be finalized without rework" },
  { stage: "qa", status: "success", duration_ms: 18920, output_summary: "Test plan generated — 11 test cases, 4 marked BLOCKED pending brief clarification" },
  { stage: "compliance", status: "success", duration_ms: 11240, output_summary: "Risk review — 8 flags, 3 high severity, 1 critical (CME independence)" },
  { stage: "evaluator", status: "success", duration_ms: 3100, output_summary: "Overall score: 0.54 — human review required before any production work proceeds" },
];

export const veltozaPlan = `# Execution Plan

> ⚠ **This brief requires significant rework before a production execution plan can be finalized.** The items below represent a conditional plan — each phase is blocked by at least one unresolved issue from the brief.

## Recommended Engagement Path
- **Recommended path:** UNDETERMINED — brief does not provide sufficient information to recommend a primary channel without resolving targeting, trigger logic, and compliance blockers first.

## Escalation Points (Must Resolve Before Phase 1)
1. **Label review:** Confirm with Medical Affairs whether weight management and BMI messaging is supported by the approved Veltoza indication. If not, all messaging must revert to T2D-only framing.
2. **Targeting redesign:** Narrow from "all PCPs nationwide" to a defined specialty + geography segment with KOL tiering. Nationwide targeting without segmentation is not operationally viable.
3. **PHI review:** Legal must confirm whether using patient BMI > 30 as an HCP targeting signal constitutes permissible data use under applicable regulations.
4. **CME independence:** Establish contractual separation between brand team and CME content development. The co-development model as described cannot receive ACCME accreditation.
5. **Measurement plan redesign:** Patient-level outcome tracking (A1c, weight) is impermissible without a specific data use agreement. Redefine metrics around HCP-level engagement signals only.
6. **Timeline reset:** Marketing's 4-week target is not achievable. Minimum realistic timeline with MLR review, EHR configuration, and CME accreditation is 12–16 weeks.

## Conditional Phased Sequencing

### Phase 1 — Remediation (Weeks 1–4, prerequisite)
- Resolve all 6 escalation points above before any production work begins
- Conduct cross-functional brief review: Medical Affairs, Legal, Regulatory, Compliance
- Redefine primary metric (Rx lift vs. engagement rate cannot remain TBD)

### Phase 2 — Foundational Setup (Weeks 5–8, if Phase 1 resolves)
- Finalize EHR vendor selection and trigger criteria
- Establish CME accreditation partner with full independence from brand team
- Confirm HCP data vendor and data use agreement for purchased list

### Phase 3 — Content and Deployment (Weeks 9–16)
- MLR review of all assets
- EHR configuration and QA
- Phased rollout — Tier 1 HCPs first

## Surfaced Ambiguities
- Primary metric undefined — cannot measure campaign success without this decision
- EHR trigger logic completely undefined — no patient signal, no specialty filter, no suppression rule
- Nationwide targeting with no segmentation — operationally unscalable and compliance-risky
- Co-developed CME is a structural conflict, not a minor edit`;

export const veltozaDelivery = `# Delivery Package

> ⚠ **DRAFT — 5 sections marked UNRESOLVED. This package cannot be finalized until the brief is reworked.**

## Audience Definition
| Attribute | Value |
|---|---|
| Specialty | [UNRESOLVED] Brief states "all PCPs" — recommend narrowing to Internal Medicine + Endocrinology |
| Geography | [UNRESOLVED] Nationwide — no prioritization defined |
| Care setting | All outpatient settings — needs segmentation |
| Targeting signal | [UNRESOLVED] Patient BMI > 30 — Legal review required before activation |
| Estimated reachable HCPs | [UNRESOLVED] Cannot estimate without audience segmentation |

## Channel Recommendation
- **EHR point-of-care:** Conditionally recommended as primary — blocked pending trigger criteria definition and vendor selection
- **Email blasts:** Conditionally viable — blocked pending Legal review of purchased list provenance
- **Programmatic display:** Not recommended for HCP-targeted medical education initiatives — low precision, compliance risk
- **CME modules:** Recommended as secondary — blocked pending resolution of co-development independence conflict

## Trigger Criteria
- [UNRESOLVED] No trigger criteria defined in brief
- Recommended minimum: ICD-10 E11 (Type 2 Diabetes) + specialty filter + KOL score threshold
- Patient BMI signal cannot be used until Legal confirms permissibility

## Content Format
- EHR card: [UNRESOLVED] No format specifications provided
- CME module: [UNRESOLVED] Cannot proceed under co-development model — independence required
- Email: Fair-balance and ISI requirements apply

## Out of Scope (Explicit)
- Patient-level outcome tracking (A1c, weight loss) — impermissible without specific data use agreement
- Programmatic display targeting — not appropriate for this initiative type
- 4-week launch timeline — not achievable`;

export const veltozaRiskReview = `# Risk Review Memo

## Summary
This brief as submitted cannot proceed to production without significant rework. The pipeline has identified **8 flags** — 3 high severity and 1 critical. This is the highest risk profile surfaced in this review cycle.

## Flagged Concerns

### Flag 1: Off-Label Risk *(High)*
- **Category:** Off-label promotion
- **Description:** Weight management and BMI messaging is not confirmed to be within the approved Veltoza label for T2D. Promoting weight loss benefits without label support constitutes off-label promotion.
- **Recommendation:** Medical Affairs must confirm label scope before any content is drafted. If weight messaging is not supported, all references must be removed.

### Flag 2: Overbroad Targeting *(High)*
- **Category:** Minimum-necessary data use
- **Description:** "All primary care physicians in the US" with no KOL tiering, specialty segmentation, or geographic filter represents an imprecise and operationally unscalable audience definition.
- **Recommendation:** Segment to defined specialties (Internal Medicine, Endocrinology) with geographic prioritization and KOL tiering before EHR trigger configuration.

### Flag 3: PHI Exposure via Patient Signal *(High)*
- **Category:** PHI / PII exposure
- **Description:** Using patient BMI > 30 as an HCP targeting signal means patient-level clinical data is being accessed to identify and target physicians. This constitutes indirect PHI use.
- **Recommendation:** Legal must review under applicable regulations before this signal is activated in any trigger logic. Alternative: use specialty code and ICD-10 diagnosis code only.

### Flag 4: CME Independence Violation *(Critical)*
- **Category:** Regulatory compliance
- **Description:** CME modules co-developed with the Veltoza brand team cannot receive ACCME accreditation. This is a structural violation of CME independence standards, not a minor edit.
- **Recommendation:** Establish a contractually independent CME development process. Brand team involvement must be limited to scientific accuracy review only, with no editorial control.

### Flag 5: Impermissible Patient-Level Measurement *(High)*
- **Category:** Data use / PHI
- **Description:** The measurement plan proposes tracking A1c improvement and weight loss outcomes from HCP engagement. This requires patient-level data that is not permissible under standard HCP engagement data agreements.
- **Recommendation:** Redefine all metrics to HCP-level engagement signals: EHR card opens, CME completions, email click-through, Rx lift from licensed prescribing data only.

### Flag 6: Purchased HCP List — Unverified Provenance *(Medium)*
- **Category:** Data governance
- **Description:** The brief references a "purchased HCP list" with no documentation of provenance, permissible use, or opt-out status. Activating this list without Legal review creates liability.
- **Recommendation:** Legal must review data use agreement before any email deployment.

### Flag 7: Timeline Infeasibility *(Medium)*
- **Category:** Operational risk
- **Description:** A 4-week launch target cannot accommodate MLR review cycles (minimum 2–4 weeks), EHR vendor configuration (minimum 4–6 weeks), or CME accreditation (minimum 8–12 weeks).
- **Recommendation:** Reset timeline expectations with marketing leadership. Minimum realistic timeline is 12–16 weeks with a Phase 1 remediation period.

### Flag 8: Missing Guardrails *(Medium)*
- **Category:** Compliance controls
- **Description:** No frequency cap, opt-out mechanism, or suppression logic defined anywhere in the brief. These are required compliance controls before any live HCP-facing placement.
- **Recommendation:** Define all three before any channel goes live.

## Disclaimer
Educational simulation only. Not legal or regulatory advice.`;
