import { useLocation } from 'react-router-dom';
import AboutBody from './AboutBody';
import AboutPreview from './AboutPreview';
import { Seo, personJsonLd } from '../../components/seo/Seo';
import { ABOUT_NAV } from '../../config/sectionNav';
import { metaData } from '../../config/config';
import type { SectionType } from '../../types';
import { activeSectionFromPath } from '../../utils';

const sectionTitles = Object.fromEntries(ABOUT_NAV.map((s) => [s.id, s.label])) as Record<
  SectionType,
  string
>;

const sectionDescriptions: Record<SectionType, string> = {
  experience: 'Industry roles in software engineering and ML systems.',
  education: 'Education, coursework, and teaching assistant roles at Carnegie Mellon, VIT, and Amity.',
  research: 'Research on learned orchestration, peer-reviewed papers, and applied ML internships.',
  leadership: 'Student ambassador, community, and speaking roles.',
  honors: 'Awards, publications, scholarships, hackathons, speaking, and certifications.',
};

interface AboutProps {
  section?: SectionType;
}

export default function About({ section }: AboutProps) {
  const { pathname } = useLocation();
  const active = section
    ? activeSectionFromPath(pathname, ABOUT_NAV, section)
    : undefined;
  const title = active ? `About - ${sectionTitles[active]} | ${metaData.name}` : `About | ${metaData.name}`;
  const description = active
    ? sectionDescriptions[active]
    : 'About - Industry, Education, Research, Leadership, and Honors';

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={pathname}
        ogType="profile"
        jsonLd={personJsonLd()}
      />
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">About</h1>
        {!section && (
          <p className="mb-6">
            Curious about my journey? I have put in a lot of hard work. Sherrii, the floating bubble,
            rotates through short notes about school, work, and what I am building. 
          </p>
        )}
        {section ? <AboutBody /> : <AboutPreview />}
      </div>
    </>
  );
}
