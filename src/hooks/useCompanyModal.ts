import { useState, useMemo } from 'react';
import { Company } from '../types';
import { useTechStackColors } from './useTechStackColors';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

interface UseCompanyModalOptions {
  customTechStackLabel?: string;
}

interface UseCompanyModalReturn {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  handleCardClick: (company: Company) => void;
  handleCloseModal: () => void;
  colors: Record<string, string>;
  isClient: boolean;
  techStackLabel: string;
}

export const useCompanyModal = (options?: UseCompanyModalOptions): UseCompanyModalReturn => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  const { colors: expColors, isClient: expIsClient } = useTechStackColors(experienceData);
  const { colors: eduColors, isClient: eduIsClient } = useTechStackColors(educationData);

  const handleCardClick = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  const { colors, isClient, techStackLabel } = useMemo(() => {
    if (!selectedCompany) {
      return { 
        colors: {}, 
        isClient: false, 
        techStackLabel: options?.customTechStackLabel || 'Tech Stack:' 
      };
    }

    const isEducation = educationData.some(edu => edu.company === selectedCompany.company);
    
    return {
      colors: isEducation ? eduColors : expColors,
      isClient: isEducation ? eduIsClient : expIsClient,
      techStackLabel: options?.customTechStackLabel || (isEducation ? 'Subjects/Courses:' : 'Tech Stack:'),
    };
  }, [selectedCompany, expColors, eduColors, expIsClient, eduIsClient, options?.customTechStackLabel]);

  return {
    selectedCompany,
    setSelectedCompany,
    handleCardClick,
    handleCloseModal,
    colors,
    isClient,
    techStackLabel,
  };
};

