import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  ClipboardList,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { TutorPreview } from "@/components/landing/tutor-preview";
import { Brand } from "@/components/brand";
import { Badge, Button } from "@/components/ui/primitives";
import { site, supportHref } from "@/lib/site";

const roles = [
  {
    label: "For teachers",
    title: "Prepare once. Teach with room to respond.",
    copy: "Turn your objectives and materials into a structured lesson, draft assessments with answer keys, then adjust every section before anything reaches a class.",
    points: ["Lesson Studio", "Assessment Studio", "Question bank"],
    image: "/images/teacher-planning.jpg",
    alt: "A teacher planning a lesson with a laptop and notebook",
  },
  {
    label: "For students",
    title: "Ask questions without being handed the answer.",
    copy: "The tutor starts with hints, worked examples and checks for understanding — using the subject, topic and approved resources you already teach from.",
    points: ["Step-by-step explanations", "Practice questions", "Conversation history"],
    image: "/images/students-laptops.jpg",
    alt: "Students studying together with laptops and notes",
  },
  {
    label: "For school leaders",
    title: "See patterns, with the evidence behind them.",
    copy: "Understand where topics are landing across classes, which students may need support, and what the recommendation is based on before you act on it.",
    points: ["Class and subject analytics", "Learning gaps", "Evidence-based guidance"],
    image: "/images/school-life.jpg",
    alt: "Students and teachers in a school classroom",
  },
  {
    label: "For parents",
    title: "Stay informed within the right boundaries.",
    copy: "See results, feedback and upcoming assessments for your own child only, with access tied to a verified link and enforced by permissions.",
    points: ["Linked child profiles", "Teacher feedback", "Upcoming assessments"],
    image: "/images/students-collaborating.jpg",
    alt: "Students collaborating around a table during a learning session",
  },
];

