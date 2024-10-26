import React from "react";

const Intro = () => {
  return (
    <>
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-5 text-gray-50">
        Image converter
      </h1>
      <p className="text-center text-lg text-gray-50 mb-10">
        Convert images from{" "}
        <span className="italic font-medium text-green-600 underline">any</span>{" "}
        format to{" "}
        <span className="italic font-medium text-green-600 underline">any</span>{" "}
        format.
      </p>
    </>
  );
};

export default Intro;
