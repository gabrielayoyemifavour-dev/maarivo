"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  LockKeyhole,
  MessageSquareText,
} from "lucide-react";
import { Badge, Button, Panel } from "@/components/ui/primitives";
import {
  parentAssessments,
  parentFeedback,
  type ParentAssessment,
  type ParentFeedback,
  type View,
} from "@/components/demo/demo-data";
import { EmptyState, EvidenceSteps, ViewHeading } from "@/components/demo/demo-shared";

const feedbackSubjects = ["All", "Mathematics", "Science", "English"] as const;
type FeedbackSubject = (typeof feedbackSubjects)[number];

function AssessmentBadge({ status }: { status: ParentAssessment["status"] }) {
  return (
    <Badge variant={status === "Results ready" ? "success" : "accent"}>
      {status}
    </Badge>
  );
}

function FeedbackEvidence({ item }: { item: ParentFeedback }) {
  return (
    <EvidenceSteps
      steps={[
        {
          label: "Teacher observation",
          detail: `${item.teacher} · ${item.date}`,
          state: "done",
        },
        { label: "Evidence", detail: item.source, state: "done" },
        {
          label: "Next step",
          detail: item.body,
          state: "done",
        },
        {
          label: "Your view",
          detail: "Shown to the linked parent account only. Not a grade or a verdict.",
          state: "done",
        },
      ]}
    />
  );
}

function AssessmentEvidence({ item }: { item: ParentAssessment }) {
  return (
    <EvidenceSteps
      steps={[
        { label: "School calendar", detail: `Due ${item.due}`, state: "done" },
        { label: "Teacher approval", detail: item.teacherApproved, state: "done" },
        {
          label: "What you can see",
          detail: item.detail,
          state: "done",
        },
        {
          label: "Results",
          detail:
            item.status === "Results ready"
              ? "Released to the class. Ask the teacher for context."
              : "Not available until the assessment is complete.",
          state: item.status === "Results ready" ? "done" : "waiting",
        },
      ]}
    />
  );
}

