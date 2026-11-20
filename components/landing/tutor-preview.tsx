import { BadgeCheck, BookOpen, Check, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";

const steps = [
  "A denominator tells us how many equal parts make one whole.",
  "Halves and thirds are different-sized parts, so we cannot compare them directly.",
  "Sixths give us equal parts: 1/2 = 3/6 and 1/3 = 2/6. Now they can be added.",
];

export function TutorPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg
        className="pointer-events-none absolute -top-14 -right-16 h-[420px] w-[520px] text-accent/20"
        viewBox="0 0 520 420"
        fill="none"
        aria-hidden="true"
      >
        <path d="M30 340C110 340 110 230 190 230S270 300 350 300 430 170 500 170" stroke="currentColor" strokeWidth="1.5" />
        <path d="M30 390C120 390 120 300 210 300S300 120 390 120 460 70 500 70" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="190" cy="230" r="5" fill="currentColor" />
        <circle cx="350" cy="300" r="5" fill="currentColor" />
        <circle cx="390" cy="120" r="5" fill="currentColor" />
      </svg>

      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_28px_70px_-36px_rgba(23,27,53,0.35)]">
        <div className="flex h-[52px] items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft text-accent-deep">
              <Sparkles size={15} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-brand text-sm font-semibold text-primary">AI Tutor</span>
            <span className="hidden h-4 w-px bg-line-strong sm:block" />
            <span className="hidden text-xs text-muted sm:block">Grade 9 Mathematics</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-success-soft px-2 py-1 text-[11px] font-medium text-success">
            <BadgeCheck size={12} strokeWidth={2} aria-hidden="true" />
            Grounded
          </span>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
          <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-4 py-3 text-[13px] leading-relaxed text-white">
            Why do 1/2 and 1/3 need the same denominator before I add them?
          </div>

          <div className="rounded-xl border border-line bg-[#FBFAFE] p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <BrandMark size={22} />
              <span className="font-brand text-[13px] font-semibold text-primary">Maarivo</span>
              <span className="text-[11px] text-muted">· step by step</span>
            </div>
            <ol className="space-y-2.5">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-deep">
                    {index + 1}
                  </span>
                  <span className="text-[13px] leading-[1.55] text-[#3D3C52]">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-[#4E4D63]">
                <BookOpen size={12} strokeWidth={1.8} aria-hidden="true" />
                Fractions and ratios · Unit 3
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                <Check size={12} strokeWidth={2} aria-hidden="true" />
                From your approved materials
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Explain simply", "Give me a hint", "Test my understanding"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-[#55546A]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
