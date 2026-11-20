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
    points: ["School overview", "Class and subject views", "Evidence-backed reports"],
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

function TeacherSnapshot() {
  const queue = [
    {
      title: "Fractions and ratios",
      detail: "Grade 9 Mathematics · 12 questions",
      status: "Needs review",
      tone: "warning",
    },
    {
      title: "Chemical equations",
      detail: "Grade 8 Science · 8 questions",
      status: "Revisions saved",
      tone: "accent",
    },
    {
      title: "Quadratic expressions",
      detail: "Grade 10 Mathematics · Released",
      status: "Approved",
      tone: "success",
    },
  ] as const;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="font-brand text-sm font-semibold text-primary">
          Today&apos;s review queue
        </p>
        <span className="text-[11px] font-medium text-muted">
          3 drafted · 1 released
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {queue.map((item) => (
          <li
            key={item.title}
            className="rounded-md border border-line bg-[#FBFAFE] px-3 py-2.5"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-xs font-semibold text-primary">{item.title}</p>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  item.tone === "warning"
                    ? "bg-warning-soft text-[#956522]"
                    : item.tone === "accent"
                      ? "bg-accent-soft text-accent-deep"
                      : "bg-success-soft text-success"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
        AI drafts stay visible as drafts until a teacher checks and approves
        them.
      </p>
    </>
  );
}

function StudentSnapshot() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="font-brand text-sm font-semibold text-primary">
          Fractions and ratios
        </p>
        <span className="text-[11px] font-medium text-muted">
          Lesson 2 of 5
        </span>
      </div>

      <div className="mt-4 rounded-md border border-line bg-[#FBFAFE] p-3">
        <p className="text-[11px] font-medium text-muted">Your question</p>
        <p className="mt-1 text-xs font-medium text-primary">
          How do I add 1/2 and 1/3?
        </p>
      </div>

      <div className="mt-3 rounded-md border border-accent/25 bg-accent-soft p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-accent-deep">
          <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" />
          Tutor hint · sample response
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#3D3C52]">
          Start with a denominator both parts can fit into. What could you
          change 1/2 and 1/3 into?
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
        <BookOpen size={13} strokeWidth={1.8} aria-hidden="true" />
        Source: Unit 3 · approved material
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
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="font-brand text-sm font-semibold text-primary">
          School overview
        </p>
        <span className="text-[11px] font-medium text-muted">
          Current session · sample view
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-md border border-line bg-[#FBFAFE] px-3 py-2"
          >
            <p className="text-xs font-semibold text-primary tabular-nums">
              {metric.value}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {["Grade 9 Mathematics", "Grade 8 Science"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-xs"
          >
            <span className="font-medium text-primary">{item}</span>
            <span className="text-[11px] text-accent-deep">
              1 topic to revisit
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function ParentSnapshot() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="font-brand text-sm font-semibold text-primary">
          Child overview
        </p>
        <span className="text-[11px] font-medium text-muted">
          Linked profile · sample
        </span>
      </div>

      <div className="mt-4 rounded-md border border-line bg-[#FBFAFE] p-3">
        <p className="text-[11px] font-medium text-muted">Recent feedback</p>
        <p className="mt-1 text-xs leading-relaxed text-primary">
          “Show your working when comparing fractions.”
        </p>
        <p className="mt-2 text-[11px] text-muted">
          Grade 9 Mathematics · teacher feedback
        </p>
      </div>

      <div className="mt-3 rounded-md border border-line p-3">
        <p className="text-[11px] font-medium text-muted">
          Upcoming assessment
        </p>
        <p className="mt-1 text-xs font-medium text-primary">
          Fractions and ratios
        </p>
        <p className="mt-1 text-[11px] text-muted">
          Date and details set by the school
        </p>
      </div>

      <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
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
  const roleId: RoleId = role.id;

  return (
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
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-[#4E4D63] hover:border-line-strong hover:text-primary"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div aria-live="polite">
          <span className="text-xs font-semibold text-accent-deep">
            For {role.label.toLowerCase()}
          </span>
          <h3 className="mt-3 font-brand text-2xl font-semibold leading-[1.25] text-primary">
            {role.title}
          </h3>
          <p className="mt-3 max-w-[440px] text-sm leading-[1.75] text-muted">
            {role.copy}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {role.points.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E4D63]"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-[430px] text-xs leading-relaxed text-muted">
            The interactive demo currently shows the teacher workspace. The
            other roles are sample product previews.
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border border-line-strong bg-surface">
          <div className="flex h-9 items-center justify-between gap-3 border-b border-line bg-[#FBFAFE] px-4">
            <span className="truncate text-[11px] font-medium text-[#4E4D63]">
              Sample {role.label.toLowerCase()} view
            </span>
            <span className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-muted">
              Preview
            </span>
          </div>
          <div className="min-h-[318px] p-4 sm:p-5">
            <RoleSnapshot role={roleId} />
          </div>
          <div className="border-t border-line bg-[#FBFAFE] px-4 py-2.5 text-[11px] text-muted">
            Sample data only. No live school records are connected.
          </div>
        </div>
      </div>
    </div>
  );
}
