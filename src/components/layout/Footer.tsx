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
    <div className="flex gap-3.5 text-lg transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} />
      <SocialLink href={socialLinks.email} icon={FiMail} />
      <SocialLink href={socialLinks.code} icon={FaCode} />
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <small className="mt-16 flex flex-wrap items-center justify-between gap-3 text-neutral-900 dark:text-neutral-100 lg:mt-24">
        <span>
          <time>© {YEAR}</time>{" "}
          <a className="no-underline" href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            {metaData.title}
          </a>
        </span>
        <SocialLinks />
      </small>
    </footer>
  );
}
