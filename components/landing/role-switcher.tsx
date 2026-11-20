"use client";

import { useState } from "react";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  School,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/primitives";

const roles = [
  {
    id: "teacher",
    label: "Teachers",
    icon: ClipboardList,
    title: "Start with your class, not a blank page.",
    copy: "Lesson drafts, assessment review, marking decisions and class signals stay in one place. Teachers approve what students see.",
    points: ["Lesson Studio", "Assessment review", "Class insights"],
  },
  {
    id: "student",
    label: "Students",
    icon: GraduationCap,
    title: "Know what to work on next.",
    copy: "Subjects, lessons, practice and tutor support sit together. Hints come before answers, with the source material visible.",
    points: ["Subjects and topics", "Guided practice", "Grounded tutor"],
  },
  {
    id: "leader",
    label: "School leaders",
    icon: School,
    title: "See the pattern, then the reason.",
    copy: "School-wide views connect classes, subjects and learning signals, so a decision starts with evidence rather than a hunch.",
    points: ["School overview", "Class and subject views", "Evidence reports"],
  },
  {
    id: "parent",
    label: "Parents",
    icon: Users,
    title: "Stay close without crossing boundaries.",
    copy: "See feedback and upcoming assessments for a linked child, with access shaped by the school.",
    points: ["Linked child profile", "Teacher feedback", "Upcoming assessments"],
  },
] as const;

type RoleId = (typeof roles)[number]["id"];

function SnapshotHead({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
      <p className="font-brand text-lg font-semibold text-primary">{title}</p>
      <p className="text-[15px] text-muted">{meta}</p>
    </div>
  );
}

