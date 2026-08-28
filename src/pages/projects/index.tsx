import { Seo } from '../../components/seo/Seo';
import { metaData } from '../../config/config';
import ProjectsInfo from './ProjectsInfo';

export default function Projects() {
  return (
    <>
      <Seo
        title={`Projects | ${metaData.name}`}
        description="Selected software, ML, research, and speaking projects."
        path="/projects"
      />
      <section>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
        <ProjectsInfo />
      </section>
    </>
  );
}
