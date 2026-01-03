import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  viewAllPath: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, viewAllPath }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <Link
        to={viewAllPath}
        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        View All →
      </Link>
    </div>
  );
};

