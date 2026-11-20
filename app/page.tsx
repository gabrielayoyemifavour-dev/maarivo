import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
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
    number: "01",
    title: "Generated work stays editable",
    copy: "An AI draft is a draft until a teacher reviews it, adjusts the wording and approves release.",
  },
  {
    number: "02",
    title: "Answers stay tied to sources",
    copy: "Tutor responses distinguish approved material from general guidance and say when context is not enough.",
  },
  {
    number: "03",
    title: "Access follows the relationship",
    copy: "Teachers work with assigned classes, students see their own records and parents see only linked children.",
  },
  {
    number: "04",
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
          <div className="shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-14 lg:py-20">
            <div className="min-w-0">
              <p className="label-caps text-ochre">Secondary schools · product preview</p>
              <h1 className="mt-5 font-brand text-[clamp(2.6rem,6vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-primary">
                See the thinking behind{" "}
                <span className="font-medium italic text-accent-deep">
                  every answer.
                </span>
              </h1>
              <p className="mt-6 max-w-[550px] text-base leading-[1.7] text-muted-strong sm:text-[17px]">
                Maarivo connects lesson material, AI drafts, teacher review and
                student work in one record. Every decision has a source, and
                every source has a person responsible for it.
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
            </div>

            <figure className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden border border-line-strong bg-surface-muted sm:aspect-[5/4]">
                <Image
                  src="/images/hero-classroom.jpg"
                  alt="Students working together in a secondary school classroom"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-3 text-[11px] leading-relaxed text-muted">
                <span className="font-brand font-semibold text-accent-deep tabular-nums">
                  01
                </span>
                The classroom is where the record is tested. Maarivo keeps the
                evidence attached to it.
              </figcaption>
            </figure>
          </div>

          <div className="shell pb-12 sm:pb-16">
            <HeroWorkspacePreview />
          </div>
        </section>

        <section id="platform" className="scroll-mt-24 bg-surface py-20 sm:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
            <div>
              <p className="label-caps text-ochre">02 · Inside the workspace</p>
              <h2 className="mt-4 font-brand text-3xl font-semibold leading-[1.12] text-primary sm:text-[40px]">
                From source material to a signal you can act on.
              </h2>
              <p className="mt-5 max-w-[420px] text-sm leading-[1.75] text-muted">
                Maarivo keeps the chain intact: what you trusted, what AI
                drafted, what a teacher changed and what students did next.
              </p>
              <div className="mt-8 inline-flex items-start gap-2.5 border-t border-line pt-5 text-xs leading-relaxed text-muted-strong">
                <ClipboardCheck
                  size={16}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-accent-deep"
                  aria-hidden="true"
                />
                Sample product views on this page. No live school records are
                connected.
              </div>
            </div>
            <EvidenceFlow />
          </div>
        </section>

        <section id="schools" className="scroll-mt-24 border-y border-line bg-background py-20 sm:py-24">
          <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="grid grid-cols-5 gap-3">
              <figure className="col-span-3">
                <div className="relative aspect-[4/5] overflow-hidden border border-line-strong bg-surface-muted">
                  <Image
                    src="/images/students-collaborating.jpg"
                    alt="Students collaborating around a table"
                    fill
                    sizes="(max-width: 1024px) 60vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </figure>
              <div className="col-span-2 flex flex-col gap-3 pt-10">
                <figure className="relative aspect-[4/3] overflow-hidden border border-line-strong bg-surface-muted">
                  <Image
                    src="/images/student-device.jpg"
                    alt="A student working on a laptop during a lesson"
                    fill
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="object-cover"
                  />
                </figure>
                <figure className="relative aspect-[4/3] overflow-hidden border border-line-strong bg-surface-muted">
                  <Image
                    src="/images/resource-shelf.jpg"
                    alt="A shelf of books used as learning material"
                    fill
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="object-cover"
                  />
                </figure>
              </div>
            </div>

            <div>
              <p className="label-caps text-ochre">03 · In schools</p>
              <h2 className="mt-4 font-brand text-3xl font-semibold leading-[1.12] text-primary sm:text-[40px]">
                Designed for the room, not just the screen.
              </h2>
              <p className="mt-5 text-sm leading-[1.75] text-muted">
                A teacher planning a lesson, a student working through practice
                and a parent reading feedback all need different detail from the
                same learning record. The workspace changes with the role, while
                the evidence stays consistent.
              </p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
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
                    <li key={item.title} className="flex gap-4 py-4">
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className="mt-0.5 shrink-0 text-accent-deep"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.copy}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section id="audience" className="scroll-mt-24 bg-canvas py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-[740px]">
              <p className="label-caps text-ochre">04 · Four roles</p>
              <h2 className="mt-4 font-brand text-3xl font-semibold leading-[1.12] text-primary sm:text-[40px]">
                One shared picture of learning.
              </h2>
              <p className="mt-5 text-sm leading-[1.75] text-muted sm:text-base">
                Choose a role to see the information and decisions that matter
                in that workspace.
              </p>
            </div>
            <div className="mt-12">
              <RoleSwitcher />
            </div>
          </div>
        </section>

        <section id="trust" className="scroll-mt-24 bg-primary py-20 text-white sm:py-24">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="label-caps text-[#C7B8F0]">05 · Trust and control</p>
              <h2 className="mt-5 font-brand text-3xl font-semibold leading-[1.12] sm:text-[40px]">
                AI can draft. <span className="font-medium italic text-[#C7B8F0]">People decide.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-sm leading-[1.8] text-white/70">
                The product is designed around clear boundaries for teaching,
                assessment and student information.
              </p>
              <div className="mt-8 inline-flex items-start gap-2.5 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/70">
                <LockKeyhole
                  size={16}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-[#C7B8F0]"
                  aria-hidden="true"
                />
                Privacy and permissions are part of the product design, not a
                settings page.
              </div>
            </div>

            <div>
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="grid gap-3 border-t border-white/15 py-6 sm:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-5"
                >
                  <span className="font-brand text-xs font-semibold text-[#C7B8F0] tabular-nums">
                    {principle.number}
                  </span>
                  <h3 className="font-brand text-lg font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-white/65">
                    {principle.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20 sm:py-24">
          <div className="shell">
            <div className="grid overflow-hidden border border-line-strong bg-surface lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="p-8 sm:p-12">
                <p className="label-caps text-ochre">Tailored to your school</p>
                <h2 className="mt-5 max-w-[600px] font-brand text-3xl font-semibold leading-[1.14] text-primary sm:text-[40px]">
                  Bring your materials. See what Maarivo can shape around them.
                </h2>
                <p className="mt-5 max-w-[560px] text-sm leading-[1.75] text-muted sm:text-base">
                  Reach out to our customer support to get a tailored version of
                  the web app. Tell us about your curriculum, classes and
                  workflow.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button href={supportHref} size="lg">
                    <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                    Contact customer support
                  </Button>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-1.5 rounded-sm px-1 py-1 text-sm font-medium text-muted-strong hover:text-primary"
                  >
                    Or explore the demo first
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[280px] border-t border-line lg:border-l lg:border-t-0">
                <Image
                  src="/images/teacher-students.jpg"
                  alt="A teacher working with students in a classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-primary/90 px-5 py-4 text-xs leading-relaxed text-white/75">
                  Product views on this page use sample data. No live school
                  records are connected.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-canvas">
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
              <p className="label-caps mb-4 text-muted">Explore</p>
              <ul className="space-y-3">
                <li>
                  <Link href="#platform" className="text-muted-strong hover:text-primary">
                    Platform
                  </Link>
                </li>
                <li>
                  <Link href="#audience" className="text-muted-strong hover:text-primary">
                    Roles
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-muted-strong hover:text-primary">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4 text-muted">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a href={supportHref} className="text-muted-strong hover:text-primary">
                    Customer support
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="text-muted-strong hover:text-primary"
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
            <span>© 2026 {site.name}. All rights reserved.</span>
            <span>Product views on this page use sample data.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
