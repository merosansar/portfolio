/* =====================================================================
   ✏️  EDIT THIS FILE TO MAKE THE PORTFOLIO YOURS
   ---------------------------------------------------------------------
   Every word on the site comes from here. Save the file and the page
   updates instantly while the site is running.

   ⚠️  The PROJECTS below are still SAMPLE CONTENT — replace them with
   your own work before you publish.
   ===================================================================== */

export type Project = {
  slug: string
  title: string
  summary: string
  year: string
  role: string
  /** Technologies used — names that match a skill show its logo */
  stack: string[]
  caseStudy: {
    problem: string
    approach: string[]
    outcome: string
  }
  links: {
    live?: string
    /** One source-code link */
    source?: string
    /** Or several, for example the frontend and backend repositories */
    sources?: { label: string; url: string }[]
  }
}

export type Job = {
  org: string
  /** Your job title there, e.g. "ASP.NET developer" */
  role?: string
  /** When you worked there, e.g. "2022 – 2024" or "2024 – now" */
  period?: string
  place?: string
  /** Company website, e.g. "https://example.com" */
  url?: string
  /** The company's old name, if it has changed */
  formerly?: string
  /** Marks the job you have now */
  current?: boolean
  /** One line per thing you did or achieved there */
  points?: string[]
}

export type Education = {
  /** Short form shown as the title, e.g. "BSc CSIT" */
  degree: string
  /** Full name of the degree */
  fullDegree?: string
  school: string
  /** e.g. "2015 – 2019" */
  period?: string
  place?: string
  url?: string
}

export type SkillGroup = {
  group: string
  description: string
  icon: "frontend" | "backend" | "database" | "cloud"
  items: string[]
}

export const profile = {
  name: "Pooja Gautam",
  fullName: "Pooja Gautam",
  /** Shown in the logo and in place of a photo */
  initials: "PG",
  role: "ASP.NET & Node.js Full-Stack Developer",
  location: "Kathmandu, Nepal",
  intro:
    "I build complete web applications on two stacks, ASP.NET Core with C# and Node.js with Nest.js, from microservices and SQL Server, PostgreSQL or MongoDB databases to fast React.js and Tailwind CSS interfaces.",
  currently: "Smart Solutions Technology",
  /** Website of your current company — leave "" for no link */
  currentlyUrl: "https://sst.asia/",
  email: "gautam2.pooja@gmail.com",
  /** Put your CV in the /public folder as resume.pdf, or set to "" to hide the buttons */
  resumeUrl: "/resume.pdf",
  /** Your photo: put it in /public (e.g. /pooja.jpg) and set photo: "/pooja.jpg". Leave "" to show your initial */
  photo: "",
  socials: {
    github: "https://github.com/merosansar",
    linkedin: "https://www.linkedin.com/in/poojagautam52",
  },
}

export const about = {
  heading: "About me",
  paragraphs: [
    "I'm a full-stack developer based in Kathmandu, Nepal, currently working at Smart Solutions Technology Pvt. Ltd. I design, build and maintain scalable web applications across two ecosystems: .NET, with ASP.NET Core, ASP.NET MVC and C#, and Node.js, with Nest.js, delivered through modern React.js and Next.js frontends.",
    "My work covers the full application lifecycle. I design relational and NoSQL data models in SQL Server, PostgreSQL and MongoDB, build RESTful APIs and microservices, and create responsive interfaces with TypeScript, Tailwind CSS, Bootstrap and shadcn/ui. I containerise applications with Docker, deploy them to Microsoft Azure, and follow Git-based workflows with code reviews on GitHub and GitLab.",
    "I take ownership of features from database design through to production release, with a focus on clean, maintainable code and reliable performance. I value clear communication with teammates and stakeholders, and I aim to build software that is dependable for users and easy for other developers to extend.",
  ],
  facts: [
    { icon: "location", label: "Based in", value: "Kathmandu, Nepal" },
    { icon: "work", label: "Currently at", value: "Smart Solutions Technology Pvt. Ltd.", href: "https://sst.asia/" },
    { icon: "history", label: "Previously at", value: "Creation Soft Nepal, Gapsco and IMS Software" },
    { icon: "focus", label: "Focus", value: "ASP.NET Core, Node.js, Nest.js, React.js" },
    { icon: "education", label: "Education", value: "BSc CSIT, Tribhuvan University" },
  ] as const,
}

