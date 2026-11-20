import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ClipboardList,
  GraduationCap,
  Layers3,
  Mail,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { TutorPreview } from "@/components/landing/tutor-preview";
import { Brand } from "@/components/brand";
import { Badge, Button } from "@/components/ui/primitives";
import { site, supportHref } from "@/lib/site";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    copy: "Get unstuck with explanations that build understanding, then practise until it sticks.",
  },
  {
    icon: UserRound,
    title: "Teachers",
    copy: "Keep control of lessons, questions and grades while AI handles the heavy preparation.",
  },
  {
    icon: School,
    title: "School leaders",
    copy: "See patterns across classes and subjects, with evidence behind every recommendation.",
  },
  {
    icon: Users,
    title: "Parents",
    copy: "Stay informed about progress, feedback and upcoming assessments for your child.",
  },
];

const capabilities = [
  {
    id: "lesson-studio",
    icon: BookOpen,
    label: "Lesson Studio",
    title: "Plan the lesson, not the paperwork.",
    copy: "Start with your objectives, class and available materials. Maarivo drafts a structured lesson you can edit section by section, then publish when it is ready.",
    preview: (
      <div className="space-y-2">
        {["Learning objectives", "Introduction", "Lesson development", "Student activities", "Evaluation & homework"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border border-line bg-[#FBFAFE] px-3.5 py-2.5"
            >
              <span className="text-[13px] font-medium text-[#3D3C52]">{item}</span>
              <span
                className={`text-[11px] font-medium ${
                  index < 3 ? "text-success" : "text-muted"
                }`}
              >
                {index < 3 ? "Ready" : "Draft"}
              </span>
            </div>
          ),
        )}
      </div>
    ),
  },
  {
    id: "assessment-studio",
    icon: ClipboardList,
    label: "Assessment Studio",
    title: "Better questions, ready for your review.",
    copy: "Generate assessments from topics, objectives and your own notes. Answer keys, marks and explanations come with them — nothing is published without your approval.",
    preview: (
      <div className="space-y-2">
        {[
          { type: "Multiple choice", marks: "2 marks", tone: "accent" as const },
          { type: "Short answer", marks: "4 marks", tone: "neutral" as const },
          { type: "Long answer", marks: "8 marks", tone: "neutral" as const },
        ].map((item) => (
          <div
            key={item.type}
            className="flex items-center justify-between rounded-lg border border-line bg-[#FBFAFE] px-3.5 py-2.5"
          >
            <span className="text-[13px] font-medium text-[#3D3C52]">{item.type}</span>
            <Badge variant={item.tone}>{item.marks}</Badge>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 text-[11px] text-muted">
          <ShieldCheck size={13} strokeWidth={1.8} aria-hidden="true" />
          Teacher approval required before publication
        </div>
      </div>
    ),
  },
  {
    id: "ai-tutor",
    icon: BrainCircuit,
    label: "AI Tutor",
    title: "Guidance grounded in what you teach.",
    copy: "Students ask in their own words. The tutor uses the subject, topic and your approved resources to offer hints, worked examples and checks for understanding.",
    preview: (
      <div className="flex flex-wrap gap-2">
        {["Explain simply", "Step by step", "Give me an example", "Give me a hint", "Test my understanding"].map(
          (mode) => (
            <span
              key={mode}
              className="rounded-lg border border-line bg-[#FBFAFE] px-3 py-2 text-[12px] font-medium text-[#4E4D63]"
            >
              {mode}
            </span>
          ),
        )}
      </div>
    ),
  },
  {
    id: "learning-intelligence",
    icon: BarChart3,
    label: "Learning intelligence",
    title: "Know what needs attention next.",
    copy: "Performance data becomes clear, evidence-based guidance: topics to revisit, students who need support, and patterns worth a closer look.",
    preview: (
      <div className="rounded-lg border border-line bg-[#FBFAFE] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-primary">Grade 9 Science</span>
          <Badge variant="accent">Across 3 assessments</Badge>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#3D3C52]">
          14 students missed questions on chemical equations. A short revision session may help before the next assessment.
        </p>
      </div>
    ),
  },
];

const workflow = [
  {
    icon: Layers3,
    title: "Bring your materials",
    copy: "Upload notes, documents and resources. We connect them to the right subject, class and topic.",
  },
  {
    icon: Sparkles,
    title: "Design the learning",
    copy: "Draft lessons and assessments, adjust every section, and release only what you approve.",
  },
  {
    icon: Target,
    title: "See what changed",
    copy: "Track understanding over time and act on recommendations backed by real performance data.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
            <div className="max-w-[620px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-[#4E4D63]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Built for secondary schools
              </span>

              <h1 className="mt-6 font-brand text-[clamp(2.6rem,5.2vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-primary">
                Every learner understood. Every lesson connected.
              </h1>

              <p className="mt-6 max-w-[540px] text-[17px] leading-[1.65] text-muted">
                Maarivo brings lesson planning, assessment, AI tutoring and learning intelligence into one workspace built for the way schools actually teach.
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

              <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed text-muted">
                Reach out to our customer support to get a tailored version of the web app for your curriculum, roles and workflow.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] font-medium text-[#4E4D63]">
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

            <TutorPreview />
          </div>
        </section>

        {/* Audience */}
        <section id="audience" className="border-y border-line bg-surface py-14 sm:py-16">
          <div className="shell">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-[460px] text-[clamp(1.6rem,2.5vw,2rem)] font-semibold leading-[1.2] text-primary">
                One platform, four connected experiences.
              </h2>
              <p className="max-w-[360px] text-sm leading-relaxed text-muted">
                Shared academic data, role-appropriate access and workflows that stay in sync.
              </p>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((item) => (
                <div key={item.title} className="border-t border-primary/25 pt-5">
                  <item.icon size={22} strokeWidth={1.6} className="text-accent-deep" aria-hidden="true" />
                  <h3 className="mt-4 text-[17px] font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="platform" className="py-20 sm:py-24">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-[13px] font-semibold text-accent-deep">The platform</span>
              <h2 className="mt-3 max-w-[420px] text-[clamp(1.9rem,3.1vw,2.6rem)] font-semibold leading-[1.14] text-primary">
                Built around the work that matters.
              </h2>
              <p className="mt-5 max-w-[400px] text-[15px] leading-[1.7] text-muted">
                AI is part of the learning workflow here — prepared, checked and always subject to human judgement.
              </p>
              <Button href={supportHref} variant="outline" className="mt-7">
                Discuss your setup
                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Button>
            </div>

            <div className="space-y-4">
              {capabilities.map((capability) => (
                <div
                  key={capability.id}
                  className="grid gap-6 rounded-xl border border-line bg-surface p-6 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                        <capability.icon size={18} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="text-[13px] font-semibold text-accent-deep">
                        {capability.label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[19px] font-semibold leading-[1.3] text-primary">
                      {capability.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-[1.7] text-muted">{capability.copy}</p>
                  </div>
                  <div>{capability.preview}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="border-y border-line bg-surface py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-[620px]">
              <span className="text-[13px] font-semibold text-accent-deep">How it works</span>
              <h2 className="mt-3 text-[clamp(1.9rem,3.1vw,2.6rem)] font-semibold leading-[1.14] text-primary">
                From your materials to measurable progress.
              </h2>
            </div>
            <div className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
              <div className="absolute top-[21px] right-[16%] left-[16%] hidden h-px bg-line-strong md:block" />
              {workflow.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-background text-accent-deep">
                    <step.icon size={19} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <div className="mt-5 text-[11px] font-semibold text-muted">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-1.5 text-[18px] font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 max-w-[320px] text-[13px] leading-[1.7] text-muted">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="shell">
            <div className="relative overflow-hidden rounded-2xl bg-primary px-7 py-12 sm:px-12 sm:py-14 lg:px-16">
              <svg
                className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 text-white/[0.07]"
                viewBox="0 0 320 320"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="160" cy="160" r="120" stroke="currentColor" strokeWidth="1" />
                <circle cx="160" cy="160" r="80" stroke="currentColor" strokeWidth="1" />
                <circle cx="160" cy="160" r="40" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div>
                  <h2 className="max-w-[620px] text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.12] text-white">
                    Let&apos;s shape Maarivo around your school.
                  </h2>
                  <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#C5C3D9]">
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
            <p className="mt-3 max-w-[320px] text-[12px] leading-relaxed text-muted">
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
          <div className="shell py-5 text-[12px] text-muted">© 2026 {site.name}. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
