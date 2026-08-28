import { Company } from '../types';
import { durationEndDate } from '../utils';

/** Org leadership, ambassadorships, speaking, and volunteering. Not professional employment. */
export const leadershipData: Company[] = [
  {
    company: "Women Who Code",
    logo: "leadership/wwc.svg",
    roles: [
      {
        title: "Core Committee Member",
        duration: "Oct 2023 - Present",
        content: [
          "Organize events and workshops in Mumbai to support and empower women in technology.",
          "Mentored participants at Mumbai Hacks 2024, which set a Guinness World Record for the largest AI hackathon by number of participants.",
        ],
        techStack: ["Community", "Mentorship", "Events"],
      },
    ],
  },
  {
    company: "Wolfram Alpha",
    logo: "experience/wolframalpha.png",
    roles: [
      {
        title: "Student Ambassador",
        duration: "Nov 2025 - Apr 2026",
        content: [
          "Represented Wolfram in the student developer community, supporting technical events, hackathons, and outreach.",
          "Served as a hackathon judge and evaluator, reviewing student projects on implementation, creativity, and problem-solving.",
        ],
        techStack: ["Community", "Hackathons", "Outreach"],
      },
    ],
  },
  {
    company: "Carnegie Mellon University",
    logo: "education/cmu.png",
    roles: [
      {
        title: "Visitor Experience Intern",
        duration: "Apr 2026 - May 2026",
        content: [
          "Supported graduate student and visitor-facing initiatives with students, faculty, and program stakeholders.",
          "Helped with program operations, events, and participant engagement for visiting and graduate students.",
        ],
        techStack: ["Visitor Experience", "Events", "Operations"],
      },
    ],
  },
  {
    company: "Wonder Women Tech",
    logo: "leadership/wwt.svg",
    roles: [
      {
        title: "Speaker",
        duration: "May 2023 - May 2023",
        content: [
          "Invited speaker at the Long Beach Immersive Summit, CA.",
          "Spoke on women in STEM, industry trends, and introducing diversity in the workforce.",
        ],
        techStack: ["Public Speaking", "STEM Outreach"],
      },
    ],
  },
  {
    company: "WomenTech Network",
    logo: "leadership/womentech.svg",
    roles: [
      {
        title: "Ambassador",
        duration: "Apr 2023 - May 2023",
        content: [
          "Selected as a WomenTech Network scholar and ambassador.",
          "Connected with women in STEM at the New York conference.",
        ],
        techStack: ["Community", "STEM Outreach"],
      },
    ],
  },
  {
    company: "Toastmasters International",
    logo: "experience/toastmasters.png",
    roles: [
      {
        title: "President - Agua VIT",
        duration: "Jun 2020 - Jul 2022",
        content: [
          "Held executive committee roles: President, Vice President Membership, and Vice President Public Relations.",
          "Distinguished President Award, Triple Crown Award Winner, President's Distinguished Club.",
          "2nd runner up in International Speech Contest, Area. 1st runner up in Table Topics Contest, Club.",
        ],
        awards: "Distinguished President Award, Triple Crown Award",
        techStack: ["Public Speaking", "Leadership", "Strategic Communication"],
      },
    ],
  },
  {
    company: "Harvard Project for Asian and International Relations",
    logo: "experience/hpair.png",
    roles: [
      {
        title: "Technology Associate",
        duration: "May 2022 - Aug 2022",
        content: [
          "Maintained the landing page and front end of the registration portal for the official Harvard Conference for Asia.",
          "Worked on Angular and React for the client-side application.",
        ],
        techStack: ["Angular", "React", "Squarespace", "CMS"],
      },
    ],
  },
  {
    company: "Cisco",
    logo: "experience/cisco.jpg",
    roles: [
      {
        title: "CWiCS Boost Program Trainee",
        duration: "Jul 2021 - Aug 2021",
        content: [
          "Completed Networking Essentials and Advanced Networks coursework, including simulated WAN setups.",
          "Merit Performer in the CTF event, rank 11.",
        ],
        awards: "Merit Performer, CTF",
        techStack: ["Network Security", "Packet Tracer", "WAN"],
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
    company: "GirlScript Winter of Contributing",
    logo: "leadership/girlscript.svg",
    roles: [
      {
        title: "Contributor",
        duration: "Sep 2021 - Nov 2021",
        content: [
          "Open-source contributor across Machine Learning, MERN, and CyberSecurity.",
        ],
        techStack: ["Open Source", "Machine Learning", "MERN"],
      },
    ],
  },
  {
    company: "Bhumi",
    logo: "leadership/bhumi.svg",
    roles: [
      {
        title: "Student Volunteer",
        duration: "May 2021 - Jun 2021",
        content: [
          "Volunteered on Bhumi's Eco-Scavenger and Creative Eco-Warrior campaign, including quizzes and interactive sessions on environmental awareness.",
        ],
        techStack: ["Volunteering", "Environment"],
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
    company: "INDIA Redefined",
    logo: "leadership/india-redefined.svg",
    roles: [
      {
        title: "Community Volunteer",
        duration: "Jun 2020 - Jul 2020",
        content: [
          "Supported the COVID-19 Awareness and Precautions program, spreading information through digital platforms.",
        ],
        techStack: ["Volunteering", "Community"],
      },
    ],
  },
  {
    company: "National Engineering Olympiad",
    logo: "leadership/neo.svg",
    roles: [
      {
        title: "Student Intern",
        duration: "Apr 2020 - Jul 2020",
        content: [
          "Qualified through NEO 3.0 rounds and interned in web development and machine learning.",
        ],
        techStack: ["Web Development", "Machine Learning"],
      },
    ],
  },
].sort((a, b) => durationEndDate(b.roles[0].duration).getTime() - durationEndDate(a.roles[0].duration).getTime());

export function getLeadershipHighlights(): Company[] {
  const names = ['Women Who Code', 'Wolfram Alpha', 'Wonder Women Tech'] as const;
  return names.map((name) => leadershipData.find((c) => c.company === name)).filter(
    (c): c is Company => c != null,
  );
}
