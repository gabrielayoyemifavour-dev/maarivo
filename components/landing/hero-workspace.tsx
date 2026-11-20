import { BookOpen, Check, FileText, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge } from "@/components/ui/primitives";

const evidence = [
  {
    number: "01",
    label: "Source",
    detail: "Unit 3 notes · teacher-approved",
    state: "Attached",
    icon: FileText,
  },
  {
    number: "02",
    label: "AI draft",
    detail: "12 questions · answer keys included",
    state: "Generated",
    icon: Sparkles,
  },
  {
    number: "03",
    label: "Teacher review",
    detail: "2 sections edited · 1 question replaced",
    state: "Needs a check",
    icon: Check,
  },
  {
    number: "04",
    label: "Student view",
    detail: "Released to Grade 9 Science",
    state: "After approval",
    icon: BookOpen,
  },
] as const;

export function HeroWorkspacePreview() {
  return (
    <div className="w-full min-w-0 border border-line-strong bg-surface">
      <div className="flex min-h-10 items-center justify-between gap-3 bg-primary px-4 py-2 text-white">
        <div className="flex min-w-0 items-center gap-2.5">
          <BrandMark size={18} inverse />
          <span className="truncate font-brand text-xs font-semibold tracking-[-0.01em]">
            Assessment review · Grade 9 Mathematics
          </span>
        </div>
        <span className="label-caps shrink-0 text-white/60">Sample view</span>
      </div>

      <div className="grid md:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="border-b border-line bg-surface-muted p-5 md:border-b-0 md:border-r">
          <p className="label-caps text-ochre">Review packet</p>
          <p className="mt-3 font-brand text-xl font-semibold leading-tight text-primary">
            Fractions and ratios
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Unit 3 · 8C Mathematics
          </p>
          <dl className="mt-6 space-y-3 border-t border-line pt-4 text-xs">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Teacher</dt>
              <dd className="font-medium text-primary">A. Okafor</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Questions</dt>
              <dd className="font-medium text-primary tabular-nums">12</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Release</dt>
              <dd className="font-medium text-primary">After review</dd>
            </div>
          </dl>
        </aside>

        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="label-caps text-ochre">Evidence trail</p>
              <h2 className="mt-2 font-brand text-xl font-semibold text-primary sm:text-2xl">
                Every hand-off is visible before release.
              </h2>
            </div>
            <Badge variant="warning">1 decision needed</Badge>
          </div>

          <ol className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {evidence.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="relative border-t border-line-strong pt-5">
                  <span
                    className="absolute -top-[5px] left-0 size-[9px] rounded-full border border-accent bg-surface"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-brand text-xs font-semibold text-accent-deep tabular-nums">
                      {item.number}
                    </span>
                    <Icon
                      size={15}
                      strokeWidth={1.7}
                      className="text-muted"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {item.detail}
                  </p>
                  <p className="mt-3 text-[11px] font-medium text-muted-strong">
                    {item.state}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="max-w-[520px] text-xs leading-relaxed text-muted">
              The AI draft stays editable. The teacher checks the wording, then
              decides whether students see it.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent-deep">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Human approval required
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-surface-muted px-5 py-2.5 text-[11px] text-muted">
        Illustrative product view. Sample data only; no live school records are
        connected.
      </div>
    </div>
  );
}
