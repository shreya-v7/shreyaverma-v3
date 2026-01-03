import { DiarySectionType } from '../../types';
import { SectionRouter } from '../../components/ui/SectionRouter';
import Music from './music';
import Books from './books';
import Cinema from './cinema';
import Blogs from './blogs';

interface DiaryBodyProps {
  defaultSection?: DiarySectionType;
}

export default function DiaryBody({ defaultSection = 'music' }: DiaryBodyProps) {
  const sections = [
    { id: 'music', label: 'Music', path: '/diary/music' },
    { id: 'books', label: 'Books', path: '/diary/books' },
    { id: 'cinema', label: 'Cinema', path: '/diary/cinema' },
    { id: 'blogs', label: 'Blogs', path: '/diary/blogs' },
  ];

  const getActiveSection = (pathname: string): DiarySectionType => {
    if (pathname.includes('/books')) return 'books';
    if (pathname.includes('/cinema')) return 'cinema';
    if (pathname.includes('/blogs')) return 'blogs';
    return 'music';
  };

  const renderSection = (activeSection: DiarySectionType) => {
    switch (activeSection) {
      case 'music': return <Music />;
      case 'books': return <Books />;
      case 'cinema': return <Cinema />;
      case 'blogs': return <Blogs />;
      default: return <Music />;
    }
  };

  return (
    <SectionRouter
      sections={sections}
      defaultSection={defaultSection}
      basePath="/diary"
      renderSection={renderSection}
      getActiveSection={getActiveSection}
    />
  );
}

