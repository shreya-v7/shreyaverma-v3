import { useState, useMemo } from 'react';
import { Company } from '../types';
import { useTechStackColors } from './useTechStackColors';
import { generateTechStackColors } from '../utils';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

function isEducationEntry(company: Company): boolean {
  return educationData.some(
    (edu) =>
      edu.company === company.company &&
      edu.roles.some((role) => company.roles.some((r) => r.title === role.title)),
  );
}

export const useCompanyModal = (customTechStackLabel?: string) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { isClient: expIsClient } = useTechStackColors(experienceData);
  const { isClient: eduIsClient } = useTechStackColors(educationData);

  const { colors, isClient, techStackLabel } = useMemo(() => {
    if (!selectedCompany) {
      return { colors: {}, isClient: false, techStackLabel: customTechStackLabel || 'Tech Stack:' };
    }

    const isEducation = isEducationEntry(selectedCompany);

    return {
      colors: generateTechStackColors([selectedCompany]),
      isClient: expIsClient || eduIsClient,
      techStackLabel: customTechStackLabel || (isEducation ? 'Subjects/Courses:' : 'Tech Stack:'),
    };
  }, [selectedCompany, expIsClient, eduIsClient, customTechStackLabel]);

  return {
    selectedCompany,
    handleCardClick: (company: Company) => setSelectedCompany(company),
    handleCloseModal: () => setSelectedCompany(null),
    colors,
    isClient,
    techStackLabel,
  };
};
