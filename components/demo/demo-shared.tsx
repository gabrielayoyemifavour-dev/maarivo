import type { ReactNode } from "react";
import { Check, SearchX, type LucideIcon } from "lucide-react";
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
    <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="text-[15px] font-semibold text-accent-deep">{eyebrow}</p>}
        <h1 className="mt-3 font-brand text-[32px] font-semibold leading-[1.12] text-primary sm:text-[38px]">
          {title}
        </h1>
        <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-muted text-pretty">
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
    <ol>
      {steps.map((step, index) => (
        <li key={step.label} className="relative pb-6 pl-8 last:pb-0">
          {index < steps.length - 1 && (
            <span
              className="absolute left-[6px] top-5 h-[calc(100%-12px)] w-0.5 bg-line"
              aria-hidden="true"
            />
          )}
          <span
            className={`absolute left-0 top-1 flex size-4 items-center justify-center rounded-full border ${nodeStyles[step.state]}`}
            aria-hidden="true"
          >
            {step.state === "done" ? (
              <Check size={9} strokeWidth={3} />
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-[15px] font-semibold text-primary">{step.label}</p>
            {step.state === "current" && (
              <span className="text-[15px] font-medium text-accent-deep">
                Needs decision
              </span>
            )}
            {step.state === "waiting" && (
              <span className="text-[15px] text-muted">After review</span>
            )}
          </div>
          <p className="mt-1.5 text-[15px] leading-[1.6] text-muted text-pretty">
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
      <Icon
        size={28}
        strokeWidth={1.7}
        className="mx-auto text-accent-deep"
        aria-hidden="true"
      />
      <p className="mt-4 font-brand text-xl font-semibold text-primary">{title}</p>
      <p className="mx-auto mt-2 max-w-[400px] text-[15px] leading-relaxed text-muted text-pretty">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-[15px] font-medium text-white hover:bg-primary-raised"
      >
        {actionLabel}
      </button>
    </div>
  );
}
