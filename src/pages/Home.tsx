import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaCode,
} from 'react-icons/fa6';
import { FiArrowUpRight, FiDownload, FiFileText, FiMail } from 'react-icons/fi';
import { metaData, socialLinks } from '../config/config';
import { Seo, personJsonLd } from '../components/seo/Seo';
import { SiteImage } from '../components/ui/SiteImage';
import { CompanyCard } from '../components/ui/CompanyCard';
import { ProjectCard } from '../components/ui/ProjectCard';
import { BlogCard } from '../components/ui/BlogCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { ModalContent } from '../components/ui/ModalContent';
import { getExperienceHighlights } from '../data/experience';
import { projects } from '../data/projects';
import { DIARY_BLOGS_PATH } from '../config/sectionNav';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useCompanyModal } from '../hooks/useCompanyModal';

const heroSocial = [
  { href: socialLinks.twitter, label: 'X', Icon: FaXTwitter },
  { href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
  { href: socialLinks.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: socialLinks.email, label: 'Email', Icon: FiMail },
  { href: socialLinks.code, label: 'Code', Icon: FaCode },
] as const;

export default function Home() {
  const { posts: blogPosts, loading: blogsLoading } = useBlogPosts(6);
  const industryHighlights = getExperienceHighlights();
  const {
    selectedCompany,
    handleCardClick,
    handleCloseModal,
    techStackLabel,
  } = useCompanyModal();
  const featuredProjects = [
    projects.find((p) => p.title.startsWith('Learned Orchestration')),
    projects.find((p) => p.title.startsWith('FP4')),
    projects.find((p) => p.title === 'Brilliant Banker'),
  ].filter((p): p is (typeof projects)[number] => p != null);

  return (
    <>
      <Seo
        title={metaData.title}
        description={metaData.description}
        path="/"
        jsonLd={personJsonLd()}
      />
      <section className="flex flex-col py-4 md:py-6">
        <div className="flow-root">
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <SiteImage
              src="/profile.jpeg"
              alt="Shreya Verma"
              className="mx-auto mb-6 mt-0 block rounded-full sm:float-right sm:mb-5 sm:ml-5 lg:mb-5 lg:mt-5"
              width={160}
              height={160}
              priority
            />
          </a>

          <h1 className="mb-4 font-medium">
            <span className="text-2xl">Deep Learning!</span>{' '}
            <span className="text-sm text-neutral-600 dark:text-neutral-400">shallow humor :)</span>
          </h1>

          <section aria-labelledby="resume-heading" className="mb-6 clear-both rounded-2xl border border-teal-300 bg-teal-50 p-4 dark:border-teal-800 dark:bg-teal-950/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="resume-heading" className="flex items-center gap-2 text-base font-semibold text-neutral-950 dark:text-neutral-50">
                <FiFileText aria-hidden="true" className="h-5 w-5 text-teal-700 dark:text-teal-300" />
                Check my resume
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="View my resume, PDF, opens in a new tab" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:bg-teal-400 dark:text-neutral-950 dark:hover:bg-teal-300">
                  View resume <FiArrowUpRight aria-hidden="true" />
                </a>
                <a href="/resume.pdf" download="Shreya-Verma-Resume.pdf" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-teal-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-teal-200">
                  <FiDownload aria-hidden="true" /> Download PDF
                </a>
              </div>
            </div>
          </section>

          <div className="space-y-4 text-left text-[15px] leading-7 text-neutral-800 dark:text-neutral-200 sm:text-base sm:leading-7">
            <p>
              Hello, I&apos;m Shreya. I started in backend and distributed systems, then moved toward the ML
              layer: how models actually run, fail, and get evaluated in production.
            </p>
            <p>
              Grad student at Carnegie Mellon. Previously Software Engineer II at Morgan Stanley, and a
              summer intern at Proofpoint on data-security analytics.
            </p>
            <p>
              I like the gap between models and systems: agents that stay grounded, models that get
              evaluated, and systems that stay fast, safe, and reliable in production. Off the clock I play
              piano, read, hike, travel, and collect tech memes.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex w-full items-center justify-center gap-x-5 gap-y-3 px-2">
            {heroSocial.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-neutral-700 transition hover:text-neutral-950 active:scale-95 dark:text-neutral-300 dark:hover:text-white sm:min-h-0 sm:min-w-0 sm:p-1"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <a
            href="#home-preview"
            className="group flex flex-col items-center gap-2 text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="Scroll to preview"
          >
            <span className="home-scroll-wheel-track">
              <span className="home-scroll-wheel-dot" />
            </span>
          </a>
        </div>
      </section>

      <div id="home-preview" className="mt-16 scroll-mt-24 space-y-12">
        <section>
          <SectionHeader title="Industry" viewAllPath="/about/experience" />
          <div className="grid grid-cols-1 gap-3">
            {industryHighlights.map((company) => (
              <CompanyCard
                key={company.company}
                company={company}
                compact
                onClick={() => handleCardClick(company)}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Projects" viewAllPath="/projects" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Writing" viewAllPath={DIARY_BLOGS_PATH} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {blogsLoading && blogPosts.length === 0
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-48 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/50"
                  />
                ))
              : blogPosts.slice(0, 2).map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </section>
      </div>

      <Modal isOpen={selectedCompany !== null} onClose={handleCloseModal}>
        {selectedCompany && (
          <ModalContent company={selectedCompany} techStackLabel={techStackLabel} />
        )}
      </Modal>
    </>
  );
}
