import { SectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Experience from './experience';
import Education from './education';
import CertList from './certlist';

interface AboutBodyProps {
  defaultSection?: SectionType;
}

export default function AboutBody({ defaultSection = 'experience' }: AboutBodyProps) {
  const sections = [
    { id: 'experience', label: 'Experience', path: '/about/experience' },
    { id: 'education', label: 'Education', path: '/about/education' },
    { id: 'certifications', label: 'Certifications', path: '/about/certifications' },
  ];

  const getActiveSection = (pathname: string): SectionType => {
    if (pathname.includes('/education')) return 'education';
    if (pathname.includes('/certifications')) return 'certifications';
    return 'experience';
  };

  const renderSection = (activeSection: SectionType) => {
    switch (activeSection) {
      case 'experience': return <Experience />;
      case 'education': return <Education />;
      case 'certifications': return <CertList />;
      default: return <Experience />;
    }
  };

  return (
    <SectionRouter
      sections={sections}
      defaultSection={defaultSection}
      basePath="/about"
      renderSection={renderSection}
      getActiveSection={getActiveSection}
    />
  );
}
