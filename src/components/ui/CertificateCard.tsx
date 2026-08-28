import { Certificate } from '../../types';
import { formatDate } from '../../utils';
import { SiteImage } from './SiteImage';

export const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
    <div className="mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
      <SiteImage
        src={certificate.image}
        alt={certificate.title}
        className="h-full w-full object-contain"
        width={640}
        height={480}
      />
    </div>
    <h3 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
      {certificate.title}
    </h3>
    <p className="text-xs text-neutral-500 dark:text-neutral-500">{formatDate(certificate.date)}</p>
  </div>
);