function TeacherSnapshot() {
  const queue = [
    {
      title: "Fractions and ratios",
      detail: "Grade 9 Mathematics",
      status: "Needs review",
      tone: "warning",
    },
    {
      title: "Chemical equations",
      detail: "Grade 8 Science",
      status: "Revisions saved",
      tone: "accent",
    },
    {
      title: "Quadratic expressions",
      detail: "Grade 10 Mathematics",
      status: "Approved",
      tone: "success",
    },
  ] as const;

  return (
    <>
      <SnapshotHead title="Today’s review queue" meta="Three drafts, one released" />
      <ul className="mt-5 divide-y divide-line">
        {queue.map((item) => (
          <li
            key={item.title}
            className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0"
          >
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-primary">
                {item.title}
              </p>
              <p className="mt-1 text-[15px] text-muted">{item.detail}</p>
            </div>
            <span
              className={`rounded-md px-2.5 py-1 text-[15px] font-medium ${
                item.tone === "warning"
                  ? "bg-warning-soft text-warning"
                  : item.tone === "accent"
                    ? "bg-accent-soft text-accent-deep"
                    : "bg-success-soft text-success"
              }`}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-line pt-4 text-[15px] leading-relaxed text-muted">
        AI drafts stay visible as drafts until a teacher checks and approves
        them.
      </p>
    </>
  );
}

function StudentSnapshot() {
  return (
    <>
      <SnapshotHead title="Fractions and ratios" meta="Lesson two of five" />
      <div className="mt-5 rounded-lg border border-line bg-surface-muted p-5">
        <p className="text-[15px] font-semibold text-accent-deep">Your question</p>
        <p className="mt-2 text-[15px] font-medium text-primary">
          How do I add 1/2 and 1/3?
        </p>
      </div>
      <div className="mt-3 rounded-lg border border-line bg-accent-soft p-5">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-accent-deep">
          <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
          Tutor hint
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Start with a denominator both parts can fit into. What could you
          change 1/2 and 1/3 into?
        </p>
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[15px] text-muted">
        <BookOpen size={15} strokeWidth={1.8} aria-hidden="true" />
        Source: Unit 3, approved material
      </div>
    </>
  );
}

function LeaderSnapshot() {
  const metrics = [
    { label: "Classes", value: "12" },
    { label: "Students", value: "318" },
    { label: "Teachers", value: "27" },
    { label: "Subjects", value: "8" },
  ];

  return (
    <>
      <SnapshotHead title="School overview" meta="Current session" />
      <div className="mt-5 grid grid-cols-2 gap-px bg-line">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-surface p-4">
            <p className="font-brand text-2xl font-semibold text-primary tabular-nums">
              {metric.value}
            </p>
            <p className="mt-1 text-[15px] text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 divide-y divide-line border-y border-line">
        {["Grade 9 Mathematics", "Grade 8 Science"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-3 py-4 text-[15px]"
          >
            <span className="font-medium text-primary">{item}</span>
            <span className="text-accent-deep">One topic to revisit</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ParentSnapshot() {
  return (
    <>
      <SnapshotHead title="Child overview" meta="Linked profile" />
      <div className="mt-5 rounded-lg border border-line bg-surface-muted p-5">
        <p className="text-[15px] font-semibold text-accent-deep">Recent feedback</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          “Show your working when comparing fractions.”
        </p>
        <p className="mt-3 text-[15px] text-muted">
          Grade 9 Mathematics, teacher feedback
        </p>
      </div>
      <div className="mt-3 rounded-lg border border-line p-5">
        <p className="text-[15px] font-semibold text-accent-deep">
          Upcoming assessment
        </p>
        <p className="mt-2 text-[15px] font-medium text-primary">
          Fractions and ratios
        </p>
        <p className="mt-1 text-[15px] text-muted">
          Date and details set by the school
        </p>
      </div>
      <p className="mt-5 border-t border-line pt-4 text-[15px] leading-relaxed text-muted">
        Parents see only information for children linked to their account.
      </p>
    </>
  );
}

function RoleSnapshot({ role }: { role: RoleId }) {
  if (role === "student") return <StudentSnapshot />;
  if (role === "leader") return <LeaderSnapshot />;
  if (role === "parent") return <ParentSnapshot />;
  return <TeacherSnapshot />;
}

export function RoleSwitcher() {
  const [active, setActive] = useState<RoleId>("teacher");
  const role = roles.find((item) => item.id === active) ?? roles[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Choose a role preview"
        >
          {roles.map((item) => {
            const Icon = item.icon;
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(item.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[15px] font-medium transition-colors ${
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong bg-surface text-muted-strong hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10" aria-live="polite">
          <p className="text-[15px] font-semibold text-accent-deep">
            For {role.label.toLowerCase()}
          </p>
          <h3 className="mt-3 font-brand text-[32px] font-semibold leading-[1.15] text-primary">
            {role.title}
          </h3>
          <p className="mt-5 max-w-[460px] text-[16px] leading-[1.7] text-muted">
            {role.copy}
          </p>
          <ul className="mt-7 space-y-3 border-t border-line pt-6">
            {role.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-[15px] text-muted-strong"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href={`/demo?role=${role.id}`}
              variant="outline"
              size="md"
            >
              Open this workspace
            </Button>
          </div>
          <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-muted">
            The interactive demo includes all four workspaces with sample data
            and scripted AI responses.
          </p>
        </div>
      </div>

      <div className="min-w-0 rounded-xl border border-line bg-surface">
        <div className="flex h-12 items-center justify-between gap-3 border-b border-line bg-surface-muted px-5">
          <span className="truncate text-[15px] font-medium text-muted-strong">
            Sample {role.label.toLowerCase()} view
          </span>
          <span className="text-[15px] text-muted">Preview</span>
        </div>
        <div className="min-h-[350px] p-6 sm:p-7">
          <RoleSnapshot role={role.id} />
        </div>
        <div className="border-t border-line bg-surface-muted px-5 py-3 text-[15px] text-muted">
          Sample data only. No live school records are connected.
        </div>
      </div>
    </div>
  );
}
