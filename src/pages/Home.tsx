import { socialLinks } from "../config/config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        <img
          src="/profile.png"
          alt="Shreya Verma"
          className="rounded-full block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5"
          width={160}
          height={160}
        />
      </a>

      <div className="mb-8 font-medium">
       <span className="text-2xl">Deep Learning!</span> <span className="text-2sm">shallow humor :)</span>
      </div>

      <div className="prose prose-neutral dark:prose-invert text-justify">
        <p>
        Hello, I’m Shreya, dedicated science fiction enthusiast and unapologetic geek, diving deep into the captivating worlds of machine learning and deep learning. 
        </p>
        <p>
        Grad student at Carnegie Mellon Univeristy, breaking AI until it confesses how it works. Backed by a strong academic foundation and industry experience at Morgan Stanley, I like problems that don’t have obvious answers.
        </p>
        <p>
        I chase the uncomfortable questions in ML, why models look intelligent on paper, misbehave in reality, and how to close that gap.
        </p>
      </div>
    </section>
  );
}
