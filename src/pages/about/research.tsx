import { FiExternalLink } from 'react-icons/fi';
import { researchItems, type ResearchKind } from '../../data/research';
import { relatedResearchHackathon, relatedResearchProjects } from '../../data/selected';
import { SkillChips } from '../../components/ui/SkillChips';
import { HighlightCard } from '../../components/ui/HighlightCard';

const KIND_ORDER: ResearchKind[] = ['Current', 'Publication', 'Internship'];

const KIND_LABEL: Record<ResearchKind, string> = {
  Current: 'Current work',
  Publication: 'Publications',
  Internship: 'Research roles',
};

export default function Research() {
  return (
    <section id="research" className="space-y-10">
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Work at the intersection of models and systems: learned orchestration for research agents,
        peer-reviewed security and NLP papers, and applied internships in computational modeling
        and wireless ML.
      </p>

      {KIND_ORDER.map((kind) => {
        const items = researchItems.filter((item) => item.kind === kind);
        if (items.length === 0) return null;
        return (
          <div key={kind} className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              {KIND_LABEL[kind]}
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={`${item.title}-${item.date}`}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                    {item.venue}
                  </p>
                  <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                    <time className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 sm:text-right">
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {item.summary}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {item.libraries?.length ? (
                    <div className="mt-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                        Libraries
                      </p>
                      <SkillChips items={item.libraries} />
                    </div>
                  ) : item.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                      {item.kind === 'Publication' ? 'Read the paper' : 'Open link'}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        );
      })}

      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Related agentic work
        </h2>
        <div className="space-y-3">
          {relatedResearchHackathon ? (
            <HighlightCard
              kind="Hackathon"
              title={relatedResearchHackathon.title}
              blurb={relatedResearchHackathon.highlight}
              href={relatedResearchHackathon.link}
              external={Boolean(relatedResearchHackathon.link)}
            />
          ) : null}
          {relatedResearchProjects.map((project) => (
            <HighlightCard
              key={project.title}
              kind={project.tags.includes('Agentic') ? 'Agentic' : 'Project'}
              title={project.title}
              blurb={project.description}
              href={project.link}
              external
            />
          ))}
        </div>
      </div>
    </section>
  );
}
