import {
  BarChart3,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  Lightbulb,
  School,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type View = "overview" | "classes" | "assessments" | "tutor" | "insights";

export const viewTitles: Record<View, string> = {
  overview: "Overview",
  classes: "Classes",
  assessments: "Assessments",
  tutor: "AI Tutor",
  insights: "Insights",
};

export const navGroups: {
  label: string;
  items: { id: View; label: string; icon: LucideIcon }[];
}[] = [
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

export const classes = [
  {
    code: "9A",
    name: "Grade 9A Science",
    students: 28,
    progress: 72,
    next: "Chemical equations",
    topic: "Atoms and reactions",
  },
  {
    code: "9B",
    name: "Grade 9B Science",
    students: 26,
    progress: 64,
    next: "Chemical equations",
    topic: "Atoms and reactions",
  },
  {
    code: "10A",
    name: "Grade 10A Mathematics",
    students: 30,
    progress: 81,
    next: "Quadratic functions",
    topic: "Algebra",
  },
  {
    code: "8C",
    name: "Grade 8C Mathematics",
    students: 34,
    progress: 58,
    next: "Fractions and ratios",
    topic: "Number",
  },
] as const;

export const assessmentStatuses = [
  "All",
  "Scheduled",
  "Draft",
  "Results ready",
  "Released",
] as const;

export type AssessmentStatus = Exclude<
  (typeof assessmentStatuses)[number],
  "All"
>;

export type Assessment = {
  id: string;
  title: string;
  klass: string;
  due: string;
  status: AssessmentStatus;
  submissions: string;
  type: string;
  source: string;
  generated: string;
  review: string;
  outcome: string;
};

export const assessments: Assessment[] = [
  {
    id: "chemical-equations",
    title: "Chemical equations — unit test",
    klass: "9A Science",
    due: "24 Nov",
    status: "Scheduled",
    submissions: "0 of 28",
    type: "Mixed",
    source: "Atoms and reactions · approved class notes",
    generated: "12 questions · 3 extended-response items",
    review: "Check the wording of question 9 before release",
    outcome: "Scheduled for 24 Nov · 28 students",
  },
  {
    id: "fractions-check-in",
    title: "Fractions check-in",
    klass: "8C Mathematics",
    due: "26 Nov",
    status: "Scheduled",
    submissions: "0 of 34",
    type: "Short answer",
    source: "Fractions and ratios · Unit 3",
    generated: "8 questions · auto-marked short answer",
    review: "Confirm the marking note for question 6",
    outcome: "Scheduled for 26 Nov · 34 students",
  },
  {
    id: "algebra-foundations",
    title: "Algebra foundations",
    klass: "10A Mathematics",
    due: "28 Nov",
    status: "Draft",
    submissions: "—",
    type: "Multiple choice",
    source: "Algebra foundations · teacher notes",
    generated: "10 questions · multiple choice",
    review: "Not reviewed yet · draft still editable",
    outcome: "Not released to students",
  },
  {
    id: "atoms-quiz",
    title: "Atoms and reactions quiz",
    klass: "9B Science",
    due: "18 Nov",
    status: "Results ready",
    submissions: "26 of 26",
    type: "Mixed",
    source: "Atoms and reactions · approved class notes",
    generated: "8 questions · mixed response types",
    review: "Teacher approved 17 Nov",
    outcome: "26 of 26 submitted · results ready",
  },
  {
    id: "number-baseline",
    title: "Number skills baseline",
    klass: "8C Mathematics",
    due: "12 Nov",
    status: "Released",
    submissions: "34 of 34",
    type: "Mixed",
    source: "Number skills · approved baseline",
    generated: "16 questions · mixed response types",
    review: "Teacher approved 10 Nov",
    outcome: "Results released to class",
  },
];

export function needsReview(item: Assessment): boolean {
  return item.status === "Scheduled" || item.status === "Draft";
}

export const insights: {
  icon: LucideIcon;
  tone: "warning" | "success" | "accent";
  title: string;
  evidence: string;
  body: string;
  action: string;
  view: View;
}[] = [
  {
    icon: Lightbulb,
    tone: "warning",
    title: "Chemical equations need a revisit",
    evidence: "14 students · across 3 assessments",
    body: "Students are consistently balancing equations incorrectly. A short revision before the unit test may help.",
    action: "Open AI Tutor",
    view: "tutor",
  },
  {
    icon: CheckCircle2,
    tone: "success",
    title: "Fractions practice is working",
    evidence: "Grade 8C · +11 points since September",
    body: "Recent practice results show improvement in adding unlike fractions. Keep the current sequence going.",
    action: "View insights",
    view: "insights",
  },
  {
    icon: BookMarked,
    tone: "accent",
    title: "Resource gap in Algebra",
    evidence: "Grade 10A · topic: quadratic functions",
    body: "No approved resource is attached to this topic yet. Add one to ground tutor explanations in your material.",
    action: "View insights",
    view: "insights",
  },
];

export type ChatMessage = {
  id: number;
  role: "student" | "tutor";
  text: string;
  mode?: string;
  source?: string;
};

export const initialMessages: ChatMessage[] = [
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

export const tutorModes = [
  "Explain simply",
  "Step by step",
  "Give me an example",
  "Give me a hint",
  "Test my understanding",
  "Generate practice questions",
] as const;

export function demoReply(prompt: string, mode: string): string {
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

export function demoTopic(prompt: string): string {
  if (/chemical|equation|atom/i.test(prompt)) return "Atoms and reactions · Grade 9";
  if (/quadratic|algebra/i.test(prompt)) return "Algebra · Grade 10";
  return "Fractions and ratios · Grade 8";
}
