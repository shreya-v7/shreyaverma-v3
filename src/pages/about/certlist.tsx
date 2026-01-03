import { useState } from 'react';
import { certificates } from '../../data/certificates';
import { CertificateCard } from '../../components/ui/CertificateCard';

export default function CertList() {
  const [visibleCount, setVisibleCount] = useState(4);
  return (
    <section id="certificates">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.slice(0, visibleCount).map((cert, index) => (
          <CertificateCard key={index} certificate={cert} />
        ))}
      </div>
      {visibleCount < certificates.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
