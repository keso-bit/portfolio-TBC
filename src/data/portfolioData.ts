import type { Project, Skill, TodoItem } from '../types';

export const PERSONAL_INFO = {
  name: "Keso Tsulaia",
  role: "Full-Stack & React Developer",
  status: "მზად ვარ ახალი პროექტებისთვის 🚀",
  location: "Tbilisi, Georgia",
  email: "keso.tsulaia@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  telegram: "https://t.me",
  bio: "თანამედროვე, სწრაფი და ესთეტიკური ვებ-აპლიკაციების შემქმნელი React, TypeScript და Node.js ეკოსისტემაში. განსაკუთრებული ყურადღება UI/UX დეტალებსა და სუფთა კოდზე.",
  stats: [
    { label: "დასრულებული პროექტი", value: "20+" },
    { label: "წლიანი გამოცდილება", value: "3+" },
    { label: "ტექნოლოგიური სტეკი", value: "React & TS" },
    { label: "კმაყოფილი კლიენტი", value: "100%" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "voto-portfolio",
    title: "Voto Dark Portfolio & Workspace",
    description: "სრულიად ადაპტირებული, ულტრა-თანამედროვე მუქი დიზაინის პორთფოლიო ჩაშენებული სამუშაო Todo-აპლიკაციითა და გლობალური ძიებით.",
    tags: ["React 19", "TypeScript", "Vite", "Modern CSS", "GitHub Pages"],
    category: "React",
    githubUrl: "https://github.com",
    liveUrl: "#",
    featured: true,
    stars: 34,
    imageColor: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)"
  },
  {
    id: "smart-task-dashboard",
    title: "AI Task & Workflow Manager",
    description: "ინტელექტუალური დავალებების მართვის სისტემა რეალურ დროში განახლებებით, Kanban დაფებითა და ანალიტიკით.",
    tags: ["React", "TypeScript", "TailwindCSS", "Zustand"],
    category: "Full-Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    featured: true,
    stars: 28,
    imageColor: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)"
  },
  {
    id: "crypto-market-pulse",
    title: "Crypto Pulse & Analytics",
    description: "კრიპტოვალუტების რეალურ დროში მონიტორინგის პლატფორმა ინტერაქტიული გრაფიკებით, ფასების სიგნალებითა და პორტფოლიოს თვალთვალით.",
    tags: ["React", "Chart.js", "WebSocket", "CoinGecko API"],
    category: "Frontend",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    featured: false,
    stars: 19,
    imageColor: "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #7e22ce 100%)"
  },
  {
    id: "e-commerce-nexus",
    title: "Nexus Modern E-Commerce",
    description: "სწრაფი ონლაინ მაღაზია კალათის ფუნქციონალით, პროდუქტების დინამიური ფილტრაციითა და Stripe გადახდის ინტეგრაციით.",
    tags: ["React", "Node.js", "Stripe API", "PostgreSQL"],
    category: "Full-Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    featured: true,
    stars: 45,
    imageColor: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
  },
  {
    id: "dev-snippets-hub",
    title: "Code Snippets & Cheatsheets",
    description: "დეველოპერებისთვის განკუთვნილი კოდის ფრაგმენტების კატალოგი სინტაქსის განათებით, მყისიერი კოპირებითა და ძიებით.",
    tags: ["React", "TypeScript", "PrismJS", "LocalStorage"],
    category: "React",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    featured: false,
    stars: 14,
    imageColor: "linear-gradient(135deg, #701a75 0%, #86198f 50%, #a21caf 100%)"
  },
  {
    id: "saas-landing-dark",
    title: "Apex SaaS Landing Page",
    description: "მაღალი კონვერტაციის მქონე SaaS პროდუქტის ლენდინგი მიკრო-ინტერაქციებით, გლუვი ანიმაციებითა და მუქი თემით.",
    tags: ["React", "Framer Motion", "CSS Grid", "Responsive"],
    category: "Mobile / UI",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    featured: false,
    stars: 22,
    imageColor: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)"
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React 18 / 19", category: "Frontend", level: 95, iconName: "react", popular: true },
  { name: "TypeScript", category: "Frontend", level: 90, iconName: "typescript", popular: true },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 95, iconName: "javascript", popular: true },
  { name: "HTML5 / Modern CSS", category: "Frontend", level: 92, iconName: "html", popular: false },
  { name: "Tailwind CSS", category: "Frontend", level: 88, iconName: "tailwind", popular: true },
  { name: "Next.js", category: "Frontend", level: 85, iconName: "nextjs", popular: false },

  // Backend
  { name: "Node.js & Express", category: "Backend", level: 82, iconName: "nodejs", popular: true },
  { name: "RESTful APIs", category: "Backend", level: 90, iconName: "api", popular: false },
  { name: "PostgreSQL & Supabase", category: "Backend", level: 80, iconName: "database", popular: false },
  { name: "MongoDB", category: "Backend", level: 75, iconName: "database", popular: false },

  // Tools & DevOps
  { name: "Git & GitHub", category: "Tools & DevOps", level: 92, iconName: "git", popular: true },
  { name: "Vite & Webpack", category: "Tools & DevOps", level: 88, iconName: "vite", popular: false },
  { name: "GitHub Pages / CI-CD", category: "Tools & DevOps", level: 85, iconName: "terminal", popular: true },
  { name: "Postman", category: "Tools & DevOps", level: 85, iconName: "terminal", popular: false },

  // Design & Others
  { name: "Figma to Code", category: "Design & Others", level: 90, iconName: "figma", popular: true },
  { name: "UI/UX & Dark Mode", category: "Design & Others", level: 95, iconName: "palette", popular: true },
  { name: "Responsive Architecture", category: "Design & Others", level: 96, iconName: "mobile", popular: false },
  { name: "Performance Optimization", category: "Design & Others", level: 85, iconName: "zap", popular: false },
];

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: "todo-1",
    text: "პორთფოლიოს ატვირთვა GitHub რეპოზიტორიაში",
    completed: true,
    priority: "high",
    category: "Development",
    createdAt: "2026-11-18"
  },
  {
    id: "todo-2",
    text: "GitHub Pages-ის ჩართვა (Settings -> Pages -> Deploy)",
    completed: true,
    priority: "high",
    category: "Development",
    createdAt: "2026-11-18"
  },
  {
    id: "todo-3",
    text: "პროექტების რეალური ბმულების დამატება",
    completed: false,
    priority: "medium",
    category: "Personal",
    createdAt: "2026-11-18"
  },
  {
    id: "todo-4",
    text: "ახალი React 19 ფუნქციონალების ტესტირება",
    completed: false,
    priority: "low",
    category: "Study",
    createdAt: "2026-11-18"
  },
  {
    id: "todo-5",
    text: "Dark Theme UI კონტრასტისა და ანიმაციების დახვეწა",
    completed: true,
    priority: "high",
    category: "Design",
    createdAt: "2026-11-18"
  }
];
