import Link from "next/link";
import Nav from "@/components/Nav";

const STAGE_LABELS = [
  { num: "01", name: "Brief Intake", artifact: "requirements.json" },
  { num: "02", name: "Strategy Planner", artifact: "plan.md" },
  { num: "03", name: "Delivery Agent", artifact: "delivery-package.md" },
  { num: "04", name: "QA Agent", artifact: "test-plan.md" },
  { num: "05", name: "Compliance Review", artifact: "risk-review.md" },
  { num: "06", name: "Evaluator", artifact: "eval.json" },
];

const BRIEFS = [
  {
    id: "arventix",
    brand: "Arventix",
    company: "Meridian Therapeutics",
    indication: "Uncontrolled Hypertension",
    drugClass: "ARB / antihypertensive",
    badge: "WELL-SCOPED",
    badgeColor: "#6E7E28",
    badgeBg: "#F0F4E8",
    details: ["ICD-10 I10 · BP > 140/90 trigger", "KOL tiering (3 tiers)", "Southeast US · 15–20K HCPs", "Rx lift primary metric"],
    score: "~80",
    flags: "4 flags",
    talkingPoint: "A well-structured brief with clear EHR trigger logic, KOL tiering, and a defined measurement plan. Demonstrates the pipeline under normal operating conditions.",
  },
  {
    id: "veltoza",
    brand: "Veltoza",
    company: "MedCore Therapeutics",
    indication: "Type 2 Diabetes + Obesity",
    drugClass: "GLP-1 agonist",
    badge: "HIGH AMBIGUITY",
    badgeColor: "#C85C1E",
    badgeBg: "#FDF3ED",
    details: ["All PCPs nationwide — no segmentation", "Co-developed CME (independence conflict)", "Patient BMI as targeting signal (PHI risk)", "Metric undefined · 4-week timeline"],
    score: "~54",
    flags: "8 flags",
    talkingPoint: "Intentionally underspecified — shows how the compliance agent surfaces off-label risk, PHI exposure, CME independence violations, and timeline gaps that a first-draft brief often misses.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav subtitle="HCP Brief Workflow" />

      {/* Hero */}
      <div
        className="relative overflow-hidden px-10 py-20"
        style={{ background: "linear-gradient(140deg, #0E2044 0%, #102860 55%, #0B1A40 100%)" }}
      >
        <div className="absolute right-[-120px] top-[-120px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute right-[-60px] top-[-60px] w-[260px] h-[260px] rounded-full border border-white/5 pointer-events-none" />
        <p className="text-xs font-semibold tracking-widest mb-4" style={{ color: "var(--orange)" }}>
          AGENTIC WORKFLOW · INTERVIEW PROTOTYPE
        </p>
        <h1
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          One structured brief in.
          <br />Six agent stages.
          <br />A compliance-reviewed delivery package out.
        </h1>
        <p className="text-white/60 text-base max-w-lg mb-8">
          A sequential AI pipeline that translates an HCP engagement brief into a complete,
          traceable, compliance-reviewed delivery package.
        </p>
        <a
          href="https://github.com/reckten/HCP-Brief-Prototype"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded font-bold text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          View on GitHub
        </a>
      </div>

      {/* Pipeline stages */}
      <div className="px-10 py-12 bg-white border-b border-light">
        <p className="text-xs font-bold tracking-widest mb-6" style={{ color: "var(--mid)" }}>
          AGENT PIPELINE
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STAGE_LABELS.map((s) => (
            <div key={s.num} className="rounded-lg p-4 border border-light" style={{ background: "var(--off)" }}>
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-black mb-3"
                style={{ background: "var(--ink)", fontFamily: "var(--font-headline)" }}
              >
                {s.num}
              </div>
              <p className="font-bold text-sm text-dark mb-1" style={{ fontFamily: "var(--font-headline)" }}>
                {s.name}
              </p>
              <p className="text-xs" style={{ color: "var(--mid)" }}>→ {s.artifact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brief selector */}
      <div className="px-10 py-12 flex-1">
        <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "var(--mid)" }}>
          SELECT A BRIEF TO PROCESS
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--mid)" }}>
          Two briefs with different quality profiles — run both to see how the pipeline responds.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {BRIEFS.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border-2 bg-white flex flex-col"
              style={{ borderColor: b.badgeColor }}
            >
              <div className="p-6 flex-1">
                {/* Badge */}
                <span
                  className="inline-block text-xs font-black tracking-widest px-2 py-1 rounded mb-4"
                  style={{ color: b.badgeColor, background: b.badgeBg, fontFamily: "var(--font-headline)" }}
                >
                  {b.badge}
                </span>

                {/* Brand + drug */}
                <h2
                  className="text-xl font-black mb-0.5"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-headline)" }}
                >
                  {b.brand}
                </h2>
                <p className="text-xs mb-1" style={{ color: "var(--mid)" }}>
                  {b.company} · {b.drugClass}
                </p>
                <p className="text-sm font-semibold mb-4" style={{ color: "var(--dark)" }}>
                  {b.indication}
                </p>

                {/* Details */}
                <ul className="space-y-1.5 mb-4">
                  {b.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--dark)" }}>
                      <span style={{ color: b.badgeColor }} className="mt-0.5 flex-shrink-0">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Score preview */}
                <div className="flex gap-3 mb-5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: b.badgeBg, color: b.badgeColor }}
                  >
                    Score {b.score}
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: b.badgeBg, color: b.badgeColor }}
                  >
                    {b.flags}
                  </span>
                </div>

                {/* Talking point hint */}
                <p className="text-xs italic leading-relaxed" style={{ color: "var(--mid)" }}>
                  {b.talkingPoint}
                </p>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link
                  href={`/run?brief=${b.id}`}
                  className="block w-full text-center py-3 rounded font-bold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: b.badgeColor, fontFamily: "var(--font-headline)" }}
                >
                  Run {b.brand} Pipeline →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="px-10 py-6 border-t border-light flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
        <span className="text-xs font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-headline)" }}>
          Relevate Health
        </span>
        <span className="text-xs ml-2" style={{ color: "var(--mid)" }}>· Interview prototype · Fictional data only</span>
      </footer>
    </div>
  );
}
