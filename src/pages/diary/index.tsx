import { Helmet } from "react-helmet-async";
import DiaryBody from "./diarybody";
import DiaryPreview from "./DiaryPreview";
import { DIARY_NAV } from "../../config/sectionNav";
import type { DiarySectionType } from "../../types";

const sectionTitles = Object.fromEntries(DIARY_NAV.map((s) => [s.id, s.label])) as Record<
  DiarySectionType,
  string
>;

interface DiaryProps {
  section?: DiarySectionType;
}

export default function Diary({ section }: DiaryProps) {
  const title = section ? `Diary - ${sectionTitles[section]}` : 'Diary';
  return (
    <>
      <Helmet>
        <title>{title} | Shreya Verma</title>
        <meta
          name="description"
          content={
            section
              ? `Diary - ${sectionTitles[section]}`
              : 'Diary - Blogs, Books, Music, Movies, and TV shows'
          }
        />
      </Helmet>
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Diary</h1>
        {!section && (
          <p className="mb-6">
            Get to know the person behind the code! Here's a glimpse into my interests, passions, and the things that inspire me beyond the screen. 
            From music that fuels my coding sessions to cinema that shapes my thinking about AI, this is the less professional, more human side of me ✨
          </p>
        )}
        {section ? <DiaryBody defaultSection={section} /> : <DiaryPreview />}
      </div>
    </>
  );
}
