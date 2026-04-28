"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScoreRing from "@/components/ScoreRing";

type StageStatus = "pending" | "running" | "success";

interface StageState {
  id: string;
  label: string;
  description: string;
  status: StageStatus;
  duration_ms?: number;
  output_summary?: string;
  parallel?: boolean;
}

interface RunResults {
  requirements: {
    objective: string;
    audience: { specialty: string[]; geography: string[]; care_setting: string[] };
    channels: string[];
    risks: string[];
    open_questions: string[];
  };
  eval: {
    overall_score: number;
    requirement_coverage: number;
    targeting_clarity: number;
    qa_completeness: number;
    risk_detection: number;
    documentation_quality: number;
    overall_notes: string;
    flags: string[];
  };
  plan: string;
  delivery: string;
  riskReview: string;
}

const INITIAL_STAGES: StageState[] = [
  { id: "intake", label: "Brief Intake", description: "Parse brief → requirements.json", status: "pending" },
  { id: "planner", label: "Strategy Planner", description: "Build execution plan → plan.md", status: "pending" },
  { id: "delivery", label: "Delivery Agent", description: "Operational handoff → delivery-package.md", status: "pending" },
  { id: "qa", label: "QA Agent", description: "Test coverage → test-plan.md", status: "pending", parallel: true },
  { id: "compliance", label: "Compliance Review", description: "Risk flags → risk-review.md", status: "pending", parallel: true },
  { id: "evaluator", label: "Evaluator", description: "Quality scores → eval.json", status: "pending" },
];

const SCORE_DIMS = [
  { key: "requirement_coverage", label: "Requirement Coverage" },
  { key: "targeting_clarity", label: "Targeting Clarity" },
  { key: "qa_completeness", label: "QA Completeness" },
  { key: "risk_detection", label: "Risk Detection" },
  { key: "documentation_quality", label: "Documentation Quality" },
] as const;

const ARTIFACT_TABS = [
  { id: "plan", label: "Plan" },
  { id: "delivery", label: "Delivery" },
  { id: "riskReview", label: "Compliance" },
] as const;

type TabId = (typeof ARTIFACT_TABS)[number]["id"];

const BRIEF_META: Record<string, { title: string; subtitle: string; insight: string; insightColor: string }> = {
  arventix: {
    title: "Arventix Hypertension Education Initiative",
    subtitle: "EHR point-of-care · on-demand CME · KOL-weighted targeting · Southeast US",
    insight:
      "This brief scored 80 — well-structured with clear trigger logic, KOL tiering, and a defined measurement plan. The 4 flags are addressable: unresolved Rx lift data partnership and frequency cap are typical pre-launch blockers. Run the Veltoza brief to compare how the pipeline responds to a weaker input.",
    insightColor: "#6E7E28",
  },
  veltoza: {
    title: "Veltoza Diabetes Management Campaign",
    subtitle: "Nationwide targeting · GLP-1 agonist · First-draft brief — intentionally underspecified",
    insight:
      "This brief scored 54 — significantly below the Arventix initiative (80). The compliance agent detected 8 flags including a critical CME independence violation, PHI exposure via patient BMI signal, and off-label risk from weight loss messaging. In a production system, a score below 65 would trigger a mandatory human review checkpoint before any asset proceeds to MLR. This demonstrates the pipeline's value as an early-warning layer.",
    insightColor: "#C85C1E",
  },
};

