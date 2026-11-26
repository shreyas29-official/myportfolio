// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Shreyas M',
  firstName: 'Shreyas',
  initials: 'SM',
  title: 'Backend Software Engineer',
  location: 'Bangalore, India',
  current: 'Backend Developer @ Aquera',
  experienceLabel: '1+ year in industry',
  email: 'shreyasman333@gmail.com',
  phone: '+91 7760139825',
  linkedin: 'https://linkedin.com/in/shreyas-m',
  github: 'https://github.com/shreyas29',
  resume: '/Shreyas_M_Resume.pdf',
  // Replace public/profile.jpg with your own photo (portrait works best).
  photo: '/profile.jpg',
  status: 'Open to opportunities',

  // Rotates in the hero: "I build ___"
  rotating: [
    'scalable REST APIs',
    'serverless backends on AWS',
    'Salesforce-connected workflows',
    'reliable CI/CD pipelines',
  ],

  summary: [
    'Backend-focused Software Engineer with 1+ year of industry experience building scalable APIs, serverless backend services and production-ready features.',
    'I work hands-on with Node.js, REST APIs, AWS, caching and database systems, and I have experience with Salesforce: working with CRM data and bringing it into the backend services teams rely on.',
  ],

  now: "Building backend services for Aquera's internal CX/CSM Portal on AWS Lambda & API Gateway.",
}

export const stats = [
  { value: 1, suffix: '+', label: 'Year in industry' },
  { value: 3, suffix: '', label: 'Companies' },
  { value: 9, suffix: '+', label: 'AWS services used' },
  { value: 7, suffix: '', label: 'ERP modules built' },
]

// "What I work on" cards in the About section
export const focusAreas = [
  {
    icon: 'server',
    title: 'Backend & APIs',
    text: 'REST and GraphQL APIs on Node.js, designed for clarity, performance and safe evolution.',
  },
  {
    icon: 'cloud',
    title: 'AWS Serverless',
    text: 'Lambda, API Gateway, Step Functions and EventBridge, with CloudWatch for observability.',
  },
  {
    icon: 'salesforce',
    title: 'Salesforce',
    text: 'Experience with Salesforce CRM: its data model, SOQL, and integrating CRM data into backend services.',
  },
  {
    icon: 'gauge',
    title: 'Performance',
    text: 'Caching, query optimisation, indexing, load testing and multi-region delivery.',
  },
]

export const experience = [
  {
    company: 'Aquera',
    role: 'Backend Developer',
    period: 'May 2026 — Present',
    current: true,
    impact: 'Multi-region, serverless delivery',
    points: [
      "Developed backend functionality for Aquera's internal CX/CSM Portal using AWS Lambda and API Gateway.",
      'Implemented caching mechanisms to improve application performance and used AWS CloudWatch for logging, monitoring and debugging.',
      'Developed and maintained CI/CD pipelines to automate application deployments across different regions.',
      'Worked with AWS Route 53 and CDN services for cloud-based application delivery and multi-region deployments.',
    ],
    tags: ['AWS Lambda', 'API Gateway', 'CloudWatch', 'Route 53', 'CDN', 'Caching', 'CI/CD'],
  },
  {
    company: 'Yellow.ai',
    role: 'Software Engineer Intern',
    period: 'Feb 2026 — Mar 2026',
    impact: 'Replaced third-party APIs with a self-hosted service',
    points: [
      'Designed and implemented a DOCX-to-PDF conversion service using Gotenberg and Docxtemplater, replacing third-party APIs with a self-hosted solution.',
      'Reduced document conversion costs and improved system efficiency by eliminating external dependencies and optimising backend workflows.',
      'Improved PDF generation performance and reliability through load testing, concurrency handling and container-based scaling.',
      'Built and integrated scalable backend APIs for document generation, and resolved rendering issues using LibreOffice-based preprocessing.',
    ],
    tags: ['Node.js', 'Gotenberg', 'Docxtemplater', 'LibreOffice', 'Docker', 'Load testing'],
  },
  {
    company: 'Clanwilliam — British Orient',
    role: 'Software Engineer Trainee',
    period: 'Jul 2025 — Dec 2025',
    impact: 'Faster APIs through query & index tuning',
    points: [
      'Optimised database queries and indexing strategies, reducing API response times and improving backend performance.',
      'Contributed to CI/CD pipelines and automated deployment workflows, enabling faster and safer production releases.',
      'Debugged and resolved production issues, improving system stability and ensuring uninterrupted operation.',
    ],
    tags: ['SQL', 'Indexing', 'Query optimisation', 'CI/CD', 'Production support'],
  },
]

