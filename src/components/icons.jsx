import {
  FaAws, FaSalesforce, FaNodeJs, FaPython, FaJava, FaReact, FaAngular, FaDocker,
} from 'react-icons/fa6'
import {
  SiMongodb, SiPostgresql, SiGraphql, SiTypescript, SiNextdotjs, SiFirebase,
  SiPostman, SiGithubactions, SiApollographql,
} from 'react-icons/si'
import {
  LuServer, LuCloud, LuDatabase, LuGauge, LuCode, LuLayers, LuSparkles, LuWrench,
  LuCpu, LuShieldCheck, LuWorkflow, LuFlaskConical, LuMonitor,
} from 'react-icons/lu'

const ui = {
  server: LuServer,
  cloud: LuCloud,
  database: LuDatabase,
  gauge: LuGauge,
  code: LuCode,
  layers: LuLayers,
  sparkles: LuSparkles,
  wrench: LuWrench,
  cpu: LuCpu,
  shield: LuShieldCheck,
  workflow: LuWorkflow,
  flask: LuFlaskConical,
  monitor: LuMonitor,
  salesforce: FaSalesforce,
}

const brands = {
  'Node.js': FaNodeJs,
  AWS: FaAws,
  Salesforce: FaSalesforce,
  TypeScript: SiTypescript,
  GraphQL: SiGraphql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  React: FaReact,
  Docker: FaDocker,
  Python: FaPython,
  'Next.js': SiNextdotjs,
  Apollo: SiApollographql,
  'GitHub Actions': SiGithubactions,
  Firebase: SiFirebase,
  Java: FaJava,
  Angular: FaAngular,
  Postman: SiPostman,
}

export function Icon({ name, ...props }) {
  const C = ui[name] || LuCode
  return <C aria-hidden="true" {...props} />
}

export function BrandIcon({ name, ...props }) {
  const C = brands[name] || LuCode
  return <C aria-hidden="true" {...props} />
}
