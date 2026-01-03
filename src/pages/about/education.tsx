import { Section } from '../../components/ui/Section';
import { educationData } from '../../data/education';

export default function Education() {
  return <Section data={educationData} sectionId="education" gridCols="grid-cols-1" showAwards techStackLabel="Subjects/Courses:" />;
}
