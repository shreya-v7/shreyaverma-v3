import { Company } from '../types';

export const experienceData: Company[] = [
  {
    company: "Morgan Stanley",
    logo: "experience/Ms.jpg",
    roles: [
      {
        title: "Software Engineer II",
        duration: "Sep 2024 - Present",
        content: [
          "Developing Stress-Testing Frameworks: Built a framework using the Barra model for factor returns and market shock simulations via Monte Carlo methods, visualized results in Power BI for interactive analysis, and enhanced data quality checks.",
          "Building user interface for business groups to view stress test reports in ReactJS with drilldown and interactive features.",
          "Optimized Risk Calculations: Implemented a Greedy Algorithm reducing exposure risk computation from 4 hours to 30 minutes.",
          "Improved Database and IaC Efficiency: Set up Delphix servers and Terraform scripts, eliminating database conflicts and reducing QA/test setup time by 40+ hours per cycle.",
          "Innovated Data Quality Detection: Developed a Deep Learning autoencoder for anomaly detection in risk reports and created rule-based DQ frameworks for actionable insights."
        ],
        awards: "IST Circle of Excellence Award, Team Engagement Champion 2024 Quarterly Awards",
        techStack: ["PyTorch", "Keras", "Tensorflow", "Java", "Springboot", "Python", "Angular", "React", "PowerBI", "Kafka", "Redis", "Kubernetes", "Podman", "Terraform", "Delphix", "Loki", "Prometheus", "Grafana", "Tempo", "Openshift"],
      },
      {
        title: "Technology Analyst",
        duration: "Jul 2023 - Sep 2024",
        content: [
          "Created a Deep Learning model framework (autoencoder) for a rule-based data quality engine for anomaly detection in risk data.",
          "Graduated from Morgan Stanley's prestigious Technology Analyst Program (TAP), gaining expertise in software engineering, financial technology, and internal tech architecture."
        ],
        awards: "First in Jeopardy Quiz on Tech Principles",
        techStack: ["React", "Java", "Python", "Azure Spring Functions", "Jira", "Rally", "Springboot", "Linux"],
      },
      {
        title: "Spring Technology Analyst",
        duration: "Jan 2023 - Jul 2023",
        content: [
          "Replaced a 40GB Hazelcast cache with Redis, optimizing the risk engine backend.",
          "Reduced load times from three minutes to seconds, gaining recognition from senior executives."
        ],
        awards: "Technology Talent Showcase Runner Up",
        techStack: ["Java", "Springboot", "Redis", "Hazelcast", "JMeter", "Grafana", "Prometheus", "Java Microbenchmark Harness", "OpenAPI"],
      },
      {
        title: "Summer Technology Analyst",
        duration: "May 2022 - Jul 2022",
        content: [
          "Implemented a Divide-and-Conquer solution in Java, using Kafka for high-volume messaging.",
          "Revitalized a legacy system with an Angular interface, earning a pre-placement offer from 3,500+ applicants in college."
        ],
        awards: "Recevied Pre-Placement Offer for Exceptional Performance",
        techStack: ["Java", "Springboot", "Angular", "rxjs", "Kafka"],
      }
    ],
  },
  {
    company: "Harvard University (HPAIR)",
    logo: "experience/hpair.png",
    roles: [
      {
        title: "Tech Leader",
        duration: "May 2022 - Aug 2022",
        content: [
          "Worked on Squarespace and React to handle client-side application of the official Harvard Conference for Asia.",
          "As an organiser, received a chance to meet field experts and interact with a diverse community of delegates."
        ],
        awards: "HCONF'23 Accepted Delegate",
        techStack: ["Squarespace", "Wordpress", "React", "CMS"],
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
          "Presidents Distinguished Club Award, Triple Crown Winner, Golden Gavel Award",
          "Held Executive Committee positions - Vice President Public Relations, Vice President Membership, President.",
          "Bagged 2nd runner up in International Speech Contest, Area.",
          "Stated 1st runner up in Table Topic Contest, Club."
        ],
        awards: "Best Project Award - 2019",
        techStack: ["Public Speaking", "Leadership", "Visionary", "Canva"],
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
          "Optimal BS Transmit power for 5G & 6G System using ML.",
          "Carried out Matlab Simulations with 5G toolkit."
        ],
        techStack: ["Matlab", "Machine Learning"],
      },
    ],
  },
  {
    company: "Cisco",
    logo: "experience/cisco.jpg",
    roles: [
      {
        title: "Frontend Developer",
        duration: "Jul 2021 - Aug 2021",
        content: [
          "Passed Networking Essentials and Advanced Networks course.",
          "Training program to setup simulated networks in a WAN.",
          "Merit Performer in CTF event - Rank 11."
        ],
        awards: "Best Project Award - 2019",
        techStack: ["WAN Developer", "Cybersecurity", "Packet Tracer"],
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
          "Virtually hosting events and promoting shows to have a larger reach to the audience."
        ],
        techStack: ["Public Relations", "Leadership", "Instagram"],
      },
    ],
  },
  {
    company: "MAX Healthcare Ltd.",
    logo: "experience/max.png",
    roles: [
      {
        title: "Industrial Intern",
        duration: "Jan 2018 - Dec 2019",
        content: [
          "Worked with a full stack application for an analytics portal for doctors to perform CRUD operations viewing the history of their patients.",
          "Alterations to admin panel backend by setting RESTful API cert."
        ],
        awards: "Best Project Award - 2019",
        techStack: ["C#", "RESTful API", "Visual Studio"],
      },
    ],
  },
].sort((a, b) => {
  const aDate = new Date(a.roles[0].duration.split(' - ')[1] || 'Present').getTime();
  const bDate = new Date(b.roles[0].duration.split(' - ')[1] || 'Present').getTime();
  return bDate - aDate;
});

