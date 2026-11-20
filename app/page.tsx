import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  LockKeyhole,
  Mail,
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
    title: "Generated work stays editable",
    copy: "An AI draft is a draft until a teacher reviews it, adjusts the wording and approves release.",
  },
  {
    title: "Answers stay tied to sources",
    copy: "Tutor responses distinguish approved material from general guidance and say when context is not enough.",
  },
  {
    title: "Access follows the relationship",
    copy: "Teachers work with assigned classes, students see their own records and parents see only linked children.",
  },
  {
    title: "Assessment rules are explicit",
    copy: "Instructions and restrictions are shown before a student starts, with tutor access limited during exams.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="border-b border-line bg-canvas">
          <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:py-24">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-accent-deep">
                AI-powered learning and assessment
              </p>
              <h1 className="mt-5 font-brand text-[clamp(2.75rem,5.5vw,4.5rem)] font-semibold leading-[1.05] text-primary">
                Built for the decisions teachers make every day.
              </h1>
              <p className="mt-7 max-w-[540px] text-[17px] leading-[1.65] text-muted-strong">
                Maarivo keeps lesson material, AI drafts, teacher review and
                student work in one record. Every answer has a source, and every
                decision has an owner.
              </p>

              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button href={supportHref} size="lg" variant="accent">
                  <Mail size={18} strokeWidth={1.9} aria-hidden="true" />
                  Get a tailored version
                </Button>
                <Button href="/demo" variant="outline" size="lg">
                  Explore the demo
                </Button>
              </div>

              <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-muted">
                Reach out to our customer support to get a tailored version of
                the web app for your curriculum, roles and workflow.
              </p>
            </div>

            <div className="min-w-0">
              <HeroWorkspacePreview />
            </div>
          </div>
        </section>

        <section id="platform" className="scroll-mt-24 bg-surface py-20 sm:py-28">
          <div className="shell">
            <div className="max-w-[720px]">
              <p className="text-[15px] font-semibold text-accent-deep">
                How it works
              </p>
              <h2 className="mt-4 font-brand text-[clamp(2rem,3.6vw,2.75rem)] font-semibold text-primary">
                From source material to a signal you can act on.
              </h2>
              <p className="mt-5 text-[17px] leading-[1.65] text-muted">
                Maarivo keeps the chain intact: what you trusted, what AI
                drafted, what a teacher changed and what students did next.
              </p>
            </div>
            <div className="mt-14">
              <EvidenceFlow />
            </div>
          </div>
        </section>

        <section
          id="schools"
          className="scroll-mt-24 border-y border-line bg-canvas py-20 sm:py-28"
        >
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
              <div className="min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface-muted">
                  <Image
                    src="/images/students-collaborating.jpg"
                    alt="Students working together in a classroom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-primary/85 p-6 sm:p-8">
                    <p className="max-w-[460px] font-brand text-xl font-semibold text-white sm:text-2xl">
                      The workspace changes with the role. The evidence stays
                      consistent.
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[15px] text-muted">
                  Classroom photograph for context. Product views on this page
                  use sample data.
                </p>
              </div>

              <div>
                <p className="text-[15px] font-semibold text-accent-deep">
                  In schools
                </p>
                <h2 className="mt-4 font-brand text-[clamp(2rem,3.6vw,2.75rem)] font-semibold text-primary">
                  Designed for the room, not just the screen.
                </h2>
                <p className="mt-5 text-[16px] leading-[1.7] text-muted">
                  A teacher planning a lesson, a student working through
                  practice and a parent reading feedback all need different
                  detail from the same learning record.
                </p>
                <ul className="mt-8 space-y-6">
                  {[
                    {
                      icon: BookOpen,
                      title: "Approved material first",
                      copy: "AI explanations and drafts point back to the material a school or teacher has approved.",
                    },
                    {
                      icon: Sparkles,
                      title: "Visible AI contribution",
                      copy: "Generated content is labelled, editable and kept separate from human review.",
                    },
                    {
                      icon: Users,
                      title: "Role-shaped views",
                      copy: "Teachers, students, school leaders and parents see the information relevant to them.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                          <Icon
                            size={19}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <div>
                          <p className="text-[16px] font-semibold text-primary">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[15px] leading-relaxed text-muted">
                            {item.copy}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="audience" className="scroll-mt-24 bg-surface py-20 sm:py-28">
          <div className="shell">
            <div className="max-w-[720px]">
              <p className="text-[15px] font-semibold text-accent-deep">Four roles</p>
              <h2 className="mt-4 font-brand text-[clamp(2rem,3.6vw,2.75rem)] font-semibold text-primary">
                One shared picture of learning.
              </h2>
              <p className="mt-5 text-[17px] leading-[1.65] text-muted">
                Choose a role to see the information and decisions that matter
                in that workspace.
              </p>
            </div>
            <div className="mt-14">
              <RoleSwitcher />
            </div>
          </div>
        </section>

        <section id="trust" className="scroll-mt-24 bg-canvas py-20 sm:py-28">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="text-[15px] font-semibold text-accent-deep">
                Trust and control
              </p>
              <h2 className="mt-4 font-brand text-[clamp(2rem,3.6vw,2.75rem)] font-semibold text-primary">
                AI can draft. People decide.
              </h2>
              <p className="mt-5 max-w-[420px] text-[16px] leading-[1.7] text-muted">
                The product is designed around clear boundaries for teaching,
                assessment and student information.
              </p>
              <div className="mt-8 inline-flex items-start gap-3 rounded-lg border border-line bg-surface p-4 text-[15px] leading-relaxed text-muted-strong">
                <LockKeyhole
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-accent-deep"
                  aria-hidden="true"
                />
                Privacy and permissions are part of the product design, not a
                settings page.
              </div>
            </div>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {principles.map((principle) => (
                <article key={principle.title}>
                  <h3 className="font-brand text-lg font-semibold text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                    {principle.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20 sm:py-28">
          <div className="shell">
            <div className="grid overflow-hidden rounded-2xl bg-primary lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="p-8 sm:p-12">
                <p className="text-[15px] font-semibold text-[#B9AAFF]">
                  Tailored to your school
                </p>
                <h2 className="mt-5 max-w-[620px] font-brand text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-white">
                  Bring your materials. See what Maarivo can shape around them.
                </h2>
                <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7] text-white/70">
                  Reach out to our customer support to get a tailored version of
                  the web app. Tell us about your curriculum, classes and
                  workflow.
                </p>
                <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <Button href={supportHref} size="lg" variant="accent">
                    <Mail size={18} strokeWidth={1.9} aria-hidden="true" />
                    Contact customer support
                  </Button>
                  <Link
                    href="/demo"
                    className="rounded-sm text-[15px] font-semibold text-white hover:text-[#B9AAFF]"
                  >
                    Or explore the demo first
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/10 bg-primary-raised p-8 sm:p-10 lg:border-l lg:border-t-0">
                <p className="text-[15px] font-semibold text-[#B9AAFF]">
                  What we can tailor
                </p>
                <ul className="mt-7 space-y-6">
                  {[
                    {
                      title: "Curriculum and subjects",
                      copy: "Map material to the scheme of work you already use.",
                      icon: BookOpen,
                    },
                    {
                      title: "Roles and approvals",
                      copy: "Set who reviews, releases and sees each record.",
                      icon: Users,
                    },
                    {
                      title: "Review workflow",
                      copy: "Shape the checks that happen before students see work.",
                      icon: Sparkles,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                          <Icon
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <div>
                          <p className="font-brand text-[16px] font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[15px] leading-relaxed text-white/65">
                            {item.copy}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-8 border-t border-white/10 pt-5 text-[15px] leading-relaxed text-white/60">
                  AI drafts stay labelled. Teacher approval stays in place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="shell grid gap-12 py-14 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Brand />
            <p className="mt-4 max-w-[360px] text-[15px] leading-relaxed text-muted">
              An AI-powered learning and assessment workspace for secondary
              schools.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[15px]">
            <div>
              <p className="mb-5 font-semibold text-primary">Explore</p>
              <ul className="space-y-3">
                <li>
                  <Link href="#platform" className="text-muted hover:text-primary">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#audience" className="text-muted hover:text-primary">
                    Roles
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-muted hover:text-primary">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-5 font-semibold text-primary">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a href={supportHref} className="text-muted hover:text-primary">
                    Customer support
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="text-muted hover:text-primary"
                  >
                    {site.supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="shell flex flex-col gap-2 py-6 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {site.name}. All rights reserved.</span>
            <span>Product views on this page use sample data.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
