import { Modal } from '../../components/ui/Modal';
import { ModalContent } from '../../components/ui/ModalContent';
import { PreviewSection } from '../../components/ui/PreviewSection';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { SectionHeader } from '../../components/ui/SectionHeader';
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

  const sections = [
    { id: 'experience' as SectionType, label: 'Experience', path: '/about/experience' },
    { id: 'education' as SectionType, label: 'Education', path: '/about/education' },
    { id: 'certifications' as SectionType, label: 'Certifications', path: '/about/certifications' },
  ];

  return (
    <div className="space-y-12">
      <NavigationButtons
        buttons={sections}
        activeId=""
      />
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

