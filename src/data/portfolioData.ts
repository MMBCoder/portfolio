import type {
  TimelineMilestone,
  KPIMetric,
  Skill,
  Achievement,
  Certification,
  Publication,
  Experience,
  CaseStudy,
  Technology,
  Testimonial,
} from "@/types";

export interface AIProject {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  architecture: string;
  impact: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  color: string;
  icon: string;
}

export const aiProjects: AIProject[] = [
  {
    id: "1",
    title: "RAG Campaign Copilot",
    category: "Agentic AI",
    problem: "Campaign Operations teams spent 3–5 days manually writing SAS code per campaign. 100+ campaigns annually created severe delivery bottlenecks.",
    solution: "Built a RAG-based AI copilot that ingests campaign briefs in natural language and generates production-ready SAS code. Integrated human-in-the-loop validation for compliance.",
    architecture: "LangChain + LangGraph orchestration → Pinecone vector store → Claude/GPT LLM → SAS code generator → Human review gate → Jira integration",
    impact: "Reduced campaign code generation from 3–5 days to under 20 minutes. Team now executes 3× more campaigns with the same headcount.",
    metrics: [{ label: "Time Saved", value: "96%" }, { label: "Campaign Velocity", value: "3×" }, { label: "Error Reduction", value: "70%" }, { label: "Annual Savings", value: "$2M+" }],
    technologies: ["LangChain", "LangGraph", "RAG", "GPT-4", "Pinecone", "Python", "SAS"],
    color: "#2563EB",
    icon: "🤖",
  },
  {
    id: "2",
    title: "Ask Insight — NLP Analytics",
    category: "Conversational AI",
    problem: "200+ business stakeholders depended on data teams for every ad-hoc analytics query. Decision latency averaged 48–72 hours per insight request.",
    solution: "Built 'Ask Insight' — an NLP-powered conversational layer over Power BI. Stakeholders type plain-English questions and receive instant AI-generated analytics with narrative explanations.",
    architecture: "Natural language input → Intent parser → Semantic search → Power BI API → AI narrative generator → Anomaly detection layer",
    impact: "Empowered 200+ stakeholders with self-service analytics. Insight turnaround dropped from 48–72 hours to under 2 minutes.",
    metrics: [{ label: "Stakeholders", value: "200+" }, { label: "Turnaround", value: "2 min" }, { label: "Query Load Offloaded", value: "65%" }, { label: "Satisfaction", value: "94%" }],
    technologies: ["NLP", "Power BI", "Python", "Azure OpenAI", "Semantic Kernel"],
    color: "#7C3AED",
    icon: "💬",
  },
  {
    id: "3",
    title: "Agentic Dev Pipeline",
    category: "AI Dev Automation",
    problem: "Engineering teams writing Python for customer analytics projects spent 40% of sprint capacity on repetitive scaffolding and boilerplate work.",
    solution: "Built an Agentic AI pipeline that reads Jira stories and acceptance criteria, then auto-generates context-aware Python scaffolding via GitHub Copilot agents and LangGraph.",
    architecture: "Jira MCP connector → Acceptance criteria parser → LangGraph orchestrator → GitHub Copilot agent → Code scaffold generator → PR automation",
    impact: "Reclaimed 40% of sprint capacity. Delivery velocity increased 3× across three major email campaign projects.",
    metrics: [{ label: "Effort Saved", value: "80%" }, { label: "Velocity Increase", value: "3×" }, { label: "Projects", value: "3" }, { label: "Capacity Reclaimed", value: "40%" }],
    technologies: ["LangGraph", "GitHub Copilot", "Jira MCP", "Python", "Agentic AI"],
    color: "#06B6D4",
    icon: "⚡",
  },
  {
    id: "4",
    title: "Customer Identity Resolution",
    category: "Data Engineering",
    problem: "Fragmented customer records across CRM, campaign, and analytics systems caused misattribution, double-counting, and downstream model degradation.",
    solution: "Built an enterprise Identity Resolution (IDR) automation platform using probabilistic matching, graph-based entity resolution, and governed merge-survive rules.",
    architecture: "Multi-source ingestion → Deterministic + Probabilistic matching → Entity graph → Merge-survive engine → Golden record → Downstream sync",
    impact: "Improved customer matching accuracy by 35%. Downstream analytics reliability improved significantly, enabling more precise segmentation and targeting.",
    metrics: [{ label: "Match Accuracy", value: "+35%" }, { label: "Duplicate Reduction", value: "60%" }, { label: "Records Processed", value: "50M+" }, { label: "Pipeline Latency", value: "-70%" }],
    technologies: ["PySpark", "Graph DB", "Python", "AWS EMR", "Hive", "SQL"],
    color: "#10B981",
    icon: "🔗",
  },
  {
    id: "5",
    title: "Prequal Abandoners ML Model",
    category: "Machine Learning",
    problem: "Credit card pre-qualification abandoners represented significant lost revenue. No ML-driven re-engagement strategy existed to predict high-intent returners.",
    solution: "Built end-to-end ML pipeline to identify and score prequal abandoners by propensity to convert. Model outputs fed directly into personalized email campaign targeting.",
    architecture: "Feature engineering (behavioral + demographic) → XGBoost model → SHAP explainability → Score API → Campaign audience builder → A/B test framework",
    impact: "Enabled targeted re-engagement campaigns with measurable lift. Contributed to incremental revenue through precision audience selection.",
    metrics: [{ label: "Model AUC", value: "0.84" }, { label: "Targeting Precision", value: "+45%" }, { label: "Campaign Lift", value: "28%" }, { label: "Audience Reduction", value: "60%" }],
    technologies: ["Python", "XGBoost", "SHAP", "PySpark", "AWS SageMaker", "SQL"],
    color: "#F59E0B",
    icon: "📊",
  },
  {
    id: "6",
    title: "AI Governance Framework",
    category: "AI Strategy",
    problem: "Rapid AI adoption across the enterprise outpaced governance. No standardized framework existed for responsible, controlled AI deployment in regulated banking.",
    solution: "Designed and implemented an enterprise AI governance framework covering human-in-the-loop controls, bias monitoring, model documentation, and compliance review gates.",
    architecture: "AI use-case registry → Risk tiering → HITL design patterns → Bias monitoring → Model cards → Compliance review → Production deployment gates",
    impact: "Enabled controlled AI adoption across 10+ use cases in a regulated banking environment. Framework adopted as enterprise standard for AI deployment.",
    metrics: [{ label: "AI Use Cases Governed", value: "10+" }, { label: "Compliance Rate", value: "100%" }, { label: "Risk Incidents", value: "0" }, { label: "Adoption Rate", value: "Enterprise" }],
    technologies: ["AI Governance", "HITL", "Bias Detection", "Model Cards", "LangSmith", "Python"],
    color: "#EC4899",
    icon: "🛡️",
  },
];