/* Your skills by area. Skills with a known name show their logo automatically. */
export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    description: "Interfaces people see and use",
    icon: "frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "shadcn/ui"],
  },
  {
    group: "Backend",
    description: "APIs, microservices and business logic",
    icon: "backend",
    items: ["ASP.NET Core", "ASP.NET Core microservices", "ASP.NET MVC", "C#", "Node.js", "Nest.js", "Nest.js microservices", "REST APIs"],
  },
  {
    group: "Database",
    description: "Designing and querying data",
    icon: "database",
    items: ["SQL Server", "PostgreSQL", "MongoDB"],
  },
  {
    group: "Cloud & DevOps",
    description: "Where it runs and how it ships",
    icon: "cloud",
    items: ["Azure", "Docker", "Git", "GitHub", "GitLab"],
  },
]

/* The two ways you work full stack */
export const fullStacks: { name: string; items: string[] }[] = [
  {
    name: "Full stack with .NET",
    items: ["ASP.NET Core", "ASP.NET MVC", "C#", "React.js", "Tailwind CSS", "SQL Server", "Azure"],
  },
  {
    name: "Full stack with Node.js",
    items: ["Node.js", "Nest.js", "React.js", "Tailwind CSS", "PostgreSQL", "MongoDB", "Docker"],
  },
]

export const projects: Project[] = [
  {
    slug: "hisab",
    title: "Hisab",
    summary:
      "A multi-tenant invoicing and cash-flow app for small businesses in Nepal: invoices with 13% VAT, payments, expenses and a live dashboard of who owes what.",
    year: "2026",
    role: "Full-stack developer",
    stack: ["Nest.js", "React.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Docker"],
    caseStudy: {
      problem:
        "Small businesses in Nepal need to issue invoices with 13% VAT, take full or partial payments by bank transfer, eSewa, Khalti or Fonepay, track expenses, and see at a glance who owes them money and how late it is. Hisab gives each business its own workspace for all of this.",
      approach: [
        "Built a Nest.js API with TypeORM and PostgreSQL where every table is scoped to a workspace, with owner, admin, member and viewer roles checked against the database on every request, and JWT sign-in with rotating refresh tokens in httpOnly cookies.",
        "Handled money and concurrency carefully: amounts stored as numeric(14,2) and calculated in integer paisa with identical rounding on the server and in the editor, gap-free invoice numbers per workspace, row locks for payments, and optimistic concurrency so a stale draft save is rejected.",
        "Built the React 19 and TypeScript frontend with Tailwind CSS, shadcn/ui, TanStack Query and Recharts: an invoice editor with live VAT totals, a dashboard with money in and out, receivables aging and best customers, light and dark themes, phone-friendly layouts and Nepali number formatting.",
        "Covered the API with Vitest unit and end-to-end tests against PostgreSQL, documented it with Swagger, and packaged the database, API and website to start together with Docker Compose.",
      ],
      outcome:
        "A complete, working product with demo businesses and all four roles. The end-to-end tests prove that one workspace can never read another's invoices, that concurrent invoices are numbered without gaps, and that a removed team member is locked out immediately.",
    },
    links: {
      live: "https://bizzdashboard-frontend.onrender.com",
      sources: [
        { label: "Frontend", url: "https://github.com/merosansar/bizzDashboard_frontend" },
        { label: "Backend", url: "https://github.com/merosansar/bizzDashboard_backend" },
      ],
    },
  },
  {
    slug: "guff",
    title: "Guff",
    summary:
      "A real-time team chat app with channels, direct messages, mentions, reactions, file sharing and search. Messages, typing and who's online reach everyone instantly.",
    year: "2026",
    role: "Full-stack developer",
    stack: ["Node.js", "React.js", "TypeScript", "MongoDB", "Socket.IO", "Tailwind CSS", "shadcn/ui", "Docker"],
    caseStudy: {
      problem:
        "A team chat has to feel instant and still be correct: no message sent twice after a dropped connection, no unread badges that disagree between tabs, and no private conversation visible to outsiders. Guff is a complete chat app built to get those details right.",
      approach: [
        "Built the API with Node.js, TypeScript, Express 5 and MongoDB, and a Socket.IO layer that pushes messages, edits, reactions, typing, read receipts and presence live, using per-user and per-channel rooms so people only receive what they are allowed to see.",
        "Made delivery reliable: every message carries a client ID with a unique index, so a resend after a dropped connection never creates a duplicate. Messages written offline wait in an outbox and go out on reconnect, and each open conversation fetches what it missed with a cursor.",
        "Covered security and files: rotating refresh tokens stored as hashes in httpOnly cookies, socket tokens checked at the handshake and renewed while connected, zod validation on every request and socket event, uploads in GridFS behind expiring signed links, and private channels that return 404 to outsiders.",
        "Built the React 19 and TypeScript frontend with Tailwind CSS, shadcn/ui and TanStack Query: unread counts with a New line, replies, mentions with autocomplete, inline image previews, Ctrl+K search, light and dark themes and a phone layout. Packaged it with Docker Compose and a Render blueprint.",
      ],
      outcome:
        "A complete, working chat app with demo teammates who reply automatically, backed by 74 automated tests against MongoDB. They include a test that stops the server mid-conversation to prove nothing is duplicated, and one that runs two API servers sharing live events.",
    },
    links: {
      live: "https://guff-frontend.onrender.com",
      sources: [
        { label: "Frontend", url: "https://github.com/merosansar/guff_frontend" },
        { label: "Backend", url: "https://github.com/merosansar/guff_backend" },
      ],
    },
  },
]

