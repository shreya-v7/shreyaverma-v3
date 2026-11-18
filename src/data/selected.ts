import { achievementsData } from './achievements';
import { projects } from './projects';

const relatedTitles = ['Brilliant Banker'] as const;

export const relatedResearchProjects = relatedTitles
  .map((title) => projects.find((project) => project.title === title || project.title.startsWith(title)))
  .filter((project): project is (typeof projects)[number] => project != null);

export const relatedResearchHackathon = achievementsData.find(
  (item) => item.title === 'Top 10 of 700+ Teams — Google Cloud Agentic AI Day',
);
