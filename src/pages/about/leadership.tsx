import { Section } from '../../components/ui/Section';
import { leadershipData } from '../../data/leadership';

export default function Leadership() {
  return <Section data={leadershipData} sectionId="leadership" gridCols="grid-cols-1 md:grid-cols-2" techStackLabel="Focus:" />;
}
