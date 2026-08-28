import { Company } from '../../types';
import { getCompanyDuration, stableTagColor } from '../../utils';
import { SiteImage } from './SiteImage';
import { SkillChips } from './SkillChips';

interface CompanyCardProps {
  company: Company;
  onClick?: () => void;
  showAwards?: boolean;
  compact?: boolean;
}

function previewSkills(company: Company): string[] {
  if (company.highlights?.length) return company.highlights;
  const seen = new Set<string>();
  const skills: string[] = [];
  for (const role of company.roles) {
    for (const item of role.techStack) {
      if (seen.has(item)) continue;
      seen.add(item);
      skills.push(item);
      if (skills.length === 10) return skills;
    }
  }
  return skills;
}

export const CompanyCard = ({ company, onClick, showAwards = false, compact = false }: CompanyCardProps) => {
  const latestRole = company.roles[0];
  const overallDuration = getCompanyDuration(company.roles);
  const hook = company.hook ?? latestRole.content[0];
  const skills = previewSkills(company);
  const extraRoleCount = company.roles.length - 1;

  const openLabel =
    extraRoleCount > 0
      ? `Open ${company.company}, ${company.roles.length} roles`
      : `Open ${company.company}`;

  if (compact) {
    return (
      <article
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? openLabel : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        className={`rounded-xl border border-neutral-200 bg-white px-4 py-3.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 ${
          onClick
            ? 'cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md'
            : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <SiteImage
            src={`/${company.logo}`}
            alt={`${company.company} Logo`}
            className="h-11 w-11 shrink-0 rounded-lg object-contain"
            width={44}
            height={44}
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {company.company}
            </h3>
            <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">{latestRole.title}</p>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">{overallDuration}</p>
          </div>
          {onClick ? (
            <span
              aria-hidden
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-base text-neutral-500 dark:text-neutral-400"
            >
              →
            </span>
          ) : null}
        </div>

        {hook ? (
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{hook}</p>
        ) : null}
        {latestRole.awards ? (
          <p className="mt-2 truncate text-[11px] font-medium text-amber-800 dark:text-amber-300">
            🏆 {latestRole.awards}
          </p>
        ) : null}
        {skills.length > 0 ? (
          <div className="mt-3">
            <SkillChips items={skills} />
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800 sm:hover:scale-[1.02]"
    >
      <div className="mb-3 flex items-center">
        <SiteImage
          src={`/${company.logo}`}
          alt={`${company.company} Logo`}
          className="mr-3 h-12 w-12 rounded-lg object-contain transition-transform duration-300 group-hover:scale-110"
          width={48}
          height={48}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {company.company}
          </h3>
          <p className="truncate text-sm text-neutral-600 dark:text-neutral-400">
            {latestRole.title}
          </p>
        </div>
      </div>

      <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-500">
        {overallDuration}
      </p>

      {showAwards && latestRole.awards && (
        <div className="mb-2">
          <p className="truncate text-xs font-medium text-yellow-700 dark:text-yellow-400">
            🏆 {latestRole.awards}
          </p>
        </div>
      )}

      {latestRole.techStack.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {latestRole.techStack.slice(0, 3).map((item, index) => {
            const color = stableTagColor(item);
            return (
              <span
                key={index}
                className="rounded-full px-2 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: color }}
              >
                {item}
              </span>
            );
          })}
          {latestRole.techStack.length > 3 && (
            <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
              +{latestRole.techStack.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};
