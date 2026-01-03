import React from "react";
import { Helmet } from "react-helmet-async";
import AboutBody from "./aboutbody";
import AboutPreview from "./AboutPreview";
import { SectionType } from "../../types";

interface AboutProps {
  section?: SectionType;
}

export default function About({ section }: AboutProps) {
  const sectionTitles: Record<SectionType, string> = {
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
  };

  // If no section specified, show preview
  if (!section) {
    return (
      <>
        <Helmet>
          <title>About | Shreya Verma</title>
          <meta name="description" content="About - Experience, Education, and Certifications" />
        </Helmet>
        <div>
          <h1 className="mb-8 text-2xl font-medium tracking-tight">About</h1>

          {/* Introductory line with internal links */}
          <p className="mb-6">
            Curious about my journey? I've put in a lot of hard work, but let's make it interesting! 
            See those messages? They keep changing evrey 5 seconds! Also, you can chat with Sherrii, my AI assistant, by clicking the button in the bottom right corner. 
          </p>

          <AboutPreview />
        </div>
      </>
    );
  }

  // Show specific section
  return (
    <>
      <Helmet>
        <title>About - {sectionTitles[section]} | Shreya Verma</title>
        <meta name="description" content={`About - ${sectionTitles[section]}`} />
      </Helmet>
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">About</h1>

        <AboutBody defaultSection={section} />
      </div>
    </>
  );
}