const workflow = [
  {
    title: "Bring your materials",
    copy: "Upload notes, documents and resources. Maarivo connects them to the right subject, class and topic.",
  },
  {
    title: "Design the learning",
    copy: "Draft lessons and assessments, edit section by section, and release only what you approve.",
  },
  {
    title: "See what changed",
    copy: "Track understanding over time and act on guidance backed by real performance data.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line bg-background">
          <div className="shell grid gap-0 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="py-16 sm:py-20 lg:py-24 lg:pr-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-[#4E4D63]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Built for secondary schools
              </span>

              <h1 className="mt-6 font-brand text-[clamp(2.7rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-primary">
                Learning that reaches{" "}
                <em className="font-medium text-accent-deep">every student.</em>
              </h1>

              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.65] text-muted">
                Maarivo connects lesson planning, assessment and AI tutoring to the way your school actually teaches. One workspace, built around the people in the classroom.
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

              <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed text-muted">
                Reach out to our customer support to get a tailored version of the web app for your curriculum, roles and workflow.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] font-medium text-[#4E4D63]">
                {["Teacher-controlled AI", "Grounded in your materials", "Privacy by design"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <Check size={14} strokeWidth={2.2} className="text-success" aria-hidden="true" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative min-h-[380px] self-stretch lg:min-h-[620px]">
              <Image
                src="/images/hero-classroom.jpg"
                alt="A teacher leading a classroom discussion"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-[55%_center]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-primary/90 px-6 py-5 text-white">
                <div className="flex items-center gap-2 text-[11px] font-medium text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Sample teacher workspace
                </div>
                <p className="mt-1.5 font-brand text-[17px] font-semibold">
                  Grade 9 Science · Lesson in progress
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-white/75">
                  <span>Concept mastery</span>
                  <span>Reasoning signals</span>
                  <span>Next step suggested</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statement band */}
        <section className="relative isolate overflow-hidden bg-primary">
          <Image
            src="/images/students-collaborating.jpg"
            alt="Students collaborating around a laptop during a learning session"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="relative mx-auto max-w-[980px] px-6 py-20 text-center sm:py-24">
            <p className="font-brand text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.22] tracking-[-0.025em] text-white">
              Tools should make thinking visible — not add another screen between a teacher and a student.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-[12px] font-medium text-white/65">
              <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
              Human judgement stays in control
            </div>
          </div>
        </section>

        {/* Role stories */}
        <section id="audience" className="bg-surface py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-[640px]">
              <span className="text-[13px] font-semibold text-accent-deep">Who it&apos;s for</span>
              <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.14] text-primary">
                Four roles. One shared picture of learning.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                Everyone works from connected academic data, with access shaped by their role and responsibilities.
              </p>
            </div>

            <div className="mt-12 space-y-14 sm:space-y-16">
              {roles.map((role, index) => (
                <div
                  key={role.label}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-accent-soft">
                      <Image
                        src={role.image}
                        alt={role.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <span className="text-[12px] font-semibold text-accent-deep">
                      {role.label}
                    </span>
                    <h3 className="mt-3 max-w-[480px] text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.22] text-primary">
                      {role.title}
                    </h3>
                    <p className="mt-4 max-w-[470px] text-[14px] leading-[1.75] text-muted">
                      {role.copy}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {role.points.map((point) => (
                        <span key={point} className="inline-flex items-center gap-2 text-[13px] font-medium text-[#4E4D63]">
                          <Check size={14} strokeWidth={2.2} className="text-success" aria-hidden="true" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inside the workspace */}
        <section id="platform" className="py-20 sm:py-24">
          <div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[640px]">
                <span className="text-[13px] font-semibold text-accent-deep">Inside the workspace</span>
                <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.14] text-primary">
                  AI that stays inside the learning workflow.
                </h2>
              </div>
              <p className="max-w-[340px] text-[14px] leading-[1.7] text-muted">
                Prepared, validated and always subject to human judgement.
              </p>
            </div>

            <div className="mt-11 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
              <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                    <Sparkles size={18} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-semibold text-accent-deep">AI Tutor</span>
                </div>
                <h3 className="mt-4 text-[21px] font-semibold leading-snug text-primary">
                  Guidance grounded in what you teach.
                </h3>
                <p className="mt-2 max-w-[560px] text-[13px] leading-[1.7] text-muted">
                  Students ask in their own words. The tutor uses subject and topic context, offers hints before answers, and cites the approved material it drew from.
                </p>
                <div className="mt-6">
                  <TutorPreview />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-line bg-surface p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                      <ClipboardList size={18} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="text-[13px] font-semibold text-accent-deep">Assessment Studio</span>
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold leading-snug text-primary">
                    Questions ready for your review.
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                    Generate assessments with answer keys, marks and explanations. Nothing publishes without your approval.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge variant="accent">Multiple choice</Badge>
                    <Badge>Short answer</Badge>
                    <Badge>Long answer</Badge>
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-surface p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                      <BarChart3 size={18} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="text-[13px] font-semibold text-accent-deep">Learning intelligence</span>
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold leading-snug text-primary">
                    Know what needs attention next.
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                    Recommendations come with their evidence, so you can see why a topic or student was flagged.
                  </p>
                  <div className="mt-5 flex items-center gap-2 rounded-lg border border-line bg-[#FBFAFE] px-3.5 py-3 text-[12px] text-[#3D3C52]">
                    <BadgeCheck size={15} strokeWidth={1.9} className="text-success" aria-hidden="true" />
                    Based on 3 assessments · sample view
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="border-y border-line bg-surface py-20 sm:py-24">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
            <div>
              <span className="text-[13px] font-semibold text-accent-deep">How it works</span>
              <h2 className="mt-3 max-w-[560px] text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.14] text-primary">
                From your materials to measurable progress.
              </h2>
              <div className="mt-10 space-y-7">
                {workflow.map((step, index) => (
                  <div key={step.title} className="flex gap-5 border-t border-line pt-5">
                    <span className="font-brand text-[13px] font-semibold text-accent-deep tabular-nums">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1.5 max-w-[460px] text-[13px] leading-[1.7] text-muted">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-accent-soft lg:aspect-[4/4.4]">
              <Image
                src="/images/study-notes.jpg"
                alt="Books and study notes arranged on a desk"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-primary/90 px-5 py-4 text-[12px] font-medium text-white">
                Your material stays the source of truth
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="shell">
            <div className="relative isolate overflow-hidden rounded-2xl bg-primary px-7 py-14 sm:px-12 sm:py-16 lg:px-16">
              <Image
                src="/images/teacher-students.jpg"
                alt="A teacher working with students in a classroom"
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover opacity-20"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
                <div>
                  <h2 className="max-w-[600px] text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.12] text-white">
                    Let&apos;s shape Maarivo around your school.
                  </h2>
                  <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-white/75">
                    Reach out to our customer support to get a tailored version of the web app. Tell us about your curriculum, classes and workflow, and we&apos;ll take it from there.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Button href={supportHref} variant="accent" size="lg">
                    <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                    Contact customer support
                  </Button>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-white/85 hover:text-white"
                  >
                    Or explore the demo first
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Brand />
            <p className="mt-3 max-w-[340px] text-[12px] leading-relaxed text-muted">
              An AI-powered learning and assessment workspace for schools.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] font-medium text-[#4E4D63]">
            <Link href="#platform" className="hover:text-primary">Platform</Link>
            <Link href="/demo" className="hover:text-primary">Demo</Link>
            <a href={`mailto:${site.supportEmail}`} className="hover:text-primary">Contact support</a>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="shell flex flex-col gap-2 py-5 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {site.name}. All rights reserved.</span>
            <span>Photography from Unsplash. Reference layouts studied from Ojuwa and Synacad; no images copied from those sites.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
