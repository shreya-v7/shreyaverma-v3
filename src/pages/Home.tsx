import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaCode,
} from 'react-icons/fa6';
import { TbMailFilled } from 'react-icons/tb';
import { socialLinks } from '../config/config';
import { experienceData } from '../data/experience';
import { projects } from '../data/projects';
import { blogsPosts } from '../data/diary/blogs';

const heroSocial = [
  { href: socialLinks.twitter, label: 'X', Icon: FaXTwitter },
  { href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
  { href: socialLinks.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: socialLinks.email, label: 'Email', Icon: TbMailFilled },
  { href: socialLinks.code, label: 'Code', Icon: FaCode },
] as const;

export default function Page() {
  const quantastica = projects.find((p) => p.title.startsWith('Quantastica'));
  const researchPapers = projects
    .filter((p) => p.category === 'Research')
    .sort((a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime());
  const researchHighlights = researchPapers.filter(
    (p) => p.title === 'Multifactor Authentication' || p.title === 'DiagZone',
  ).slice(0, 2);
  const latestBlogs = [...blogsPosts]
    .sort((a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime())
    .slice(0, 2);

  const [activeBlogIdx, setActiveBlogIdx] = useState(0);

  const formatShortDate = (value?: string) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  };

  const activeBlog = latestBlogs[activeBlogIdx] ?? latestBlogs[0];

  return (
    <section className="space-y-12">
      <div className="flex min-h-[min(85dvh,820px)] flex-col py-4 md:min-h-[72vh] md:py-8">
        {/* flow-root contains the floated avatar so height is correct; flex-1 fills hero when copy is short */}
        <div className="flow-root min-h-0 flex-1">
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <img
              src="/profile.png"
              alt="Shreya Verma"
              className="mx-auto mb-8 mt-0 block rounded-full sm:float-right sm:mb-5 sm:ml-5 lg:mb-5 lg:mt-5"
              width={160}
              height={160}
            />
          </a>

          <div className="mb-3 font-medium">
            <span className="text-2xl">Deep Learning!</span>{' '}
            <span className="text-sm text-neutral-600 dark:text-neutral-400">shallow humor :)</span>
          </div>

          <div className="prose prose-neutral dark:prose-invert text-justify">
            <p>
              Hello, I&apos;m Shreya, dedicated science fiction enthusiast and unapologetic geek, diving deep
              into the captivating worlds of machine learning and deep learning.
            </p>
            <p>
              Grad student at Carnegie Mellon University, breaking AI until it confesses how it works.
              Backed by a strong academic foundation and industry experience at Morgan Stanley, I like
              problems that don&apos;t have obvious answers.
            </p>
            <p>
              I chase the uncomfortable questions in ML, why models look intelligent on paper, misbehave
              in reality, and how to close that gap.
            </p>
          </div>
        </div>

        {/* In document flow below copy — avoids overlap with absolute + float height bugs */}
        <div className="mt-10 flex w-full shrink-0 flex-col items-center gap-4 px-2 sm:mt-12 md:mt-14">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5">
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
            href="#experience"
            className="group flex flex-col items-center gap-2 pb-1 text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="Scroll to experience section"
          >
            <span className="home-scroll-wheel-track">
              <span className="home-scroll-wheel-dot" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-500">
              Scroll
            </span>
          </a>
        </div>
      </div>

      <section id="experience" className="space-y-4 scroll-mt-28">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Experience Timeline</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              A quick vertical view of recent roles.
            </p>
          </div>
          <Link to="/about/experience" className="text-sm underline underline-offset-4">
            View full timeline
          </Link>
        </div>

        <div className="relative pl-4">
          {/* vertical line */}
          <div className="absolute inset-y-0 left-[10px] w-px bg-neutral-200 dark:bg-neutral-700" />

          <ol className="space-y-5">
            {experienceData.slice(0, 4).map((company, index) => {
              const role = company.roles[0];
              return (
                <li key={company.company} className="relative flex gap-4">
                  <div className="relative mt-1 flex h-5 w-5 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                    <span className="relative h-2 w-2 rounded-full bg-white dark:bg-neutral-900" />
                  </div>
                  <article className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                          {String(index + 1).padStart(2, '0')} · {company.company}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                          {role?.title}
                        </p>
                      </div>
                      <time className="shrink-0 text-xs text-right text-neutral-500 dark:text-neutral-400">
                        {role?.duration}
                      </time>
                    </div>
                    {role?.content?.[0] ? (
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        {role.content[0]}
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="projects" className="space-y-4 scroll-mt-28">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Featured Projects</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Quantastica up front, with two research highlights.
            </p>
          </div>
          <Link to="/projects" className="text-sm underline underline-offset-4">
            See all projects
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)] md:auto-rows-[minmax(0,_1fr)]">
          {/* Spotlight - Quantastica, square-ish tile in first column */}
          <article className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 md:aspect-square md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0">
              {quantastica?.image ? (
                <img
                  src={`/${quantastica.image}`}
                  alt={quantastica.title}
                  className="h-full w-full object-cover opacity-30 transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/60 via-transparent to-neutral-900/10 dark:from-black/50" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-200/90 dark:text-neutral-200/90">
                    {quantastica?.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-50">
                    {quantastica?.title}
                  </h3>
                </div>
                <a
                  href={quantastica?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/5 transition hover:bg-white dark:bg-neutral-800/95 dark:text-neutral-100 dark:ring-white/10"
                >
                  Open
                  <span className="ml-2 inline-block translate-y-[1px]">→</span>
                </a>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-100/90 dark:text-neutral-100/90">
                {quantastica?.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {quantastica?.tags?.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-100 ring-1 ring-white/15 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-neutral-200/70 dark:text-neutral-200/70">
                <span className="font-mono">
                  {formatShortDate(quantastica?.date ?? undefined)}
                </span>
              </div>
            </div>
          </article>

          {/* Picks - two research papers stacked in second column */}
          <div className="flex flex-col gap-4">
            {researchHighlights.map((p) => (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 p-4 text-left shadow-sm transition hover:bg-white hover:shadow-md dark:border-neutral-700 dark:bg-neutral-950/40 dark:hover:bg-neutral-900/70"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-sky-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {p.category}
                  </p>
                  <p className="mt-2 font-semibold text-neutral-900 dark:text-neutral-100">{p.title}</p>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      {formatShortDate(p.date)}
                    </span>
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      View paper →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="writing" className="space-y-4 scroll-mt-28">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Latest Writing</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Recent posts as simple tiles.
            </p>
          </div>
          <Link to="/diary/blogs" className="text-sm underline underline-offset-4">
            Open blog posts
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {latestBlogs.map((post) => (
            <article
              key={post.id}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {formatShortDate(post.date)}
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {post.caption.length > 180 ? `${post.caption.slice(0, 180)}...` : post.caption}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="min-w-0 flex-1 pr-3 text-[11px] leading-snug text-neutral-500 dark:text-neutral-500">
                  {(post.tags ?? []).slice(0, 3).map((t) => `#${t}`).join(' · ')}
                </p>
                <Link
                  to={`/diary/blogs/${post.id}`}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-400/90 bg-white/50 px-2.5 py-1 text-[11px] font-semibold text-neutral-900 shadow-sm backdrop-blur-sm transition hover:border-neutral-500 hover:bg-white/80 dark:border-neutral-500/90 dark:bg-neutral-800/50 dark:text-neutral-50 dark:shadow-none dark:hover:border-neutral-400 dark:hover:bg-neutral-800/80"
                >
                  <span>Read</span>
                  <span className="text-[10px] opacity-80">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
