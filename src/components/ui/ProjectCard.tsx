import { Project } from '../../types';
import { formatDate } from '../../utils';
import { FiExternalLink } from 'react-icons/fi';
import { SiteImage } from './SiteImage';

interface ProjectCardProps {
  project: Project;
  /** First row on /projects (in the initial viewport). Home featured cards stay lazy. */
  priority?: boolean;
}

export const ProjectCard = ({ project, priority = false }: ProjectCardProps) => (
  <div className="group relative aspect-square bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-full">
        <SiteImage
          src={`/${project.image}`}
          alt={project.title}
          className="h-full w-full object-cover object-center"
          width={640}
          height={640}
          priority={priority}
        />

        <div className="absolute inset-0 flex flex-col justify-between bg-black/75 p-3 opacity-100 transition-opacity duration-300 sm:bg-black/80 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100">
          <div>
            <h3 className="mb-1.5 line-clamp-3 text-sm font-bold leading-snug text-white">
              {project.title}
            </h3>
            <div className="mb-2 flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-white/70">
              {formatDate(project.date)}
            </p>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white dark:bg-neutral-800/95 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            <FiExternalLink className="h-3.5 w-3.5" />
            <span>View Project</span>
          </a>
        </div>
      </div>
    </div>
);