export const personalInfo = {
  name: "Mirza Minhaz Baig",
  title: "AVP – Customer Data Platform | Agentic AI | Enterprise Analytics",
  tagline: "AI & Data Transformation Leader",
  location: "Hyderabad, India",
  email: "mirza.22sept@gmail.com",
  phone: "+91-9538999277",
  linkedin: "https://linkedin.com/in/mirza-minhaz-baig-aiml",
  github: "https://github.com/MMBCoder",
  summary:
    "AI and analytics leader with 12+ years of experience delivering enterprise-scale analytics, AI transformation, and data platform solutions within financial services environments.",
  rotatingRoles: [
    "Agentic AI",
    "Generative AI",
    "Data Science",
    "ML Engineering",
    "AI Strategy",
    "Customer Analytics",
    "Data Platforms",
    "LLM Orchestration",
  ],
};

export const heroMetrics = [
  { label: "Years Experience", value: 12, suffix: "+", color: "#00E5FF" },
  { label: "AI & Analytics Projects", value: 50, suffix: "+", color: "#7C3AED" },
  { label: "Team Members Led", value: 20, suffix: "+", color: "#60A5FA" },
  { label: "Executive Awards", value: 3, suffix: "+", color: "#22C55E" },
  { label: "Enterprise Platforms", value: 5, suffix: "+", color: "#F59E0B" },
];

