import { BookOpen, Check, FileText, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge } from "@/components/ui/primitives";

const steps = [
  {
    label: "Source",
    detail: "Unit 3 notes, approved by the teacher",
    state: "Attached",
    icon: FileText,
  },
  {
    label: "AI draft",
    detail: "12 questions with answer keys",
    state: "Generated",
    icon: Sparkles,
  },
  {
    label: "Teacher review",
    detail: "Two sections edited, one question replaced",
    state: "Needs a check",
    icon: Check,
  },
  {
    label: "Student view",
    detail: "Released after approval",
    state: "Waiting",
    icon: BookOpen,
  },
];

export function HeroWorkspacePreview() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_20px_60px_-36px_rgba(17,19,24,0.35)]">
      <div className="flex min-h-14 items-center justify-between gap-4 bg-primary px-5 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <BrandMark size={20} inverse />
          <span className="truncate font-brand text-[15px] font-semibold">
            Assessment review
          </span>
        </div>
        <span className="shrink-0 text-[15px] text-white/60">
          Sample workspace
        </span>
      </div>

      <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-line bg-surface-muted p-6 md:border-b-0 md:border-r">
          <p className="text-[15px] font-semibold text-accent-deep">Review packet</p>
          <p className="mt-4 font-brand text-2xl font-semibold leading-tight text-primary">
            Fractions and ratios
          </p>
          <p className="mt-2 text-[15px] text-muted">Grade 9 Mathematics</p>
          <dl className="mt-7 space-y-4 border-t border-line pt-5 text-[15px]">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Teacher</dt>
              <dd className="font-medium text-primary">A. Okafor</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Questions</dt>
              <dd className="font-medium text-primary tabular-nums">12</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Release</dt>
              <dd className="font-medium text-primary">After review</dd>
            </div>
          </dl>
        </div>

        <div className="min-w-0 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold text-accent-deep">
                Evidence trail
              </p>
              <h2 className="mt-3 font-brand text-2xl font-semibold text-primary sm:text-[28px]">
                Every hand-off is visible before release.
              </h2>
            </div>
            <Badge variant="warning">One decision needed</Badge>
          </div>

          <ol className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="relative border-t-2 border-line pt-5">
                  <span
                    className="absolute -top-[7px] left-0 size-3 rounded-full border-2 border-accent bg-surface"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-brand text-[15px] font-semibold text-accent-deep tabular-nums">
                      0{index + 1}
                    </span>
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="text-muted"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-base font-semibold text-primary">
                    {step.label}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {step.detail}
                  </p>
                  <p className="mt-4 text-[15px] font-semibold text-muted-strong">
                    {step.state}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="max-w-[540px] text-[15px] leading-relaxed text-muted">
              The AI draft stays editable. The teacher checks the wording, then
              decides whether students see it.
            </p>
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent-deep">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              Human approval required
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-surface-muted px-6 py-3 text-[15px] text-muted">
        Illustrative product view. Sample data only; no live school records are
        connected.
      </div>
    </div>
  );
}
