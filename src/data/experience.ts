import { Company } from '../types';
import { durationEndDate } from '../utils';

export const experienceData: Company[] = [
  {
    company: "Proofpoint",
    logo: "experience/proofpoint.png",
    hook: "Lakehouse access analytics, a PuppyGraph evaluation, and bounded investigation tools across 20 tenants.",
    highlights: ["Agentic systems", "LLM evaluation", "Apache Spark", "Apache Hudi", "Amazon Athena", "PuppyGraph", "Python", "SQL", "AWS"],
    roles: [
      {
        title: "SWE Intern, Cloud and ML",
        duration: "Jun 2026 - Aug 2026",
        content: [
          "Proposed and led a PuppyGraph-versus-Athena proof of concept as the sole engineer, advised by a mentor and manager, comparing graph investigation and lakehouse analytics on shared source tables.",
          "Built a Spark and Hudi effective-access pipeline across 8.8M resources, 1.14M identities, and 20 tenants, resolving direct grants, nested groups, folder inheritance, and sharing links.",
          "Cut a failing 2.5-second access lookup to 651 ms with 27x fewer bytes scanned; bidirectionally bucketed Athena tables held about 1-second lookups at 108M-route synthetic scale.",
          "Built daily dashboard rollups that reduced bytes scanned about 600x, materialized risk scores for 8.7x lower read latency, and validated incremental repairs against full rebuilds by count and checksum.",
          "Built 12 parameterized, tenant-locked SQL tools behind an LLM tool-choice planner and a separate deterministic investigator. A 28-question adversarial suite found no cross-tenant leaks; later live planner testing had no retained scores.",
          "Recommended Athena for aggregation and PuppyGraph for bounded investigation, projecting 22\u201335x lower Athena-only cost than the incumbent Neptune baseline under the documented billing assumptions. Presented the hybrid recommendation to the product SVP; placed 3rd in a separate firm-wide intern hackathon.",
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
    company: "Morgan Stanley",
    logo: "experience/Ms.jpg",
    hook: "Factor-based stress testing at fund scale, and a PyTorch autoencoder that flags bad risk numbers.",
    highlights: ["PyTorch", "TensorFlow", "Keras", "pandas", "NumPy", "Java", "Kafka", "Kubernetes"],
    roles: [
      {
        title: "Software Engineer II",
        duration: "Sep 2024 - Aug 2025",
        content: [
          "Built a distributed factor-based stress-testing framework in about 3 months, covering 3,500+ funds and million-position datasets, used daily by 200+ risk analysts.",
          "Modeled systematic risk with Barra historical factor shocks and specific risk with 100K+ Monte Carlo scenarios for tail-loss estimation.",
          "Cut nightly simulations from 8 hours to 4 through multithreaded revaluation and longest-processing-time-first scheduling on a min-heap across cluster nodes.",
          "Shipped a Kafka-fed React, Vite, and Spring Boot dashboard in 2 weeks, replacing Power BI reports for Prime Brokerage with real-time risk views.",
          "Built a PyTorch autoencoder for GAP-report data-quality monitoring and email alerts, with manual re-runs; built a reconciliation orchestrator whose data-quality gates failed Jenkins builds on missing or mismatched risk numbers.",
          "Automated daily Hong Kong and London desk reports with a Python script calling 5 services to generate spreadsheets in about 5 minutes. Received Best Innovative Project for the full stress-testing framework and Team Engagement Champion recognition.",
        ],
        awards: "Best Innovative Project Award, Team Engagement Champion 2024 Quarterly Awards",
        techStack: ["PyTorch", "Keras", "TensorFlow", "pandas", "NumPy", "Java", "Springboot", "Python", "Angular", "React", "Vite", "Kafka", "Redis", "Kubernetes", "Podman", "Terraform", "Delphix", "Loki", "Prometheus", "Grafana", "Tempo", "Openshift"],
      },
      {
        title: "Technology Associate",
        duration: "Jul 2023 - Sep 2024",
        content: [
          "Implemented greedy bin packing with a dynamic per-batch position cap across 7,000+ accounts, isolating million-position accounts and grouping smaller ones; cut daily exposure computation from over 4 hours to 30 minutes.",
          "Deployed a liquidity calculator to OpenShift using Kubernetes and Docker, and automated infrastructure with Terraform, eliminating environment drift and reducing QA/test setup time by 40+ hours per cycle.",
          "Built internal tooling for automated test generation (Python, LLM-assisted workflows) with PyTest and JUnit, improving coverage and reducing regression risk.",
          "Served as Scrum Master, driving execution clarity while building observability dashboards (Python Dash, Plotly, Rally) to monitor system health and delivery velocity.",
          "Completed the Technology Analyst Program (Jul–Oct 2023) during full-time onboarding and led my team to first in Tech Principles Jeopardy. Awarded IST Annual Circle of Excellence as the first technology analyst in the 2023 cohort.",
        ],
        awards: "IST Circle of Excellence Award",
        techStack: ["Python", "Java", "Spring Boot", "Azure Spring Apps", "Linux", "Terraform", "OpenShift", "Docker", "Git", "JUnit", "PyTest", "pandas", "NumPy", "Large Language Models (LLMs)", "React", "Power BI", "Jira", "Rally"]
      },
      {
        title: "Spring Technology Analyst (Internship)",
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
        title: "Summer Technology Analyst (Internship)",
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

const EXPERIENCE_HIGHLIGHT_NAMES = ['Proofpoint', 'Morgan Stanley'] as const;

/** Curated roles for about preview quick looks. */
export function getExperienceHighlights(): Company[] {
  return EXPERIENCE_HIGHLIGHT_NAMES.map((name) => experienceData.find((c) => c.company === name)).filter(
    (c): c is Company => c != null,
  );
}
