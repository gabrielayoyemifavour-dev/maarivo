"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Mail,
  Menu,
  MoreHorizontal,
  School,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Brand, BrandMark } from "@/components/brand";
import { Badge, Button, Panel } from "@/components/ui/primitives";
import { supportHref } from "@/lib/site";

type View = "overview" | "classes" | "assessments" | "tutor" | "insights";

const navGroups: { label: string; items: { id: View; label: string; icon: typeof LayoutDashboard }[] }[] = [
  {
    label: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "classes", label: "Classes", icon: School },
      { id: "assessments", label: "Assessments", icon: ClipboardList },
      { id: "tutor", label: "AI Tutor", icon: Sparkles },
      { id: "insights", label: "Insights", icon: BarChart3 },
    ],
  },
];

const classes = [
  { code: "9A", name: "Grade 9A Science", students: 28, progress: 72, next: "Chemical equations", topic: "Atoms & reactions" },
  { code: "9B", name: "Grade 9B Science", students: 26, progress: 64, next: "Chemical equations", topic: "Atoms & reactions" },
  { code: "10A", name: "Grade 10A Mathematics", students: 30, progress: 81, next: "Quadratic functions", topic: "Algebra" },
  { code: "8C", name: "Grade 8C Mathematics", students: 34, progress: 58, next: "Fractions and ratios", topic: "Number" },
];

const assessments = [
  { title: "Chemical equations — unit test", klass: "9A Science", due: "24 Nov", status: "Scheduled", submissions: "0 of 28", type: "Mixed" },
  { title: "Fractions check-in", klass: "8C Mathematics", due: "26 Nov", status: "Scheduled", submissions: "0 of 34", type: "Short answer" },
  { title: "Algebra foundations", klass: "10A Mathematics", due: "28 Nov", status: "Draft", submissions: "—", type: "Multiple choice" },
  { title: "Atoms & reactions quiz", klass: "9B Science", due: "18 Nov", status: "Results ready", submissions: "26 of 26", type: "Mixed" },
  { title: "Number skills baseline", klass: "8C Mathematics", due: "12 Nov", status: "Released", submissions: "34 of 34", type: "Mixed" },
];

const metrics = [
  { label: "Active classes", value: "4", note: "This academic session", icon: School },
  { label: "Students", value: "118", note: "Across all classes", icon: GraduationCap },
  { label: "Assessments due", value: "3", note: "Next 14 days", icon: ClipboardList },
  { label: "Class average", value: "78%", note: "Across recent assessments", icon: TrendingUp },
];

const insights = [
  {
    icon: Lightbulb,
    tone: "warning" as const,
    title: "Chemical equations need a revisit",
    evidence: "14 students · across 3 assessments",
    body: "Students are consistently balancing equations incorrectly. A short revision before the unit test may help.",
    action: "Open AI Tutor",
    view: "tutor" as View,
  },
  {
    icon: CheckCircle2,
    tone: "success" as const,
    title: "Fractions practice is working",
    evidence: "Grade 8C · +11 points since September",
    body: "Recent practice results show improvement in adding unlike fractions. Keep the current sequence going.",
    action: "View insights",
    view: "insights" as View,
  },
  {
    icon: BookMarked,
    tone: "accent" as const,
    title: "Resource gap in Algebra",
    evidence: "Grade 10A · topic: quadratic functions",
    body: "No approved resource is attached to this topic yet. Add one to ground tutor explanations in your material.",
    action: "View insights",
    view: "insights" as View,
  },
];

