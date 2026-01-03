import { Project } from '../../types';
import { formatDate } from '../../utils';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <div
      className="group relative aspect-square bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <img
          src={`/${project.image}`}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white/70 text-xs">
              {formatDate(project.date)}
            </p>
          </div>
          
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 rounded-lg font-semibold hover:bg-white dark:hover:bg-neutral-700 transition-colors text-sm"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>View Project</span>
          </a>
        </div>
      </div>
    </div>
);
