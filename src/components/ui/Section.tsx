import { Company } from '../../types';
import { CompanyCard } from './CompanyCard';
import { Modal } from './Modal';
import { ModalContent } from './ModalContent';
import { useCompanyModal } from '../../hooks/useCompanyModal';

interface SectionProps {
  data: Company[];
  sectionId: string;
  gridCols?: string;
  showAwards?: boolean;
  techStackLabel?: string;
}

export const Section = ({
  data,
  sectionId,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  showAwards = false,
  techStackLabel = 'Tech Stack:',
}: SectionProps) => {
  const {
    selectedCompany,
    handleCardClick,
    handleCloseModal,
    colors,
    isClient,
    techStackLabel: modalTechStackLabel,
  } = useCompanyModal(techStackLabel);

  return (
    <section id={sectionId}>
      <div className={`grid ${gridCols} gap-4`}>
        {data.map((company) => (
          <CompanyCard
            key={company.company}
            company={company}
            onClick={() => handleCardClick(company)}
            showAwards={showAwards}
          />
        ))}
      </div>

      <Modal isOpen={selectedCompany !== null} onClose={handleCloseModal}>
        {selectedCompany && (
          <ModalContent
            company={selectedCompany}
            colors={colors}
            isClient={isClient}
            techStackLabel={modalTechStackLabel}
          />
        )}
      </Modal>
    </section>
  );
};

