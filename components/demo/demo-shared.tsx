import type { ReactNode } from "react";
import { ArrowRight, Check, SearchX, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import {
  needsReview,
  type Assessment,
  type AssessmentStatus,
} from "@/components/demo/demo-data";

export function ViewHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-t border-line-strong pt-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="label-caps text-ochre">{eyebrow}</p>}
        <h1 className="mt-3 font-brand text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-primary sm:text-[36px]">
          {title}
        </h1>
        <p className="mt-3 max-w-[640px] text-sm leading-[1.7] text-muted text-pretty">
          {description}
        </p>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: AssessmentStatus }) {
  const variant =
    status === "Results ready" || status === "Released"
      ? "success"
      : status === "Draft"
        ? "neutral"
        : "accent";

  return <Badge variant={variant}>{status}</Badge>;
}

export type EvidenceStepState = "done" | "current" | "waiting";

export type EvidenceStep = {
  label: string;
  detail: string;
  state: EvidenceStepState;
};

const nodeStyles: Record<EvidenceStepState, string> = {
  done: "border-accent-deep bg-accent-deep text-white",
  current: "border-accent-deep bg-surface text-accent-deep",
  waiting: "border-line-strong bg-surface text-muted",
};

export function EvidenceSteps({ steps }: { steps: EvidenceStep[] }) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => (
        <li key={step.label} className="relative pb-5 pl-7 last:pb-0">
          {index < steps.length - 1 && (
            <span
              className="absolute left-[5px] top-4 h-[calc(100%-8px)] w-px bg-line"
              aria-hidden="true"
            />
          )}
          <span
            className={`absolute left-0 top-0.5 flex size-3 items-center justify-center rounded-full border ${nodeStyles[step.state]}`}
            aria-hidden="true"
          >
            {step.state === "done" ? (
              <Check size={8} strokeWidth={3} />
            ) : (
              <span className="size-1 rounded-full bg-current" />
            )}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="text-xs font-semibold text-primary">{step.label}</p>
            {step.state === "current" && (
              <span className="text-xs font-medium text-accent-deep">
                Needs decision
              </span>
            )}
            {step.state === "waiting" && (
              <span className="text-xs text-muted">After review</span>
            )}
          </div>
          <p className="mt-1 text-xs leading-[1.6] text-muted text-pretty">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function EvidenceTrail({
  item,
  reviewed,
}: {
  item: Assessment;
  reviewed: boolean;
}) {
  const approvedAlready = !needsReview(item);
  const reviewComplete = reviewed || approvedAlready;

  const steps: EvidenceStep[] = [
    {
      label: "Source",
      detail: item.source,
      state: "done",
    },
    {
      label: "AI draft",
      detail: item.generated,
      state: "done",
    },
    {
      label: "Teacher review",
      detail: reviewed
        ? "Reviewed in this preview · local state only"
        : item.review,
      state: reviewComplete ? "done" : "current",
    },
    {
      label: "Outcome",
      detail: item.outcome,
      state: reviewComplete ? "done" : "waiting",
    },
  ];

  return <EvidenceSteps steps={steps} />;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = SearchX,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: LucideIcon;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <Icon size={24} strokeWidth={1.6} className="mx-auto text-muted" aria-hidden="true" />
      <p className="mt-3 font-brand text-base font-semibold text-primary">{title}</p>
      <p className="mx-auto mt-1 max-w-[360px] text-sm leading-relaxed text-muted text-pretty">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-surface px-3 py-2 text-sm font-medium text-primary hover:border-primary/35 hover:bg-accent-soft/50"
      >
        {actionLabel}
        <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
