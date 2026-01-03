import { Link } from 'react-router-dom';
import { Modal } from '../../components/ui/Modal';
import { ModalContent } from '../../components/ui/ModalContent';
import { PreviewSection } from '../../components/ui/PreviewSection';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { useCompanyModal } from '../../hooks/useCompanyModal';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { certificates } from '../../data/certificates';
import { SectionType } from '../../types';
import { BUTTON_BASE_CLASSES, BUTTON_INACTIVE_CLASSES } from '../../utils/constants';

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

  const sections = [
    { id: 'experience' as SectionType, label: 'Experience', path: '/about/experience' },
    { id: 'education' as SectionType, label: 'Education', path: '/about/education' },
    { id: 'certifications' as SectionType, label: 'Certifications', path: '/about/certifications' },
  ];

  return (
    <div className="space-y-12">
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.path}
            className={`${BUTTON_BASE_CLASSES} ${BUTTON_INACTIVE_CLASSES}`}
          >
            {section.label}
          </Link>
        ))}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Certifications
          </h2>
          <Link
            to="/about/certifications"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            View All →
          </Link>
        </div>
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

