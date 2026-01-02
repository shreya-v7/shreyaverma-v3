import React, { useState, useMemo } from 'react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { formatDate } from '../../utils';

export default function ProjectsInfo() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

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

  return (
    <section className="p-4 text-neutral-900 dark:text-neutral-100">
      {/* Centered Filter Buttons */}
      <div className="mb-4 flex justify-center items-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-2 py-1 rounded-md transition-colors duration-300 
              ${
                activeCategory === category
                  ? 'bg-neutral-800 text-neutral-100'
                  : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, index) => (
          <div
            key={index}
            className="relative bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 dark:bg-neutral-900"
          >
            {/* Project Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />

              {/* Ribbon with Project Title, Date, and Link */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-2">
                <div className="flex justify-between items-center">
                  <div>
                    {/* Project Title */}
                    <h3 className="text-md">{project.title}</h3>
                    {/* Smaller date below title */}
                    <p className="text-xs mt-1">{formatDate(project.date)}</p>
                  </div>

                  {/* Project Link */}
                  <div className="text-right">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-xs hover:underline"
                    >
                      Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
