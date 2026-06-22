export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work" | "achievement";
  technologies?: string[];
}

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  trend?: number;
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
  color: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  icon: string;
  color: string;
  credentialId?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  year: string;
  description: string;
  tags: string[];
  url?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startYear: string;
  endYear: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  logo: string;
  color: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  approach: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  color: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  linkedinUrl?: string;
}