export const timeline: TimelineMilestone[] = [
  {
    id: "6",
    year: "2019–Present",
    title: "AVP – Customer Data Platform & AI Transformation",
    organization: "Synchrony Financial",
    description:
      "Leading enterprise AI transformation focused on Agentic AI, LangChain orchestration, RAG architectures, and human-in-the-loop workflows across regulated financial services.",
    type: "work",
    technologies: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Python",
      "PySpark",
      "AWS",
      "Power BI",
    ],
  },
  {
    id: "5",
    year: "2019–2021",
    title: "Master of Science – ML & AI",
    organization: "Liverpool John Moores University",
    description:
      "Pursued advanced ML/AI education while simultaneously leading enterprise AI initiatives. Bridged theoretical AI research with practical enterprise implementation.",
    type: "education",
  },
  {
    id: "4",
    year: "2018–2019",
    title: "Analytics Manager",
    organization: "Citigroup",
    description:
      "Managed enterprise-scale analytics and data engineering across multiple concurrent projects. Built scalable pipelines using PySpark, Hive, Impala, and Teradata.",
    type: "work",
    technologies: ["PySpark", "Hive", "Impala", "Teradata", "Python", "SQL"],
  },
  {
    id: "3",
    year: "2014–2018",
    title: "Assistant Manager – Analytics & Automation",
    organization: "Genpact",
    description:
      "Led a team of 5 analysts building analytics automation and campaign operations solutions. Established reusable frameworks using SAS, SQL, Python, and CRM platforms.",
    type: "work",
    technologies: ["Python", "SAS", "SQL", "CRM", "Power Automate"],
  },
  {
    id: "2",
    year: "2012–2014",
    title: "Master of Technology (M.Tech.)",
    organization: "Indian Institute of Technology (IIT) Delhi",
    description:
      "Graduate research at India's premier engineering institution. Deepened expertise in computational methods, research methodology, and advanced technical problem-solving.",
    type: "education",
  },
  {
    id: "1",
    year: "2008–2012",
    title: "Bachelor of Technology (B.Tech.)",
    organization: "Aligarh Muslim University",
    description:
      "Foundational engineering education building quantitative and analytical thinking. Developed strong problem-solving fundamentals that would underpin an AI-first career.",
    type: "education",
  },
];

export const kpiMetrics: KPIMetric[] = [
  {
    id: "1",
    label: "Revenue Impact",
    value: 50,
    suffix: "M+",
    prefix: "$",
    description: "Influenced through AI-driven campaign optimization",
    trend: 23,
    color: "#00E5FF",
  },
  {
    id: "2",
    label: "Stakeholders Supported",
    value: 200,
    suffix: "+",
    description: "Business leaders enabled via AI-assisted analytics",
    trend: 45,
    color: "#7C3AED",
  },
  {
    id: "3",
    label: "AI Solutions Built",
    value: 15,
    suffix: "+",
    description: "Production-grade AI workflows deployed",
    trend: 60,
    color: "#60A5FA",
  },
  {
    id: "4",
    label: "Campaigns Optimized",
    value: 100,
    suffix: "+",
    description: "Marketing campaigns accelerated with AI",
    trend: 38,
    color: "#22C55E",
  },
  {
    id: "5",
    label: "Time Savings",
    value: 80,
    suffix: "%",
    description: "Reduction in manual analytics effort via automation",
    trend: 80,
    color: "#F59E0B",
  },
  {
    id: "6",
    label: "Teams Led",
    value: 5,
    suffix: "+",
    description: "Cross-functional analytics and AI teams managed",
    trend: 20,
    color: "#EC4899",
  },
];

