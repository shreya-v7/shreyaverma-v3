import React from "react";
import { Helmet } from "react-helmet-async";


const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Shreya Verma</title>
        <meta name="description" content="Let's have a quick chat" />
      </Helmet>
      <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
      <p className="mb-6">Feel free to reach out to me through any of the following methods:</p>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v16c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V4M5 4h14M5 8h14M5 12h14M5 16h14M5 20h14" />
          </svg>
          <span>Email: <a href="mailto:your-email@example.com" className="text-blue-600">shreya.verma2000@gmail.com</a></span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9-5 9 5v13l-9 5-9-5V8z" />
          </svg>
          <span>Phone: <a href="tel:+1234567890" className="text-blue-600">+91-9818898592</a></span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a7.965 7.965 0 01-6.36-3.36A8.017 8.017 0 0110 12a8.017 8.017 0 01-4.36-4.64A7.965 7.965 0 0112 20zm0-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          </svg>
          <span>Name: <span className="text-blue-600">Shreya Verma</span></span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4H8V10h8v2z" />
          </svg>
          <span>
            LinkedIn: <a href="https://in.linkedin.com/in/shreya-verma-1sv" className="text-blue-600" target="_blank" rel="noopener noreferrer">https://in.linkedin.com/in/shreya-verma-1sv</a>
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;

