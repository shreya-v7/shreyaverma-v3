export type ResearchKind = 'Current' | 'Publication' | 'Internship';

export interface ResearchItem {
  kind: ResearchKind;
  title: string;
  venue: string;
  date: string;
  summary: string;
  details: string[];
  link?: string;
  tags: string[];
  libraries?: string[];
}

export const researchItems: ResearchItem[] = [
  {
    kind: 'Current',
    title: 'Learned Orchestration for Efficient Deep Research Agents',
    venue: 'Carnegie Mellon University x Adobe',
    date: 'Aug 2026 - Present',
    summary:
      'Industry-sponsored CMU capstone on replacing prompted LLM orchestrators with a learned policy for deep-research agents.',
    details: [
      'Replacing prompted LLM orchestrators in deep research agents with a small model trained via reinforcement learning to decide what context to keep, when to prune, and when to stop.',
      'In progress: problem formulation, architecture, baselines, and evaluation (quality, latency, cost, tool use).',
    ],
    tags: ['Agentic systems', 'Reinforcement learning', 'Orchestration', 'Evaluation', 'LLMs'],
    libraries: ['Reinforcement learning', 'LLMs', 'Tool use', 'Evaluation'],
  },
  {
    kind: 'Publication',
    title: 'An Efficient Multifactor Authentication System',
    venue: 'Springer Nature · Computational Intelligence in Pattern Recognition',
    date: 'Sep 1, 2023',
    summary:
      'Research publication on an efficient multifactor authentication approach using genetic image encryption.',
    details: [
      'Verma, S., Singh, M., Chaturvedi, K., Tripathy, B.K. · pp. 109-122',
    ],
    link: 'https://link.springer.com/chapter/10.1007/978-981-99-3734-9_10',
    tags: ['Security', 'Authentication', 'Encryption'],
  },
  {
    kind: 'Publication',
    title: 'An Approach to Medical Diagnosis Using Smart Chatbot',
    venue: 'Springer Nature · Computational Intelligence in Pattern Recognition',
    date: 'Jun 21, 2022',
    summary:
      'Research publication proposing a medical diagnosis approach using a smart chatbot (DiagZone).',
    details: [
      'Verma, S., Singh, M., Tiwari, I., Tripathy, B.K. · pp. 43-56',
    ],
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-3089-8_5',
    tags: ['NLP', 'Healthcare', 'Conversational AI'],
    libraries: ['NLP', 'Conversational AI'],
  },
  {
    kind: 'Internship',
    title: 'PRISM Research Intern',
    venue: 'Samsung R&D',
    date: 'Oct 2021 - Mar 2022',
    summary:
      'Researched optimal base-station transmit power for 5G and 6G systems using machine learning.',
    details: [
      'Ran MATLAB simulations with the 5G toolkit to evaluate power-control strategies.',
    ],
    tags: ['5G/6G', 'MATLAB', 'Machine learning'],
    libraries: ['MATLAB', '5G Toolkit', 'Machine learning'],
  },
];
