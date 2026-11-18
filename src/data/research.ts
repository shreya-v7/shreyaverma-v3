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
      'Designing PILOT, a joint policy for evidence retention, pruning, and stopping. PILOT is not yet built; its 1–7B training remains planned.',
      'Implemented a separate PyTorch GRPO trainer for Qwen2.5-3B with LoRA under a fixed 20 GPU-hour budget, validating every 8 steps on 10 held-out questions.',
      'Paused at step 8 with coverage at 25.4% versus a 30.3% untrained baseline. An offline check on 40 training trees showed the reward favored keeping all pages and never stopping; revised rewards remain proposed.',
      'Evaluating quality, latency, token cost, and tool use with DeepResearch Bench and DeepResearchGym. No positive training or efficiency result is claimed.',
    ],
    tags: ['Agentic systems', 'Reinforcement learning', 'Orchestration', 'Evaluation', 'LLMs'],
    libraries: ['PyTorch', 'LoRA', 'GRPO', 'Qwen2.5-3B', 'Google Colab'],
  },
  {
    kind: 'Current',
    title: 'FP4 low-precision training and inference (Needle)',
    venue: 'Carnegie Mellon University · Deep Learning Systems (10-714)',
    date: 'In progress · Fall 2026',
    summary: 'Exploring MXFP4 and NVFP4 training and inference inside Needle, with C++/CUDA kernels and training-stability analysis.',
    details: [
      'Developing packed FP4 storage via pybind11, QuantizedLinear, CUDA quantize-pack, and fused dequantize-matmul/GEMV kernels.',
      'Studying forward, input-gradient, and weight-gradient ablations with stochastic rounding and Hadamard rotation; roofline profiling is in progress.',
      'No measured performance or stability results yet; exact project dates and team attribution remain unconfirmed.',
    ],
    tags: ['ML systems', 'Low-precision numerics', 'CUDA', 'Research'],
    libraries: ['Needle', 'C++', 'CUDA', 'pybind11'],
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
