import type { ComponentType } from 'react';
import type { SectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Experience from './experience';
import Education from './education';
import CertList from './certlist';
import Achievements from './achievements';
import { ABOUT_NAV } from '../../config/sectionNav';
import { activeSectionFromPath } from '../../utils';

interface AboutBodyProps {
  defaultSection?: SectionType;
}

const SECTION_COMPONENTS: Record<SectionType, ComponentType> = {
  experience: Experience,
  education: Education,
  certifications: CertList,
  achievements: Achievements,
};

export default function AboutBody({ defaultSection = 'experience' }: AboutBodyProps) {
  return (
    <SectionRouter
      sections={ABOUT_NAV}
      defaultSection={defaultSection}
      basePath="/about"
      renderSection={(id) => {
        const C = SECTION_COMPONENTS[id] ?? Experience;
        return <C />;
      }}
      getActiveSection={(pathname) => activeSectionFromPath(pathname, ABOUT_NAV, 'experience')}
    />
  );
}
