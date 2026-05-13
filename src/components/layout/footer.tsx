import type { IconType } from 'react-icons';
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaCode,
} from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { metaData, socialLinks } from '../../config/config';

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }: { href: string; icon: IconType }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} />
      <SocialLink href={socialLinks.email} icon={FiMail} />
      <SocialLink href={socialLinks.code} icon={FaCode} />
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-neutral-900 dark:text-neutral-100">
      <time>© {YEAR}</time>{" "}
      <a className="no-underline" href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        {metaData.title}
      </a>
      <SocialLinks />
    </small>
  );
}
