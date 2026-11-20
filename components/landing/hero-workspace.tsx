import { BookOpen, Check, FileText, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";

const sidebarItems = [
  "Overview",
  "Classes",
  "Lesson Studio",
  "Assessment Studio",
  "Insights",
];

const evidenceSteps = [
  {
    title: "Source material",
    detail: "Unit 3 notes · teacher-approved",
    icon: FileText,
    state: "Attached",
    tone: "neutral",
  },
  {
    title: "AI draft",
    detail: "12 questions · answer keys included",
    icon: Sparkles,
    state: "AI generated",
    tone: "accent",
  },
  {
    title: "Teacher review",
    detail: "2 sections edited · 1 question replaced",
    icon: Check,
    state: "Teacher approved",
    tone: "success",
  },
  {
    title: "Student view",
    detail: "Released to Grade 9 Science",
    icon: BookOpen,
    state: "Ready",
    tone: "neutral",
  },
] as const;

export function HeroWorkspacePreview() {
  return (
    <div className="w-full min-w-0">
      <div className="overflow-hidden rounded-lg border border-line-strong bg-surface shadow-[0_18px_48px_-36px_rgba(23,27,53,0.45)]">
        <div className="flex h-10 items-center justify-between gap-3 bg-primary px-4 text-white">
          <div className="flex min-w-0 items-center gap-2">
            <BrandMark size={18} />
            <span className="truncate font-brand text-xs font-semibold">
              Assessment Studio
            </span>
          </div>
          <span className="shrink-0 rounded border border-white/20 px-2 py-0.5 text-[11px] font-medium text-white/70">
            Sample workspace
          </span>
        </div>

        <div className="grid min-h-[470px] sm:grid-cols-[138px_minmax(0,1fr)]">
          <aside className="hidden border-r border-line bg-[#FBFAFE] p-3 sm:block">
            <p className="px-2 pb-2 text-[11px] font-medium text-muted">
              Teacher workspace
            </p>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li
                  key={item}
                  className={`rounded-md px-2 py-2 text-xs font-medium ${
                    item === "Assessment Studio"
                      ? "bg-accent-soft text-accent-deep"
                      : "text-[#55546A]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
              <div className="min-w-0">
                <p className="text-xs text-muted">
                  Grade 9 Mathematics · Unit 3
                </p>
                <p className="mt-0.5 font-brand text-base font-semibold text-primary">
                  Fractions and ratios
                </p>
              </div>
              <span className="rounded-md bg-warning-soft px-2 py-1 text-[11px] font-medium text-[#956522]">
                Review complete
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-primary">
                  Assessment review
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Every hand-off is visible before release.
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-accent-deep tabular-nums">
                4 of 4
              </span>
            </div>

            <div className="relative mt-4">
              <div
                className="absolute bottom-3 left-[5px] top-3 w-px bg-line-strong"
                aria-hidden="true"
              />
              <ol className="space-y-2.5 pl-5">
                {evidenceSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="relative">
                      <span
                        className="absolute -left-[18px] top-3 size-[11px] rounded-full border-2 border-accent bg-surface"
                        aria-hidden="true"
                      />
                      <div className="flex items-start gap-3 rounded-md border border-line bg-[#FBFAFE] px-3 py-2.5">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-surface text-accent-deep">
                          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="text-xs font-semibold text-primary">
                              {step.title}
                            </p>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                step.tone === "accent"
                                  ? "bg-accent-soft text-accent-deep"
                                  : step.tone === "success"
                                    ? "bg-success-soft text-success"
                                    : "bg-[#F0EFF5] text-[#55546A]"
                              }`}
                            >
                              {step.state}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        <div className="border-t border-line bg-[#FBFAFE] px-4 py-2.5 text-[11px] text-muted">
          Sample data only. No live school records are connected.
        </div>
      </div>
    </div>
  );
}