export const skills: Skill[] = [
  { id: "1", name: "Agentic AI", category: "AI Platforms", level: 95, color: "#00E5FF" },
  { id: "2", name: "LangChain", category: "AI Platforms", level: 90, color: "#00E5FF" },
  { id: "3", name: "LangGraph", category: "AI Platforms", level: 85, color: "#00E5FF" },
  { id: "4", name: "RAG Architectures", category: "AI Platforms", level: 90, color: "#7C3AED" },
  { id: "5", name: "Prompt Engineering", category: "AI Platforms", level: 92, color: "#7C3AED" },
  { id: "6", name: "LLMs", category: "Generative AI", level: 88, color: "#60A5FA" },
  { id: "7", name: "Generative AI", category: "Generative AI", level: 88, color: "#60A5FA" },
  { id: "8", name: "NLP", category: "Generative AI", level: 85, color: "#60A5FA" },
  { id: "9", name: "Python", category: "Engineering", level: 95, color: "#22C55E" },
  { id: "10", name: "PySpark", category: "Engineering", level: 90, color: "#22C55E" },
  { id: "11", name: "SQL", category: "Engineering", level: 95, color: "#22C55E" },
  { id: "12", name: "AWS", category: "Cloud", level: 82, color: "#F59E0B" },
  { id: "13", name: "Machine Learning", category: "Data Science", level: 88, color: "#EC4899" },
  { id: "14", name: "Deep Learning", category: "Data Science", level: 82, color: "#EC4899" },
  { id: "15", name: "Power BI", category: "Analytics", level: 88, color: "#F97316" },
  { id: "16", name: "AI Strategy", category: "Leadership", level: 92, color: "#A855F7" },
  { id: "17", name: "MLOps", category: "Engineering", level: 80, color: "#22C55E" },
  { id: "18", name: "Hive", category: "Engineering", level: 85, color: "#22C55E" },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "CEO Award – Triple Winner",
    organization: "Synchrony Financial",
    year: "2021, 2022, 2023",
    description:
      "Recognized three consecutive times with Synchrony's highest employee honor for pioneering AI transformation initiatives and delivering measurable enterprise impact.",
    icon: "🏆",
    color: "#F59E0B",
  },
  {
    id: "2",
    title: "LEAP Leadership Program",
    organization: "Synchrony Financial",
    year: "2024",
    description:
      "Selected as a participant in Synchrony's LEAP leadership development program – reserved for high-potential leaders identified for executive advancement.",
    icon: "🚀",
    color: "#00E5FF",
  },
  {
    id: "3",
    title: "AI Innovation Champion",
    organization: "Synchrony Financial",
    year: "2022",
    description:
      "Recognized for pioneering LangChain-based RAG architecture that cut campaign code generation from days to 20 minutes – a flagship enterprise AI capability.",
    icon: "⚡",
    color: "#7C3AED",
  },
  {
    id: "4",
    title: "Enterprise AI Excellence",
    organization: "Synchrony Financial",
    year: "2023",
    description:
      "Honored for building human-in-the-loop AI workflows and AI governance practices that enabled controlled, compliant AI adoption across regulated banking operations.",
    icon: "🎯",
    color: "#22C55E",
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    title: "Post Graduate Diploma – ML & AI",
    issuer: "IIIT Bangalore",
    year: "2021",
    icon: "🎓",
    color: "#7C3AED",
    credentialId: "IIITB-PGDMLAI-2021",
  },
  {
    id: "2",
    title: "Certified SAFe® 5 Scrum Master",
    issuer: "Scaled Agile, Inc.",
    year: "2022",
    icon: "🏅",
    color: "#00E5FF",
    credentialId: "SAFE5-SSM-CERTIFIED",
  },
  {
    id: "3",
    title: "M.S. – Machine Learning & AI",
    issuer: "Liverpool John Moores University",
    year: "2021",
    icon: "🎓",
    color: "#60A5FA",
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "☁️",
    color: "#F59E0B",
  },
  {
    id: "5",
    title: "LangChain for LLM Applications",
    issuer: "DeepLearning.AI",
    year: "2024",
    icon: "🔗",
    color: "#22C55E",
  },
  {
    id: "6",
    title: "Generative AI with LLMs",
    issuer: "Coursera / DeepLearning.AI",
    year: "2023",
    icon: "🤖",
    color: "#EC4899",
  },
];

