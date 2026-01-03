import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/ui/Modal';
import { ModalContent } from '../../components/ui/ModalContent';
import { PreviewSection } from '../../components/ui/PreviewSection';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { useCompanyModal } from '../../hooks/useCompanyModal';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { certificates } from '../../data/certificates';
import { SectionType } from '../../types';

export default function AboutPreview() {
  const {
    selectedCompany,
    handleCardClick,
    handleCloseModal,
    colors,
    isClient,
    techStackLabel,
  } = useCompanyModal();

  const top2Experience = experienceData.slice(0, 2);
  const top2Education = educationData.slice(0, 2);
  const top2Certificates = certificates.slice(0, 2);

  const sections: Array<{ id: SectionType; label: string; path: string }> = [
    { id: 'experience', label: 'Experience', path: '/about/experience' },
    { id: 'education', label: 'Education', path: '/about/education' },
    { id: 'certifications', label: 'Certifications', path: '/about/certifications' },
  ];

  return (
    <div className="space-y-12">
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {sections.map((section) => {
          const baseClasses = 'px-4 py-2 text-lg font-medium rounded-md transition-colors duration-300 no-underline';
          const variantClasses = 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600';
          
          return (
            <Link
              key={section.id}
              to={section.path}
              className={`${baseClasses} ${variantClasses}`}
            >
              {section.label}
            </Link>
          );
        })}
      </div>
      <PreviewSection
        title="Experience"
        viewAllPath="/about/experience"
        items={top2Experience}
        gridCols="grid-cols-1 md:grid-cols-2"
        onCardClick={handleCardClick}
      />

      <PreviewSection
        title="Education"
        viewAllPath="/about/education"
        items={top2Education}
        gridCols="grid-cols-1"
        showAwards={true}
        onCardClick={handleCardClick}
      />

      <section>
        <SectionHeader title="Certifications" viewAllPath="/about/certifications" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {top2Certificates.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))}
        </div>
      </section>

      <Modal isOpen={selectedCompany !== null} onClose={handleCloseModal}>
        {selectedCompany && (
          <ModalContent
            company={selectedCompany}
            colors={colors}
            isClient={isClient}
            techStackLabel={techStackLabel}
          />
        )}
      </Modal>
    </div>
  );
}

