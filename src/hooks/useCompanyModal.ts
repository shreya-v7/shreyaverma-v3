import { useState } from 'react';
import { Company } from '../types';
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
  const isEducation = selectedCompany ? isEducationEntry(selectedCompany) : false;

  return {
    selectedCompany,
    handleCardClick: (company: Company) => setSelectedCompany(company),
    handleCloseModal: () => setSelectedCompany(null),
    techStackLabel: customTechStackLabel || (isEducation ? 'Subjects/Courses:' : 'Tech Stack:'),
  };
};
