import { Modal } from '../../components/ui/Modal';
import { ModalContent } from '../../components/ui/ModalContent';
import { PreviewSection } from '../../components/ui/PreviewSection';
import { NavigationButtons } from '../../components/ui/NavigationButtons';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useCompanyModal } from '../../hooks/useCompanyModal';
import { ABOUT_NAV } from '../../config/sectionNav';
import { getExperienceHighlights } from '../../data/experience';
import { educationData } from '../../data/education';
import { getLeadershipHighlights } from '../../data/leadership';
import { achievementsData } from '../../data/achievements';
import { projects } from '../../data/projects';

export default function AboutPreview() {
  const {
    selectedCompany,
    handleCardClick,
    handleCloseModal,
    techStackLabel,
  } = useCompanyModal();

  const top2Experience = getExperienceHighlights();
  const top2Education = educationData.slice(0, 2);
  const topLeadership = getLeadershipHighlights().slice(0, 2);
  const adobe = projects.find((p) => p.title.startsWith('Learned Orchestration'));
  const firstPub = achievementsData.find((a) => a.title.includes('Medical Diagnosis'));
  const previewResearch = [
    adobe
      ? { kind: 'Capstone · in progress', title: adobe.title, blurb: adobe.description }
      : null,
    firstPub
      ? { kind: 'Publication', title: firstPub.title, blurb: firstPub.highlight }
      : null,
  ].filter((item): item is { kind: string; title: string; blurb: string } => item != null);
  const honorsPreview = [
    achievementsData.find((a) => a.title === 'Google Agentic AI Day Finalist'),
    achievementsData.find((a) => a.title === 'Best Innovative Project'),
  ].filter((item): item is (typeof achievementsData)[number] => item != null);

  return (
    <div className="space-y-12">
      <NavigationButtons buttons={ABOUT_NAV} activeId="" />
      <PreviewSection
        title="Industry"
        viewAllPath="/about/experience"
        items={top2Experience}
        gridCols="grid-cols-1"
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
        <SectionHeader title="Research" viewAllPath="/about/research" />
        <div className="grid grid-cols-1 gap-4">
          {previewResearch.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                {item.kind}
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-3">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>

      <PreviewSection
        title="Leadership"
        viewAllPath="/about/leadership"
        items={topLeadership}
        gridCols="grid-cols-1"
        onCardClick={handleCardClick}
      />

      <section>
        <SectionHeader title="Honors" viewAllPath="/about/honors" />
        <div className="grid grid-cols-1 gap-4">
          {honorsPreview.map((item) => (
            <article
              key={`${item.title}-${item.date ?? item.year ?? ''}`}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                {item.category}
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
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
            techStackLabel={techStackLabel}
          />
        )}
      </Modal>
    </div>
  );
}

