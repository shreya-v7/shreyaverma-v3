import type { ComponentType } from 'react';
import type { SectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Experience from './experience';
import Education from './education';
import Research from './research';
import Leadership from './leadership';
import Honors from './honors';
import { ABOUT_NAV } from '../../config/sectionNav';
import { activeSectionFromPath } from '../../utils';

const SECTION_COMPONENTS: Record<SectionType, ComponentType> = {
  experience: Experience,
  education: Education,
  research: Research,
  leadership: Leadership,
  honors: Honors,
};

export default function AboutBody() {
  return (
    <SectionRouter
      sections={ABOUT_NAV}
      renderSection={(id) => {
        const C = SECTION_COMPONENTS[id] ?? Experience;
        return <C />;
      }}
      getActiveSection={(pathname) => activeSectionFromPath(pathname, ABOUT_NAV, 'experience')}
    />
  );
}
