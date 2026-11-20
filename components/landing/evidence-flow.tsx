import { BookOpen, Check, FileText } from "lucide-react";

const steps = [
  {
    title: "Bring your material",
    description:
      "Connect the notes and documents you already teach from to a subject, class and topic.",
    preview: "material",
  },
  {
    title: "Draft with context",
    description:
      "Generate a lesson or assessment from objectives, level and approved sources, then edit any section.",
    preview: "draft",
  },
  {
    title: "Review before release",
    description:
      "AI-generated content stays distinct until a teacher checks it, adjusts it and approves it.",
    preview: "review",
  },
  {
    title: "Act on evidence",
    description:
      "Student responses become a clear signal about what needs revisiting, with the basis shown.",
    preview: "outcome",
  },
] as const;

function FlowPreview({ type }: { type: (typeof steps)[number]["preview"] }) {
  if (type === "material") {
    return (
      <div className="border border-line bg-surface p-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-surface-muted text-accent-deep">
            <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="min-w-0 truncate text-xs font-semibold text-primary">
            Unit 3 notes.pdf
          </p>
          <span className="ml-auto shrink-0 text-[11px] text-muted">Attached</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Mathematics", "Grade 9", "Fractions and ratios"].map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-line bg-surface-muted px-2 py-1 text-[11px] text-muted-strong"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "draft") {
    return (
      <div className="border border-line bg-surface p-4">
        <p className="label-caps text-ochre">Generation brief</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-sm border border-line bg-surface-muted px-3 py-2.5">
            <p className="text-[11px] text-muted">Learning objective</p>
            <p className="mt-1 text-xs font-semibold text-primary">
              Add unlike fractions
            </p>
          </div>
          <div className="rounded-sm border border-line bg-surface-muted px-3 py-2.5">
            <p className="text-[11px] text-muted">Question count</p>
            <p className="mt-1 text-xs font-semibold text-primary tabular-nums">
              12 questions
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
          <Check size={14} strokeWidth={2} aria-hidden="true" />
          Ready for review
        </div>
      </div>
    );
  }

  if (type === "review") {
    return (
      <div className="border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-brand text-sm font-semibold text-primary">
            Question 6
          </span>
          <span className="rounded-sm bg-warning-soft px-1.5 py-0.5 text-[10px] font-medium text-warning">
            Edited by teacher
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-soft">
          Explain why halves and thirds need a common denominator before they
          can be added.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-[11px]">
          <span className="rounded-sm bg-accent-soft px-1.5 py-0.5 font-medium text-accent-deep">
            AI draft
          </span>
          <span className="text-muted">checked by teacher</span>
          <span className="rounded-sm bg-success-soft px-1.5 py-0.5 font-medium text-success">
            Approved
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface p-4">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-surface-muted text-accent-deep">
          <BookOpen size={15} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">
            Unlike fractions needs a revisit
          </p>
          <p className="mt-1 text-xs text-muted">
            A repeated pattern, not a one-off result.
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-line pt-3 text-[11px] text-muted">
        Basis: 3 assessments · 18 responses · sample view
      </div>
    </div>
  );
}

export function EvidenceFlow() {
  return (
    <div className="mt-12 border-t border-line-strong">
      {steps.map((step, index) => (
        <article
          key={step.title}
          className="grid gap-5 border-b border-line py-8 lg:grid-cols-[64px_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8"
        >
          <div>
            <span className="flex size-10 items-center justify-center rounded-sm border border-line-strong bg-surface font-brand text-sm font-semibold text-accent-deep tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <h3 className="font-brand text-xl font-semibold text-primary sm:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[420px] text-sm leading-[1.7] text-muted">
              {step.description}
            </p>
          </div>
          <div className="min-w-0">
            <FlowPreview type={step.preview} />
          </div>
        </article>
      ))}
    </div>
  );
}
