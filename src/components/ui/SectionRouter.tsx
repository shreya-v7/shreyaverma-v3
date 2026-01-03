import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationButtons } from './NavigationButtons';
import type { ReactNode } from 'react';

interface Section {
  id: string;
  label: string;
  path: string;
}

interface SectionRouterProps<T extends string> {
  sections: Section[];
  defaultSection: T;
  basePath: string;
  renderSection: (activeSection: T) => ReactNode;
  getActiveSection: (pathname: string) => T;
}

export const SectionRouter = <T extends string>({
  sections,
  defaultSection,
  basePath,
  renderSection,
  getActiveSection,
}: SectionRouterProps<T>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = getActiveSection(location.pathname);

  useEffect(() => {
    if (location.pathname === basePath) {
      navigate(`${basePath}/${defaultSection}`, { replace: true });
    }
  }, [defaultSection, location.pathname, navigate, basePath]);

  return (
    <div>
      <NavigationButtons 
        buttons={sections} 
        activeId={activeSection}
      />
      <div>
        {renderSection(activeSection)}
      </div>
    </div>
  );
};

