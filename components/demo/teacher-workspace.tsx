"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  assessments,
  classes,
  demoReply,
  demoTopic,
  initialMessages,
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

export function TeacherWorkspace({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mode, setMode] = useState("Step by step");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(
    assessments[0].id,
  );
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
        const matchesSearch = `${item.title} ${item.klass}`
          .toLowerCase()
          .includes(normalizedSearch);
        return matchesStatus && matchesSearch;
      }),
    [normalizedSearch, statusFilter],
  );

  const selectedAssessment =
    filteredAssessments.find((item) => item.id === selectedAssessmentId) ??
    filteredAssessments[0];

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

  return (
    <>
      {view === "overview" && (
        <OverviewView
          selectedAssessment={selectedAssessment}
          onSelectAssessment={setSelectedAssessmentId}
          reviewedIds={reviewedIds}
          onNavigate={onNavigate}
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
          onNavigate={onNavigate}
        />
      )}

      {view === "insights" && <InsightsView onNavigate={onNavigate} />}
    </>
  );
}
