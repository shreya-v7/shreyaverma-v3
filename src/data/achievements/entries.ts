import type { Achievement } from '../../types';
import { CTX, GROUP } from './contexts';

const morganStanley: Achievement[] = [
  {
    title: 'Best Innovative Project',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2025-03',
    context: CTX.ms,
    highlight:
      'Recognized by a Managing Director for building a dynamic factor-based stress-testing framework and secure internal platform that improved risk analysis and automated data-quality workflows.',
    details: ['Selected among ~500–1,000 employees within the department for innovation and impact.'],
  },
  {
    title: 'Team Engagement Champions',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2024-08',
    context: CTX.ms,
    highlight:
      'Recognized for leading team initiatives that strengthened culture, collaboration, and inclusion across the department.',
    details: ['Selected among 500+ employees across the department.'],
  },
  {
    title: 'IST Circle of Excellence Award',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2023-11',
    context: CTX.ms,
    highlight:
      'Awarded for outstanding contribution to the firm’s “Give Back” value and cross-functional leadership at scale.',
    details: [
      'Competed with 1,500+ employees; led a firmwide engagement event in Mumbai.',
      'Coordinated 500+ email threads across global teams; secured compliance & leadership approvals; managed vendors/logistics.',
      'Featured in the Morgan Stanley India Newsletter.',
    ],
  },
  {
    title: 'First in Jeopardy Quiz on Tech Principles',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2023-10',
    context: CTX.msTap,
    highlight: 'Placed 1st in the TAP Jeopardy quiz on tech principles.',
  },
  {
    title: 'Technology Talent Showcase Runner Up',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2023-07',
    context: CTX.msSpringTa,
    highlight: 'Runner up at the internal Technology Talent Showcase.',
  },
  {
    title: 'Pre-Placement Offer (PPO) for Exceptional Performance',
    category: 'Award',
    group: GROUP.morganStanley,
    date: '2022-07',
    context: CTX.msSummerTa,
    highlight: 'Received a PPO based on internship performance and impact.',
  },
];

const publications: Achievement[] = [
  {
    title: 'An Efficient Multifactor Authentication System',
    category: 'Publication',
    group: GROUP.publications,
    year: 2023,
    context: CTX.cipr(2023),
    highlight: 'Research publication on an efficient multifactor authentication approach.',
    details: ['Verma, S., Singh, M., Chaturvedi, K., Tripathy, B.K. · pp. 109–122'],
    link: 'https://link.springer.com/chapter/10.1007/978-981-99-3734-9_10',
  },
  {
    title: 'An Approach to Medical Diagnosis using Smart Chatbot',
    category: 'Publication',
    group: GROUP.publications,
    year: 2022,
    context: CTX.cipr(2022),
    highlight: 'Research publication proposing a medical diagnosis approach using a smart chatbot.',
    details: ['Verma, S., Singh, M., Tiwari, I., Tripathy, B.K. · pp. 43–56'],
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-3089-8_5',
  },
];

const hpair: Achievement[] = [
  {
    title: "HCONF'23 Accepted Delegate",
    category: 'Award',
    group: GROUP.hpair,
    year: 2023,
    context: CTX.hpairHarvard,
    highlight: 'Accepted as a delegate for HCONF 2023.',
  },
  {
    title: 'HPAIR Delegate Scholar',
    category: 'Scholarship',
    group: GROUP.hpair,
    date: '2022-12',
    context: CTX.hpair,
    highlight: 'Selected as an HPAIR delegate to represent and showcase work at Harvard University.',
  },
];

const cmu: Achievement[] = [
  {
    title: "Dean's List (Fall 2025)",
    category: 'Award',
    group: GROUP.cmu,
    date: '2026-01',
    context: CTX.cmu,
    highlight: "Recognized on the Dean's List for Fall 2025.",
  },
];

const vit: Achievement[] = [
  {
    title: 'Graduated with Rank 5, Meritorious Student',
    category: 'Award',
    group: GROUP.vit,
    date: '2023-07',
    context: CTX.vit,
    highlight: 'Graduated with Rank 5 and meritorious student recognition.',
  },
  {
    title: 'Merit Scholarship (Meritorious Student)',
    category: 'Scholarship',
    group: GROUP.vit,
    date: '2023-04',
    context: CTX.vit,
    highlight: 'Awarded for exemplary academic performance across consecutive years.',
  },
  {
    title: 'Merit Scholarship (Dean’s List / Rank Holder)',
    category: 'Scholarship',
    group: GROUP.vit,
    date: '2022-10',
    context: CTX.vit,
    highlight:
      'Recognized as a Dean’s list rank holder for outstanding academic performance (2021–22).',
  },
  {
    title: 'Merit Scholarship (Dean’s List / Rank Holder)',
    category: 'Scholarship',
    group: GROUP.vit,
    date: '2021-10',
    context: CTX.vit,
    highlight:
      'Recognized as a Dean’s list rank holder for outstanding academic performance (2020–21).',
  },
];

const amity: Achievement[] = [
  {
    title: 'Excellence in Academics',
    category: 'Award',
    group: GROUP.amity,
    year: 2018,
    context: CTX.amityXii,
    highlight: 'Recognized for academic excellence.',
  },
  {
    title: 'Certificate of Merit (CBSE)',
    category: 'Award',
    group: GROUP.amity,
    year: 2016,
    context: CTX.amityX,
    highlight: 'Received a Certificate of Merit.',
  },
];

