import React from 'react';
import { Accordion } from '../../components/ui/Accordion';
import { useTechStackColors } from '../../hooks/useTechStackColors';
import { educationData } from '../../data/education';

export default function Education() {
  const { colors, isClient } = useTechStackColors(educationData);

  return (
    <section id="education">
      <Accordion data={educationData} colors={colors} isClient={isClient} />
    </section>
  );
}
