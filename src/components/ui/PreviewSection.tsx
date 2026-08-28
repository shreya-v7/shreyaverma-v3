import { Company } from '../../types';
import { CompanyCard } from './CompanyCard';
import { SectionHeader } from './SectionHeader';

interface PreviewSectionProps {
  title: string;
  viewAllPath: string;
  items: Company[];
  gridCols?: string;
  showAwards?: boolean;
  onCardClick: (company: Company) => void;
}

export const PreviewSection = ({
  title,
  viewAllPath,
  items,
  gridCols = 'grid-cols-1 md:grid-cols-2',
  showAwards = false,
  onCardClick,
}: PreviewSectionProps) => {
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
