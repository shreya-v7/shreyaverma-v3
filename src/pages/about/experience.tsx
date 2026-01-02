import React from 'react';
import { Accordion } from '../../components/ui/Accordion';
import { useTechStackColors } from '../../hooks/useTechStackColors';
import { experienceData } from '../../data/experience';

export default function Experience() {
  const { colors, isClient } = useTechStackColors(experienceData);

  return (
    <section id="experience">
      <Accordion data={experienceData} colors={colors} isClient={isClient} />
    </section>
  );
}
