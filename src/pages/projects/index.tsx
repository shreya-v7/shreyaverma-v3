import React from "react";
import { Helmet } from "react-helmet-async";
import ProjectsInfo from "./projects-info";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects | Shreya Verma</title>
        <meta name="description" content="My Projects" />
      </Helmet>
      <section>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
        <div className="space-y-6">
          <ProjectsInfo />
        </div>
      </section>
    </>
  );
}
