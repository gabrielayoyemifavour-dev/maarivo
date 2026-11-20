"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, ClipboardList, Users } from "lucide-react";
import { Badge, Button, Panel } from "@/components/ui/primitives";
import {
  leaderSignals,
  schoolClasses,
  schoolScopes,
  type LeaderSignal,
  type LeaderSignalStatus,
  type SchoolScope,
  type View,
} from "@/components/demo/demo-data";
import { EvidenceSteps, ViewHeading } from "@/components/demo/demo-shared";

function SignalBadge({ status }: { status: LeaderSignalStatus }) {
  const variant =
    status === "Review" ? "warning" : status === "On track" ? "success" : "accent";
  return <Badge variant={variant}>{status}</Badge>;
}

function ScopeFilter({
  value,
  onChange,
}: {
  value: SchoolScope;
  onChange: (scope: SchoolScope) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by grade"
    >
      {schoolScopes.map((scope) => (
        <button
          key={scope}
          type="button"
          onClick={() => onChange(scope)}
          aria-pressed={value === scope}
          className={`rounded-lg border px-3 py-2 text-[15px] font-medium ${
            value === scope
              ? "border-primary bg-primary text-white"
              : "border-line bg-surface text-muted-strong hover:border-line-strong hover:bg-surface-muted"
          }`}
        >
          {scope}
        </button>
      ))}
    </div>
  );
}

function SignalEvidence({ signal }: { signal: LeaderSignal }) {
  return (
    <EvidenceSteps
      steps={[
        { label: "Signal", detail: signal.title, state: "done" },
        { label: "Evidence", detail: `${signal.evidence} · ${signal.klass}`, state: "done" },
        {
          label: "Teacher decision",
          detail: signal.decision,
          state: signal.status === "Review" ? "current" : "done",
        },
        {
          label: "Next check",
          detail:
            signal.status === "Review"
              ? "Follow up after the teacher reviews the attached evidence."
              : "Keep monitoring at the next assessment point.",
          state: signal.status === "Review" ? "waiting" : "done",
        },
      ]}
    />
  );
}

