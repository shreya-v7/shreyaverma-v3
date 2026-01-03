import React, { useState } from 'react';
import { certificates } from '../../data/certificates';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { Button } from '../../components/ui/Button';

export default function CertList() {
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const visibleCertificates = certificates.slice(0, visibleCount);
  const hasMore = visibleCount < certificates.length;

  return (
    <section id="certificates">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleCertificates.map((cert, index) => (
          <CertificateCard key={index} certificate={cert} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
