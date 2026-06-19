import { Link } from 'react-router-dom';
import { Company } from '../../types';
import { CompanyCard } from './CompanyCard';
import { useTechStackColors } from '../../hooks/useTechStackColors';

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
  const { colors: tagColors, isClient: tagColorsReady } = useTechStackColors(items);

  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
        <Link to={viewAllPath} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          View All →
        </Link>
      </div>
      <div className={`grid ${gridCols} gap-4`}>
        {items.map((item) => (
          <CompanyCard
            key={item.company}
            company={item}
            onClick={() => onCardClick(item)}
            showAwards={showAwards}
            tagColors={tagColors}
            tagColorsReady={tagColorsReady}
          />
        ))}
      </div>
    </section>
  );
};

