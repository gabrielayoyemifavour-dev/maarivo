import { BookOpen, Check, FileText } from "lucide-react";

const steps = [
  {
    title: "Start with your material",
    description:
      "Connect the notes you already teach from to a subject, class and topic. AI drafts point back to those approved sources.",
    preview: "material",
  },
  {
    title: "Review the draft",
    description:
      "Generate a lesson or assessment from your objectives, then edit any section. Generated content stays labelled until a teacher approves it.",
    preview: "draft",
  },
  {
    title: "Act on the evidence",
    description:
      "Student responses become a clear signal about what needs revisiting, with the basis for that signal shown beside it.",
    preview: "outcome",
  },
] as const;

function FlowPreview({ type }: { type: (typeof steps)[number]["preview"] }) {
  if (type === "material") {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
            <FileText size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-primary">
              Unit 3 notes.pdf
            </p>
            <p className="mt-0.5 text-[15px] text-muted">Approved source</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Mathematics", "Grade 9", "Fractions and ratios"].map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-muted px-3 py-1.5 text-[15px] text-muted-strong"
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
      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="text-[15px] font-semibold text-accent-deep">Generation brief</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-surface-muted px-4 py-3">
            <p className="text-[15px] text-muted">Learning objective</p>
            <p className="mt-1 text-[15px] font-semibold text-primary">
              Add unlike fractions
            </p>
          </div>
          <div className="rounded-lg bg-surface-muted px-4 py-3">
            <p className="text-[15px] text-muted">Question count</p>
            <p className="mt-1 text-[15px] font-semibold text-primary tabular-nums">
              12 questions
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-[15px] font-medium text-success">
          <Check size={16} strokeWidth={2} aria-hidden="true" />
          Ready for review
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
          <BookOpen size={19} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-primary">
            Unlike fractions needs a revisit
          </p>
          <p className="mt-1 text-[15px] text-muted">
            A repeated pattern, not a one-off result.
          </p>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-4 text-[15px] text-muted">
        Basis: 3 assessments, 18 responses. Sample view.
      </div>
    </div>
  );
}

export function EvidenceFlow() {
  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((step) => (
        <article key={step.title} className="flex flex-col">
          <h3 className="font-brand text-xl font-semibold text-primary">
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted">
            {step.description}
          </p>
          <div className="mt-6">
            <FlowPreview type={step.preview} />
          </div>
        </article>
      ))}
    </div>
  );
}
