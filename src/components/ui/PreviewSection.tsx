import React from 'react';
import { Company } from '../../types';
import { SectionHeader } from './SectionHeader';
import { CompanyCard } from './CompanyCard';

interface PreviewSectionProps {
  title: string;
  viewAllPath: string;
  items: Company[];
  gridCols?: string;
  showAwards?: boolean;
  onCardClick: (company: Company) => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  title,
  viewAllPath,
  items,
  gridCols = 'grid-cols-1 md:grid-cols-2',
  showAwards = false,
  onCardClick,
}) => {
  if (items.length === 0) return null;

  return (
    <section>
      <SectionHeader title={title} viewAllPath={viewAllPath} />
      <div className={`grid ${gridCols} gap-4`}>
        {items.map((item) => (
          <CompanyCard
            key={item.company}
            company={item}
            onClick={() => onCardClick(item)}
            showAwards={showAwards}
          />
        ))}
      </div>
    </section>
  );
};

