import { Company } from '../types';
import { durationEndDate } from '../utils';

export const experienceData: Company[] = [
  {
    company: "Proofpoint",
    logo: "experience/proofpoint.png",
    hook: "Multi-tenant access analytics on a Spark and Hudi lake, plus an investigation agent that has to stay grounded.",
    highlights: ["Agentic systems", "LLM evaluation", "Apache Spark", "Apache Hudi", "Amazon Athena", "Python", "SQL", "AWS"],
    roles: [
      {
        title: "SWE Intern, Cloud and ML",
        duration: "Jun 2026 - Aug 2026",
        content: [
          "Designed a multi-tenant effective-access analytics pipeline over a Spark and Hudi data lake, resolving transitive access across direct grants, nested group membership, and folder inheritance for 8M+ resources and 1M+ identities without modifying source data or duplicating ownership of access relationships.",
          "Built a 12-function bounded query API with tenant isolation at the query level, hard scan-cost caps, and a 28-question evaluation suite that reached 100% groundedness, isolation, and reproducibility, including SQL-injection attempts and cross-tenant adversarial probes.",
          "Architected an autonomous investigation agent using priority-frontier search with budget, novelty, and coverage stopping conditions, paired with a separate LLM verification layer that grades groundedness and reasoning consistency after the fact instead of trusting the agent's own confidence.",
          "Benchmarked a lakehouse-based access engine against an incumbent graph-database design, showing sub-second query latency (651 ms) at about 1/140th the cost ($1.80/day vs $258/day) for the same security analytics workload.",
          "Reduced query scan cost by 27x (60.46 MB to 2.27 MB) by replacing query-time permission resolution with a precomputed transitive closure, bringing a failing 2.5-second query inside a 2-second SLA.",
          "Designed a deterministic, fully explainable risk-scoring model as a weighted feature sum across role, exposure, path depth, and dormancy, avoiding ML complexity that the dataset could not support reliably.",
          "Placed 3rd in a firm-wide internal intern hackathon.",
        ],
        awards: "3rd Place, Internal Intern Hackathon (Firm-wide)",
        techStack: [
          "Agentic systems",
          "LLM evaluation",
          "Large Language Models (LLMs)",
          "Amazon Athena",
          "Apache Hudi",
          "Apache Spark",
          "Amazon EMR",
          "AWS Glue",
          "Amazon S3",
          "SQL",
          "Python",
          "Machine Learning",
          "Amazon Web Services (AWS)",
        ],
      },
    ],
  },
  {
    company: "Corporate Startup Lab",
    logo: "experience/csl.png",
    hook: "Solo 0-to-1 AI banking assistant for PNC: advisor for SMBs, CRM for RMs, humans on the credit call.",
    highlights: ["LangGraph", "Claude API", "Hugging Face Spaces", "FastAPI", "Tool calling", "Human-in-the-loop", "React", "PostgreSQL"],
    roles: [
      {
        title: "CSL Course Fellow, PNC Bank",
        duration: "Jan 2026 - Apr 2026",
        content: [
          "Built Brilliant Banker, a 0-to-1 AI banking assistant for PNC, as a solo Corporate Startup Lab fellow: SMB owners get an in-app financial advisor, and relationship managers get a CRM with AI briefs, warm leads, and one-tap credit decisions.",
          "Designed a LangGraph state-machine on the Claude API (intent classifier, tool router, reply composer, human escalation) so credit requests above a configurable threshold auto-escalate to a live RM queue instead of letting the model decide high-stakes credit on its own.",
          "Shipped a FastAPI backend with REST and Server-Sent Events, a React and Vite frontend with two role experiences, SQLite and PostgreSQL, Docker packaging, Hugging Face Spaces, and structured user testing with both personas.",
        ],
        techStack: [
          "LangGraph",
          "Claude API",
          "Tool calling",
          "Human-in-the-loop",
          "FastAPI",
          "React",
          "Vite",
          "Server-Sent Events",
          "SQLite",
          "PostgreSQL",
          "Docker",
          "Hugging Face Spaces",
          "Artificial Intelligence (AI)",
        ],
      },
    ],
  },
  {
    company: "Morgan Stanley",
    logo: "experience/Ms.jpg",
    hook: "Factor-based stress testing at fund scale, and a PyTorch autoencoder that flags bad risk numbers.",
    highlights: ["PyTorch", "TensorFlow", "Keras", "pandas", "NumPy", "Java", "Kafka", "Kubernetes"],
    roles: [
      {
        title: "Software Engineer II",
        duration: "Sep 2024 - Aug 2025",
        content: [
          "Designed and built a distributed, factor-based portfolio stress-testing system covering 3,500+ funds, simulating 100K+ scenarios over million-position datasets with a focus on scalability, correctness, and failure handling under load.",
          "Used Barra factor models and historical market events, integrating Monte Carlo simulations, tail-risk modeling, and loss-probability functions to disentangle risks and improve worst-loss prediction for quantitative and small-cap strategies.",
          "Developed high-performance Java services (Spring Boot, DDD, multithreading) with CI/CD pipelines for large-scale historical backtesting and reproducible risk simulations.",
          "Built a data-quality engine using a PyTorch autoencoder to detect anomalous risk outputs, automatically triggering recalculation pipelines and improving accuracy, compliance, and trust in reported figures.",
          "Created real-time risk insight dashboards (React, Power BI, DAX) that replaced manual Excel workflows and enabled permission-controlled access to scenario-based portfolio risk insights for Prime Brokerage and Institutional Equities.",
          "Improved margin requirement accuracy (GAP), contributing to a ~20% impact on revenue strategy, by tightening model assumptions and validation logic.",
          "Recognized with Best Innovative Project (among 2000+ department employees) and Team Engagement Champion awards.",
        ],
        awards: "Best Innovative Project Award, Team Engagement Champion 2024 Quarterly Awards",
        techStack: ["PyTorch", "Keras", "TensorFlow", "pandas", "NumPy", "Java", "Springboot", "Python", "Angular", "React", "PowerBI", "Kafka", "Redis", "Kubernetes", "Podman", "Terraform", "Delphix", "Loki", "Prometheus", "Grafana", "Tempo", "Openshift"],
      },
      {
        title: "Technology Associate",
        duration: "Nov 2023 - Sep 2024",
        content: [
          "Implemented a greedy algorithm for exposure risk calculations across 7000+ accounts at a decomposed level daily, reducing computation time from over 4 hours to 30 minutes.",
          "Deployed a liquidity calculator to OpenShift using Kubernetes and Docker, and automated infrastructure with Terraform, eliminating environment drift and reducing QA/test setup time by 40+ hours per cycle.",
          "Built internal tooling for automated test generation (Python, LLM-assisted workflows) with PyTest and JUnit, improving coverage and reducing regression risk.",
          "Served as Scrum Master, driving execution clarity while building observability dashboards (Python Dash, Plotly, Rally) to monitor system health and delivery velocity.",
          "Awarded IST Annual Circle of Excellence as the first technology analyst in the 2023 cohort.",
        ],
        awards: "IST Circle of Excellence Award",
        techStack: ["Python", "Java", "Spring Boot", "Azure Spring Apps", "Linux", "Terraform", "OpenShift", "Docker", "Git", "JUnit", "PyTest", "pandas", "NumPy", "Large Language Models (LLMs)", "React", "Power BI", "Jira", "Rally"]
      },
      {
        title: "Technology Analyst",
        duration: "Jul 2023 - Oct 2023",
        content: [
          "Graduated from Morgan Stanley's Technology Analyst Program, specializing in software engineering, financial technology, and internal architecture.",
          "Led my team to first place in the firm's Tech Principles Jeopardy Quiz.",
        ],
        awards: "First in Jeopardy Quiz on Tech Principles",
        techStack: ["React", "Java", "Python", "Azure Spring Functions", "Jira", "Rally", "Springboot", "Linux"],
      },
      {
        title: "Spring Technology Analyst",
        duration: "Jan 2023 - Jul 2023",
        content: [
          "Replaced a 40GB Hazelcast (v3) cache with Redis in cluster mode for the Matrix platform, improving API performance and supporting high-frequency client calls.",
          "Benchmarked Hazelcast and Redis with JMeter and JMH, reducing API response times from 3 minutes to 1 second.",
          "Built a Grafana dashboard with Prometheus and Redis Exporter to monitor cluster health, and integrated Alertmanager for proactive issue resolution.",
        ],
        awards: "Technology Talent Showcase Runner Up",
        techStack: ["Java", "Springboot", "Redis", "Hazelcast", "JMeter", "Grafana", "Prometheus", "Java Microbenchmark Harness", "OpenAPI"],
      },
      {
        title: "Summer Technology Analyst",
        duration: "May 2022 - Jul 2022",
        content: [
          "Built a real-time risk measurement system (Spring Boot + Kafka) to calculate portfolio metrics (Beta, VaR, Exposure, Greeks, Deltas) across 4,000+ accounts in London, New York, and Hong Kong.",
          "Re-engineered a legacy platform into a full-stack solution (Spring Boot, Angular, Kafka) with automated messaging pipelines, enabling risk managers to track margins and processing stages with fewer manual checks.",
          "Secured a pre-placement offer from a pool of 3,500+ applicants based on internship performance and impact.",
        ],
        awards: "Received Pre-Placement Offer for Exceptional Performance",
        techStack: ["Java", "Springboot", "Angular", "rxjs", "Kafka"],
      }
    ],
  },
  {
    company: "Samsung R&D",
    logo: "experience/samsung.jpg",
    hook: "Machine learning for optimal base-station transmit power in 5G and 6G systems.",
    highlights: ["MATLAB", "Machine Learning"],
    roles: [
      {
        title: "PRISM Research Intern",
        duration: "Oct 2021 - Mar 2022",
        content: [
          "Researched optimal base-station transmit power for 5G and 6G systems using machine learning.",
          "Ran MATLAB simulations with the 5G toolkit to evaluate power-control strategies.",
        ],
        techStack: ["MATLAB", "Machine Learning"],
      },
    ],
  },
  {
    company: "MAX Healthcare Ltd.",
    logo: "experience/max.png",
    hook: "Full-stack analytics portal for doctors, with REST APIs on the admin backend.",
    highlights: ["React.js", "ASP.NET MVC", "C#"],
    roles: [
      {
        title: "Industrial Trainee",
        duration: "Dec 2020 - Jan 2021",
        content: [
          "Worked on a full-stack analytics portal for doctors to perform CRUD operations and view patient history.",
          "Updated the admin panel backend by adding RESTful API services.",
        ],
        techStack: ["React.js", "ASP.NET MVC", "C#", "RESTful API"],
      },
    ],
  },
].sort((a, b) => durationEndDate(b.roles[0].duration).getTime() - durationEndDate(a.roles[0].duration).getTime());

const EXPERIENCE_HIGHLIGHT_NAMES = ['Proofpoint', 'Morgan Stanley', 'Corporate Startup Lab'] as const;

/** Curated roles for about preview quick looks. */
export function getExperienceHighlights(): Company[] {
  return EXPERIENCE_HIGHLIGHT_NAMES.map((name) => experienceData.find((c) => c.company === name)).filter(
    (c): c is Company => c != null,
  );
}
