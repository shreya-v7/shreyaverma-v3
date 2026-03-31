import { Helmet } from 'react-helmet-async';
import { getPublicBookingEmbedSrc } from '../../config/workspace';
import NotFound from '../NotFound';

export default function Book() {
  const src = getPublicBookingEmbedSrc();

  if (!src) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Book time | Shreya Verma</title>
        <meta name="description" content="Schedule a meeting" />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Book time</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Pick an open slot. Confirmations sync to my calendar via the scheduling provider.
        </p>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
          <iframe
            title="Booking calendar"
            src={src}
            className="h-[720px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