const chartPoints = [42, 51, 47, 60, 66, 63, 74, 78];
const chartPath = chartPoints
  .map((value, index) => {
    const x = 12 + index * (616 / (chartPoints.length - 1));
    const y = 150 - (value - 40) * 3.5;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(" ");

type ChatMessage = {
  id: number;
  role: "student" | "tutor";
  text: string;
  mode?: string;
  source?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "student",
    text: "Why do I need a common denominator to add 1/2 and 1/3?",
  },
  {
    id: 2,
    role: "tutor",
    mode: "Step by step",
    text: "Start with the idea that a denominator tells you the size of each part. Halves and thirds are different-sized parts, so they cannot be added directly. If we rewrite both as sixths — 3/6 and 2/6 — the parts match and the answer is 5/6. Want to try the next one yourself?",
    source: "Fractions and ratios · Unit 3",
  },
];

const tutorModes = [
  "Explain simply",
  "Step by step",
  "Give me an example",
  "Give me a hint",
  "Test my understanding",
  "Generate practice questions",
];

function demoReply(prompt: string, mode: string): string {
  if (/fraction|denominator|1\/2|1\/3/i.test(prompt)) {
    if (mode === "Give me a hint") {
      return "Look at the denominators. What number can both 2 and 3 divide into? Once you have it, convert each fraction into that many equal parts.";
    }
    return "A denominator names the size of the parts. Match the part sizes first: 1/2 becomes 3/6 and 1/3 becomes 2/6, so the sum is 5/6. That is the reason for the common denominator — not a rule to memorise.";
  }
  if (/chemical|equation|balance|atom/i.test(prompt)) {
    return "Count each element on both sides first. Change coefficients, never subscripts. For example, H₂ + O₂ → H₂O becomes 2H₂ + O₂ → 2H₂O: four hydrogen and two oxygen atoms on each side.";
  }
  if (/quadratic|algebra|x\^2/i.test(prompt)) {
    return "A quadratic has an x² term. To solve x² + 5x + 6 = 0, find two numbers that multiply to 6 and add to 5 — those are 2 and 3. So (x + 2)(x + 3) = 0, giving x = −2 or x = −3.";
  }
  return "In this demo, Maarivo would check your question against the approved material for this topic, then guide you through it in short steps before asking you to try one. Ask about fractions, chemical equations or quadratics to see a sample response.";
}

function demoTopic(prompt: string): string {
  if (/chemical|equation|atom/i.test(prompt)) return "Atoms & reactions · Grade 9";
  if (/quadratic|algebra/i.test(prompt)) return "Algebra · Grade 10";
  return "Fractions and ratios · Grade 8";
}

export function DemoDashboard() {
  const [view, setView] = useState<View>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mode, setMode] = useState("Step by step");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!requestOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRequestOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, sending]);

  const filteredClasses = useMemo(
    () =>
      classes.filter((item) =>
        `${item.name} ${item.topic} ${item.next}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const filteredAssessments = useMemo(
    () =>
      assessments.filter((item) => {
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        const matchesSearch = `${item.title} ${item.klass}`.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [search, statusFilter],
  );

  function goTo(next: View) {
    setView(next);
    setMobileNavOpen(false);
    setSearch("");
  }

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    const studentMessage: ChatMessage = { id: Date.now(), role: "student", text };
    setMessages((current) => [...current, studentMessage]);
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

  const viewTitles: Record<View, string> = {
    overview: "Overview",
    classes: "Classes",
    assessments: "Assessments",
    tutor: "AI Tutor",
    insights: "Insights",
  };

  return (
    <div id="main" tabIndex={-1} className="flex min-h-screen bg-background">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-primary/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-primary text-white transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <Brand inverse />
          <button
            type="button"
            className="rounded-md p-1.5 text-white/70 hover:bg-white/10 lg:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-5">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <div className="text-[11px] text-white/50">Signed in as</div>
            <div className="mt-0.5 text-[13px] font-medium">Amara Okafor</div>
            <div className="text-[11px] text-white/50">Teacher · Demo school</div>
          </div>
        </div>

        <nav className="flex-1 px-3" aria-label="Demo workspace navigation">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-2 text-[11px] font-semibold tracking-[0.05em] text-white/40">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = view === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(item.id)}
                      aria-current={active ? "page" : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${
                        active
                          ? "bg-white/[0.12] text-white"
                          : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                      {item.label}
                      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center gap-2 text-[12px] font-semibold">
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              Demo environment
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/55">
              Sample data only. No live school records are connected.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRequestOpen(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-[12px] font-semibold text-primary transition-colors hover:bg-[#A795EE]"
          >
            <Mail size={14} strokeWidth={1.9} aria-hidden="true" />
            Get a tailored version
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[#DCD3F5] bg-[#F0ECFB] px-4 py-2 text-[12px] text-[#5B48A6] sm:px-7">
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} strokeWidth={1.9} aria-hidden="true" />
            Demo workspace · sample data · not connected to a live school
          </span>
          <Link href="/" className="inline-flex items-center gap-1 font-semibold hover:underline">
            Back to site
            <ArrowUpRight size={13} strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </div>

        <header className="flex h-[72px] items-center justify-between gap-4 border-b border-line bg-surface px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-line p-2 text-primary lg:hidden"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2 text-[13px] text-muted">
              <span>Teacher workspace</span>
              <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
              <span className="font-semibold text-primary">{viewTitles[view]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <label className="hidden items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 sm:flex">
              <Search size={15} strokeWidth={1.8} className="text-muted" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search classes or assessments"
                aria-label="Search classes or assessments"
                className="w-[190px] bg-transparent text-[13px] text-primary outline-none placeholder:text-muted/80 lg:w-[230px]"
              />
            </label>
            <button
              type="button"
              className="relative rounded-lg border border-line p-2 text-[#4E4D63] hover:bg-accent-soft"
              aria-label="Notifications, 2 unread"
            >
              <Bell size={17} strokeWidth={1.8} aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-deep">
              AO
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-7 sm:px-7 sm:py-9">
          {view === "overview" && (
            <div className="mx-auto max-w-[1160px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-[26px] font-semibold leading-tight text-primary sm:text-[30px]">
                    Good morning, Amara.
                  </h1>
                  <p className="mt-1.5 text-[13px] text-muted">
                    Friday, 20 November · Here is what needs your attention today.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => goTo("assessments")}>
                  View all assessments
                  <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                </Button>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <Panel key={metric.label} className="p-5">
                    <div className="flex items-start justify-between">
                      <span className="text-[12px] font-medium text-muted">{metric.label}</span>
                      <metric.icon size={17} strokeWidth={1.7} className="text-accent-deep" aria-hidden="true" />
                    </div>
                    <div className="mt-3 font-brand text-[28px] font-semibold leading-none tracking-[-0.03em] text-primary tabular-nums">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-[11px] text-muted">{metric.note}</div>
                  </Panel>
                ))}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <Panel className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-[17px] font-semibold text-primary">Class average over the term</h2>
                      <p className="mt-1 text-[12px] text-muted">All classes · sample results</p>
                    </div>
                    <Badge variant="success">
                      <TrendingUp size={12} strokeWidth={2} aria-hidden="true" />
                      +9 points since September
                    </Badge>
                  </div>
                  <div className="mt-6">
                    <svg viewBox="0 0 640 170" className="h-[190px] w-full" role="img" aria-label="Class average rising from 42 to 78 percent over eight weeks">
                      {[0, 1, 2, 3].map((index) => (
                        <line
                          key={index}
                          x1="12"
                          x2="628"
                          y1={22 + index * 42}
                          y2={22 + index * 42}
                          stroke="var(--line)"
                          strokeWidth="1"
                        />
                      ))}
                      <path d={`${chartPath} L628 160 L12 160 Z`} fill="var(--accent)" opacity="0.1" />
                      <path d={chartPath} fill="none" stroke="var(--accent-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {chartPoints.map((value, index) => {
                        const x = 12 + index * (616 / (chartPoints.length - 1));
                        const y = 150 - (value - 40) * 3.5;
                        return <circle key={index} cx={x} cy={y} r="3.5" fill="white" stroke="var(--accent-deep)" strokeWidth="2" />;
                      })}
                    </svg>
                    <div className="flex justify-between px-1 text-[11px] text-muted">
                      <span>Week 1</span><span>Week 3</span><span>Week 5</span><span>Week 7</span>
                    </div>
                  </div>
                </Panel>

                <Panel className="p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles size={17} strokeWidth={1.8} className="text-accent-deep" aria-hidden="true" />
                    <h2 className="text-[17px] font-semibold text-primary">AI insights</h2>
                  </div>
                  <p className="mt-1 text-[12px] text-muted">Based on available performance data</p>
                  <div className="mt-5 space-y-3">
                    {insights.map((insight) => (
                      <div key={insight.title} className="rounded-lg border border-line bg-[#FBFAFE] p-3.5">
                        <div className="flex gap-2.5">
                          <insight.icon size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-accent-deep" aria-hidden="true" />
                          <div className="min-w-0">
                            <div className="text-[13px] font-semibold leading-snug text-primary">{insight.title}</div>
                            <div className="mt-1 text-[10px] font-medium text-muted">{insight.evidence}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => goTo(insight.view)}
                          className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent-deep hover:underline"
                        >
                          {insight.action}
                          <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <Panel className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold text-primary">Upcoming assessments</h2>
                    <button type="button" onClick={() => goTo("assessments")} className="text-[12px] font-semibold text-accent-deep hover:underline">
                      See all
                    </button>
                  </div>
                  <div className="mt-4 divide-y divide-line">
                    {assessments.slice(0, 3).map((item) => (
                      <div key={item.title} className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-medium text-primary">{item.title}</div>
                          <div className="mt-0.5 text-[11px] text-muted">{item.klass}</div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 text-[11px] text-muted">
                          <CalendarDays size={13} strokeWidth={1.8} aria-hidden="true" />
                          {item.due}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold text-primary">Your classes</h2>
                    <button type="button" onClick={() => goTo("classes")} className="text-[12px] font-semibold text-accent-deep hover:underline">
                      See all
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {classes.slice(0, 3).map((item) => (
                      <div key={item.code}>
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="font-medium text-primary">{item.name}</span>
                          <span className="text-muted tabular-nums">{item.progress}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-accent-soft">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {view === "classes" && (
            <div className="mx-auto max-w-[1160px]">
              <h1 className="text-[26px] font-semibold text-primary sm:text-[30px]">Classes</h1>
              <p className="mt-1.5 text-[13px] text-muted">Four assigned classes · sample records</p>
              <Panel className="mt-7 overflow-hidden">
                <div className="border-b border-line px-5 py-4">
                  <label className="flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 sm:max-w-[320px]">
                    <Search size={15} strokeWidth={1.8} className="text-muted" aria-hidden="true" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search classes"
                      aria-label="Search classes"
                      className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted/80"
                    />
                  </label>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-[13px]">
                    <thead className="bg-[#FBFAFE] text-[11px] font-semibold text-muted">
                      <tr>
                        <th className="px-5 py-3">Class</th>
                        <th className="px-5 py-3">Topic</th>
                        <th className="px-5 py-3">Students</th>
                        <th className="px-5 py-3">Progress</th>
                        <th className="px-5 py-3">Next lesson</th>
                        <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredClasses.map((item) => (
                        <tr key={item.code} className="hover:bg-[#FBFAFE]">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-semibold text-accent-deep">
                                {item.code}
                              </span>
                              <span className="font-medium text-primary">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted">{item.topic}</td>
                          <td className="px-5 py-4 text-muted tabular-nums">{item.students}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-accent-soft">
                                <div className="h-full rounded-full bg-accent" style={{ width: `${item.progress}%` }} />
                              </div>
                              <span className="text-[11px] text-muted tabular-nums">{item.progress}%</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted">{item.next}</td>
                          <td className="px-5 py-4 text-muted"><MoreHorizontal size={16} aria-hidden="true" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredClasses.length === 0 && (
                    <div className="px-5 py-14 text-center text-[13px] text-muted">
                      No classes match “{search}”. Try a different search.
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          )}

          {view === "assessments" && (
            <div className="mx-auto max-w-[1160px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-[26px] font-semibold text-primary sm:text-[30px]">Assessments</h1>
                  <p className="mt-1.5 text-[13px] text-muted">Drafts, scheduled tests and released results</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All", "Scheduled", "Draft", "Results ready", "Released"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      aria-pressed={statusFilter === status}
                      className={`rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                        statusFilter === status
                          ? "border-primary bg-primary text-white"
                          : "border-line bg-surface text-[#4E4D63] hover:bg-accent-soft"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredAssessments.map((item) => {
                  const tone = item.status === "Results ready" || item.status === "Released" ? "success" : item.status === "Draft" ? "neutral" : "accent";
                  return (
                    <Panel key={item.title} className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                          <ClipboardCheck size={17} strokeWidth={1.7} aria-hidden="true" />
                        </div>
                        <Badge variant={tone}>{item.status}</Badge>
                      </div>
                      <h2 className="mt-4 text-[15px] font-semibold leading-snug text-primary">{item.title}</h2>
                      <p className="mt-1 text-[12px] text-muted">{item.klass}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-muted">
                        <span className="inline-flex items-center gap-1.5"><Clock3 size={13} strokeWidth={1.8} aria-hidden="true" /> Due {item.due}</span>
                        <span>{item.submissions}</span>
                      </div>
                    </Panel>
                  );
                })}
              </div>
              {filteredAssessments.length === 0 && (
                <Panel className="mt-7 px-6 py-16 text-center">
                  <FileText size={24} strokeWidth={1.6} className="mx-auto text-muted" aria-hidden="true" />
                  <p className="mt-3 text-[14px] font-medium text-primary">No assessments found</p>
                  <p className="mt-1 text-[13px] text-muted">Adjust the search or status filter to see more.</p>
                </Panel>
              )}
            </div>
          )}

          {view === "tutor" && (
            <div className="mx-auto max-w-[1160px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-[26px] font-semibold text-primary sm:text-[30px]">AI Tutor</h1>
                  <p className="mt-1.5 text-[13px] text-muted">
                    Simulated responses for demonstration · grounded in approved materials
                  </p>
                </div>
                <Badge variant="warning">
                  <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
                  Disabled during restricted exams
                </Badge>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
                <Panel className="flex h-[620px] flex-col overflow-hidden">
                  <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                        <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-[13px] font-semibold text-primary">Mathematics help</div>
                        <div className="text-[11px] text-muted">Grade 8 · Fractions and ratios</div>
                      </div>
                    </div>
                    <Badge variant="accent">Demo mode</Badge>
                  </div>

                  <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6" style={{ overscrollBehavior: "contain" }}>
                    {messages.map((message) => (
                      <div key={message.id} className={message.role === "student" ? "flex justify-end" : "flex justify-start"}>
                        <div className={`max-w-[88%] ${message.role === "student" ? "" : "w-full"}`}>
                          {message.role === "student" ? (
                            <div className="rounded-xl rounded-br-sm bg-primary px-4 py-3 text-[13px] leading-relaxed text-white">
                              {message.text}
                            </div>
                          ) : (
                            <div className="rounded-xl border border-line bg-[#FBFAFE] p-4">
                              <div className="flex items-center gap-2">
                                <BrandMark size={20} />
                                <span className="font-brand text-[12px] font-semibold text-primary">Maarivo</span>
                                {message.mode && <span className="text-[11px] text-muted">· {message.mode}</span>}
                              </div>
                              <p className="mt-3 text-[13px] leading-[1.7] text-[#3D3C52]">{message.text}</p>
                              {message.source && (
                                <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted">
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
                      <div className="flex items-center gap-2 text-[12px] text-muted">
                        <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                        Preparing a grounded response…
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={sendMessage} className="border-t border-line p-4">
                    <div className="flex flex-wrap gap-2 pb-3">
                      {tutorModes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setMode(item)}
                          aria-pressed={mode === item}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                            mode === item
                              ? "border-accent bg-accent-soft text-accent-deep"
                              : "border-line text-[#55546A] hover:bg-accent-soft/60"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-end gap-2">
                      <label className="flex-1 rounded-lg border border-line bg-background px-3 py-2.5 focus-within:border-accent">
                        <span className="sr-only">Ask the tutor</span>
                        <input
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          placeholder="Ask a question about this topic"
                          className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted/80"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={!draft.trim() || sending}
                        className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-raised disabled:opacity-40"
                        aria-label="Send message"
                      >
                        <Send size={16} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                </Panel>

                <div className="space-y-4">
                  <Panel className="p-5">
                    <h2 className="text-[14px] font-semibold text-primary">Grounding & safety</h2>
                    <div className="mt-4 space-y-3">
                      {[
                        "Uses the subject and topic context",
                        "Retrieves school-approved materials first",
                        "Offers hints before complete answers",
                        "Flags when information is insufficient",
                      ].map((item) => (
                        <div key={item} className="flex gap-2.5 text-[12px] leading-relaxed text-[#3D3C52]">
                          <Check size={14} strokeWidth={2.2} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Panel>
                  <Panel className="p-5">
                    <h2 className="text-[14px] font-semibold text-primary">Attached material</h2>
                    <div className="mt-3 flex items-start gap-3 rounded-lg border border-line bg-[#FBFAFE] p-3">
                      <FileText size={17} strokeWidth={1.7} className="mt-0.5 text-accent-deep" aria-hidden="true" />
                      <div>
                        <div className="text-[12px] font-medium text-primary">Fractions and ratios</div>
                        <div className="mt-0.5 text-[11px] text-muted">Unit 3 · teacher uploaded</div>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted">
                      In the live product, answers are grounded in your uploaded resources and every conversation is linked to its sources.
                    </p>
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {view === "insights" && (
            <div className="mx-auto max-w-[1160px]">
              <h1 className="text-[26px] font-semibold text-primary sm:text-[30px]">Learning insights</h1>
              <p className="mt-1.5 text-[13px] text-muted">
                Evidence-based observations · sample performance data
              </p>
              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  { label: "Topics needing revision", value: "3", detail: "Based on repeated errors" },
                  { label: "Students to check in with", value: "14", detail: "Across 2 classes" },
                  { label: "Topics improving", value: "2", detail: "Over the last 8 weeks" },
                ].map((item) => (
                  <Panel key={item.label} className="p-5">
                    <div className="text-[12px] font-medium text-muted">{item.label}</div>
                    <div className="mt-3 font-brand text-[28px] font-semibold leading-none text-primary tabular-nums">{item.value}</div>
                    <div className="mt-2 text-[11px] text-muted">{item.detail}</div>
                  </Panel>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {insights.map((insight) => (
                  <Panel key={insight.title} className="p-5">
                    <div className="flex items-center gap-2">
                      <insight.icon size={17} strokeWidth={1.8} className="text-accent-deep" aria-hidden="true" />
                      <h2 className="text-[15px] font-semibold text-primary">{insight.title}</h2>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#3D3C52]">{insight.body}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                      <span className="text-[11px] font-medium text-muted">{insight.evidence}</span>
                      <Badge variant={insight.tone}>Observed</Badge>
                    </div>
                  </Panel>
                ))}
              </div>
              <Panel className="mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-[15px] font-semibold text-primary">Want this built on your school&apos;s data?</h2>
                  <p className="mt-1 text-[12px] text-muted">Talk to support about a version tailored to your curriculum and workflow.</p>
                </div>
                <Button href={supportHref} size="sm">
                  <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
                  Get a tailored version
                </Button>
              </Panel>
            </div>
          )}
        </main>
      </div>

      {requestOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/45 p-4" onMouseDown={() => setRequestOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            className="w-full max-w-[440px] rounded-xl border border-line bg-surface p-6 shadow-xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="request-title" className="text-[18px] font-semibold text-primary">
                  Get a tailored version
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  Reach out to our customer support to get a tailored version of the web app for your school.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRequestOpen(false)}
                className="rounded-md p-1.5 text-muted hover:bg-accent-soft"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 rounded-lg border border-line bg-[#FBFAFE] p-3.5 text-[12px] leading-relaxed text-[#3D3C52]">
              Tell us your curriculum, class levels, subjects and the workflows you want configured. We will follow up with a version shaped around your school.
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button href={supportHref} className="flex-1">
                <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                Email customer support
              </Button>
              <Button variant="outline" onClick={() => setRequestOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
