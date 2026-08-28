import { Company } from '../../types';
import { stableTagColor } from '../../utils';
import { SiteImage } from './SiteImage';

interface CompanyRolesProps {
  company: Company;
  techStackLabel?: string;
  compact?: boolean;
}

export const CompanyRoles = ({
  company,
  techStackLabel = 'Tech Stack:',
  compact = false,
}: CompanyRolesProps) => (
  <div className={compact ? 'space-y-5' : 'space-y-6'}>
    {company.roles.map((role, roleIndex) => (
      <div
        key={`${role.title}-${role.duration}`}
        className="border-b border-neutral-200 pb-5 last:border-b-0 last:pb-0 dark:border-neutral-700"
      >
        <div className="mb-2">
          <h3
            className={`font-semibold text-neutral-900 dark:text-neutral-100 ${compact ? 'text-base' : 'mb-1 text-xl'}`}
          >
            {role.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{role.duration}</p>
        </div>
        <ul className="mt-3 list-inside list-disc space-y-2 text-neutral-700 dark:text-neutral-300">
          {role.content.map((point) => (
            <li key={point} className="text-sm leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
        {role.awards && (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="mb-1 text-sm font-semibold text-yellow-900 dark:text-yellow-200">🏆 Awards & Recognition</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">{role.awards}</p>
          </div>
        )}
        {role.techStack.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{techStackLabel}</p>
            <div className="flex flex-wrap gap-2">
              {role.techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: stableTagColor(item) }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

interface ModalContentProps {
  company: Company;
  techStackLabel?: string;
}

export const ModalContent = ({ company, techStackLabel = 'Tech Stack:' }: ModalContentProps) => (
  <div className="space-y-6">
    <div className="flex items-center border-b border-neutral-200 pb-4 dark:border-neutral-700">
      <SiteImage
        src={`/${company.logo}`}
        alt={`${company.company} Logo`}
        className="mr-4 h-16 w-16 rounded-lg object-contain"
        width={64}
        height={64}
      />
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{company.company}</h2>
    </div>
    <CompanyRoles company={company} techStackLabel={techStackLabel} />
  </div>
);
