import React from "react";

const CertificateTemplate = ({ recipientName, courseName, date }) => {
  return (
    <div className="p-10 w-full">
      <div className="p-6 border-2 border-black">
        {/* Logo */}
        <div>
          <img
            src="/path-to-your-logo.png" // Replace with the path to your logo
            alt="Logo"
            className=""
          />
        </div>

        <h1 className="text-2xl font-bold mb-5">
          Certificate of Course Completion
        </h1>
        <p className="mb-5">This is to certify that</p>
        <p className="text-5 font-bold mb-5">{recipientName}</p>
        <p className="mb-5px">has successfully completed the course</p>
        <p className="text-10 font-bold mb-5">{courseName}</p>
        <p className="mb-2">on</p>
        <p className="text-10 font-bold">{date}</p>

        <h1 className="text-2xl font-bold mb-5">
          Certificate of Course Completion
        </h1>
        <p className="mb-5">This is to certify that</p>
        <p className="text-5 font-bold mb-5">{recipientName}</p>
        <p className="mb-5px">has successfully completed the course</p>
        <p className="text-10 font-bold mb-5">{courseName}</p>
        <p className="mb-2">on</p>
        <p className="text-10 font-bold">{date}</p>

        <h1 className="text-2xl font-bold mb-5">
          Certificate of Course Completion
        </h1>
        <p className="mb-5">This is to certify that</p>
        <p className="text-5 font-bold mb-5">{recipientName}</p>
        <p className="mb-5px">has successfully completed the course</p>
        <p className="text-10 font-bold mb-5">{courseName}</p>
        <p className="mb-2">on</p>
        <p className="text-10 font-bold">{date}</p>
      </div>
    </div>
  );
};

export default CertificateTemplate;
