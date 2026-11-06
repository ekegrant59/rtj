export interface Project {
  id: string;
  slug: string;
  href: string;
  title: string;
  category: "Marketing" | "Design" | "Development" | "Brand + Web" | "Campaign" | "Product Design";
  categoryBadge: string;
  tagColor?: string;
  textColor?: string;
  bgColor: string;
  image: string;
  imageAlt: string;
  logo: string;
  summary: string;
  year?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    slug: "canadian-country-star",
    href: "https://nextgreatcanadiancountrystar.com/",
    title: "The Next Great Canadian Country Star",
    category: "Brand + Web",
    categoryBadge: "BRAND + WEB",
    bgColor: "#121212",
    image: "/images/canadian-country-star.webp",
    imageAlt: "The Next Great Canadian Country Star website, featuring a live country music stage",
    logo: "/images/canadian-country-star-logo.png",
    summary: "Brand and website for The Next Great Canadian Country Star.",
    year: "2026",
  },
];

export interface ServiceDiscipline {
  title: string;
  description: string;
  deliverables: string[];
}

export const SERVICES_DATA: ServiceDiscipline[] = [
  {
    title: "Marketing",
    description: "Campaigns, content and growth that bring the right people in.",
    deliverables: [
      "Strategy and positioning",
      "Campaigns",
      "Content and social",
      "SEO and paid media",
    ],
  },
  {
    title: "Design",
    description: "Identity, interface and product design that give them a reason to stay.",
    deliverables: [
      "Brand identity",
      "Website and UI design",
      "Product design",
      "Brand guidelines",
    ],
  },
  {
    title: "Development",
    description: "Websites and apps built fast, built clean and built to last.",
    deliverables: [
      "Websites",
      "Web apps",
      "E-commerce",
      "CMS and maintenance",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Listen",
    description: "We learn your business, your customers and your goals.",
  },
  {
    number: "02",
    title: "Plan",
    description: "We agree the strategy, scope and timeline.",
  },
  {
    number: "03",
    title: "Build",
    description: "We design, write and develop in one team.",
  },
  {
    number: "04",
    title: "Launch",
    description: "We ship, measure and keep improving.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Alex Reed",
    role: "Brand & Marketing Director",
    bgColor: "#DCD6C9",
    bio: "12 years leading strategy for global challenger brands.",
  },
  {
    name: "Elena Vance",
    role: "Head of Design",
    bgColor: "#E3542B",
    bio: "Award-winning art director specializing in brand identity and typography.",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Engineering",
    bgColor: "#222325",
    bio: "Systems architect focused on scalable web apps and frontend performance.",
  },
];

export const BELIEFS = [
  {
    title: "One team",
    description: "Marketing, design and development sit at the same table.",
  },
  {
    title: "Straight talk",
    description: "Clear plans, honest timelines and no jargon.",
  },
  {
    title: "Built to last",
    description: "Work that keeps performing after launch day.",
  },
];
