import React, { useState } from 'react';
import { Company } from '../../types';
import { formatDate } from '../../utils';

interface AccordionProps {
  data: Company[];
  colors: Record<string, string>;
  isClient: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ data, colors, isClient }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="flex flex-col space-y-4">
      {data.map((company, index) => (
        <div
          key={company.company}
          className="border border-neutral-300 dark:border-neutral-600 rounded-md shadow-md backdrop-filter backdrop-blur-lg bg-white/30 dark:bg-black/30"
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleAccordionClick(index)}
            className="w-full flex justify-between items-center p-4 bg-neutral-100/10 dark:bg-neutral-800/20 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/20 transition-colors rounded-t-md"
          >
            <div className="flex items-center">
              <img
                src={`/${company.logo}`}
                alt={`${company.company} Logo`}
                className="h-10 w-10 mr-4"
                width={100}
                height={100}
              />
              <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {company.company}
              </span>
            </div>
            <div className="ml-auto text-right">
              <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                {company.roles[0].title}
              </span>
              <br />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {company.roles[0].duration}
              </span>
            </div>
          </button>

          {/* Accordion Content */}
          {activeIndex === index && (
            <div className="p-4 bg-neutral-50/30 dark:bg-neutral-900/20 backdrop-blur-md text-justify">
              {company.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                      {role.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {role.duration}
                  </p>

                  <ul className="mt-2 list-disc list-inside text-neutral-900 dark:text-neutral-100">
                    {role.content.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>

                  {role.awards && (
                    <p className="mt-2 font-semibold text-neutral-900 dark:text-neutral-100">
                      Awards: {role.awards}
                    </p>
                  )}

                  {role.techStack.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap space-x-1">
                        {role.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-1 py-0.5 rounded-full text-white text-xs font-semibold"
                            style={{
                              backgroundColor: isClient ? colors[tech] : undefined,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

