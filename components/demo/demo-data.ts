import {
  BarChart3,
  BookMarked,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  MessageSquareText,
  School,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type View =
  | "overview"
  | "classes"
  | "assessments"
  | "tutor"
  | "insights"
  | "learning"
  | "subjects"
  | "practice"
  | "school"
  | "reports"
  | "child"
  | "feedback"
  | "upcoming";

export const viewTitles: Record<View, string> = {
  overview: "Overview",
  classes: "Classes",
  assessments: "Assessments",
  tutor: "AI Tutor",
  insights: "Insights",
  learning: "My learning",
  subjects: "Subjects",
  practice: "Practice",
  school: "School overview",
  reports: "Evidence reports",
  child: "Child overview",
  feedback: "Teacher feedback",
  upcoming: "Upcoming",
};

export const roleIds = ["teacher", "student", "leader", "parent"] as const;

export type Role = (typeof roleIds)[number];

export function isRole(value: string): value is Role {
  return roleIds.some((role) => role === value);
}

export const roles: {
  id: Role;
  label: string;
  fullLabel: string;
  eyebrow: string;
  person: string;
  detail: string;
  initials: string;
  icon: LucideIcon;
  defaultView: View;
}[] = [
  {
    id: "teacher",
    label: "Teacher",
    fullLabel: "Teacher workspace",
    eyebrow: "Teacher workspace",
    person: "Amara Okafor",
    detail: "Teacher · Demo school",
    initials: "AO",
    icon: ClipboardList,
    defaultView: "overview",
  },
  {
    id: "student",
    label: "Student",
    fullLabel: "Student workspace",
    eyebrow: "Student workspace",
    person: "Ife Okafor",
    detail: "Grade 9 · Demo school",
    initials: "IO",
    icon: GraduationCap,
    defaultView: "learning",
  },
  {
    id: "leader",
    label: "School leader",
    fullLabel: "School leader workspace",
    eyebrow: "School leadership",
    person: "Demo administrator",
    detail: "School administrator · Demo school",
    initials: "DA",
    icon: School,
    defaultView: "school",
  },
  {
    id: "parent",
    label: "Parent",
    fullLabel: "Parent workspace",
    eyebrow: "Parent workspace",
    person: "Okafor family",
    detail: "Linked to Ife Okafor · Grade 9",
    initials: "OF",
    icon: Users,
    defaultView: "child",
  },
];

type NavGroup = {
  label: string;
  items: { id: View; label: string; icon: LucideIcon }[];
};

export const roleNav: Record<Role, NavGroup[]> = {
  teacher: [
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
  ],
  student: [
    {
      label: "Learning",
      items: [
        { id: "learning", label: "My learning", icon: LayoutDashboard },
        { id: "subjects", label: "Subjects", icon: BookMarked },
        { id: "practice", label: "Practice", icon: ClipboardList },
        { id: "tutor", label: "AI Tutor", icon: Sparkles },
      ],
    },
  ],
  leader: [
    {
      label: "School",
      items: [
        { id: "school", label: "Overview", icon: LayoutDashboard },
        { id: "classes", label: "Classes", icon: School },
        { id: "reports", label: "Evidence reports", icon: FileText },
      ],
    },
  ],
  parent: [
    {
      label: "Your child",
      items: [
        { id: "child", label: "Overview", icon: Users },
        { id: "feedback", label: "Teacher feedback", icon: MessageSquareText },
        { id: "upcoming", label: "Upcoming", icon: CalendarDays },
      ],
    },
  ],
};

export const navGroups = roleNav.teacher;

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

export const sampleNotice =
  "Sample data only. No live school records are connected.";

export type StudentTaskStatus = "Next up" | "Due soon" | "Reviewed";

export type StudentTask = {
  id: string;
  title: string;
  subject: string;
  topic: string;
  due: string;
  status: StudentTaskStatus;
  source: string;
  teacherNote: string;
  prompt: string;
  hint: string;
  kind: "text" | "choice";
  options?: string[];
  accepted: string[];
  success: string;
};

export const studentTasks: StudentTask[] = [
  {
    id: "fractions",
    title: "Add unlike fractions",
    subject: "Mathematics",
    topic: "Fractions and ratios",
    due: "Today",
    status: "Next up",
    source: "Fractions and ratios · Unit 3 · approved class notes",
    teacherNote: "Show how you find the common denominator before adding.",
    prompt: "Work out 1/2 + 1/3. Type your answer as a fraction.",
    hint: "Find a number both denominators divide into, then rewrite each fraction with that denominator.",
    kind: "text",
    accepted: ["5/6", "five sixths"],
    success: "Correct. Your working is ready for your teacher to see in the live product.",
  },
  {
    id: "chemical-equations",
    title: "Balance a chemical equation",
    subject: "Science",
    topic: "Atoms and reactions",
    due: "24 Nov",
    status: "Due soon",
    source: "Atoms and reactions · approved class notes",
    teacherNote: "Change coefficients only. Do not change the subscripts.",
    prompt: "Which balanced equation has four hydrogen and two oxygen atoms on each side?",
    hint: "Count the atoms on each side first. H₂ and O₂ are molecules, so their coefficients matter.",
    kind: "choice",
    options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O"],
    accepted: ["2H₂ + O₂ → 2H₂O"],
    success: "Correct. Both sides now have four hydrogen and two oxygen atoms.",
  },
  {
    id: "quadratics",
    title: "Factorise a quadratic",
    subject: "Mathematics",
    topic: "Algebra",
    due: "18 Nov",
    status: "Reviewed",
    source: "Algebra foundations · teacher notes",
    teacherNote: "Find two numbers that multiply to 6 and add to 5.",
    prompt: "Which factorisation solves x² + 5x + 6 = 0?",
    hint: "The two numbers you need multiply to the constant term and add to the coefficient of x.",
    kind: "choice",
    options: ["(x + 1)(x + 6) = 0", "(x + 2)(x + 3) = 0", "(x − 2)(x − 3) = 0"],
    accepted: ["(x + 2)(x + 3) = 0"],
    success: "Correct. That gives x = −2 or x = −3.",
  },
];

export const studentSubjects = [
  {
    name: "Mathematics",
    teacher: "Ms. Nwosu",
    topics: 8,
    progress: 74,
    next: "Fractions and ratios",
    source: "Unit 3 · approved material",
  },
  {
    name: "Science",
    teacher: "Amara Okafor",
    topics: 6,
    progress: 61,
    next: "Atoms and reactions",
    source: "Unit 2 · approved material",
  },
  {
    name: "English",
    teacher: "Mr. Adeyemi",
    topics: 5,
    progress: 82,
    next: "Comparing viewpoints",
    source: "Unit 4 · approved material",
  },
] as const;

export const schoolScopes = [
  "All",
  "Grade 8",
  "Grade 9",
  "Grade 10",
] as const;

export type SchoolScope = (typeof schoolScopes)[number];

export const schoolClasses = [
  {
    code: "9A",
    name: "Grade 9A Science",
    grade: "Grade 9",
    subject: "Science",
    teacher: "Amara Okafor",
    students: 28,
    progress: 72,
    review: "1 draft needs review",
  },
  {
    code: "9B",
    name: "Grade 9B Science",
    grade: "Grade 9",
    subject: "Science",
    teacher: "Amara Okafor",
    students: 26,
    progress: 64,
    review: "Results ready",
  },
  {
    code: "10A",
    name: "Grade 10A Mathematics",
    grade: "Grade 10",
    subject: "Mathematics",
    teacher: "Ms. Nwosu",
    students: 30,
    progress: 81,
    review: "1 draft needs review",
  },
  {
    code: "8C",
    name: "Grade 8C Mathematics",
    grade: "Grade 8",
    subject: "Mathematics",
    teacher: "Ms. Nwosu",
    students: 34,
    progress: 58,
    review: "No action",
  },
] as const;

export type LeaderSignalStatus = "Review" | "Monitor" | "On track";

export type LeaderSignal = {
  id: string;
  title: string;
  grade: Exclude<SchoolScope, "All">;
  subject: string;
  klass: string;
  evidence: string;
  source: string;
  owner: string;
  status: LeaderSignalStatus;
  decision: string;
};

export const leaderSignals: LeaderSignal[] = [
  {
    id: "chemical-equations",
    title: "Chemical equations need a revisit",
    grade: "Grade 9",
    subject: "Science",
    klass: "9A and 9B Science",
    evidence: "14 students · across 3 assessments",
    source: "Atoms and reactions · teacher-approved class notes",
    owner: "Amara Okafor",
    status: "Review",
    decision: "Teacher is preparing a short revision before the unit test.",
  },
  {
    id: "algebra-resource",
    title: "No approved resource for quadratics",
    grade: "Grade 10",
    subject: "Mathematics",
    klass: "10A Mathematics",
    evidence: "Topic has no attached approved material",
    source: "Algebra foundations · resource check",
    owner: "Ms. Nwosu",
    status: "Review",
    decision: "Attach an approved resource before the next tutor session.",
  },
  {
    id: "fractions-improving",
    title: "Fractions practice is improving",
    grade: "Grade 8",
    subject: "Mathematics",
    klass: "8C Mathematics",
    evidence: "+11 points since September · sample trend",
    source: "Number and fractions · recent assessments",
    owner: "Ms. Nwosu",
    status: "On track",
    decision: "Keep the current practice sequence.",
  },
];

export type ParentFeedback = {
  id: string;
  subject: string;
  teacher: string;
  date: string;
  title: string;
  body: string;
  source: string;
};

export const parentFeedback: ParentFeedback[] = [
  {
    id: "fractions-working",
    subject: "Mathematics",
    teacher: "Ms. Nwosu",
    date: "18 Nov",
    title: "Show your working when comparing fractions",
    body: "Ife is getting the right answer more often. The next step is to write the common-denominator step so the thinking is visible.",
    source: "Fractions check-in · teacher feedback",
  },
  {
    id: "chemical-vocabulary",
    subject: "Science",
    teacher: "Amara Okafor",
    date: "14 Nov",
    title: "Use the correct terms for reactants and products",
    body: "The ideas are secure. Encourage Ife to label each side of an equation before balancing it.",
    source: "Atoms and reactions quiz · teacher feedback",
  },
  {
    id: "reading-evidence",
    subject: "English",
    teacher: "Mr. Adeyemi",
    date: "10 Nov",
    title: "Point to the sentence that supports your answer",
    body: "Ife explains ideas clearly. The next target is to quote directly from the text.",
    source: "Comparing viewpoints · class task",
  },
];

export type ParentAssessment = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: "Scheduled" | "Results ready";
  detail: string;
  teacherApproved: string;
};

export const parentAssessments: ParentAssessment[] = [
  {
    id: "chemical-unit-test",
    title: "Chemical equations — unit test",
    subject: "Science",
    due: "24 Nov",
    status: "Scheduled",
    detail: "Mixed questions on atoms and reactions. Date and details set by the school.",
    teacherApproved: "Teacher approved 20 Nov",
  },
  {
    id: "number-baseline",
    title: "Number skills baseline",
    subject: "Mathematics",
    due: "12 Nov",
    status: "Results ready",
    detail: "Results have been released to the class. Your child's teacher can explain the result.",
    teacherApproved: "Teacher approved 10 Nov",
  },
];
