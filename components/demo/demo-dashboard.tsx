"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { ChevronDown, ChevronRight, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/primitives";
import { supportHref } from "@/lib/site";
import {
  isRole,
  roleNav,
  roles,
  viewTitles,
  type Role,
  type View,
} from "@/components/demo/demo-data";
import { TeacherWorkspace } from "@/components/demo/teacher-workspace";
import { StudentWorkspace } from "@/components/demo/student-workspace";
import { LeaderWorkspace } from "@/components/demo/leader-workspace";
import { ParentWorkspace } from "@/components/demo/parent-workspace";

const DEMO_ROUTE_EVENT = "maarivo-demo-route";

function subscribeToDemoRoute(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  window.addEventListener(DEMO_ROUTE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(DEMO_ROUTE_EVENT, callback);
  };
}

function getDemoRouteSnapshot() {
  return typeof window === "undefined" ? "" : window.location.search;
}

function getDemoRouteServerSnapshot() {
  return "";
}

function parseDemoRoute(search: string): { role: Role; view: View } {
  const params = new URLSearchParams(search);
  const rolePart = params.get("role") ?? "";
  const viewPart = params.get("view") ?? "";
  const role: Role = isRole(rolePart) ? rolePart : "teacher";
  const activeRole = roles.find((item) => item.id === role) ?? roles[0];
  const roleViews = roleNav[role].flatMap((group) =>
    group.items.map((item) => item.id),
  );
  const view = roleViews.some((item) => item === viewPart)
    ? (viewPart as View)
    : activeRole.defaultView;

  return { role, view };
}

export function DemoDashboard() {
  const search = useSyncExternalStore(
    subscribeToDemoRoute,
    getDemoRouteSnapshot,
    getDemoRouteServerSnapshot,
  );
  const { role, view } = parseDemoRoute(search);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const activeRole = useMemo(
    () => roles.find((item) => item.id === role) ?? roles[0],
    [role],
  );

  const navGroups = roleNav[role];

  useEffect(() => {
    window.dispatchEvent(new Event(DEMO_ROUTE_EVENT));
  }, []);

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

  function navigate(nextRole: Role, nextView: View) {
    const params = new URLSearchParams({ role: nextRole, view: nextView });
    const nextSearch = `?${params.toString()}`;
    if (window.location.search !== nextSearch) {
      window.history.pushState(null, "", nextSearch);
      window.dispatchEvent(new Event(DEMO_ROUTE_EVENT));
    }
  }

  function changeRole(nextRole: string) {
    if (!isRole(nextRole)) return;
    const next = roles.find((item) => item.id === nextRole);
    if (!next) return;
    navigate(next.id, next.defaultView);
    setMobileNavOpen(false);
  }

  function goTo(nextView: View) {
    navigate(role, nextView);
    setMobileNavOpen(false);
  }

  function handleDialogBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) setRequestOpen(false);
  }

  return (
    <div id="main" tabIndex={-1} className="flex min-h-dvh bg-canvas">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-primary/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-5">
          <Brand />
          <button
            type="button"
            className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-primary"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-6">
          <label className="block">
            <span className="text-[15px] font-medium text-muted">
              Preview role
            </span>
            <select
              value={role}
              onChange={(event) => changeRole(event.target.value)}
              className="mt-2 w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-[15px] font-medium text-primary outline-none"
            >
              {roles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-4 rounded-lg bg-surface-muted px-4 py-4">
            <p className="text-[15px] text-muted">Signed in as</p>
            <p className="mt-1 text-[15px] font-semibold text-primary">
              {activeRole.person}
            </p>
            <p className="mt-1 text-[15px] text-muted">{activeRole.detail}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4" aria-label="Demo workspace navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="px-3 pb-3 text-[15px] font-medium text-muted">
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
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[15px] font-medium transition-colors ${
                        active
                          ? "border-l-[3px] border-accent bg-accent-soft pl-[9px] text-accent-deep"
                          : "border-l-[3px] border-transparent text-muted-strong hover:bg-surface-muted hover:text-primary"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-5">
          <div className="rounded-lg border border-line bg-surface-muted p-4">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-primary">
              <ShieldCheck size={17} strokeWidth={1.8} aria-hidden="true" />
              Demo environment
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Sample data only. No live school records are connected.
            </p>
          </div>
          <Button
            variant="accent"
            size="md"
            className="mt-4 w-full"
            onClick={() => setRequestOpen(true)}
          >
            <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
            Get a tailored version
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-warning-soft px-5 py-2.5 text-[15px] text-warning sm:px-8">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} strokeWidth={1.9} aria-hidden="true" />
            Demo workspace with sample data. Not connected to a live school.
          </span>
          <Link
            href="/"
            className="shrink-0 font-semibold underline decoration-1 underline-offset-4"
          >
            Back to site
          </Link>
        </div>

        <header className="flex h-20 items-center justify-between gap-4 border-b border-line bg-surface px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-line-strong bg-surface p-2 text-primary lg:hidden"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={19} aria-hidden="true" />
            </button>
            <div className="flex min-w-0 items-center gap-2 text-[15px] text-muted">
              <span className="hidden sm:inline">{activeRole.fullLabel}</span>
              <ChevronRight
                size={15}
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
            <label className="relative inline-flex items-center">
              <span className="sr-only">Switch demo role</span>
              <select
                value={role}
                onChange={(event) => changeRole(event.target.value)}
                aria-label="Switch demo role"
                className="appearance-none rounded-lg border border-line-strong bg-surface py-2 pl-3 pr-8 text-[15px] font-semibold text-primary outline-none"
              >
                {roles.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                strokeWidth={2}
                className="pointer-events-none absolute right-2.5 text-muted"
                aria-hidden="true"
              />
            </label>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[15px] font-semibold text-accent-deep">
              {activeRole.initials}
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 py-10 sm:px-8 sm:py-12">
          <p className="sr-only" aria-live="polite">
            {activeRole.label}: {viewTitles[view]} view
          </p>

          {role === "teacher" && <TeacherWorkspace view={view} onNavigate={goTo} />}
          {role === "student" && <StudentWorkspace view={view} onNavigate={goTo} />}
          {role === "leader" && <LeaderWorkspace view={view} onNavigate={goTo} />}
          {role === "parent" && <ParentWorkspace view={view} onNavigate={goTo} />}
        </main>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setRequestOpen(false)}
        onClick={handleDialogBackdrop}
        aria-labelledby="request-title"
        aria-describedby="request-description"
        className="w-[calc(100%-2rem)] max-w-[480px] rounded-xl border border-line bg-surface p-0 text-primary shadow-xl backdrop:bg-primary/40 [overscroll-behavior:contain]"
      >
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold text-accent-deep">
                Tailored version
              </p>
              <h2
                id="request-title"
                className="mt-3 font-brand text-2xl font-semibold text-primary"
              >
                Get a tailored version
              </h2>
              <p
                id="request-description"
                className="mt-3 text-[15px] leading-relaxed text-muted"
              >
                Reach out to our customer support to get a tailored version of
                the web app for your school.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRequestOpen(false)}
              className="rounded-lg p-2 text-muted hover:bg-surface-muted"
              aria-label="Close dialog"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 rounded-lg border border-line bg-surface-muted p-4 text-[15px] leading-relaxed text-ink-soft">
            Tell us your curriculum, class levels, subjects and the workflows
            you want configured. We will follow up with a version shaped around
            your school.
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={supportHref} className="flex-1">
              <Mail size={17} strokeWidth={1.9} aria-hidden="true" />
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
