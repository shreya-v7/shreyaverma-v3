import { useLocation } from 'react-router-dom';
import { NavigationButtons } from './NavigationButtons';
import type { ReactNode } from 'react';

interface Section {
  id: string;
  label: string;
  path: string;
}

interface SectionRouterProps<T extends string> {
  sections: Section[];
  renderSection: (activeSection: T) => ReactNode;
  getActiveSection: (pathname: string) => T;
}

export const SectionRouter = <T extends string>({
  sections,
  renderSection,
  getActiveSection,
}: SectionRouterProps<T>) => {
  const { pathname } = useLocation();
  const activeSection = getActiveSection(pathname);

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
