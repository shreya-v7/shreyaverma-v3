import React from 'react';
import { Certificate } from '../../types';
import { formatDate } from '../../utils';

interface CertificateCardProps {
  certificate: Certificate;
  onClick?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  onClick 
}) => {
  const cardClasses = `
    bg-white dark:bg-neutral-800 
    border border-neutral-200 dark:border-neutral-700 
    rounded-lg p-4 shadow-md
    ${onClick ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div onClick={onClick} className={cardClasses}>
      <img
        src={certificate.image}
        alt={certificate.title}
        className="w-full h-auto rounded-lg mb-3"
      />
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
        {certificate.title}
      </h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-500">
        {formatDate(certificate.date)}
      </p>
    </div>
  );
};

