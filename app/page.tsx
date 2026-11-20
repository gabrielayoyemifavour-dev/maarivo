import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { HeroWorkspacePreview } from "@/components/landing/hero-workspace";
import { EvidenceFlow } from "@/components/landing/evidence-flow";
import { RoleSwitcher } from "@/components/landing/role-switcher";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/primitives";
import { site, supportHref } from "@/lib/site";

const principles = [
  {
    icon: ClipboardCheck,
    title: "Teacher approval stays in the flow",
    copy: "Generated assessments remain editable until a teacher reviews, adjusts and approves them.",
  },
  {
    icon: BookOpen,
    title: "Answers stay tied to sources",
    copy: "Tutor responses distinguish approved material from general guidance and say when context is not enough.",
  },
  {
    icon: Users,
    title: "Access follows the relationship",
    copy: "Teachers work with assigned classes, students see their own records and parents see only linked children.",
  },
  {
    icon: ShieldCheck,
    title: "Assessment rules are explicit",
    copy: "Instructions and restrictions are shown before a student starts, with tutor access limited during exams.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="border-b border-line bg-background">
          <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:py-24">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-[#4E4D63]">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Built for secondary schools
              </p>

              <h1 className="mt-6 font-brand text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-primary sm:text-5xl lg:text-[56px]">
                One connected workspace for learning and assessment.
              </h1>

              <p className="mt-5 max-w-[540px] text-base leading-[1.65] text-muted sm:text-[17px]">
                Maarivo brings lesson planning, assessment, tutoring and
                learning intelligence into one place. Every step stays
                connected to the material, the review and the student work
                behind it.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button href={supportHref} size="lg">
                  <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                  Get a tailored version
                  <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </Button>
                <Button href="/demo" variant="outline" size="lg">
                  Explore the demo
                  <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </Button>
              </div>

              <p className="mt-4 max-w-[520px] text-xs leading-relaxed text-muted">
                Reach out to our customer support to get a tailored version of
                the web app for your curriculum, roles and workflow.
              </p>

              <div className="mt-8 grid max-w-[520px] gap-x-6 gap-y-2 border-t border-line pt-6 text-xs font-medium text-[#4E4D63] sm:grid-cols-3">
                {[
                  "Teacher review gates",
                  "Grounded AI responses",
                  "Role-scoped access",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="flex size-4 items-center justify-center rounded-full bg-success-soft text-success">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 5.2 4 7l4-4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <HeroWorkspacePreview />
              <p className="mt-3 text-[11px] leading-relaxed text-muted">
                Illustrative product view. The interactive demo uses sample
                data and a scripted tutor response.
              </p>
            </div>
          </div>
        </section>

        <section id="platform" className="scroll-mt-24 bg-surface py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-[720px]">
              <p className="text-xs font-semibold text-accent-deep">
                Inside the workspace
              </p>
              <h2 className="mt-3 font-brand text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl">
                Every step keeps its evidence.
              </h2>
              <p className="mt-4 max-w-[640px] text-sm leading-[1.75] text-muted sm:text-base">
                Maarivo connects the material you trust, the draft AI creates,
                the review a teacher makes and the signal students generate.
              </p>
            </div>

            <EvidenceFlow />
          </div>
        </section>

        <section id="audience" className="scroll-mt-24 bg-background py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-[720px]">
              <p className="text-xs font-semibold text-accent-deep">
                Who it&apos;s for
              </p>
              <h2 className="mt-3 font-brand text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl">
                Four roles. One shared picture of learning.
              </h2>
              <p className="mt-4 max-w-[640px] text-sm leading-[1.75] text-muted sm:text-base">
                Choose a role to see the information and decisions that matter
                in that workspace.
              </p>
            </div>

            <div className="mt-10">
              <RoleSwitcher />
            </div>
          </div>
        </section>

        <section
          id="trust"
          className="scroll-mt-24 border-y border-line bg-surface py-20 sm:py-24"
        >
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="text-xs font-semibold text-accent-deep">
                Trust and control
              </p>
              <h2 className="mt-3 font-brand text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl">
                Human judgement stays in the workflow.
              </h2>
              <p className="mt-4 max-w-[440px] text-sm leading-[1.75] text-muted sm:text-base">
                The product is designed around clear boundaries for teaching,
                assessment and student information.
              </p>
              <div className="mt-6 inline-flex items-start gap-2 rounded-md border border-line bg-background px-3 py-2.5 text-xs leading-relaxed text-[#4E4D63]">
                <LockKeyhole
                  size={15}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-accent-deep"
                  aria-hidden="true"
                />
                Privacy and permissions are part of the product design, not a
                settings page.
              </div>
            </div>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article
                    key={principle.title}
                    className="border-t border-line pt-5"
                  >
                    <span className="flex size-9 items-center justify-center rounded-md bg-accent-soft text-accent-deep">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-brand text-base font-semibold text-primary">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.7] text-muted">
                      {principle.copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="shell">
            <div className="overflow-hidden rounded-lg border border-primary bg-primary">
              <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="p-8 sm:p-12">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold text-white/60">
                    <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" />
                    Tailored to your school
                  </p>
                  <h2 className="mt-4 max-w-[600px] font-brand text-3xl font-semibold leading-[1.18] text-white sm:text-4xl">
                    Bring your materials. See what Maarivo can shape around
                    them.
                  </h2>
                  <p className="mt-4 max-w-[560px] text-sm leading-[1.75] text-white/75 sm:text-base">
                    Reach out to our customer support to get a tailored version
                    of the web app. Tell us about your curriculum, classes and
                    workflow.
                  </p>
                  <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Button href={supportHref} variant="accent" size="lg">
                      <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                      Contact customer support
                    </Button>
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-white/85 transition-colors duration-150 hover:text-white"
                    >
                      Or explore the demo first
                      <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[260px] border-t border-white/10 lg:border-l lg:border-t-0">
                  <Image
                    src="/images/teacher-students.jpg"
                    alt="A teacher working with students in a classroom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-primary/90 px-5 py-4 text-xs leading-relaxed text-white/80">
                    Product views on this page use sample data. No live school
                    records are connected.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="shell grid gap-10 py-12 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Brand />
            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-muted">
              An AI-powered learning and assessment workspace for secondary
              schools.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-3 text-xs font-semibold text-muted">Explore</p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#platform" className="text-[#4E4D63] hover:text-primary">
                    Platform
                  </Link>
                </li>
                <li>
                  <Link href="#audience" className="text-[#4E4D63] hover:text-primary">
                    Roles
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-[#4E4D63] hover:text-primary">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold text-muted">Contact</p>
              <ul className="space-y-2.5">
                <li>
                  <a href={supportHref} className="text-[#4E4D63] hover:text-primary">
                    Customer support
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="text-[#4E4D63] hover:text-primary"
                  >
                    {site.supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="shell flex flex-col gap-2 py-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>
              © 2026 {site.name}. All rights reserved.
            </span>
            <span>Product views on this page use sample data.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
