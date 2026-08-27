import { Company } from '../types';
import { durationEndDate } from '../utils';

export const experienceData: Company[] = [
  {
    company: "Proofpoint",
    logo: "experience/proofpoint.png",
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
        ],
        techStack: [
          "Amazon Athena",
          "Apache Hudi",
          "Apache Spark",
          "Amazon EMR",
          "AWS Glue",
          "Amazon S3",
          "SQL",
          "Python",
          "Large Language Models (LLMs)",
          "Machine Learning",
          "Amazon Web Services (AWS)",
        ],
      },
    ],
  },
  {
    company: "Carnegie Mellon University",
    logo: "education/cmu.png",
    roles: [
      {
        title: "Graduate Teaching Assistant, Machine Learning in Production",
        duration: "Aug 2026 - Present",
        content: [
          "Teaching assistant for Machine Learning in Production / AI Engineering (17-745) with Dr. Christian Kastner and Dr. Bogdan Vasilescu at the School of Computer Science, Language Technologies Institute.",
          "Support students on production ML systems: evaluation, reliability, and shipping models that hold up outside the notebook.",
        ],
        techStack: ["Machine Learning in Production", "AI Engineering", "Teaching Assistant"],
      },
      {
        title: "Graduate Teaching Assistant, Organizational Design (Fall 2026)",
        duration: "Aug 2026 - Present",
        content: [
          "Teaching assistant for Organizational Design and Implementation (94-700) with Dr. Lindsay Larson.",
          "Help students apply organization design, team structure, and implementation frameworks to real operating contexts.",
        ],
        techStack: ["Organizational Design", "Teaching Assistant"],
      },
      {
        title: "Graduate Program Assistant",
        duration: "May 2026 - May 2026",
        content: [
          "Supported CMU visitor experience: campus tours, guest logistics, and front-of-house coordination for prospective students and families.",
          "Managed documentation, scheduling, and day-of tour operations so visits ran smoothly end to end.",
        ],
        techStack: ["Knowledge Engineering", "Team Management", "Visitor Experience"],
      },
      {
        title: "Graduate Teaching Assistant, Advanced Business Analytics",
        duration: "Mar 2026 - May 2026",
        content: [
          "Teaching assistant for Advanced Business Analytics (95-866) with Prof. Rahul Telang.",
          "Supported students on statistical data analysis, modeling choices, and turning analytics into decisions.",
        ],
        techStack: ["Statistical Data Analysis", "Teaching Assistant", "Business Analytics"],
      },
      {
        title: "Graduate Teaching Assistant, Organizational Design (Fall 2025)",
        duration: "Oct 2025 - Dec 2025",
        content: [
          "Teaching assistant for Organizational Design and Implementation (94-700) with Dr. Lindsay Larson.",
          "Supported instruction, office hours, and student work on organization design and implementation.",
        ],
        techStack: ["Organizational Design", "Teaching Assistant"],
      },
    ],
  },
  {
    company: "Wolfram Alpha",
    logo: "experience/wolframalpha.png",
    roles: [
      {
        title: "Researcher",
        duration: "Dec 2025 - May 2026",
        content: [
          "Conducted quantitative research and mathematical modeling using Wolfram computational tools.",
          "Built educational content and tutorials on advanced mathematical computation and quantitative analysis.",
          "Led technical workshops on computational thinking and mathematical problem-solving.",
        ],
        techStack: ["Wolfram Language", "Mathematica", "Quantitative Modeling", "Mathematical Computation", "Research"],
      },
    ],
  },
  {
    company: "Corporate Startup Lab",
    logo: "experience/csl.png",
    roles: [
      {
        title: "CSL Course Fellow, PNC Bank",
        duration: "Jan 2026 - Apr 2026",
        content: [
          "Built Brilliant Banker, a 0-to-1 AI banking assistant for PNC, as a solo Corporate Startup Lab fellow: SMB owners get an in-app financial advisor, and relationship managers get a CRM with AI briefs, warm leads, and one-tap credit decisions.",
          "Designed a LangGraph state-machine on the Claude API (intent classifier, tool router, reply composer, human escalation) so credit requests above a configurable threshold auto-escalate to a live RM queue instead of letting the model decide high-stakes credit on its own.",
          "Shipped a FastAPI backend with REST and Server-Sent Events, a React and Vite frontend with two role experiences, Docker packaging, and structured user testing with both personas.",
        ],
        techStack: [
          "LangGraph",
          "Claude API",
          "FastAPI",
          "React",
          "Vite",
          "Server-Sent Events",
          "SQLite",
          "Docker",
          "Artificial Intelligence (AI)",
        ],
      },
    ],
  },
  {
    company: "Morgan Stanley",
    logo: "experience/Ms.jpg",
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
        techStack: ["PyTorch", "Keras", "Tensorflow", "Java", "Springboot", "Python", "Angular", "React", "PowerBI", "Kafka", "Redis", "Kubernetes", "Podman", "Terraform", "Delphix", "Loki", "Prometheus", "Grafana", "Tempo", "Openshift"],
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
        techStack: ["Python", "Java", "Spring Boot", "Azure Spring Apps", "Linux", "Terraform", "OpenShift", "Docker", "Git", "JUnit", "PyTest", "pandas", "NumPy", "React", "Power BI", "Jira", "Rally"]
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
    company: "Harvard University (HPAIR)",
    logo: "experience/hpair.png",
    roles: [
      {
        title: "Technology Associate",
        duration: "May 2022 - Aug 2022",
        content: [
          "Worked on Angular and React for the client-side application of the official Harvard Conference for Asia.",
          "As an organiser, met field experts and worked with a diverse community of delegates.",
        ],
        awards: "HCONF'23 Accepted Delegate",
        techStack: ["Angular", "React", "Squarespace", "CMS"],
      },
    ],
  },
  {
    company: "Toastmasters International",
    logo: "experience/toastmasters.png",
    roles: [
      {
        title: "President - Agua VIT",
        duration: "Jun 2020 - Sep 2022",
        content: [
          "Held Executive Committee positions: President, Vice President Membership, and Vice President Public Relations.",
          "Presidents Distinguished Club Award, Triple Crown Winner, Golden Gavel Award.",
          "2nd runner up in International Speech Contest, Area. 1st runner up in Table Topics Contest, Club.",
        ],
        awards: "Distinguished President Award, Triple Crown Award",
        techStack: ["Public Speaking", "Leadership", "Strategic Communication"],
      },
    ],
  },
  {
    company: "Samsung R&D",
    logo: "experience/samsung.jpg",
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
    company: "IEEE Women in Engineering VIT",
    logo: "experience/ieeewie.jpg",
    roles: [
      {
        title: "Senior Core Committee Member",
        duration: "Jul 2020 - Dec 2021",
        content: [
          "Supervised technical articles and published STEM updates for the IEEE WIE student community.",
        ],
        techStack: ["Technical Writing", "Content Development"],
      },
    ],
  },
  {
    company: "Cisco",
    logo: "experience/cisco.jpg",
    roles: [
      {
        title: "CWiCS Boost Program",
        duration: "Jul 2021 - Aug 2021",
        content: [
          "Completed Networking Essentials and Advanced Networks coursework.",
          "Trained on setting up simulated networks in a WAN.",
          "Merit Performer in the CTF event, rank 11.",
        ],
        awards: "Merit Performer, CTF",
        techStack: ["Network Security", "Packet Tracer", "WAN"],
      },
    ],
  },
  {
    company: "TribeVibe Pvt. Ltd.",
    logo: "experience/tribevibe.png",
    roles: [
      {
        title: "Campus Ambassador",
        duration: "Aug 2020 - Apr 2021",
        content: [
          "Hosted virtual events and promoted shows to expand audience reach.",
        ],
        techStack: ["Public Relations", "Leadership"],
      },
    ],
  },
  {
    company: "MAX Healthcare Ltd.",
    logo: "experience/max.png",
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

const EXPERIENCE_HIGHLIGHT_NAMES = ['Proofpoint', 'Morgan Stanley'] as const;

/** Curated roles for home + about preview quick looks. */
export function getExperienceHighlights(): Company[] {
  return EXPERIENCE_HIGHLIGHT_NAMES.map((name) => experienceData.find((c) => c.company === name)).filter(
    (c): c is Company => c != null,
  );
}
