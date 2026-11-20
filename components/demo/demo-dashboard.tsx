"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { ArrowUpRight, ChevronRight, Mail, Menu, Search, ShieldCheck, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/primitives";
import { supportHref } from "@/lib/site";
import {
  assessments,
  classes,
  demoReply,
  demoTopic,
  initialMessages,
  navGroups,
  viewTitles,
  type ChatMessage,
  type View,
} from "@/components/demo/demo-data";
import {
  AssessmentsView,
  ClassesView,
  InsightsView,
  OverviewView,
  TutorView,
} from "@/components/demo/teacher-views";

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
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(
    assessments[0].id,
  );
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (requestOpen && !dialog.open) dialog.showModal();
    if (!requestOpen && dialog.open) dialog.close();
  }, [requestOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, sending]);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredClasses = useMemo(
    () =>
      classes.filter((item) =>
        `${item.name} ${item.topic} ${item.next}`
          .toLowerCase()
          .includes(normalizedSearch),
      ),
    [normalizedSearch],
  );

  const filteredAssessments = useMemo(
    () =>
      assessments.filter((item) => {
        const matchesStatus =
          statusFilter === "All" || item.status === statusFilter;
        const matchesSearch =
          `${item.title} ${item.klass}`
            .toLowerCase()
            .includes(normalizedSearch);
        return matchesStatus && matchesSearch;
      }),
    [normalizedSearch, statusFilter],
  );

  const selectedAssessment =
    filteredAssessments.find((item) => item.id === selectedAssessmentId) ??
    filteredAssessments[0];

  function goTo(next: View) {
    setView(next);
    setMobileNavOpen(false);
    setSearch("");
    setStatusFilter("All");
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
  }

  function toggleReviewed(id: string) {
    setReviewedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    const studentMessage: ChatMessage = {
      id: Date.now(),
      role: "student",
      text,
    };
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

  function handleDialogBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) setRequestOpen(false);
  }

  return (
    <div id="main" tabIndex={-1} className="flex min-h-dvh bg-background">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-primary/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-primary pb-[env(safe-area-inset-bottom)] text-white lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <Brand inverse />
          <button
            type="button"
            className="rounded-md p-1.5 text-white/70 enabled:hover:bg-white/10"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 py-5">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <p className="text-xs text-white/50">Signed in as</p>
            <p className="mt-0.5 text-sm font-medium">Amara Okafor</p>
            <p className="text-xs text-white/50">Teacher · Demo school</p>
          </div>
        </div>

        <nav className="flex-1 px-3" aria-label="Demo workspace navigation">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-2 text-xs font-semibold text-white/40">
                {group.label}
              </p>
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
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                        active
                          ? "bg-white/[0.12] text-white"
                          : "text-white/65 enabled:hover:bg-white/[0.06] enabled:hover:text-white"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                      {item.label}
                      {active && (
                        <span
                          className="ml-auto size-1.5 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              Demo environment
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-white/55">
              Sample data only. No live school records are connected.
            </p>
          </div>
          <Button
            variant="accent"
            size="sm"
            className="mt-3 w-full"
            onClick={() => setRequestOpen(true)}
          >
            <Mail size={14} strokeWidth={1.9} aria-hidden="true" />
            Get a tailored version
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[#DCD3F5] bg-[#F0ECFB] px-4 py-2 text-xs text-[#5B48A6] sm:px-7">
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} strokeWidth={1.9} aria-hidden="true" />
            Demo workspace · sample data · not connected to a live school
          </span>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1 font-semibold hover:underline"
          >
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
              <Menu size={18} aria-hidden="true" />
            </button>
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Teacher workspace</span>
              <ChevronRight
                size={14}
                strokeWidth={1.8}
                className="hidden sm:inline"
                aria-hidden="true"
              />
              <span className="truncate font-semibold text-primary">
                {viewTitles[view]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 sm:flex">
              <Search
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-muted"
                aria-hidden="true"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search classes or assessments"
                aria-label="Search classes or assessments"
                className="w-[190px] bg-transparent text-base text-primary outline-none placeholder:text-muted/80 lg:w-[230px] sm:text-sm"
              />
            </label>
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-deep">
              AO
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-7 sm:px-7 sm:py-9">
          <p className="sr-only" aria-live="polite">
            {viewTitles[view]} view
          </p>

          {view === "overview" && (
            <OverviewView
              selectedAssessment={selectedAssessment}
              onSelectAssessment={setSelectedAssessmentId}
              reviewedIds={reviewedIds}
              onNavigate={goTo}
            />
          )}

          {view === "classes" && (
            <ClassesView
              items={[...filteredClasses]}
              search={search}
              onSearchChange={setSearch}
              onClearSearch={() => setSearch("")}
            />
          )}

          {view === "assessments" && (
            <AssessmentsView
              items={filteredAssessments}
              selectedAssessment={selectedAssessment}
              onSelectAssessment={setSelectedAssessmentId}
              reviewedIds={reviewedIds}
              onToggleReviewed={toggleReviewed}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              search={search}
              onSearchChange={setSearch}
              onClearFilters={clearFilters}
            />
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
              onNavigate={goTo}
            />
          )}

          {view === "insights" && <InsightsView onNavigate={goTo} />}
        </main>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setRequestOpen(false)}
        onClick={handleDialogBackdrop}
        aria-labelledby="request-title"
        aria-describedby="request-description"
        className="w-[calc(100%-2rem)] max-w-[460px] rounded-xl border border-line bg-surface p-0 text-primary shadow-xl backdrop:bg-primary/45 [overscroll-behavior:contain]"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="request-title"
                className="font-brand text-lg font-semibold text-primary"
              >
                Get a tailored version
              </h2>
              <p
                id="request-description"
                className="mt-1.5 text-sm leading-relaxed text-muted text-pretty"
              >
                Reach out to our customer support to get a tailored version of the web app for your school.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRequestOpen(false)}
              className="rounded-md p-1.5 text-muted enabled:hover:bg-accent-soft"
              aria-label="Close dialog"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-5 rounded-md border border-line bg-[#FBFAFE] p-3.5 text-xs leading-relaxed text-[#3D3C52] text-pretty">
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
      </dialog>
    </div>
  );
}