export const publications: Publication[] = [
  {
    id: "0",
    title: "Engineering Droplet Navigation Through Tertiary-Junction Microchannels",
    publisher: "Microfluidics and Nanofluidics – Springer",
    year: "2016",
    description:
      "First-authored peer-reviewed research published in Springer's Microfluidics and Nanofluidics journal. Investigated passive droplet sorting mechanisms at tertiary microchannel junctions, establishing deterministic navigation rules through geometric and flow-rate control. Cited by international microfluidics research groups.",
    tags: ["Microfluidics", "Lab-on-a-Chip", "Droplet Navigation", "Peer-Reviewed", "Springer"],
    url: "https://link.springer.com/article/10.1007/s10404-016-1828-9",
  },
  {
    id: "1",
    title: "Agentic AI Workflows in Regulated Financial Services",
    publisher: "AI & Finance Quarterly",
    year: "2024",
    description:
      "Explores human-in-the-loop design patterns for deploying Agentic AI systems in banking, with case studies from campaign operations and customer intelligence.",
    tags: ["Agentic AI", "FinTech", "Human-in-the-Loop", "AI Governance"],
  },
  {
    id: "2",
    title: "RAG Architectures for Enterprise Campaign Operations",
    publisher: "Data Science Central",
    year: "2023",
    description:
      "Practical guide to implementing Retrieval-Augmented Generation for SAS code generation, reducing campaign development time from days to minutes.",
    tags: ["RAG", "LangChain", "SAS", "Campaign Analytics"],
  },
  {
    id: "3",
    title: "NLP-Powered Conversational Analytics with Power BI",
    publisher: "Towards Data Science",
    year: "2023",
    description:
      "Architecture and implementation of 'Ask Insight' – an NLP-driven Q&A layer enabling non-technical stakeholders to query enterprise analytics via natural language.",
    tags: ["NLP", "Power BI", "Conversational AI", "Self-Service Analytics"],
  },
  {
    id: "4",
    title: "Identity Resolution at Scale: An Enterprise Perspective",
    publisher: "Analytics Vidhya",
    year: "2022",
    description:
      "Deep dive into enterprise Identity Resolution (IDR) automation, covering probabilistic matching, data governance, and downstream analytics reliability improvements.",
    tags: ["Identity Resolution", "Data Engineering", "Customer Intelligence"],
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Synchrony Financial",
    role: "AVP – Customer Data Platform & AI Transformation",
    duration: "Dec 2019 – Present",
    startYear: "2019",
    endYear: "Present",
    location: "Hyderabad, India",
    description:
      "Leading enterprise AI transformation and analytics initiatives focused on Agentic AI adoption, AI-assisted workflows, customer intelligence, and scalable analytics enablement within regulated financial services environments.",
    responsibilities: [
      "Designed and implemented Agentic AI prototypes using LangChain, RAG architectures, and human-in-the-loop review workflows",
      "Built an AI-powered RAG application generating campaign-specific SAS code in under 20 minutes",
      "Developed AI-assisted development workflows integrating GitHub Copilot, Jira, and MCP connectivity",
      "Built NLP-powered 'Ask Insight' conversational analytics integrated with Power BI",
      "Led enterprise Identity Resolution (IDR) automation initiatives improving customer matching accuracy",
      "Managed cross-functional teams across analytics, AI, and data engineering",
      "Implemented and scaled Bluecore CDP platform for customer data unification and real-time audience activation",
    ],
    technologies: ["LangChain", "LangGraph", "RAG", "Python", "PySpark", "AWS", "Power BI", "Jira", "MCP", "Bluecore CDP"],
    logo: "SYF",
    color: "#00E5FF",
  },
  {
    id: "1b",
    company: "Bluecore CDP",
    role: "Customer Data Platform – Implementation & Analytics Lead",
    duration: "2020 – 2022",
    startYear: "2020",
    endYear: "2022",
    location: "Hyderabad, India",
    description:
      "Led end-to-end implementation of Bluecore's Customer Data Platform (CDP) within a regulated financial services environment. Drove customer identity unification, real-time segmentation, and AI-powered audience activation across marketing channels.",
    responsibilities: [
      "Architected customer data ingestion pipelines feeding Bluecore CDP from CRM, transaction, and behavioral sources",
      "Built identity resolution logic to create unified customer profiles across fragmented data sources",
      "Configured AI-powered predictive audiences for email, SMS, and retargeting campaigns",
      "Enabled real-time trigger-based campaigns reducing time-to-audience from days to minutes",
      "Integrated Bluecore CDP outputs with downstream campaign platforms and Power BI analytics",
      "Trained and upskilled business and marketing operations teams on CDP self-service capabilities",
    ],
    technologies: ["Bluecore CDP", "Python", "SQL", "REST APIs", "ETL Pipelines", "Segment", "Identity Resolution", "Power BI"],
    logo: "BLC",
    color: "#7C3AED",
  },
  {
    id: "2",
    company: "Citigroup",
    role: "Analytics Manager",
    duration: "Jun 2018 – Dec 2019",
    startYear: "2018",
    endYear: "2019",
    location: "India",
    description:
      "Managed analytics teams supporting enterprise-scale analytics and data engineering initiatives across multiple concurrent projects.",
    responsibilities: [
      "Led delivery coordination and stakeholder communication across multiple analytics projects",
      "Built scalable analytics and data processing pipelines using PySpark, Hive, and Teradata",
      "Developed reusable analytics frameworks supporting enterprise reporting and customer intelligence",
      "Collaborated with business and engineering teams to operationalize analytics outputs",
    ],
    technologies: ["PySpark", "Hive", "Impala", "HDFS", "Python", "SQL", "SAS", "Teradata"],
    logo: "CITI",
    color: "#60A5FA",
  },
  {
    id: "3",
    company: "Genpact",
    role: "Assistant Manager – Analytics & Automation",
    duration: "Sep 2014 – Jun 2018",
    startYear: "2014",
    endYear: "2018",
    location: "India",
    description:
      "Managed a team of 5 analysts supporting analytics automation and campaign operations initiatives.",
    responsibilities: [
      "Built analytics and workflow automation solutions using SAS, SQL, Python, and campaign management platforms",
      "Supported operationalization of analytics outputs into reporting and business workflow ecosystems",
      "Partnered with stakeholders to improve analytics delivery efficiency",
      "Implemented campaign execution automation reducing manual processing by 60%",
    ],
    technologies: ["Python", "PySpark", "SAS", "SQL", "AWS", "Unix", "CRM", "Power Automate"],
    logo: "GEN",
    color: "#7C3AED",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "AI-Powered Campaign Code Generation",
    industry: "Financial Services – Marketing Technology",
    challenge:
      "Campaign Operations teams spent 3–5 days manually writing SAS code for each marketing campaign. With 100+ campaigns annually, this bottleneck constrained growth and increased error risk.",
    approach:
      "Designed a RAG-based architecture using LangChain that indexed campaign specifications, SAS code libraries, and business rules. Built a human-in-the-loop validation layer for compliance and accuracy review.",
    solution:
      "Deployed an AI co-pilot that accepts campaign briefs in natural language and generates production-ready SAS code. Integrated with existing Jira workflows for seamless adoption.",
    outcome:
      "Reduced campaign code generation from 3–5 days to under 20 minutes. Enabled the team to execute 3x more campaigns with the same headcount while maintaining quality standards.",
    metrics: [
      { label: "Time Reduction", value: "96%" },
      { label: "Campaigns Enabled", value: "3x" },
      { label: "Error Rate Reduction", value: "70%" },
      { label: "Annual Savings", value: "$2M+" },
    ],
    technologies: ["LangChain", "RAG", "Python", "SAS", "Jira", "LangGraph"],
    color: "#00E5FF",
  },
  {
    id: "2",
    title: "NLP Conversational Analytics Platform",
    industry: "Financial Services – Enterprise Analytics",
    challenge:
      "Business stakeholders lacked self-service access to analytics insights, creating dependency on data teams for every ad-hoc query. Decision latency averaged 48–72 hours per insight request.",
    approach:
      "Built 'Ask Insight' – an NLP-powered conversational analytics layer integrating with Power BI using natural language processing, semantic search, and AI-generated narrative insights.",
    solution:
      "Deployed a conversational interface where stakeholders type questions in plain English and receive instant analytics with AI-generated explanations, trend analysis, and anomaly detection.",
    outcome:
      "Empowered 200+ business stakeholders with self-service analytics. Reduced insight turnaround from 48–72 hours to under 2 minutes, enabling faster decision-making across the enterprise.",
    metrics: [
      { label: "Stakeholders Enabled", value: "200+" },
      { label: "Insight Turnaround", value: "2 min" },
      { label: "Query Volume Offloaded", value: "65%" },
      { label: "Satisfaction Score", value: "94%" },
    ],
    technologies: ["NLP", "Power BI", "Python", "Azure", "Conversational AI"],
    color: "#7C3AED",
  },
  {
    id: "3",
    title: "Agentic AI Development Pipeline",
    industry: "Financial Services – Software Engineering",
    challenge:
      "Engineering teams writing Python code for customer analytics projects (Prequal Abandoners, AOP, FOC Reminder) faced repetitive scaffolding work consuming 40% of sprint capacity.",
    approach:
      "Developed an Agentic AI pipeline integrating GitHub Copilot agents with Jira, MCP connectivity, and LangGraph orchestration to automate code generation from acceptance criteria.",
    solution:
      "Built a workflow where Jira stories and acceptance criteria are automatically consumed, analyzed, and transformed into context-aware Python code scaffolding, ready for review and refinement.",
    outcome:
      "Reduced sprint scaffolding effort by 80%. Engineers shifted focus to business logic and quality rather than boilerplate, accelerating delivery velocity across three major email campaign projects.",
    metrics: [
      { label: "Scaffolding Effort Saved", value: "80%" },
      { label: "Delivery Velocity", value: "+3x" },
      { label: "Projects Automated", value: "3" },
      { label: "Sprint Capacity Reclaimed", value: "40%" },
    ],
    technologies: ["LangGraph", "GitHub Copilot", "Jira", "MCP", "Python", "Agentic AI"],
    color: "#60A5FA",
  },
];

