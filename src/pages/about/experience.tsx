import { Section } from '../../components/ui/Section';
import { experienceData } from '../../data/experience';

export default function Experience() {
  return <Section data={experienceData} sectionId="experience" gridCols="grid-cols-1 md:grid-cols-2" />;
}
