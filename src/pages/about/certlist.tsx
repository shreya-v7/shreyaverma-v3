import { useState } from 'react';
import { certificates } from '../../data/certificates';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { Button } from '../../components/ui/Button';

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
          <Button onClick={() => setVisibleCount(prev => prev + 4)}>Load More</Button>
        </div>
      )}
    </section>
  );
}
