import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SectionType } from '../../types';
import Experience from './experience';
import Education from './education';
import CertList from './certlist';

interface AboutBodyProps {
  defaultSection?: SectionType;
}

export default function AboutBody({ defaultSection = 'experience' }: AboutBodyProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section from URL
  const getActiveSection = (): SectionType => {
    const path = location.pathname;
    if (path.includes('/education')) return 'education';
    if (path.includes('/certifications')) return 'certifications';
    return 'experience';
  };

  const activeSection = getActiveSection();

  const sections: Array<{ id: SectionType; label: string; path: string }> = [
    { id: 'experience', label: 'Experience', path: '/about/experience' },
    { id: 'education', label: 'Education', path: '/about/education' },
    { id: 'certifications', label: 'Certifications', path: '/about/certifications' },
  ];

  // Sync URL with defaultSection prop on mount
  useEffect(() => {
    if (defaultSection && location.pathname === '/about') {
      navigate(`/about/${defaultSection}`, { replace: true });
    }
  }, [defaultSection, location.pathname, navigate]);

  return (
    <div>
      {/* Section Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {sections.map((section) => {
          const baseClasses = 'px-4 py-2 text-lg font-medium rounded-md transition-colors duration-300 no-underline';
          const variantClasses = activeSection === section.id
            ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
            : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200';
          
          return (
            <Link
              key={section.id}
              to={section.path}
              className={`${baseClasses} ${variantClasses}`}
            >
              {section.label}
            </Link>
          );
        })}
      </div>

      {/* Dynamic Section Rendering */}
      <div>
        {activeSection === 'experience' && <Experience />}
        {activeSection === 'education' && <Education />}
        {activeSection === 'certifications' && <CertList />}
      </div>
    </div>
  );
}
