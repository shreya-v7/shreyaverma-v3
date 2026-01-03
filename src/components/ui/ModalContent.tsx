import { Company, Role } from '../../types';

interface ModalContentProps {
  company: Company;
  colors: Record<string, string>;
  isClient: boolean;
  techStackLabel?: string;
}

export const ModalContent = ({ company, colors, isClient, techStackLabel = 'Tech Stack:' }: ModalContentProps) => (
  <div className="space-y-6">
    <div className="flex items-center border-b border-neutral-200 dark:border-neutral-700 pb-4">
      <img src={`/${company.logo}`} alt={`${company.company} Logo`} className="h-16 w-16 rounded-lg object-contain mr-4" width={64} height={64} />
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{company.company}</h2>
    </div>
    <div className="space-y-6">
      {company.roles.map((role, roleIndex) => (
        <div key={roleIndex} className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0 last:pb-0">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{role.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{role.duration}</p>
          </div>
          <ul className="mt-3 space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-300">
            {role.content.map((point, pointIndex) => (
              <li key={pointIndex} className="text-sm leading-relaxed">{point}</li>
            ))}
          </ul>
          {role.awards && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">🏆 Awards & Recognition</p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">{role.awards}</p>
            </div>
          )}
          {role.techStack.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{techStackLabel}</p>
              <div className="flex flex-wrap gap-2">
                {role.techStack.map((item, itemIndex) => (
                  <span key={itemIndex} className="px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ backgroundColor: isClient ? colors[item] : '#6b7280' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