export function LeaderWorkspace({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  const [scope, setScope] = useState<SchoolScope>("All");
  const [selectedClassCode, setSelectedClassCode] = useState<string>(
    schoolClasses[0].code,
  );
  const [selectedSignalId, setSelectedSignalId] = useState(
    leaderSignals[0].id,
  );

  const scopedClasses = schoolClasses.filter(
    (item) => scope === "All" || item.grade === scope,
  );
  const scopedSignals = leaderSignals.filter(
    (item) => scope === "All" || item.grade === scope,
  );
  const selectedClass =
    scopedClasses.find((item) => item.code === selectedClassCode) ??
    scopedClasses[0];
  const selectedSignal =
    scopedSignals.find((item) => item.id === selectedSignalId) ??
    scopedSignals[0];
  const studentTotal = scopedClasses.reduce(
    (total, item) => total + item.students,
    0,
  );
  const teacherCount = new Set(scopedClasses.map((item) => item.teacher)).size;

  return (
    <>
      {view === "school" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="School leadership"
            title="School overview"
            description="Sample data across four classes. Start with a signal, then follow the evidence back to the class and teacher."
          >
            <Button variant="outline" onClick={() => onNavigate("reports")}>
              Open evidence reports
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Button>
          </ViewHeading>

          <div className="mt-6">
            <ScopeFilter value={scope} onChange={setScope} />
          </div>

          <Panel className="mt-5 p-5 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-3 sm:divide-x sm:divide-line">
              {[
                { label: "Classes", value: scopedClasses.length, detail: "In this view" },
                { label: "Students", value: studentTotal, detail: "Across selected classes" },
                { label: "Teachers", value: teacherCount, detail: "Assigned to these classes" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[15px] font-medium text-muted">{item.label}</p>
                  <p className="mt-2 font-brand text-2xl font-semibold text-primary tabular-nums">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[15px] text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Panel className="overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <h2 className="font-brand text-base font-semibold text-primary">
                  Signals to review
                </h2>
                <Badge variant="warning">{scopedSignals.length}</Badge>
              </div>
              <div className="divide-y divide-line">
                {scopedSignals.map((signal) => (
                  <button
                    key={signal.id}
                    type="button"
                    onClick={() => setSelectedSignalId(signal.id)}
                    aria-pressed={signal.id === selectedSignal?.id}
                    className={`w-full px-5 py-4 text-left ${
                      signal.id === selectedSignal?.id
                        ? "bg-accent-soft"
                        : "hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[15px] font-semibold leading-snug text-primary">
                        {signal.title}
                      </p>
                      <SignalBadge status={signal.status} />
                    </div>
                    <p className="mt-2 text-[15px] text-muted">
                      {signal.subject} · {signal.klass}
                    </p>
                    <p className="mt-1 text-[15px] text-muted">{signal.evidence}</p>
                  </button>
                ))}
              </div>
            </Panel>

            {selectedSignal && (
              <Panel className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-accent-deep">
                      Evidence trail
                    </p>
                    <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                      {selectedSignal.title}
                    </h2>
                    <p className="mt-1 text-[15px] text-muted">
                      {selectedSignal.grade} · {selectedSignal.subject}
                    </p>
                  </div>
                  <SignalBadge status={selectedSignal.status} />
                </div>

                <div className="mt-6">
                  <SignalEvidence signal={selectedSignal} />
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <Button size="sm" onClick={() => onNavigate("reports")}>
                    View full report
                    <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </Button>
                  <p className="mt-2 text-[15px] text-muted">
                    Sample report · no live school data
                  </p>
                </div>
              </Panel>
            )}
          </div>
        </div>
      )}

      {view === "classes" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="School register"
            title="Classes"
            description="A scoped view of classes, assigned teachers and current review state. Select a class to see its evidence."
          />

          <div className="mt-6">
            <ScopeFilter value={scope} onChange={setScope} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {scopedClasses.map((item) => {
              const selected = item.code === selectedClass?.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedClassCode(item.code)}
                  aria-pressed={selected}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    selected
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-surface hover:border-line-strong hover:bg-surface-muted"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[15px] font-semibold text-accent-deep">
                        {item.code}
                      </span>
                      <div>
                        <h2 className="font-brand text-[17px] font-semibold text-primary">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-[15px] text-muted">
                          {item.subject} · {item.teacher}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md bg-surface px-2.5 py-1 text-[15px] font-medium text-muted-strong tabular-nums">
                      {item.students} students
                    </span>
                  </div>

                  <div className="mt-5 border-t border-line/70 pt-4">
                    <div className="flex items-center justify-between gap-3 text-[15px]">
                      <span className="text-muted">Progress</span>
                      <span className="font-semibold text-primary tabular-nums">
                        {item.progress}%
                      </span>
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface"
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
                    <div className="mt-4 flex items-center justify-between gap-3 text-[15px]">
                      <span className="font-medium text-accent-deep">
                        {item.review}
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                        className="text-accent-deep"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedClass && (
            <Panel className="mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                  <Users size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-brand text-base font-semibold text-primary">
                    {selectedClass.name}
                  </h2>
                  <p className="mt-1 text-[15px] text-muted">
                    {selectedClass.teacher} · {selectedClass.students} students ·{" "}
                    {selectedClass.progress}% progress
                  </p>
                  <p className="mt-1 text-[15px] text-muted">
                    Review state: {selectedClass.review}
                  </p>
                </div>
              </div>
              <Button size="sm" onClick={() => onNavigate("reports")}>
                Open evidence reports
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </Button>
            </Panel>
          )}
        </div>
      )}

      {view === "reports" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Evidence reports"
            title="Reports"
            description="A small set of sample observations. Each one links a school signal to its source, owner and next check."
          />

          <div className="mt-6">
            <ScopeFilter value={scope} onChange={setScope} />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Panel className="overflow-hidden">
              <div className="divide-y divide-line">
                {scopedSignals.map((signal) => (
                  <button
                    key={signal.id}
                    type="button"
                    onClick={() => setSelectedSignalId(signal.id)}
                    aria-pressed={signal.id === selectedSignal?.id}
                    className={`w-full px-5 py-4 text-left ${
                      signal.id === selectedSignal?.id
                        ? "bg-accent-soft"
                        : "hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[15px] font-semibold leading-snug text-primary">
                        {signal.title}
                      </p>
                      <SignalBadge status={signal.status} />
                    </div>
                    <p className="mt-2 text-[15px] text-muted">
                      {signal.grade} · {signal.subject}
                    </p>
                  </button>
                ))}
              </div>
            </Panel>

            {selectedSignal && (
              <Panel className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-accent-deep">
                      Sample report
                    </p>
                    <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                      {selectedSignal.title}
                    </h2>
                    <p className="mt-1 text-[15px] text-muted">
                      Owner: {selectedSignal.owner}
                    </p>
                  </div>
                  <SignalBadge status={selectedSignal.status} />
                </div>

                <div className="mt-6">
                  <SignalEvidence signal={selectedSignal} />
                </div>

                <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-muted p-3">
                    <BookOpen
                      size={15}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-accent-deep"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[15px] font-semibold text-primary">Source</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
                        {selectedSignal.source}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-muted p-3">
                    <CheckCircle2
                      size={15}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[15px] font-semibold text-primary">Decision</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
                        {selectedSignal.decision}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Button size="sm" onClick={() => onNavigate("classes")}>
                    View class register
                    <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </Button>
                </div>
              </Panel>
            )}
          </div>

          <Panel className="mt-5 flex items-start gap-3 p-5">
            <ClipboardList
              size={18}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-accent-deep"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-brand text-[15px] font-semibold text-primary">
                What these reports are
              </h2>
              <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">
                They are sample product views showing how a school signal could be traced back to evidence. No report here is generated from live school data.
              </p>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}
