import { Achievement } from '../types';

export const achievementsData = ([
  // Morgan Stanley (Awards)
  {
    title: 'Best Innovative Project',
    category: 'Award',
    date: '2025-03',
    context: 'Morgan Stanley',
    highlight:
      'Recognized by a Managing Director for building a dynamic factor-based stress-testing framework and secure internal platform that improved risk analysis and automated data-quality workflows.',
    details: [
      'Selected among ~500–1,000 employees within the department for innovation and impact.',
    ],
  },
  {
    title: 'Team Engagement Champions',
    category: 'Award',
    date: '2024-08',
    context: 'Morgan Stanley',
    highlight:
      'Recognized for leading team initiatives that strengthened culture, collaboration, and inclusion across the department.',
    details: ['Selected among 500+ employees across the department.'],
  },
  {
    title: 'IST Circle of Excellence Award',
    category: 'Award',
    date: '2023-11',
    context: 'Morgan Stanley',
    highlight:
      'Awarded for outstanding contribution to the firm’s “Give Back” value and cross-functional leadership at scale.',
    details: [
      'Competed with 1,500+ employees; led a firmwide engagement event in Mumbai.',
      'Coordinated 500+ email threads across global teams; secured compliance & leadership approvals; managed vendors/logistics.',
      'Featured in the Morgan Stanley India Newsletter.',
    ],
  },

  // Publications
  {
    title: 'An Efficient Multifactor Authentication System',
    category: 'Publication',
    year: 2023,
    context: 'CIPR 2023 · Computational Intelligence in Pattern Recognition',
    highlight: 'Research publication on an efficient multifactor authentication approach.',
    details: ['Verma, S., Singh, M., Chaturvedi, K., Tripathy, B.K. · pp. 109–122'],
    link: 'https://link.springer.com/chapter/10.1007/978-981-99-3734-9_10',
  },
  {
    title: 'An Approach to Medical Diagnosis using Smart Chatbot',
    category: 'Publication',
    year: 2022,
    context: 'CIPR 2022 · Computational Intelligence in Pattern Recognition',
    highlight: 'Research publication proposing a medical diagnosis approach using a smart chatbot.',
    details: ['Verma, S., Singh, M., Tiwari, I., Tripathy, B.K. · pp. 43–56'],
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-3089-8_5',
  },

  // More awards already referenced in Experience / Education
  {
    title: 'First in Jeopardy Quiz on Tech Principles',
    category: 'Award',
    date: '2023-10',
    context: 'Morgan Stanley · Technology Analyst Program (TAP)',
    highlight: 'Placed 1st in the TAP Jeopardy quiz on tech principles.',
  },
  {
    title: 'Technology Talent Showcase Runner Up',
    category: 'Award',
    date: '2023-07',
    context: 'Morgan Stanley · Spring Technology Analyst',
    highlight: 'Runner up at the internal Technology Talent Showcase.',
  },
  {
    title: 'Pre-Placement Offer (PPO) for Exceptional Performance',
    category: 'Award',
    date: '2022-07',
    context: 'Morgan Stanley · Summer Technology Analyst',
    highlight: 'Received a PPO based on internship performance and impact.',
  },
  {
    title: "HCONF'23 Accepted Delegate",
    category: 'Award',
    year: 2023,
    context: 'Harvard University (HPAIR)',
    highlight: 'Accepted as a delegate for HCONF 2023.',
  },
  {
    title: "Dean's List (Fall 2025)",
    category: 'Award',
    date: '2025-12',
    context: 'Carnegie Mellon University',
    highlight: "Recognized on the Dean's List for Fall 2025.",
  },
  {
    title: 'Graduated with Rank 5, Meritorious Student',
    category: 'Award',
    date: '2023-07',
    context: 'Vellore Institute of Technology',
    highlight: 'Graduated with Rank 5 and meritorious student recognition.',
  },
  {
    title: 'Excellence in Academics',
    category: 'Award',
    year: 2018,
    context: 'Amity International School (AISSCE XII)',
    highlight: 'Recognized for academic excellence.',
  },
  {
    title: 'Certificate of Merit (CBSE)',
    category: 'Award',
    year: 2016,
    context: 'Amity International School (AISSCE X)',
    highlight: 'Received a Certificate of Merit.',
  },

  // Scholarships
  {
    title: 'Merit Scholarship (Meritorious Student)',
    category: 'Scholarship',
    date: '2023-04',
    context: 'Vellore Institute of Technology',
    highlight: 'Awarded for exemplary academic performance across consecutive years.',
  },
  {
    title: "Merit Scholarship (Dean’s List / Rank Holder)",
    category: 'Scholarship',
    date: '2022-10',
    context: 'Vellore Institute of Technology',
    highlight: 'Recognized as a Dean’s list rank holder for outstanding academic performance (2021–22).',
  },
  {
    title: 'IET Regional Scholar',
    category: 'Scholarship',
    date: '2022-09',
    context: 'IET',
    highlight: 'Selected among the top 30 candidates nationwide for scholarship support.',
  },
  {
    title: "ISET 2022 Singapore Scholarship",
    category: 'Scholarship',
    date: '2022-04',
    context: 'Learn While Travelling (LWT)',
    highlight: 'Scholarship winner to present startup ideas in Singapore.',
  },
  {
    title: 'Udacity Scholarship (AWS ML Nanodegree Access)',
    category: 'Scholarship',
    date: '2020-12',
    context: 'Udacity',
    highlight: 'Scholarship granting access to an AWS Machine Learning Nanodegree program.',
  },

  // Certifications
  {
    title: 'Google Cloud Professional Machine Learning Engineer',
    category: 'Certification',
    date: '2023-12',
    context: 'Google Cloud',
    highlight: 'Professional certification in machine learning engineering on Google Cloud.',
  },
  {
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    category: 'Certification',
    date: '2023-12',
    context: 'Microsoft',
    highlight: 'Validated foundational knowledge of Azure services and cloud concepts.',
  },
  {
    title: 'Deep Learning Specialization',
    category: 'Certification',
    date: '2022-12',
    context: 'DeepLearning.AI',
    highlight: 'Completed specialization covering neural networks and deep learning fundamentals.',
  },
  {
    title: 'Gold Certified AI Foundation',
    category: 'Certification',
    date: '2021-08',
    context: 'SkillUp',
    highlight: 'Certified AI foundations with gold-level credential.',
  },
  {
    title: 'Mass AI Workshop Participation (Guinness World Records)',
    category: 'Certification',
    date: '2021-04',
    context: 'GUVI',
    highlight: 'Participation in a record-setting mass AI workshop.',
  },

  // Hackathons & competitions
  {
    title: 'First Overall - Support-a-Thon',
    category: 'Hackathon',
    date: '2022-12',
    context: 'Major League Hacking (MLH)',
    highlight: 'Won first overall; led a team of 4 building a healthcare solution.',
  },
  {
    title: 'HPAIR Delegate Scholar',
    category: 'Scholarship',
    date: '2022-12',
    context: 'Harvard Project for Asian and International Relations (HPAIR)',
    highlight: 'Selected as an HPAIR delegate to represent and showcase work at Harvard University.',
  },
  {
    title: 'Winner - International Coding Contest (We Code)',
    category: 'Hackathon',
    date: '2022-11',
    context: 'Graphic Era Hill University',
    highlight: 'Placed 1st, demonstrating strong problem-solving under time constraints.',
  },
  {
    title: 'ET Campus Coding Star Winner',
    category: 'Hackathon',
    date: '2022-10',
    context: 'Economic Times',
    highlight: 'Winner in the ET Campus Coding Star League (Season 5).',
  },
  {
    title: "2nd Runner Up - Ureckon'22 (Ideation Challenge)",
    category: 'Hackathon',
    date: '2022-04',
    context: 'University of Engineering and Management (UEM), Kolkata',
    highlight: 'Placed 3rd in the ideation challenge.',
  },
  {
    title: 'Winner - VTHacks IX (Best Use of Google Cloud)',
    category: 'Hackathon',
    date: '2022-02',
    context: 'Virginia Tech',
    highlight: 'Won Best Use of Google Cloud for an integrated event-planning web application.',
  },
  {
    title: 'Winner - CUHackit 2022 (Best Use of Data)',
    category: 'Hackathon',
    date: '2022-01',
    context: 'Clemson University',
    highlight: 'Won Best Use of Data; built a MERN stack website.',
  },
  {
    title: 'Winner - Hacknado (Best Climate Crisis Hack)',
    category: 'Hackathon',
    date: '2022-01',
    context: 'Major League Hacking (MLH)',
    highlight: 'Won Best Climate Crisis Hack for an eco-friendly shipping UX concept.',
  },
  {
    title: 'Winner - CodeX 2.0',
    category: 'Hackathon',
    date: '2021-10',
    context: 'NIT Patna',
    highlight: 'Placed 1st in a 2-hour competitive coding contest.',
  },
  {
    title: 'Merit Scholarship (Dean’s List / Rank Holder)',
    category: 'Scholarship',
    date: '2021-10',
    context: 'Vellore Institute of Technology',
    highlight: 'Recognized as a Dean’s list rank holder for outstanding academic performance (2020–21).',
  },
  {
    title: 'Winner - Ideate 6.0',
    category: 'Hackathon',
    date: '2021-10',
    context: 'SSN College of Engineering',
    highlight: 'Placed 1st in the Idea-thon.',
  },

  // Toastmasters (Awards)
  {
    title: 'Triple Crown Award Winner',
    category: 'Award',
    date: '2022-06',
    context: 'Toastmasters International',
    highlight: 'Recognized for earning three educational achievements within a single program year.',
  },
  {
    title: "President’s Distinguished Club",
    category: 'Award',
    date: '2022-04',
    context: 'Toastmasters International',
    highlight:
      'Club recognition for exceptional performance; also received Excellence in Training and related club awards.',
  },
  {
    title: 'International Speech Contest (2nd Runner Up)',
    category: 'Award',
    date: '2022-03',
    context: 'Toastmasters International',
    highlight: 'Placed 2nd runner up at the Area level International Speech Contest.',
  },

  // Leadership / volunteering
  {
    title: 'Invited Speaker - Long Beach Immersive Summit',
    category: 'Leadership',
    date: '2023-10',
    context: 'Wonder Women Tech Network',
    highlight: 'Delivered a keynote on Perception vs Perspective, promoting women in STEM.',
    details: ['Invited to join as a Committee Advisory Board Member.'],
  },
] satisfies Achievement[]).sort((a, b) => {
  const toKey = (x: Achievement) => {
    if (x.date) {
      // Support YYYY-MM or YYYY-MM-DD
      const normalized = x.date.length === 7 ? `${x.date}-01` : x.date;
      const t = new Date(normalized).getTime();
      if (!Number.isNaN(t)) return t;
    }
    if (typeof x.year === 'number') return new Date(`${x.year}-01-01`).getTime();
    return 0;
  };
  return toKey(b) - toKey(a);
});