export const projects = [
  {
    name: 'DAXOR ERP',
    kind: 'Full-stack enterprise ERP',
    description:
      'An enterprise resource planning system covering purchasing, sales, inventory, accounting, HR, payroll and production workflows, built end-to-end.',
    stack: ['Next.js 15', 'TypeScript', 'GraphQL', 'Apollo', 'MongoDB', 'Tailwind', 'Playwright'],
    modules: ['Purchasing', 'Sales', 'Inventory', 'Accounting', 'HR', 'Payroll', 'Production'],
    flows: [
      { name: 'Procure-to-Pay', steps: ['Vendor', 'Purchase Order', 'Approval', 'Invoice', 'Payment'] },
      { name: 'Order-to-Cash', steps: ['Customer', 'Sales Order', 'Approval', 'Invoice', 'Receipt'] },
    ],
    highlights: [
      { icon: 'workflow', text: 'End-to-end procure-to-pay and order-to-cash workflows with approval gates for vendors, POs, sales orders and invoices.' },
      { icon: 'layers', text: 'Inventory & finance modules: stock transfers, ledgers, taxation, assets, budgets and financial statements.' },
      { icon: 'shield', text: 'Secure GraphQL API with Apollo Server, JWT auth, role-based permissions and audit logging.' },
      { icon: 'flask', text: 'Playwright end-to-end tests covering critical business flows.' },
    ],
  },
]

// Skill groups. `wide` spans two columns, `full` spans the whole row.
export const skills = [
  { icon: 'cloud', title: 'AWS Cloud', wide: true, flow: ['Route 53', 'CDN', 'API Gateway', 'Lambda', 'DynamoDB'], items: ['Lambda', 'API Gateway', 'CloudWatch', 'S3', 'DynamoDB', 'EventBridge', 'Cognito', 'Step Functions', 'Route 53', 'CDN'] },
  { icon: 'salesforce', title: 'Salesforce', accent: true, items: ['Salesforce CRM', 'SOQL', 'Objects & Data Model', 'CRM Data Integration'] },
  { icon: 'server', title: 'Backend', items: ['Node.js', 'REST APIs', 'GraphQL', 'API Design', 'Backend Architecture', 'Distributed Systems'] },
  { icon: 'code', title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { icon: 'database', title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Firebase', 'Query Optimisation'] },
  { icon: 'monitor', title: 'Frontend', items: ['React', 'Angular', 'Next.js', 'Micro Frontends', 'Tailwind'] },
  { icon: 'sparkles', title: 'AI Integration', items: ['LLM APIs (OpenAI / OpenRouter)', 'Applied AI Integration'] },
  { icon: 'wrench', title: 'Tools & DevOps', items: ['Git', 'Docker', 'GitHub Actions', 'Postman', 'CI/CD', 'Playwright'] },
  { icon: 'cpu', title: 'Systems & Concepts', full: true, items: ['Database Design', 'Caching', 'Performance Optimisation', 'Debugging', 'Concurrency', 'Data Structures & Algorithms', 'System Design', 'Serverless Architecture'] },
]

// Logos that scroll in the marquee (keys map to icons in components/icons.jsx)
export const marquee = [
  'Node.js', 'AWS', 'Salesforce', 'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL', 'React',
  'Docker', 'Python', 'Next.js', 'Apollo', 'GitHub Actions', 'Firebase', 'Java', 'Angular', 'Postman',
]

export const education = [
  {
    school: 'PES University',
    place: 'Bangalore',
    degree: 'Master of Computer Applications',
    short: 'MCA',
    period: '2023 — 2025',
  },
  {
    school: 'BMS College',
    place: 'Bangalore',
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    period: '2020 — 2023',
  },
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
