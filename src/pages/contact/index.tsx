import { FiMail, FiLinkedin } from 'react-icons/fi';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { Seo } from '../../components/seo/Seo';
import { metaData, socialLinks } from '../../config/config';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'shreya.verma2000@gmail.com', href: socialLinks.email },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/shreya-verma-1sv', href: socialLinks.linkedin, external: true },
  { icon: FaXTwitter, label: 'Twitter', value: 'x.com/shreyasapphire', href: socialLinks.twitter, external: true },
  { icon: FaInstagram, label: 'Instagram', value: 'instagram.com/shreyaver.ma', href: socialLinks.instagram, external: true },
];

export default function Contact() {
  return (
    <>
      <Seo
        title={`Contact | ${metaData.name}`}
        description="Let's have a quick chat"
        path="/contact"
      />
      <div>
        <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
        <p className="mb-6">Feel free to reach out to me through any of the following methods:</p>
        <div className="flex flex-col space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, href, external }) => (
            <div key={label} className="flex min-w-0 items-start sm:items-center">
              <Icon className="mr-2 mt-0.5 h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-300 sm:mt-0" />
              <span className="min-w-0 break-words">
                {label}: {href ? <a href={href} className="text-neutral-900 underline underline-offset-2 dark:text-neutral-100" {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>{value}</a> : <span className="text-neutral-900 dark:text-neutral-100">{value}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
