import React from 'react';
import { Section } from '../../components/ui/Section';
import { educationData } from '../../data/education';

export default function Education() {
  return (
    <Section
      data={educationData}
      sectionId="education"
      gridCols="grid-cols-1"
      showAwards={true}
      techStackLabel="Subjects/Courses:"
    />
  );
}
