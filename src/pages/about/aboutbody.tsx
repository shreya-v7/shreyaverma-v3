import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SectionType } from '../../types';
import { BUTTON_BASE_CLASSES, BUTTON_ACTIVE_CLASSES, BUTTON_INACTIVE_CLASSES } from '../../utils/constants';
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
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.path}
            className={`${BUTTON_BASE_CLASSES} ${activeSection === section.id ? BUTTON_ACTIVE_CLASSES : BUTTON_INACTIVE_CLASSES}`}
          >
            {section.label}
          </Link>
        ))}
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
