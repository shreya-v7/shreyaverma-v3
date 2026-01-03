import { Company } from '../types';

export const experienceData: Company[] = [
  {
    company: "Wolfram Alpha",
    logo: "experience/wolframalpha.png",
    roles: [
      {
        title: "Student Ambassador",
        duration: "Dec 2025 - Present",
        content: [
          "Organize and lead hackathons and technical workshops to promote computational thinking and mathematical problem-solving within the student community.",
          "Develop and execute promotional campaigns to increase awareness and adoption of Wolfram technologies among students and researchers.",
          "Conduct research projects on quantitative modeling and mathematical computations, leveraging Wolfram's computational intelligence for complex problem-solving.",
          "Create educational content and tutorials demonstrating advanced mathematical computations and quantitative analysis techniques.",
          "Collaborate with the Wolfram team to gather feedback and improve product features based on student and academic use cases.",
        ],
        techStack: ["Wolfram Language", "Mathematica", "Quantitative Modeling", "Mathematical Computation", "Data Analysis", "Research", "Event Organization", "Content Creation"],
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
          "Designed and built a distributed stress-testing system for quant and hedge fund portfolios, simulating 100K+ scenarios over million-position datasets, with a focus on scalability, correctness, and failure handling under load.",
          "Developed high-performance Java services (Spring Boot, DDD, multithreading) with CI/CD pipelines, enabling large-scale historical backtesting and reproducible risk simulations.",
          "Led statistical validation and anomaly analysis of model outputs using Python (NumPy, SciPy, pandas), reconciling independent implementations to surface edge cases and silent failures.",
          "Built a data-quality engine using deep learning autoencoders to detect anomalous risk outputs, automatically triggering recalculation pipelines and improving accuracy, compliance, and system trustworthiness.",
          "Created real-time risk insight dashboards (React, Power BI) that replaced manual Excel workflows and enabled faster, more reliable decision-making for Prime Brokerage and Institutional clients.",
          "Improved margin requirement accuracy (GAP), contributing to a ~20% impact on revenue strategy, by tightening model assumptions and validation logic.",
          "Recognized with Best Innovative Project and Team Engagement Champion awards for technical impact and leadership.",
        ],
        awards: "Best Innovative Project Award, Team Engagement Champion 2024 Quarterly Awards",
        techStack: ["PyTorch", "Keras", "Tensorflow", "Java", "Springboot", "Python", "Angular", "React", "PowerBI", "Kafka", "Redis", "Kubernetes", "Podman", "Terraform", "Delphix", "Loki", "Prometheus", "Grafana", "Tempo", "Openshift"],
      },
      {
        title: "Technology Associate",
        duration: "Nov 2023 - Sep 2024",
        content: [
          "Optimized a core exposure computation algorithm, reducing runtime from 4 hours to 30 minutes, enabling same-day analytics and improving system reliability under time constraints.",
          "Automated infrastructure provisioning and deployment (Terraform, OpenShift), eliminating environment drift and reducing QA/test setup time by 40+ hours.",
          "Built internal tooling for automated test generation (Python, LLM-assisted workflows), improving coverage and reducing regression risk.",
          "Served as Scrum Master, driving execution clarity while building observability dashboards to monitor system health and delivery velocity.",
          "Awarded IST Annual Circle of Excellence (top performer recognition).",
        ],
        awards: "IST Circle of Excellence Award",
        techStack: ["Python", "Java", "Spring Boot", "Azure Spring Apps", "Linux", "Terraform", "OpenShift", "Docker", "Git", "JUnit", "PyTest", "pandas", "NumPy", "React", "Power BI", "Jira", "Rally"]
      }, 
      {
        title: "Technology Analyst",
        duration: "Jul 2023 - Oct 2023",
        content: [
          "Graduated from Morgan Stanley's prestigious Technology Analyst Program (TAP), gaining expertise in software engineering, financial technology, and internal tech architecture.",
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

