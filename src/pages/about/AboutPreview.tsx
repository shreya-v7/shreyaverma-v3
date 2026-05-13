import { Modal } from '../../components/ui/Modal';
import { ModalContent } from '../../components/ui/ModalContent';
import { PreviewSection } from '../../components/ui/PreviewSection';
import { CertificateCard } from '../../components/ui/CertificateCard';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useCompanyModal } from '../../hooks/useCompanyModal';
import { ABOUT_NAV } from '../../config/sectionNav';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { certificates } from '../../data/certificates';
import { achievementsData } from '../../data/achievements';

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
  const top2Achievements = achievementsData.slice(0, 2);

  return (
    <div className="space-y-12">
      <NavigationButtons buttons={ABOUT_NAV} activeId="" />
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

      <section>
        <SectionHeader title="Achievements" viewAllPath="/about/achievements" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {top2Achievements.map((item) => (
            <article
              key={`${item.title}-${item.date ?? item.year ?? ''}`}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                {item.category}
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.context}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-3">
                {item.highlight}
              </p>
            </article>
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

