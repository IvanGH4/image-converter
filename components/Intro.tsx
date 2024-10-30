import React from "react";

const Intro = () => {
  return (
    <>
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-5 text-neutral-200">
        Image converter
      </h1>
      <p className="text-center text-lg text-neutral-200 mb-3">
        Convert images from{" "}
        <span className="italic font-medium text-green-600">any</span> format to
        webp.
      </p>
      <p className="text-center text-lg text-neutral-200 mb-10 max-w-xl mx-auto">
        Improve your website{" "}
        <span className="italic font-medium text-green-600">performance</span>{" "}
        by making your images smaller and converting them to a browser friendly
        format.
      </p>
    </>
  );
};

export default Intro;
