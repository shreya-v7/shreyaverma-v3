import { useLocation } from 'react-router-dom';
import DiaryBody from './DiaryBody';
import DiaryPreview from './DiaryPreview';
import { Seo } from '../../components/seo/Seo';
import { DIARY_NAV } from '../../config/sectionNav';
import { metaData } from '../../config/config';
import type { DiarySectionType } from '../../types';

const sectionTitles = Object.fromEntries(DIARY_NAV.map((s) => [s.id, s.label])) as Record<
  DiarySectionType,
  string
>;

const sectionDescriptions: Record<DiarySectionType, string> = {
  blogs: 'Writing on Substack and Medium: technology, XR, and notes from outside the IDE.',
  books: 'Books I have been reading, with short reviews.',
  music: 'Playlists, artists, and a favorite track from Spotify.',
  cinema: 'Movies and TV that stick, with short reviews.',
};

interface DiaryProps {
  section?: DiarySectionType;
}

export default function Diary({ section }: DiaryProps) {
  const { pathname } = useLocation();
  const title = section
    ? `Diary - ${sectionTitles[section]} | ${metaData.name}`
    : `Diary | ${metaData.name}`;
  const description = section
    ? sectionDescriptions[section]
    : 'Diary - Blogs, Books, Music, and Cinema';

  return (
    <>
      <Seo title={title} description={description} path={pathname} />
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Diary</h1>
        {!section && (
          <p className="mb-6">
            Get to know the person behind the code! Here's a glimpse into my interests, passions, and the things that inspire me beyond the screen. 
            From music that fuels my coding sessions to cinema that shapes my thinking about AI, this is the less professional, more human side of me ✨
          </p>
        )}
        {section ? <DiaryBody /> : <DiaryPreview />}
      </div>
    </>
  );
}
