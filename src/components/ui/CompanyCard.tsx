import React from 'react';
import { Company } from '../../types';
import { getCompanyDuration } from '../../utils';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
  showAwards?: boolean;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ 
  company, 
  onClick, 
  showAwards = false 
}) => {
  const latestRole = company.roles[0];
  const overallDuration = getCompanyDuration(company.roles);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
    >
      {/* Company/Institution Logo and Name */}
      <div className="flex items-center mb-3">
        <img
          src={`/${company.logo}`}
          alt={`${company.company} Logo`}
          className="h-12 w-12 rounded-lg object-contain mr-3 group-hover:scale-110 transition-transform duration-300"
          width={48}
          height={48}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {company.company}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
            {latestRole.title}
          </p>
        </div>
      </div>

      {/* Duration - Overall company duration */}
      <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-2">
        {overallDuration}
      </p>

      {/* Awards Preview (for Education) */}
      {showAwards && latestRole.awards && (
        <div className="mb-2">
          <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 truncate">
            🏆 {latestRole.awards}
          </p>
        </div>
      )}

      {/* Tech Stack/Subjects Preview (first 3) */}
      {latestRole.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {latestRole.techStack.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
          {latestRole.techStack.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              +{latestRole.techStack.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Hover Indicator */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-5 h-5 text-neutral-400 dark:text-neutral-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
    </div>
  );
};

