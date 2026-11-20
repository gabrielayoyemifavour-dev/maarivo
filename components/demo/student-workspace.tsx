"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  RotateCcw,
} from "lucide-react";
import { Badge, Button, Panel } from "@/components/ui/primitives";
import {
  demoReply,
  demoTopic,
  initialMessages,
  studentSubjects,
  studentTasks,
  type ChatMessage,
  type StudentTask,
  type StudentTaskStatus,
  type View,
} from "@/components/demo/demo-data";
import { EmptyState, EvidenceSteps, ViewHeading } from "@/components/demo/demo-shared";
import { TutorView } from "@/components/demo/teacher-views";

type AnswerFeedback = {
  state: "correct" | "incorrect";
  message: string;
};

const practiceFilters: ("All" | StudentTaskStatus)[] = [
  "All",
  "Next up",
  "Due soon",
  "Reviewed",
];

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/");
}

function TaskBadge({ status }: { status: StudentTaskStatus }) {
  const variant =
    status === "Next up" ? "accent" : status === "Reviewed" ? "success" : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}

function TaskWork({
  task,
  answer,
  onAnswerChange,
  onSubmit,
  onToggleHint,
  hintVisible,
  feedback,
}: {
  task: StudentTask;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleHint: () => void;
  hintVisible: boolean;
  feedback: AnswerFeedback | null;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-muted p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold text-accent-deep">
            {task.subject} · {task.topic}
          </p>
          <h3 className="mt-1 font-brand text-base font-semibold text-primary">
            {task.title}
          </h3>
          <p className="mt-1 text-xs text-muted">Due {task.due}</p>
        </div>
        <TaskBadge status={task.status} />
      </div>

      <p className="mt-4 text-sm leading-[1.7] text-ink-soft text-pretty">
        {task.prompt}
      </p>

      <form onSubmit={onSubmit} className="mt-4">
        {task.kind === "text" ? (
          <label className="block">
            <span className="text-xs font-semibold text-primary">Your answer</span>
            <input
              value={answer}
              onChange={(event) => onAnswerChange(event.target.value)}
              placeholder="Type your answer"
              aria-label="Your answer"
              aria-invalid={feedback?.state === "incorrect"}
              className="mt-2 w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-base text-primary outline-none placeholder:text-muted/80 sm:text-sm"
            />
          </label>
        ) : (
          <fieldset>
            <legend className="text-xs font-semibold text-primary">
              Choose one answer
            </legend>
            <div className="mt-2 space-y-2">
              {task.options?.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm leading-snug text-ink-soft has-[:checked]:border-accent-deep has-[:checked]:bg-accent-soft/50"
                >
                  <input
                    type="radio"
                    name={`answer-${task.id}`}
                    value={option}
                    checked={answer === option}
                    onChange={(event) => onAnswerChange(event.target.value)}
                    className="mt-0.5 size-4 shrink-0 accent-accent-deep"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm" type="submit" disabled={!answer.trim()}>
            <Check size={15} strokeWidth={2} aria-hidden="true" />
            Check answer
          </Button>
          <button
            type="button"
            onClick={onToggleHint}
            aria-expanded={hintVisible}
            className="inline-flex items-center gap-1.5 rounded-md text-xs font-semibold text-accent-deep hover:underline"
          >
            <Lightbulb size={14} strokeWidth={1.8} aria-hidden="true" />
            {hintVisible ? "Hide hint" : "Show a hint"}
          </button>
        </div>
      </form>

      {hintVisible && (
        <div className="mt-4 rounded-md border border-accent/25 bg-accent-soft p-3 text-xs leading-relaxed text-ink-soft text-pretty">
          <p className="font-semibold text-accent-deep">Hint</p>
          <p className="mt-1">{task.hint}</p>
        </div>
      )}

      <div aria-live="polite" className="mt-4">
        {feedback && (
          <div
            role={feedback.state === "correct" ? "status" : "alert"}
            className={`flex items-start gap-2 rounded-md border p-3 text-xs leading-relaxed text-pretty ${
              feedback.state === "correct"
                ? "border-success/25 bg-success-soft text-success"
                : "border-warning/30 bg-warning-soft text-warning"
            }`}
          >
            {feedback.state === "correct" ? (
              <CheckCircle2
                size={15}
                strokeWidth={1.9}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <RotateCcw
                size={15}
                strokeWidth={1.9}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            )}
            {feedback.message}
          </div>
        )}
      </div>

      <p className="mt-4 border-t border-line pt-3 text-xs text-muted text-pretty">
        Your answer changes this preview only. Nothing is saved to a school record.
      </p>
    </div>
  );
}

function TaskEvidence({
  task,
  answer,
  feedback,
}: {
  task: StudentTask;
  answer: string;
  feedback: AnswerFeedback | null;
}) {
  return (
    <EvidenceSteps
      steps={[
        { label: "Source", detail: task.source, state: "done" },
        { label: "Teacher note", detail: task.teacherNote, state: "done" },
        {
          label: "Your attempt",
          detail: feedback ? `Submitted: ${answer}` : "Not submitted yet",
          state: feedback ? "done" : "current",
        },
        {
          label: "Feedback",
          detail: feedback?.message ?? "Shown after you submit an answer",
          state:
            feedback?.state === "correct"
              ? "done"
              : feedback
                ? "current"
                : "waiting",
        },
      ]}
    />
  );
}

export function StudentWorkspace({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  const [selectedTaskId, setSelectedTaskId] = useState(studentTasks[0].id);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [practiceFilter, setPracticeFilter] = useState<(typeof practiceFilters)[number]>(
    "All",
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(
    studentSubjects[0].name,
  );
  const [mode, setMode] = useState("Step by step");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, sending]);

  const selectedTask =
    studentTasks.find((item) => item.id === selectedTaskId) ?? studentTasks[0];
  const subject = studentSubjects.find((item) => item.name === selectedSubject);

  function selectTask(id: string) {
    setSelectedTaskId(id);
    setAnswer("");
    setFeedback(null);
    setHintVisible(false);
  }

  function changePracticeFilter(next: (typeof practiceFilters)[number]) {
    setPracticeFilter(next);
    const nextTasks =
      next === "All"
        ? studentTasks
        : studentTasks.filter((item) => item.status === next);
    const first = nextTasks[0];
    if (first && !nextTasks.some((item) => item.id === selectedTask.id)) {
      selectTask(first.id);
    }
  }

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = answer.trim();
    if (!value) {
      setFeedback({ state: "incorrect", message: "Enter an answer first." });
      return;
    }
    const correct = selectedTask.accepted.some(
      (item) => normalizeAnswer(item) === normalizeAnswer(value),
    );
    if (correct) {
      setFeedback({ state: "correct", message: selectedTask.success });
      setCompletedIds((current) =>
        current.includes(selectedTask.id) ? current : [...current, selectedTask.id],
      );
    } else {
      setFeedback({
        state: "incorrect",
        message: "Not quite yet. Use the hint, then try again.",
      });
    }
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "student", text },
    ]);
    setDraft("");
    setSending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "tutor",
          mode,
          text: demoReply(text, mode),
          source: demoTopic(text),
        },
      ]);
      setSending(false);
    }, 650);
  }

  const filteredTasks =
    practiceFilter === "All"
      ? studentTasks
      : studentTasks.filter((item) => item.status === practiceFilter);

  const taskWork = (
    <TaskWork
      task={selectedTask}
      answer={answer}
      onAnswerChange={setAnswer}
      onSubmit={checkAnswer}
      onToggleHint={() => setHintVisible((current) => !current)}
      hintVisible={hintVisible}
      feedback={feedback}
    />
  );

  return (
    <>
      {view === "learning" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Student workspace"
            title="Good morning, Ife."
            description="Friday, 20 November · One task is due today. Start with the source, then try the question before asking for help."
          >
            <Button variant="outline" onClick={() => onNavigate("practice")}>
              Open practice
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Button>
          </ViewHeading>

          <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
            <Panel className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-brand text-lg font-semibold text-primary">
                    Next in your learning
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted text-pretty">
                    Each task keeps its source and teacher note beside your work.
                  </p>
                </div>
                <Badge variant="accent">{studentTasks.length} sample tasks</Badge>
              </div>

              <div
                className="mt-5 flex flex-wrap gap-2"
                role="group"
                aria-label="Choose a learning task"
              >
                {studentTasks.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === selectedTask.id}
                    onClick={() => selectTask(item.id)}
                    className={`min-w-[185px] rounded-lg border px-3 py-2.5 text-left ${
                      item.id === selectedTask.id
                        ? "border-accent-deep bg-accent-soft/60"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface-muted"
                    }`}
                  >
                    <span className="block truncate text-xs font-semibold text-primary">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {item.subject} · due {item.due}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6">{taskWork}</div>

              <div className="mt-6 border-t border-line pt-5">
                <h3 className="font-brand text-sm font-semibold text-primary">
                  How this answer is grounded
                </h3>
                <div className="mt-4">
                  <TaskEvidence
                    task={selectedTask}
                    answer={answer}
                    feedback={feedback}
                  />
                </div>
              </div>
            </Panel>

            <div className="space-y-5">
              <Panel className="p-5">
                <h2 className="font-brand text-base font-semibold text-primary">
                  Your progress
                </h2>
                <dl className="mt-4 divide-y divide-line">
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-xs text-muted">Completed in preview</dt>
                    <dd className="font-brand text-lg font-semibold text-primary tabular-nums">
                      {completedIds.length} of {studentTasks.length}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-xs text-muted">Due today</dt>
                    <dd className="font-brand text-lg font-semibold text-primary tabular-nums">
                      1
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted text-pretty">
                  Progress here is local to this demo and does not follow you to another role.
                </p>
              </Panel>

              <Panel className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-brand text-base font-semibold text-primary">
                    Your subjects
                  </h2>
                  <button
                    type="button"
                    onClick={() => onNavigate("subjects")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-deep hover:underline"
                  >
                    All
                    <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {studentSubjects.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 border-t border-line pt-3 first:border-0 first:pt-0"
                    >
                      <span className="text-xs font-medium text-primary">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted tabular-nums">
                        {item.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      )}

      {view === "practice" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Guided practice"
            title="Practice"
            description="Work through the sample tasks at your own pace. A hint is available before each answer is checked."
          />

          <Panel className="mt-7 overflow-hidden">
            <div className="flex flex-wrap gap-2 border-b border-line p-5" role="group" aria-label="Filter practice tasks">
              {practiceFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => changePracticeFilter(filter)}
                  aria-pressed={practiceFilter === filter}
                  className={`rounded-md border px-3 py-2 text-xs font-medium ${
                    practiceFilter === filter
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-surface text-muted-strong hover:border-line-strong hover:bg-surface-muted"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {filteredTasks.length === 0 ? (
              <EmptyState
                title="No tasks in this group"
                description="Nothing is listed under this status in the sample set. Clear the filter to see every task."
                actionLabel="Show all tasks"
                onAction={() => changePracticeFilter("All")}
                icon={ClipboardList}
              />
            ) : (
              <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <div className="divide-y divide-line border-b border-line lg:border-b-0 lg:border-r">
                  {filteredTasks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectTask(item.id)}
                      aria-pressed={item.id === selectedTask.id}
                      className={`w-full px-5 py-4 text-left ${
                        item.id === selectedTask.id
                          ? "bg-accent-soft/50"
                          : "hover:bg-surface-muted"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-primary">
                            {item.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted">
                            {item.subject} · {item.topic}
                          </p>
                        </div>
                        <TaskBadge status={item.status} />
                      </div>
                      <p className="mt-3 text-xs text-muted">Due {item.due}</p>
                    </button>
                  ))}
                </div>
                <div className="p-5 sm:p-6">
                  {taskWork}
                  <div className="mt-6">
                    <TaskEvidence
                      task={selectedTask}
                      answer={answer}
                      feedback={feedback}
                    />
                  </div>
                </div>
              </div>
            )}
          </Panel>
        </div>
      )}

      {view === "subjects" && (
        <div className="mx-auto max-w-[1160px]">
          <ViewHeading
            eyebrow="Your courses"
            title="Subjects"
            description="Each subject shows the current topic, your teacher and the approved material behind the work."
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Panel className="p-5">
              <div className="space-y-2" role="group" aria-label="Choose a subject">
                {studentSubjects.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedSubject(item.name)}
                    aria-pressed={item.name === selectedSubject}
                    className={`w-full rounded-lg border px-4 py-3 text-left ${
                      item.name === selectedSubject
                        ? "border-accent-deep bg-accent-soft/60"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-primary">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted tabular-nums">
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
                    <p className="mt-2 text-xs text-muted">
                      {item.teacher} · {item.topics} topics
                    </p>
                  </button>
                ))}
              </div>
            </Panel>

            {subject && (
              <Panel className="p-5 sm:p-6">
                <p className="text-xs font-semibold text-accent-deep">
                  Current focus
                </p>
                <h2 className="mt-1 font-brand text-lg font-semibold text-primary">
                  {subject.name}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Taught by {subject.teacher}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 rounded-md border border-line bg-surface-muted p-4">
                    <BookOpen
                      size={16}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-accent-deep"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-primary">
                        Next topic
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {subject.next}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-md border border-line p-4">
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-primary">
                        Approved source
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {subject.source}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <Button size="sm" onClick={() => onNavigate("learning")}>
                    Go to your next task
                    <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </Button>
                  <p className="mt-2 text-xs text-muted">
                    Sample subject records · no live school data
                  </p>
                </div>
              </Panel>
            )}
          </div>
        </div>
      )}

      {view === "tutor" && (
        <TutorView
          messages={messages}
          mode={mode}
          onModeChange={setMode}
          draft={draft}
          onDraftChange={setDraft}
          onSend={sendMessage}
          sending={sending}
          chatEndRef={chatEndRef}
          onNavigate={onNavigate}
          audience="student"
        />
      )}
    </>
  );
}
