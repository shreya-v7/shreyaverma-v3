import { Helmet } from "react-helmet-async";
import BlogList from "./bloglist";

export default function BlogPosts() {
  return (
    <>
      <Helmet>
        <title>Blog | Shreya Verma</title>
        <meta name="description" content="Shreya Verma is a Machine Learning Practitioner" />
      </Helmet>
      <section>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Blogs</h1>
        <BlogList />
      </section>
    </>
  );
}
