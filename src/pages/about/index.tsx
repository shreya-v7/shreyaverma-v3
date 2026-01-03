import { Helmet } from "react-helmet-async";
import AboutBody from "./aboutbody";
import AboutPreview from "./AboutPreview";
import { SectionType } from "../../types";

const sectionTitles: Record<SectionType, string> = {
  experience: 'Experience',
  education: 'Education',
  certifications: 'Certifications',
};

interface AboutProps {
  section?: SectionType;
}

export default function About({ section }: AboutProps) {
  const title = section ? `About - ${sectionTitles[section]}` : 'About';
  return (
    <>
      <Helmet>
        <title>{title} | Shreya Verma</title>
        <meta name="description" content={section ? `About - ${sectionTitles[section]}` : 'About - Experience, Education, and Certifications'} />
      </Helmet>
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">About</h1>
        {!section && (
          <p className="mb-6">
            Curious about my journey? I've put in a lot of hard work, but let's make it interesting! 
            See those messages? They keep changing every 7 seconds with spicy tech facts about my work! 
          </p>
        )}
        {section ? <AboutBody defaultSection={section} /> : <AboutPreview />}
      </div>
    </>
  );
}
