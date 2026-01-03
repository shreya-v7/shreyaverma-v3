import React from 'react';
import { Project } from '../../types';
import { formatDate } from '../../utils';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project || !isOpen) return null;

  const isGithubLink = project.link.includes('github.com');
  const LinkIcon = isGithubLink ? FiGithub : FiExternalLink;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>

        {/* Image Header */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-white/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-100 backdrop-blur-sm shadow-lg">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                {formatDate(project.date)}
              </p>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <LinkIcon className="w-5 h-5" />
              <span>View Project</span>
            </a>
          </div>

          <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

