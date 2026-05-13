import type { DiarySectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Music from './music';
import Books from './books';
import Cinema from './cinema';
import Blogs from './blogs';
import { DIARY_NAV } from '../../config/sectionNav';
import { activeSectionFromPath } from '../../utils';

interface DiaryBodyProps {
  defaultSection?: DiarySectionType;
}

function renderSection(id: DiarySectionType) {
  switch (id) {
    case 'music':
      return <Music />;
    case 'books':
      return <Books />;
    case 'cinema':
      return <Cinema mode="tv" />;
    case 'movies':
      return <Cinema mode="movies" />;
    case 'blogs':
      return <Blogs />;
    default:
      return <Blogs />;
  }
}

export default function DiaryBody({ defaultSection = 'blogs' }: DiaryBodyProps) {
  return (
    <SectionRouter
      sections={DIARY_NAV}
      defaultSection={defaultSection}
      basePath="/diary"
      renderSection={renderSection}
      getActiveSection={(pathname) => activeSectionFromPath(pathname, DIARY_NAV, 'blogs')}
    />
  );
}
