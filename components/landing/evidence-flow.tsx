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
      <div className="rounded-md border border-line bg-[#FBFAFE] p-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface text-accent-deep">
            <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="min-w-0 truncate text-xs font-medium text-primary">
            Unit 3 notes.pdf
          </p>
          <span className="ml-auto shrink-0 text-[11px] text-muted">
            Uploaded
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Mathematics", "Grade 9", "Fractions and ratios"].map((tag) => (
            <span
              key={tag}
              className="rounded bg-surface px-2 py-1 text-[11px] text-[#55546A]"
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
      <div className="rounded-md border border-line bg-[#FBFAFE] p-3">
        <p className="text-[11px] font-medium text-muted">Generation brief</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded border border-line bg-surface px-2.5 py-2">
            <p className="text-[11px] text-muted">Learning objective</p>
            <p className="mt-0.5 text-xs font-medium text-primary">
              Add unlike fractions
            </p>
          </div>
          <div className="rounded border border-line bg-surface px-2.5 py-2">
            <p className="text-[11px] text-muted">Question count</p>
            <p className="mt-0.5 text-xs font-medium text-primary tabular-nums">
              12 questions
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-success">
          <Check size={14} strokeWidth={2} aria-hidden="true" />
          Ready for review
        </div>
      </div>
    );
  }

  if (type === "review") {
    return (
      <div className="rounded-md border border-line bg-[#FBFAFE] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-primary">
            Question 6
          </span>
          <span className="rounded bg-warning-soft px-1.5 py-0.5 text-[10px] font-medium text-[#956522]">
            Edited by teacher
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#3D3C52]">
          Explain why halves and thirds need a common denominator before they
          can be added.
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded bg-accent-soft px-1.5 py-0.5 font-medium text-accent-deep">
            AI draft
          </span>
          <span className="text-muted">checked by teacher</span>
          <span className="rounded bg-success-soft px-1.5 py-0.5 font-medium text-success">
            Approved
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-line bg-[#FBFAFE] p-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-surface text-accent-deep">
          <BookOpen size={15} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-primary">
            Unlike fractions needs a revisit
          </p>
          <p className="mt-0.5 text-xs text-muted">
            A repeated pattern, not a one-off result.
          </p>
        </div>
      </div>
      <div className="mt-2.5 border-t border-line pt-2 text-[11px] text-muted">
        Basis: 3 assessments · 18 responses · sample view
      </div>
    </div>
  );
}

export function EvidenceFlow() {
  return (
    <div className="relative mt-12 border-t border-line">
      <div
        className="pointer-events-none absolute bottom-8 left-[15px] top-8 hidden w-px bg-line-strong lg:block"
        aria-hidden="true"
      />
      {steps.map((step, index) => (
        <article
          key={step.title}
          className="grid gap-4 border-b border-line py-7 lg:grid-cols-[56px_minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-8"
        >
          <div className="relative flex items-center lg:items-start">
            <span className="flex size-8 items-center justify-center rounded-md border border-line bg-surface font-brand text-xs font-semibold text-accent-deep tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <h3 className="font-brand text-lg font-semibold text-primary">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[420px] text-sm leading-[1.7] text-muted">
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
