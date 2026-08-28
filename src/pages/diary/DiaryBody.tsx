import type { ComponentType } from 'react';
import type { DiarySectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Music from './music';
import Books from './books';
import Cinema from './cinema';
import Blogs from './blogs';
import { DIARY_NAV } from '../../config/sectionNav';
import { activeSectionFromPath } from '../../utils';

const SECTION_COMPONENTS: Record<DiarySectionType, ComponentType> = {
  blogs: Blogs,
  books: Books,
  music: Music,
  cinema: Cinema,
};

export default function DiaryBody() {
  return (
    <SectionRouter
      sections={DIARY_NAV}
      renderSection={(id) => {
        const C = SECTION_COMPONENTS[id] ?? Blogs;
        return <C />;
      }}
      getActiveSection={(pathname) => activeSectionFromPath(pathname, DIARY_NAV, 'blogs')}
    />
  );
}