const scholarships: Achievement[] = [
  {
    title: 'IET Regional Scholar',
    category: 'Scholarship',
    group: GROUP.scholarships,
    date: '2022-09',
    context: CTX.iet,
    highlight: 'Selected among the top 30 candidates nationwide for scholarship support.',
  },
  {
    title: 'ISET 2022 Singapore Scholarship',
    category: 'Scholarship',
    group: GROUP.scholarships,
    date: '2022-04',
    context: CTX.lwt,
    highlight: 'Scholarship winner to present startup ideas in Singapore.',
  },
  {
    title: 'Udacity Scholarship (AWS ML Nanodegree Access)',
    category: 'Scholarship',
    group: GROUP.scholarships,
    date: '2020-12',
    context: CTX.udacity,
    highlight: 'Scholarship granting access to an AWS Machine Learning Nanodegree program.',
  },
];

const certifications: Achievement[] = [
  {
    title: 'Google Cloud Professional Machine Learning Engineer',
    category: 'Certification',
    group: GROUP.certifications,
    date: '2023-12',
    context: CTX.gcp,
    highlight: 'Professional certification in machine learning engineering on Google Cloud.',
  },
  {
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    category: 'Certification',
    group: GROUP.certifications,
    date: '2023-12',
    context: CTX.microsoft,
    highlight: 'Validated foundational knowledge of Azure services and cloud concepts.',
  },
  {
    title: 'Deep Learning Specialization',
    category: 'Certification',
    group: GROUP.certifications,
    date: '2022-12',
    context: CTX.dlai,
    highlight: 'Completed specialization covering neural networks and deep learning fundamentals.',
  },
  {
    title: 'Gold Certified AI Foundation',
    category: 'Certification',
    group: GROUP.certifications,
    date: '2021-08',
    context: CTX.skillUp,
    highlight: 'Certified AI foundations with gold-level credential.',
  },
  {
    title: 'Mass AI Workshop Participation (Guinness World Records)',
    category: 'Certification',
    group: GROUP.certifications,
    date: '2021-04',
    context: CTX.guvi,
    highlight: 'Participation in a record-setting mass AI workshop.',
  },
];

const hackathons: Achievement[] = [
  {
    title: 'First Overall - Support-a-Thon',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-12',
    context: CTX.mlh,
    highlight: 'Won first overall; led a team of 4 building a healthcare solution.',
  },
  {
    title: 'Winner - International Coding Contest (We Code)',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-11',
    context: CTX.graphicEra,
    highlight: 'Placed 1st, demonstrating strong problem-solving under time constraints.',
  },
  {
    title: 'ET Campus Coding Star Winner',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-10',
    context: CTX.et,
    highlight: 'Winner in the ET Campus Coding Star League (Season 5).',
  },
  {
    title: "2nd Runner Up - Ureckon'22 (Ideation Challenge)",
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-04',
    context: CTX.uem,
    highlight: 'Placed 3rd in the ideation challenge.',
  },
  {
    title: 'Winner - VTHacks IX (Best Use of Google Cloud)',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-02',
    context: CTX.vt,
    highlight: 'Won Best Use of Google Cloud for an integrated event-planning web application.',
  },
  {
    title: 'Winner - CUHackit 2022 (Best Use of Data)',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-01',
    context: CTX.clemson,
    highlight: 'Won Best Use of Data; built a MERN stack website.',
  },
  {
    title: 'Winner - Hacknado (Best Climate Crisis Hack)',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2022-01',
    context: CTX.mlh,
    highlight: 'Won Best Climate Crisis Hack for an eco-friendly shipping UX concept.',
  },
  {
    title: 'Winner - CodeX 2.0',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2021-10',
    context: CTX.nitPatna,
    highlight: 'Placed 1st in a 2-hour competitive coding contest.',
  },
  {
    title: 'Winner - Ideate 6.0',
    category: 'Hackathon',
    group: GROUP.hackathons,
    date: '2021-10',
    context: CTX.ssn,
    highlight: 'Placed 1st in the Idea-thon.',
  },
];

const toastmasters: Achievement[] = [
  {
    title: 'Triple Crown Award Winner',
    category: 'Award',
    group: GROUP.toastmasters,
    date: '2022-06',
    context: CTX.toastmasters,
    highlight: 'Recognized for earning three educational achievements within a single program year.',
  },
  {
    title: 'President’s Distinguished Club',
    category: 'Award',
    group: GROUP.toastmasters,
    date: '2022-04',
    context: CTX.toastmasters,
    highlight:
      'Club recognition for exceptional performance; also received Excellence in Training and related club awards.',
  },
  {
    title: 'International Speech Contest (2nd Runner Up)',
    category: 'Award',
    group: GROUP.toastmasters,
    date: '2022-03',
    context: CTX.toastmasters,
    highlight: 'Placed 2nd runner up at the Area level International Speech Contest.',
  },
];

const leadership: Achievement[] = [
  {
    title: 'Invited Speaker - Long Beach Immersive Summit',
    category: 'Leadership',
    group: GROUP.leadership,
    date: '2023-10',
    context: CTX.wwt,
    highlight: 'Delivered a keynote on Perception vs Perspective, promoting women in STEM.',
    details: ['Invited to join as a Committee Advisory Board Member.'],
  },
];

export const allAchievementEntries: Achievement[] = [
  ...morganStanley,
  ...publications,
  ...hpair,
  ...cmu,
  ...vit,
  ...amity,
  ...scholarships,
  ...certifications,
  ...hackathons,
  ...toastmasters,
  ...leadership,
];
