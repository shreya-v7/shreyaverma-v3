import { useMemo, useState } from 'react';
import { projects } from '../../data/projects';
import { FilterPills } from '../../components/ui/FilterPills';
import { ProjectCard } from '../../components/ui/ProjectCard';

const CATEGORIES = ['All', 'AI', 'Research', 'Web', 'Talk'] as const;

export default function ProjectsInfo() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const sortedProjects = useMemo(() => {
    const filtered = activeCategory === 'All'
      ? [...projects]
      : projects.filter(p => p.tags.includes(activeCategory));
    return filtered.sort((a, b) => (b.date ? new Date(b.date).getTime() : Infinity) - (a.date ? new Date(a.date).getTime() : Infinity));
  }, [activeCategory]);

  return (
    <section className="text-neutral-900 dark:text-neutral-100">
      <FilterPills<(typeof CATEGORIES)[number]>
        items={CATEGORIES.map((category) => ({ id: category, label: category }))}
        activeId={activeCategory}
        onChange={setActiveCategory}
      />
      <div className="mb-6 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sortedProjects.length}</span>{' '}
          {sortedProjects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} priority={index < 2} />
        ))}
      </div>
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}
