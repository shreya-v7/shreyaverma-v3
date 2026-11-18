import { Company } from '../types';
import { durationEndDate } from '../utils';

export const educationData: Company[] = [
  {
    company: "Carnegie Mellon University",
    logo: "education/cmu.png",
    roles: [
      {
        title: "Master of Information Systems Management in Business Intelligence & Data Analytics",
        duration: "Aug 2025 - Dec 2026",
        content: [
          "3.9/4.0 GPA",
          "MISM Scholarship Recipient",
          "Campus Ambassador for Carnegie Mellon University",
          "Vice President of Cultural Affairs, Indian Graduate Student Association (IGSA), Carnegie Mellon University",
          "Industry-sponsored capstone with Adobe: Learned Orchestration for Efficient Deep Research Agents",
          "Graduate Teaching Assistant, Machine Learning in Production / AI Engineering (17-645), Dr. Christian Kastner and Dr. Bogdan Vasilescu, School of Computer Science (Fall 2026)",
          "Graduate Teaching Assistant, Organizational Design & Implementation (94-700), Dr. Lindsay Larson (Fall 2025, Fall 2026)",
          "Graduate Teaching Assistant, Advanced Business Analytics (95-866), Prof. Rahul Telang (Spring 2026)",
        ],
        awards: "Dean's List for Fall 2025 and Spring 2026",
        techStack: [
          "10-714 Deep Learning Systems",
          "95-702 Distributed Systems for Information Systems Management",
          "17-645 Machine Learning in Production",
          "15-659 Probability & Computing: Markov Chains and Randomized Algorithms (Audit)",
          "94-739 Capstone Project",
          "95-722 Digital Transformation",
          "95-820 Applications of NL(X) & LLMs",
          "45-996 Corporate Startup Lab",
          "95-737 NoSQL Database Management",
          "95-828 Machine Learning for Problem Solving",
          "95-835 Time Series Forecasting in Python",
          "95-864 AI Model Development",
          "94-700 Organizational Design & Implementation",
          "94-834 Applied Econometrics I",
          "95-712 Object-Oriented Programming in Java",
          "95-718 Professional Speaking",
          "95-760 Decision Making Under Uncertainty",
          "95-865 Unstructured Data Analytics",
          "95-866 Advanced Business Analytics",
          "95-888 Data-Focused Python",
        ],
      },
      {
        title: "Corporate Startup Lab — CSL Course Fellow, PNC Bank",
        duration: "Jan 2026 - Apr 2026",
        content: [
          "Built Brilliant Banker through CMU course 45-996 with industry partner PNC Bank: an AI financial advisor for SMB owners and a CRM for relationship managers.",
          "Designed a four-node LangGraph pipeline on the Claude API with deterministic credit pre-qualification and human escalation over Server-Sent Events for requests above $10,000.",
          "Built FastAPI and React/Vite role experiences, SQLite storage, input sanitization, Docker packaging on Hugging Face Spaces, and a SQLite-backed feedback widget for user testing.",
        ],
        techStack: ["LangGraph", "FastAPI", "React", "Vite", "SQLite", "Server-Sent Events", "Docker", "Hugging Face Spaces"],
      },
    ],
  },
  {
    company: "Vellore Institute of Technology",
    logo: "education/vit.png",
    roles: [
      {
        title: "Bachelor of Technology, Information Technology",
        duration: "Jul 2019 - Jul 2023",
        content: [
          "9.42/10 CGPA",
          "Meritorious Scholarship and Dean's Rank holder list for consecutive years.",
          "Activities: Toastmasters International, IEEE-WIE, SEDS Projects.",
          "Served as Event Manager and Editorial Core Committee Member in IEEE-WIE Chapter.",
          "Co-ordinated at the Technical fest Gravitas 2019.",
          "Contributed as Software Developer on SEDS-VIT Project for Vyadh - Mars Rover.",
        ],
        awards: "Graduated with Rank 5, Meritorious Student",
        techStack: ["Calculus for Engineers", "Discrete Mathematics and Graph Theory", "Applications of Differential and Difference Equations", "Applied Linear Algebra", "Human Computer Interaction", "Statistics for Engineers", "Data Mining Techniques", "Big Data Analytics", "Business Analytics", "Data Structures and Algorithms", "Theory of Computation", "Statistics and Probability"],
      },
    ],
  },
  {
    company: "Amity International School",
    logo: "education/amity.png",
    roles: [
      {
        title: "AISSCE - XII",
        duration: "2017 - 2018",
        content: [
          "95.2%, In the Top 2% students in the State.",
          "Served as Prefect Discipline Head displaying great management skills.",
          "Stood 3rd in Inter-School Web Development Competition.",
          "Active member of Ami-Tech Syndicate, Computer Society.",
          "Creative head in Editorial, Global Times publication.",
          "Lead Singer in Choir at the Annual Function.",
          "Bagged 1st position in Inter-School Singing Competition."
        ],
        awards: "Excellence in Academics",
        techStack: ["Mathematics", "Physics", "Chemistry", "Information Practices", "English"],
      },
      {
        title: "AISSCE - X",
        duration: "2015 - 2016",
        content: [
          "10/10 CGPA, Received Merit Letter from CBSE.",
          "Certified Abacus Gold Medalist, 2nd in the District.",
          "Served as Prefect Discipline Head displaying great management skills.",
          "Excellence in writing, Global Times publication.",
          "Part of the Yoga School Team, selected for Nationals.",
          "Involved in School's Choir Group and represented at States as Lead Singer.",
        ],
        awards: "Certificate of Merit - Government of Indian",
        techStack: ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
      },
    ],
  },
].sort((a, b) => durationEndDate(b.roles[0].duration).getTime() - durationEndDate(a.roles[0].duration).getTime());

