import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { FiMail, FiUser, FiLinkedin } from 'react-icons/fi';
import { getPublicBookingEmbedSrc } from '../../config/workspace';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'shreya.verma2000@gmail.com', href: 'mailto:shreya.verma2000@gmail.com' },
  { icon: FiUser, label: 'Name', value: 'Shreya Verma' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'https://in.linkedin.com/in/shreya-verma-1sv', href: 'https://in.linkedin.com/in/shreya-verma-1sv', external: true },
];

export default function Contact() {
  const bookingEnabled = Boolean(getPublicBookingEmbedSrc());

  return (
    <>
      <Helmet>
        <title>Contact | Shreya Verma</title>
        <meta name="description" content="Let's have a quick chat" />
      </Helmet>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
        <p className="mb-6">Feel free to reach out to me through any of the following methods:</p>
        {bookingEnabled ? (
          <p className="mb-6 text-sm">
            <Link to="/book" className="font-medium text-neutral-900 underline underline-offset-2 dark:text-neutral-100">
              Book a time on my calendar
            </Link>
          </p>
        ) : null}
        <div className="flex flex-col space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, href, external }) => (
            <div key={label} className="flex items-center">
              <Icon className="h-6 w-6 mr-2 text-neutral-700 dark:text-neutral-300" />
              <span>
                {label}: {href ? <a href={href} className="text-neutral-900 underline underline-offset-2 dark:text-neutral-100" {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>{value}</a> : <span className="text-neutral-900 dark:text-neutral-100">{value}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