export const technologies: Technology[] = [
  { id: "1", name: "Python", category: "Language", icon: "🐍", color: "#3B82F6" },
  { id: "2", name: "LangChain", category: "AI Framework", icon: "🔗", color: "#22C55E" },
  { id: "3", name: "LangGraph", category: "AI Framework", icon: "🕸️", color: "#00E5FF" },
  { id: "4", name: "OpenAI", category: "AI Platform", icon: "🤖", color: "#7C3AED" },
  { id: "5", name: "AWS", category: "Cloud", icon: "☁️", color: "#F59E0B" },
  { id: "6", name: "PySpark", category: "Data Engineering", icon: "⚡", color: "#F97316" },
  { id: "7", name: "Power BI", category: "Analytics", icon: "📊", color: "#60A5FA" },
  { id: "8", name: "GitHub Copilot", category: "AI Dev Tools", icon: "🐙", color: "#A855F7" },
  { id: "9", name: "Hive", category: "Data Engineering", icon: "🐝", color: "#F59E0B" },
  { id: "10", name: "SQL", category: "Language", icon: "🗄️", color: "#EC4899" },
  { id: "11", name: "Jira", category: "Delivery", icon: "📋", color: "#2563EB" },
  { id: "12", name: "SAS", category: "Analytics", icon: "📈", color: "#DC2626" },
  { id: "13", name: "Docker", category: "DevOps", icon: "🐳", color: "#0EA5E9" },
  { id: "14", name: "Teradata", category: "Data Warehouse", icon: "🏗️", color: "#7C3AED" },
  { id: "15", name: "RAG", category: "AI Architecture", icon: "🔍", color: "#22C55E" },
  { id: "16", name: "Kubernetes", category: "DevOps", icon: "⚙️", color: "#3B82F6" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "VP of Marketing Technology",
    company: "Synchrony Financial",
    content:
      "Mirza's RAG-based campaign code generation platform transformed how our team works. What used to take days now takes minutes. His ability to translate complex AI concepts into practical business tools is exceptional.",
    avatar: "SM",
    rating: 5,
  },
  {
    id: "2",
    name: "David Chen",
    role: "Chief Data Officer",
    company: "Enterprise Financial Services",
    content:
      "Working with Mirza on our AI transformation was a game-changer. He built human-in-the-loop workflows that gave our compliance team confidence in AI adoption. A rare blend of technical depth and business acumen.",
    avatar: "DC",
    rating: 5,
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Senior Director, Analytics",
    company: "Synchrony Financial",
    content:
      "The 'Ask Insight' platform Mirza built democratized analytics access across our organization. Our business leaders now get answers in minutes instead of days. It fundamentally changed how we make decisions.",
    avatar: "PS",
    rating: 5,
  },
  {
    id: "4",
    name: "James Rodriguez",
    role: "Head of Campaign Operations",
    company: "Synchrony Financial",
    content:
      "Mirza's AI automation pipeline saved our team hundreds of hours per quarter. More importantly, it freed our engineers to focus on creative problem-solving rather than repetitive scaffolding work.",
    avatar: "JR",
    rating: 5,
  },
];