export function ParentWorkspace({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(
    parentFeedback[0].id,
  );
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(
    parentAssessments[0].id,
  );
  const [subjectFilter, setSubjectFilter] = useState<FeedbackSubject>("All");
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const filteredFeedback =
    subjectFilter === "All"
      ? parentFeedback
      : parentFeedback.filter((item) => item.subject === subjectFilter);
  const selectedFeedback =
    filteredFeedback.find((item) => item.id === selectedFeedbackId) ??
    filteredFeedback[0];
  const selectedAssessment =
    parentAssessments.find((item) => item.id === selectedAssessmentId) ??
    parentAssessments[0];
  const feedbackSeen = selectedFeedback
    ? seenIds.includes(selectedFeedback.id)
    : false;

  function markSeen(id: string) {
    setSeenIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }

  return (
    <>
      {view === "child" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Parent workspace"
            title="Ife's overview"
            description="Friday, 20 November · Feedback and assessments for your linked child. Your school controls what appears here."
          >
            <Button variant="outline" onClick={() => onNavigate("feedback")}>
              Read feedback
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Button>
          </ViewHeading>

          <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
            <Panel className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm font-semibold text-accent-deep">
                    IO
                  </span>
                  <div>
                    <h2 className="font-brand text-lg font-semibold text-primary">
                      Ife Okafor
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      Grade 9 · Demo school
                    </p>
                  </div>
                </div>
                <Badge variant="accent">Linked profile · sample</Badge>
              </div>

              <h3 className="mt-5 font-brand text-base font-semibold text-primary">
                Recent teacher feedback
              </h3>
              <div className="mt-3 divide-y divide-line">
                {parentFeedback.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedFeedbackId(item.id);
                      onNavigate("feedback");
                    }}
                    className="w-full py-4 text-left first:pt-0 hover:bg-surface-muted"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-primary">
                        {item.title}
                      </p>
                      <span className="text-xs text-muted">{item.date}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {item.subject} · {item.teacher}
                    </p>
                  </button>
                ))}
              </div>
            </Panel>

            <div className="space-y-5">
              <Panel className="p-5">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    strokeWidth={1.8}
                    className="text-accent-deep"
                    aria-hidden="true"
                  />
                  <h2 className="font-brand text-base font-semibold text-primary">
                    Upcoming assessment
                  </h2>
                </div>
                <div className="mt-4 rounded-md border border-line bg-surface-muted p-4">
                  <p className="text-sm font-semibold text-primary">
                    {parentAssessments[0].title}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {parentAssessments[0].subject} · due{" "}
                    {parentAssessments[0].due}
                  </p>
                  <div className="mt-3">
                    <AssessmentBadge status={parentAssessments[0].status} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("upcoming")}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-deep hover:underline"
                >
                  View all assessments
                  <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </Panel>

              <Panel className="p-5">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-accent-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-brand text-sm font-semibold text-primary">
                      Access boundary
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted text-pretty">
                      Parents see only information for children linked to their account, with the level of detail set by the school.
                    </p>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      )}

      {view === "feedback" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Linked child"
            title="Teacher feedback"
            description="Feedback for Ife, with the source and next step attached. This is guidance, not a grade."
          />

          <Panel className="mt-7 overflow-hidden">
            <div className="flex flex-wrap gap-2 border-b border-line p-5" role="group" aria-label="Filter feedback by subject">
              {feedbackSubjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => setSubjectFilter(subject)}
                  aria-pressed={subjectFilter === subject}
                  className={`rounded-md border px-3 py-2 text-xs font-medium ${
                    subjectFilter === subject
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-surface text-muted-strong hover:border-line-strong hover:bg-surface-muted"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            {filteredFeedback.length === 0 ? (
              <EmptyState
                title="No feedback in this subject"
                description="No sample feedback is available under this filter. Show all subjects to see the full set."
                actionLabel="Show all subjects"
                onAction={() => setSubjectFilter("All")}
                icon={MessageSquareText}
              />
            ) : (
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="divide-y divide-line border-b border-line lg:border-b-0 lg:border-r">
                  {filteredFeedback.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedFeedbackId(item.id)}
                      aria-pressed={item.id === selectedFeedback?.id}
                      className={`w-full px-5 py-4 text-left ${
                        item.id === selectedFeedback?.id
                          ? "bg-accent-soft/50"
                          : "hover:bg-surface-muted"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold leading-snug text-primary">
                          {item.title}
                        </p>
                        {seenIds.includes(item.id) && (
                          <CheckCircle2
                            size={15}
                            strokeWidth={1.9}
                            className="mt-0.5 shrink-0 text-success"
                            aria-label="Marked as seen"
                          />
                        )}
                      </div>
                      <p className="mt-2 text-xs text-muted">
                        {item.subject} · {item.teacher}
                      </p>
                      <p className="mt-1 text-xs text-muted">{item.date}</p>
                    </button>
                  ))}
                </div>

                {selectedFeedback && (
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-accent-deep">
                          Feedback detail
                        </p>
                        <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                          {selectedFeedback.title}
                        </h2>
                        <p className="mt-1 text-xs text-muted">
                          {selectedFeedback.teacher} · {selectedFeedback.date}
                        </p>
                      </div>
                      <Badge variant="neutral">{selectedFeedback.subject}</Badge>
                    </div>

                    <div className="mt-6">
                      <FeedbackEvidence item={selectedFeedback} />
                    </div>

                    <div className="mt-6 border-t border-line pt-5" aria-live="polite">
                      {feedbackSeen ? (
                        <div
                          role="status"
                          className="flex items-start gap-2 rounded-md border border-success/25 bg-success-soft p-3 text-xs leading-relaxed text-success"
                        >
                          <CheckCircle2
                            size={15}
                            strokeWidth={1.9}
                            className="mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          Marked as seen in this preview. Nothing was sent to the school.
                        </div>
                      ) : (
                        <div>
                          <Button size="sm" onClick={() => markSeen(selectedFeedback.id)}>
                            <CheckCircle2 size={15} strokeWidth={1.9} aria-hidden="true" />
                            Mark as seen
                          </Button>
                          <p className="mt-2 text-xs text-muted">
                            Demo action · changes this preview only.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Panel>
        </div>
      )}

      {view === "upcoming" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Linked child"
            title="Upcoming assessments"
            description="Dates and details set by the school. See what is scheduled and what has already been released."
          />

          <Panel className="mt-7 overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="divide-y divide-line border-b border-line lg:border-b-0 lg:border-r">
                {parentAssessments.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAssessmentId(item.id)}
                    aria-pressed={item.id === selectedAssessment?.id}
                    className={`w-full px-5 py-4 text-left ${
                      item.id === selectedAssessment?.id
                        ? "bg-accent-soft/50"
                        : "hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold leading-snug text-primary">
                        {item.title}
                      </p>
                      <AssessmentBadge status={item.status} />
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      {item.subject} · due {item.due}
                    </p>
                  </button>
                ))}
              </div>

              {selectedAssessment && (
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-accent-deep">
                        Assessment detail
                      </p>
                      <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                        {selectedAssessment.title}
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        {selectedAssessment.subject} · due {selectedAssessment.due}
                      </p>
                    </div>
                    <AssessmentBadge status={selectedAssessment.status} />
                  </div>

                  <div className="mt-6">
                    <AssessmentEvidence item={selectedAssessment} />
                  </div>

                  <div className="mt-6 flex items-start gap-2.5 rounded-md border border-line bg-surface-muted p-3">
                    <ClipboardList
                      size={15}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-accent-deep"
                      aria-hidden="true"
                    />
                    <p className="text-xs leading-relaxed text-muted text-pretty">
                      Assessment content and individual scores are not shown in this parent preview.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}
