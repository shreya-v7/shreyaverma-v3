import React from "react";
import { Helmet } from "react-helmet-async";
import AboutBody from "./aboutbody";
import CertList from "./certlist";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Shreya Verma</title>
        <meta name="description" content="About Myself" />
      </Helmet>
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">About</h1>

      {/* Introductory line with internal links */}
      <p className="mb-6">
        Curious about my journey? I’ve put in a lot of hard work, but let’s make it interesting! 
        Keep refreshing the page to watch the colors change. Fun, right? 
        Want to dive deeper? </p>

      <AboutBody />
    </div>
    </>
  );
}
