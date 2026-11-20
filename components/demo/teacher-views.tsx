"use client";

import type { FormEvent, RefObject } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  Mail,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge, Button, Panel } from "@/components/ui/primitives";
import { supportHref } from "@/lib/site";
import {
  assessmentStatuses,
  assessments,
  classes,
  insights,
  needsReview,
  tutorModes,
  type Assessment,
  type ChatMessage,
  type View,
} from "@/components/demo/demo-data";
import {
  EmptyState,
  EvidenceTrail,
  StatusBadge,
  ViewHeading,
} from "@/components/demo/demo-shared";

type NavigateProps = {
  onNavigate: (view: View) => void;
};

export function OverviewView({
  selectedAssessment,
  onSelectAssessment,
  reviewedIds,
  onNavigate,
}: NavigateProps & {
  selectedAssessment: Assessment | undefined;
  onSelectAssessment: (id: string) => void;
  reviewedIds: string[];
}) {
  const reviewQueue = assessments.filter(needsReview);
  const active =
    selectedAssessment && needsReview(selectedAssessment)
      ? selectedAssessment
      : reviewQueue[0];
  const reviewed = active ? reviewedIds.includes(active.id) : false;
  const studentTotal = classes.reduce((total, item) => total + item.students, 0);

  return (
    <div className="mx-auto max-w-[1160px]">
      <ViewHeading
        eyebrow="Teacher workspace"
        title="Good morning, Amara."
        description={`Friday, 20 November · ${reviewQueue.length} drafts need a teacher decision before they reach students.`}
      >
        <Button variant="outline" onClick={() => onNavigate("assessments")}>
          Open review queue
          <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Button>
      </ViewHeading>

      <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <Panel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-brand text-lg font-semibold text-primary">
                Review before release
              </h2>
              <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
                AI drafts stay editable until you check the source, wording and outcome.
              </p>
            </div>
            <Badge variant="warning">{reviewQueue.length} waiting</Badge>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-2"
            role="group"
            aria-label="Assessments waiting for review"
          >
            {reviewQueue.map((item) => {
              const selected = item.id === active?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectAssessment(item.id)}
                  className={`min-w-[190px] rounded-lg border px-3 py-2.5 text-left ${
                    selected
                      ? "border-accent-deep bg-accent-soft/60"
                      : "border-line bg-surface hover:border-line-strong hover:bg-surface-muted"
                  }`}
                >
                  <span className="block truncate text-[15px] font-semibold text-primary">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-muted">
                    {item.klass} · due {item.due}
                  </span>
                </button>
              );
            })}
          </div>

          {active && (
            <div className="mt-6 rounded-lg border border-line bg-surface-muted p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                <div>
                  <p className="text-[15px] font-semibold text-accent-deep">
                    Selected draft
                  </p>
                  <h3 className="mt-1 font-brand text-base font-semibold text-primary">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-muted">
                    {active.klass} · {active.submissions} submitted
                  </p>
                </div>
                <StatusBadge status={active.status} />
              </div>
              <div className="mt-5">
                <EvidenceTrail item={active} reviewed={reviewed} />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                <Button size="sm" onClick={() => onNavigate("assessments")}>
                  Open full review
                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Button>
                <span className="text-[15px] text-muted">
                  Sample record · no live school data
                </span>
              </div>
            </div>
          )}
        </Panel>

        <div className="space-y-5">
          <Panel className="p-5">
            <h2 className="font-brand text-base font-semibold text-primary">
              Today at a glance
            </h2>
            <dl className="mt-4 divide-y divide-line">
              {[
                {
                  label: "Drafts waiting",
                  value: String(reviewQueue.length),
                  note: "Teacher review needed",
                },
                {
                  label: "Assessments due",
                  value: "3",
                  note: "Next 14 days",
                },
                {
                  label: "Active classes",
                  value: String(classes.length),
                  note: `${studentTotal} students`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-[15px] text-muted">{item.label}</dt>
                  <dd className="text-right">
                    <span className="font-brand text-lg font-semibold text-primary tabular-nums">
                      {item.value}
                    </span>
                    <span className="mt-0.5 block text-[15px] text-muted">
                      {item.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-brand text-base font-semibold text-primary">
                Class signals
              </h2>
              <button
                type="button"
                onClick={() => onNavigate("insights")}
                className="inline-flex items-center gap-1 text-[15px] font-semibold text-accent-deep hover:underline"
              >
                All
                <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {insights.slice(0, 2).map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.title} className="border-t border-line pt-4">
                    <div className="flex items-start gap-2.5">
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-accent-deep"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-snug text-primary">
                          {insight.title}
                        </p>
                        <p className="mt-1 text-[15px] text-muted">
                          {insight.evidence}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export function ClassesView({
  items,
  search,
  onSearchChange,
  onClearSearch,
}: {
  items: (typeof classes)[number][];
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1160px]">
      <ViewHeading
        eyebrow="Assigned classes"
        title="Classes"
        description="Your four classes, the current topic and what each group is working towards next."
      />

      <Panel className="mt-7 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full items-center gap-2 rounded-lg border border-line bg-background px-3 py-2.5 sm:max-w-[320px]">
            <Search
              size={16}
              strokeWidth={1.8}
              className="shrink-0 text-muted"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search classes"
              aria-label="Search classes"
              className="w-full bg-transparent text-base text-primary outline-none placeholder:text-muted/80 sm:text-[15px]"
            />
          </label>
          <p className="text-[15px] text-muted">Sample class records</p>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.code}
              className="rounded-lg border border-line bg-surface-muted p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[15px] font-semibold text-accent-deep">
                    {item.code}
                  </span>
                  <div>
                    <h2 className="font-brand text-[17px] font-semibold text-primary">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-[15px] text-muted">{item.topic}</p>
                  </div>
                </div>
                <span className="rounded-md bg-surface px-2.5 py-1 text-[15px] font-medium text-muted-strong tabular-nums">
                  {item.students} students
                </span>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="flex items-center justify-between gap-3 text-[15px]">
                  <span className="text-muted">Progress</span>
                  <span className="font-semibold text-primary tabular-nums">
                    {item.progress}%
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent-soft"
                  role="progressbar"
                  aria-label={`${item.name} progress`}
                  aria-valuenow={item.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="mt-4 text-[15px] text-muted">
                  Next:{" "}
                  <span className="font-medium text-ink-soft">{item.next}</span>
                </p>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <EmptyState
              title="No matching classes"
              description={`No classes match “${search}”. Try a different class name or topic.`}
              actionLabel="Clear search"
              onAction={onClearSearch}
            />
          )}
        </div>
      </Panel>
    </div>
  );
}

export function AssessmentsView({
  items,
  selectedAssessment,
  onSelectAssessment,
  reviewedIds,
  onToggleReviewed,
  statusFilter,
  onStatusFilterChange,
  search,
  onSearchChange,
  onClearFilters,
}: {
  items: Assessment[];
  selectedAssessment: Assessment | undefined;
  onSelectAssessment: (id: string) => void;
  reviewedIds: string[];
  onToggleReviewed: (id: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}) {
  const reviewed = selectedAssessment
    ? reviewedIds.includes(selectedAssessment.id)
    : false;

  return (
    <div className="mx-auto max-w-[1160px]">
      <ViewHeading
        eyebrow="Review queue"
        title="Assessments"
        description="Drafts, scheduled tests and released results. AI drafts stay editable until a teacher reviews them."
      />

      <Panel className="mt-7 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-line p-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex w-full items-center gap-2 rounded-lg border border-line bg-background px-3 py-2.5 lg:max-w-[300px]">
            <Search
              size={16}
              strokeWidth={1.8}
              className="shrink-0 text-muted"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search assessments"
              aria-label="Search assessments"
              className="w-full bg-transparent text-base text-primary outline-none placeholder:text-muted/80 sm:text-[15px]"
            />
          </label>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter assessments by status"
          >
            {assessmentStatuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusFilterChange(status)}
                aria-pressed={statusFilter === status}
                className={`rounded-lg border px-3 py-2 text-[15px] font-medium ${
                  statusFilter === status
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-surface text-muted-strong hover:border-line-strong hover:bg-surface-muted"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="No assessments found"
            description="No assessments match the current search and status filter. Clear them to see the full queue."
            actionLabel="Clear filters"
            onAction={onClearFilters}
            icon={FileText}
          />
        ) : (
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="divide-y divide-line border-b border-line lg:border-b-0 lg:border-r">
              {items.map((item) => {
                const selected = item.id === selectedAssessment?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectAssessment(item.id)}
                    aria-pressed={selected}
                    className={`w-full px-5 py-4 text-left ${
                      selected
                        ? "bg-accent-soft"
                        : "hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-primary">
                          {item.title}
                        </p>
                        <p className="mt-1 truncate text-[15px] text-muted">
                          {item.klass} · {item.type}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={12} strokeWidth={1.8} aria-hidden="true" />
                        Due {item.due}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={12} strokeWidth={1.8} aria-hidden="true" />
                        {item.submissions}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAssessment && (
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-accent-deep">
                      Evidence trail
                    </p>
                    <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                      {selectedAssessment.title}
                    </h2>
                    <p className="mt-1 text-[15px] text-muted">
                      {selectedAssessment.klass} · {selectedAssessment.type}
                    </p>
                  </div>
                  <StatusBadge status={selectedAssessment.status} />
                </div>

                <div className="mt-6">
                  <EvidenceTrail item={selectedAssessment} reviewed={reviewed} />
                </div>

                <div className="mt-6 border-t border-line pt-5" aria-live="polite">
                  {needsReview(selectedAssessment) ? (
                    reviewed ? (
                      <div
                        role="status"
                        className="flex items-start gap-2 rounded-lg border border-success/25 bg-success-soft p-3 text-[15px] leading-relaxed text-success"
                      >
                        <CheckCircle2
                          size={15}
                          strokeWidth={1.9}
                          className="mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        Review complete in this preview. The outcome step is now visible.
                      </div>
                    ) : (
                      <div>
                        <Button
                          size="sm"
                          onClick={() => onToggleReviewed(selectedAssessment.id)}
                        >
                          <Check size={15} strokeWidth={2} aria-hidden="true" />
                          Mark as reviewed
                        </Button>
                        <p className="mt-2 text-[15px] text-muted">
                          Demo action · changes this preview only.
                        </p>
                      </div>
                    )
                  ) : (
                    <p className="text-[15px] leading-relaxed text-muted text-pretty">
                      This assessment was already approved. Its source, review and outcome are shown above.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
}

export function TutorView({
  messages,
  mode,
  onModeChange,
  draft,
  onDraftChange,
  onSend,
  sending,
  chatEndRef,
  onNavigate,
  audience = "teacher",
}: NavigateProps & {
  messages: ChatMessage[];
  mode: string;
  onModeChange: (mode: string) => void;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (event: FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
  audience?: "teacher" | "student";
}) {
  const isStudent = audience === "student";

  return (
    <div className="mx-auto max-w-[1160px]">
      <ViewHeading
        eyebrow="Demo mode"
        title="AI Tutor"
        description={
          isStudent
            ? "Ask about the task you are working on. Hints come first, and every answer shows its source."
            : "Scripted responses for this prototype. Every answer shows the material it is grounded in."
        }
      >
        <Badge variant="warning">
          <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
          Disabled during restricted exams
        </Badge>
      </ViewHeading>

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
        <Panel className="flex h-[620px] flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-primary">
                  {isStudent ? "Fractions practice" : "Mathematics help"}
                </p>
                <p className="truncate text-[15px] text-muted">
                  {isStudent
                    ? "Grade 9 · Fractions and ratios"
                    : "Grade 8 · Fractions and ratios"}
                </p>
              </div>
            </div>
            <Badge variant="accent">Demo mode</Badge>
          </div>

          <div
            role="log"
            aria-label="Tutor conversation"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 space-y-5 overflow-y-auto px-5 py-6"
            style={{ overscrollBehavior: "contain" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "student" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div className={`max-w-[90%] ${message.role === "student" ? "" : "w-full"}`}>
                  {message.role === "student" ? (
                    <div className="rounded-xl rounded-br-sm bg-primary px-4 py-3 text-[15px] leading-[1.6] text-white text-pretty">
                      {message.text}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-line bg-surface-muted p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <BrandMark size={20} />
                        <span className="font-brand text-[15px] font-semibold text-primary">
                          Maarivo
                        </span>
                        {message.mode && (
                          <span className="text-[15px] text-muted">
                            · {message.mode}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft text-pretty">
                        {message.text}
                      </p>
                      {message.source && (
                        <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-[15px] text-muted">
                          <BookOpen size={12} strokeWidth={1.8} aria-hidden="true" />
                          Source: {message.source}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex items-center gap-2 text-[15px] text-muted" role="status">
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Preparing a grounded response…
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={onSend} className="border-t border-line p-4">
            <div
              className="flex flex-wrap gap-2 pb-3"
              role="group"
              aria-label="Tutor response mode"
            >
              {tutorModes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onModeChange(item)}
                  aria-pressed={mode === item}
                  className={`rounded-lg border px-2.5 py-1.5 text-[15px] font-medium ${
                    mode === item
                      ? "border-accent bg-accent-soft text-accent-deep"
                      : "border-line text-muted-strong hover:border-line-strong hover:bg-surface-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-end gap-2">
              <label className="min-w-0 flex-1 rounded-lg border border-line bg-background px-3 py-2.5 focus-within:border-accent">
                <span className="sr-only">Ask the tutor</span>
                <input
                  value={draft}
                  onChange={(event) => onDraftChange(event.target.value)}
                  placeholder="Ask a question about this topic"
                  className="w-full bg-transparent text-base text-primary outline-none placeholder:text-muted/80 sm:text-[15px]"
                />
              </label>
              <button
                type="submit"
                disabled={!draft.trim() || sending}
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 enabled:hover:bg-primary-raised"
                aria-label="Send message"
              >
                <Send size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </form>
        </Panel>

        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="font-brand text-base font-semibold text-primary">
              Grounding in this preview
            </h2>
            <div className="mt-4 space-y-3">
              {[
                "Uses the subject and topic context",
                "Retrieves school-approved materials first",
                "Offers hints before complete answers",
                "Flags when information is insufficient",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft text-pretty"
                >
                  <Check
                    size={14}
                    strokeWidth={2.2}
                    className="mt-0.5 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-brand text-base font-semibold text-primary">
              Attached material
            </h2>
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-line bg-surface-muted p-3">
              <FileText
                size={17}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-accent-deep"
                aria-hidden="true"
              />
              <div>
                <p className="text-[15px] font-medium text-primary">
                  Fractions and ratios
                </p>
                <p className="mt-0.5 text-[15px] text-muted">
                  Unit 3 · teacher uploaded
                </p>
              </div>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
              In the live product, answers are grounded in your uploaded resources and every conversation is linked to its sources.
            </p>
          </Panel>

          <Panel className="flex items-start gap-3 p-5">
            <ShieldCheck
              size={18}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-accent-deep"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-brand text-[15px] font-semibold text-primary">
                Assessment boundary
              </h2>
              <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
                {isStudent
                  ? "Tutor help is unavailable during restricted assessments. Your teacher decides when it is enabled."
                  : "Tutor access is disabled during restricted exams. Teachers see the rule before release."}
              </p>
              <button
                type="button"
                onClick={() => onNavigate(isStudent ? "practice" : "assessments")}
                className="mt-3 inline-flex items-center gap-1 text-[15px] font-semibold text-accent-deep hover:underline"
              >
                {isStudent ? "Back to practice" : "View assessment queue"}
                <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export function InsightsView({ onNavigate }: NavigateProps) {
  return (
    <div className="mx-auto max-w-[1160px]">
      <ViewHeading
        eyebrow="Learning intelligence"
        title="Learning insights"
        description="Observations tied to assessment evidence. Use them to decide what to revisit, not as a verdict on a student."
      />

      <Panel className="mt-7 p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {[
            {
              label: "Topics needing revision",
              value: "3",
              detail: "Based on repeated errors",
            },
            {
              label: "Students to check in with",
              value: "14",
              detail: "Across two classes",
            },
            {
              label: "Topics improving",
              value: "2",
              detail: "Over the last eight weeks",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className={index === 0 ? "" : "sm:pl-5"}
            >
              <p className="text-[15px] font-medium text-muted">{item.label}</p>
              <p className="mt-2 font-brand text-2xl font-semibold text-primary tabular-nums">
                {item.value}
              </p>
              <p className="mt-1 text-[15px] text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Panel key={insight.title} className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-brand text-base font-semibold text-primary">
                    {insight.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft text-pretty">
                    {insight.body}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex items-start gap-2">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[15px] font-medium text-muted">Evidence</p>
                    <p className="text-[15px] text-primary">{insight.evidence}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(insight.view)}
                  className="inline-flex items-center gap-1 text-[15px] font-semibold text-accent-deep hover:underline"
                >
                  {insight.action}
                  <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-brand text-base font-semibold text-primary">
            Want this built on your school&apos;s data?
          </h2>
          <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
            Talk to support about a version tailored to your curriculum and workflow.
          </p>
        </div>
        <Button href={supportHref} size="sm">
          <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
          Get a tailored version
        </Button>
      </Panel>
    </div>
  );
}
