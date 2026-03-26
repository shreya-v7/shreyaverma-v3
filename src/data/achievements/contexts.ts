/** Issuer / venue line (shown under each title). */
export const CTX = {
  ms: 'Morgan Stanley',
  msTap: 'Morgan Stanley · Technology Analyst Program (TAP)',
  msSpringTa: 'Morgan Stanley · Spring Technology Analyst',
  msSummerTa: 'Morgan Stanley · Summer Technology Analyst',
  cipr: (year: number) =>
    `CIPR ${year} · Computational Intelligence in Pattern Recognition`,
  vit: 'Vellore Institute of Technology',
  iet: 'IET',
  lwt: 'Learn While Travelling (LWT)',
  udacity: 'Udacity',
  gcp: 'Google Cloud',
  microsoft: 'Microsoft',
  dlai: 'DeepLearning.AI',
  skillUp: 'SkillUp',
  guvi: 'GUVI',
  mlh: 'Major League Hacking (MLH)',
  hpair: 'Harvard Project for Asian and International Relations (HPAIR)',
  hpairHarvard: 'Harvard University (HPAIR)',
  cmu: 'Carnegie Mellon University',
  amityXii: 'Amity International School (AISSCE XII)',
  amityX: 'Amity International School (AISSCE X)',
  graphicEra: 'Graphic Era Hill University',
  et: 'Economic Times',
  uem: 'University of Engineering and Management (UEM), Kolkata',
  vt: 'Virginia Tech',
  clemson: 'Clemson University',
  nitPatna: 'NIT Patna',
  ssn: 'SSN College of Engineering',
  toastmasters: 'Toastmasters International',
  wwt: 'Wonder Women Tech Network',
} as const;

/** Section labels for clustering when a category filter is active. */
export const GROUP = {
  morganStanley: 'Morgan Stanley',
  publications: 'Research publications',
  hpair: 'Harvard / HPAIR',
  cmu: 'Carnegie Mellon University',
  vit: 'Vellore Institute of Technology',
  amity: 'Amity International School',
  scholarships: 'Scholarships & fellowships',
  certifications: 'Certifications',
  hackathons: 'Hackathons & competitions',
  toastmasters: 'Toastmasters International',
  leadership: 'Leadership & speaking',
} as const;

/** Order for clustering when a single category filter is active. */
export const ACHIEVEMENT_GROUP_ORDER: string[] = [
  GROUP.morganStanley,
  GROUP.publications,
  GROUP.hpair,
  GROUP.cmu,
  GROUP.vit,
  GROUP.amity,
  GROUP.scholarships,
  GROUP.certifications,
  GROUP.hackathons,
  GROUP.toastmasters,
  GROUP.leadership,
];

export function achievementGroupSortIndex(group: string | undefined): number {
  const g = group ?? '';
  const i = ACHIEVEMENT_GROUP_ORDER.indexOf(g);
  return i === -1 ? 999 : i;
}