export default function RunClient() {
  const searchParams = useSearchParams();
  const briefId = searchParams.get("brief") ?? "arventix";
  const meta = BRIEF_META[briefId] ?? BRIEF_META.arventix;

  const [stages, setStages] = useState<StageState[]>(INITIAL_STAGES);
  const [results, setResults] = useState<RunResults | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("plan");

  const updateStage = (id: string, patch: Partial<StageState>) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  useEffect(() => {
    setStages(INITIAL_STAGES);
    setResults(null);
    const source = new EventSource(`/api/run?brief=${briefId}`);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "stage") {
        updateStage(data.stage, {
          status: data.status,
          ...(data.duration_ms ? { duration_ms: data.duration_ms } : {}),
          ...(data.output_summary ? { output_summary: data.output_summary } : {}),
        });
      }
      if (data.type === "done") {
        setResults({ requirements: data.requirements, eval: data.eval, plan: data.plan, delivery: data.delivery, riskReview: data.riskReview });
        source.close();
      }
    };

    source.onerror = () => source.close();
    return () => source.close();
  }, [briefId]);

  const isRunning = stages.some((s) => s.status === "running");
  const isComplete = !!results;
  const totalRuntime = stages.filter((s) => s.duration_ms).reduce((sum, s) => sum + (s.duration_ms ?? 0), 0);
  const parallelStages = stages.filter((s) => s.parallel);
  const nonParallelStages = stages.filter((s) => !s.parallel);

  return (
    <>
      {/* Hero */}
      <div
        className="px-10 py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #0E2044 0%, #102860 55%, #0B1A40 100%)" }}
      >
        <div className="absolute right-[-80px] top-[-80px] w-[280px] h-[280px] rounded-full border border-white/5 pointer-events-none" />
        <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "var(--orange)" }}>
          HCP ENGAGEMENT BRIEF — PIPELINE OUTPUT
        </p>
        <h2 className="text-2xl font-black text-white max-w-2xl leading-snug" style={{ fontFamily: "var(--font-headline)" }}>
          {meta.title}
        </h2>
        <p className="text-white/50 text-sm mt-2">{meta.subtitle}</p>
      </div>

      <div className="px-10 py-10 flex-1">
        {/* Stage timeline */}
        <p className="text-xs font-bold tracking-widest mb-5" style={{ color: "var(--mid)" }}>
          AGENT PIPELINE
          {isRunning && <span className="ml-2" style={{ color: "var(--olive2)" }}>· RUNNING</span>}
          {isComplete && <span className="ml-2" style={{ color: "var(--olive)" }}>· COMPLETE</span>}
        </p>

        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          {nonParallelStages.map((stage) => (
            <div key={stage.id}>
              <StageCard stage={stage} />
              {stage.id === "delivery" && (
                <div className="mt-3 flex gap-3 items-start">
                  <div className="flex items-center gap-1 text-xs pt-4 flex-shrink-0" style={{ color: "var(--olive)" }}>
                    <span className="font-bold tracking-widest">PARALLEL</span>
                    <span>⇉</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    {parallelStages.map((ps) => <StageCard key={ps.id} stage={ps} />)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        {results && (
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-widest mb-6" style={{ color: "var(--mid)" }}>RESULTS</p>

            {/* Score + stats + bars */}
            <div className="flex flex-wrap gap-6 items-start mb-8">
              <ScoreRing score={results.eval.overall_score} />
              <div className="flex flex-wrap gap-4 items-start">
                <StatCard label="Stages" value="6" />
                <StatCard label="Runtime" value={`${(totalRuntime / 1000).toFixed(1)}s`} />
                <StatCard label="Flags" value={String(results.eval.flags.length)} accent={results.eval.flags.length >= 6} />
              </div>
              <div className="flex-1 min-w-[240px] pt-1">
                {SCORE_DIMS.map((d) => {
                  const val = results.eval[d.key] as number;
                  return (
                    <div key={d.key} className="flex items-center gap-3 mb-2">
                      <span className="text-xs w-44 flex-shrink-0" style={{ color: "var(--mid)" }}>{d.label}</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--light)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${val * 100}%`, background: val >= 0.75 ? "var(--olive)" : "var(--orange)" }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right" style={{ color: "var(--dark)" }}>{Math.round(val * 100)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline insight */}
            <div className="mb-6 p-4 rounded-lg border-l-4" style={{ borderColor: meta.insightColor, background: "white" }}>
              <p className="text-xs font-black tracking-widest mb-1" style={{ color: meta.insightColor, fontFamily: "var(--font-headline)" }}>
                PIPELINE INSIGHT
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--dark)" }}>{meta.insight}</p>
            </div>

            {/* Audience + channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InfoCard label="Specialty">{results.requirements.audience.specialty.join(" · ")}</InfoCard>
              <InfoCard label="Geography">{results.requirements.audience.geography.join(", ")}</InfoCard>
              <InfoCard label="Care Setting">{results.requirements.audience.care_setting.join(" · ")}</InfoCard>
              <InfoCard label="Channels">{results.requirements.channels.join(" · ")}</InfoCard>
            </div>

            {/* Flags */}
            {results.eval.flags.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest mb-3" style={{ color: "var(--orange)" }}>
                  FLAGS FOR HUMAN REVIEW
                </p>
                <div className="flex flex-col gap-2">
                  {results.eval.flags.map((flag, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg border-l-2 text-sm bg-white" style={{ borderColor: "var(--orange)" }}>
                      <span style={{ color: "var(--orange)" }} className="mt-0.5 flex-shrink-0">⚑</span>
                      <span style={{ color: "var(--dark)" }}>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artifact tabs with rendered markdown */}
            <div>
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: "var(--mid)" }}>ARTIFACTS</p>
              <div className="flex gap-1 mb-0 border-b border-light">
                {ARTIFACT_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2 text-sm font-bold transition-all border-b-2 -mb-px"
                    style={{
                      fontFamily: "var(--font-headline)",
                      borderColor: activeTab === tab.id ? "var(--ink)" : "transparent",
                      color: activeTab === tab.id ? "var(--ink)" : "var(--mid)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-b-lg border border-t-0 border-light p-6 overflow-auto max-h-[600px]">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {results[activeTab]}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="px-10 py-6 border-t border-light flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
        <span className="text-xs font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-headline)" }}>Relevate Health</span>
        <span className="text-xs ml-2" style={{ color: "var(--mid)" }}>· Interview prototype · Fictional data only</span>
      </footer>
    </>
  );
}

function StageCard({ stage }: { stage: StageState }) {
  const borderColor = stage.status === "success" ? "var(--ink2)" : stage.status === "running" ? "var(--olive2)" : "var(--light)";
  const numBg = stage.status === "success" ? "var(--ink)" : stage.status === "running" ? "var(--olive)" : "var(--light)";
  const numColor = stage.status === "pending" ? "var(--mid)" : "white";
  const stageNum = ["intake", "planner", "delivery", "qa", "compliance", "evaluator"].indexOf(stage.id) + 1;

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border bg-white transition-all" style={{ borderColor }}>
      <div className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-xs font-black transition-all" style={{ background: numBg, color: numColor, fontFamily: "var(--font-headline)" }}>
        {stage.status === "running" ? <span className="pulse-olive">▶</span> : stage.status === "success" ? "✓" : String(stageNum).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-bold text-sm" style={{ fontFamily: "var(--font-headline)", color: "var(--dark)" }}>{stage.label}</p>
          {stage.status === "running" && <span className="text-xs pulse-olive" style={{ color: "var(--olive)" }}>running…</span>}
          {stage.duration_ms && <span className="text-xs ml-auto flex-shrink-0" style={{ color: "var(--mid)" }}>{(stage.duration_ms / 1000).toFixed(1)}s</span>}
        </div>
        <p className="text-xs mt-0.5" style={{ color: "var(--mid)" }}>{stage.output_summary ?? stage.description}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-5 py-4 rounded-lg border text-center" style={{ background: "white", borderColor: accent ? "var(--orange)" : "var(--light)" }}>
      <p className="text-2xl font-black" style={{ color: accent ? "var(--orange)" : "var(--ink)", fontFamily: "var(--font-headline)" }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "var(--mid)" }}>{label}</p>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border bg-white" style={{ borderColor: "var(--light)" }}>
      <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "var(--mid)" }}>{label.toUpperCase()}</p>
      <p className="text-sm" style={{ color: "var(--dark)" }}>{children}</p>
    </div>
  );
}
