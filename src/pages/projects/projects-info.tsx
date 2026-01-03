import React, { useState, useMemo } from 'react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { ProjectModal } from '../../components/ui/ProjectModal';

export default function ProjectsInfo() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web', 'App', 'Talk', 'Research'];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(activeCategory));
  }, [activeCategory]);

  const sortedProjects = useMemo(
    () =>
      [...filteredProjects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [filteredProjects]
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="text-neutral-900 dark:text-neutral-100">
      {/* Filter Buttons */}
      <div className="mb-6 flex justify-center items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Count */}
      <div className="mb-6 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sortedProjects.length}</span> project{sortedProjects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No projects found in this category.
          </p>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
      />
    </section>
  );
}
