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
  compact?: boolean;
}

export const Section = ({
  data,
  sectionId,
  gridCols = 'grid-cols-1 sm:grid-cols-2',
  showAwards = false,
  techStackLabel = 'Tech Stack:',
  compact = false,
}: SectionProps) => {
  const {
    selectedCompany,
    handleCardClick,
    handleCloseModal,
    techStackLabel: modalTechStackLabel,
  } = useCompanyModal(techStackLabel);

  return (
    <section id={sectionId}>
      <div className={`grid ${gridCols} gap-3`}>
        {data.map((company) => (
          <CompanyCard
            key={company.company}
            company={company}
            onClick={() => handleCardClick(company)}
            showAwards={showAwards}
            compact={compact}
          />
        ))}
      </div>

      <Modal isOpen={selectedCompany !== null} onClose={handleCloseModal}>
        {selectedCompany && (
          <ModalContent
            company={selectedCompany}
            techStackLabel={modalTechStackLabel}
          />
        )}
      </Modal>
    </section>
  );
};
