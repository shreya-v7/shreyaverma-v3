import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SectionType } from '../../types';
import Experience from './experience';
import Education from './education';
import CertList from './certlist';

export default function AboutBody() {
  const [activeSection, setActiveSection] = useState<SectionType>('experience');

  const sections: Array<{ id: SectionType; label: string }> = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <div>
      {/* Section Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {sections.map((section) => (
          <Button
            key={section.id}
            active={activeSection === section.id}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </Button>
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
