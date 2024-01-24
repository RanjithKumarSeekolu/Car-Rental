// DownloadButton.js
import React from "react";

const DownloadButton = ({ pdfData, fileName }) => {
  const downloadCertificate = () => {
    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCertificate}>Download Certificate</button>;
};

export default DownloadButton;
