import { useState, useMemo } from 'react';
import { Company } from '../types';
import { useTechStackColors } from './useTechStackColors';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

export const useCompanyModal = (customTechStackLabel?: string) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { colors: expColors, isClient: expIsClient } = useTechStackColors(experienceData);
  const { colors: eduColors, isClient: eduIsClient } = useTechStackColors(educationData);

  const { colors, isClient, techStackLabel } = useMemo(() => {
    if (!selectedCompany) return { colors: {}, isClient: false, techStackLabel: customTechStackLabel || 'Tech Stack:' };
    const isEducation = educationData.some(edu => edu.company === selectedCompany.company);
    return {
      colors: isEducation ? eduColors : expColors,
      isClient: isEducation ? eduIsClient : expIsClient,
      techStackLabel: customTechStackLabel || (isEducation ? 'Subjects/Courses:' : 'Tech Stack:'),
    };
  }, [selectedCompany, expColors, eduColors, expIsClient, eduIsClient, customTechStackLabel]);

  return {
    selectedCompany,
    handleCardClick: (company: Company) => setSelectedCompany(company),
    handleCloseModal: () => setSelectedCompany(null),
    colors,
    isClient,
    techStackLabel,
  };
};