/* Newest first. Add your job title, years and a few lines about what you did
   at each company — anything you leave out is simply not shown. */
export const experience: Job[] = [
  {
    org: "Smart Solutions Technology Pvt. Ltd.",
    url: "https://sst.asia/",
    role: "Full Stack Developer (ASP.NET & Node.js)",
    current: true,
    period: "Oct 2024 – Present",
    place: "Kamaladi, Kathmandu",
    points: ["Working on microservices projects built with ASP.NET Core and Nest.js."],
  },
  {
    org: "Creation Soft Nepal Pvt. Ltd.",
    url: "https://rocketreach.co/creation-soft-nepal-pvt-ltd-profile_b41c2fd6ff6922ba",
    role: "Dotnet Developer",
    period: "Jul 2023 – Oct 2024",
    place: "Kathmandu, Nepal",
    points: [
      "Worked as a .NET developer on the remittance project, responsible for designing, developing and maintaining a secure and efficient financial transaction system.",
      "Developed and optimized remittance processing modules using ASP.NET MVC (.NET Framework 4.8) and SQL Server 2016.",
      "Designed and implemented stored procedures, functions and database schemas to handle large-scale financial transactions.",
      "Created detailed financial and transaction reports, improving operational transparency and compliance.",
      "Integrated third-party APIs for payment processing, ensuring seamless fund transfers.",
      "Implemented role-based authentication and authorization for secure access control.",
      "Enhanced system performance by optimizing database queries and improving application efficiency.",
      "Collaborated with cross-functional teams to meet regulatory and business requirements.",
    ],
  },
  {
    org: "Gapsco Pvt. Ltd.",
    role: "Software Engineer",
    period: "Nov 2016 – Nov 2018",
    place: "Gairidhara, Kathmandu",
    points: ["Worked with ASP.NET MVC and Entity Framework."],
  },
  {
    org: "IMS Software Pvt. Ltd.",
    formerly: "IMS Himalayan Sangrila Pvt. Ltd.",
    url: "https://imssoftware.com.np/",
    role: "Software Developer",
    period: "Apr 2016 – Nov 2016",
    place: "Kathmandu, Nepal",
    points: ["Worked with ASP.NET and MongoDB."],
  },
  {
    org: "Tulips Technologies",
    role: "Intern",
    period: "Feb 2015 – May 2015",
    points: [],
  },
]

/* Your degrees — add the years in "period" if you'd like them shown */
export const education: Education[] = [
  {
    degree: "BSc CSIT",
    fullDegree: "Bachelor of Science in Computer Science and Information Technology",
    school: "Tribhuvan University (TU)",
    period: "",
    url: "https://tu.edu.np/",
  },
]

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]
