import React, { useRef } from "react";
import CertificateTemplate from "./CertificateTemplate";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
  const certificateRef = useRef(null);

  const downloadPdf = async () => {
    const input = certificateRef.current;

    // Use html2canvas to capture the content of certificateRef as an image
    const canvas = await html2canvas(input);

    // Create a new jsPDF instance with landscape orientation and A4 dimensions
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Calculate the scaling factor to fit the content width within the PDF page
    const scaleFactor = pdf.internal.pageSize.getWidth() / canvas.width;

    // Calculate the scaled height
    const scaledHeight = canvas.height * scaleFactor;

    // Calculate the vertical position to center the image on the page
    const verticalPosition =
      (pdf.internal.pageSize.getHeight() - scaledHeight) / 2;

    // Add the image to the PDF, scaling it to fit the entire width and centered vertically
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      verticalPosition,
      pdf.internal.pageSize.getWidth(),
      scaledHeight
    );

    // Download the PDF
    pdf.save("certificate.pdf");
  };

  const downloadImage = async (format) => {
    const input = certificateRef.current;

    // Use html2canvas to capture the content of certificateRef as an image
    const canvas = await html2canvas(input);

    // Create a new Image object to convert canvas to an image
    const image = new Image();
    image.src = canvas.toDataURL(`image/${format}`);

    // Create a link element to trigger the download
    const a = document.createElement("a");
    a.href = image.src;
    a.download = `certificate.${format}`;
    a.click();
  };

  return (
    <div>
      <div ref={certificateRef}>
        <CertificateTemplate
          recipientName="John Doe"
          courseName="React Workshop"
          date="2023-09-14"
        />
      </div>
      <div className="flex justify-around p-10 text-white">
        <button onClick={downloadPdf} className="p-2 bg-purple-800">
          Download PDF
        </button>
        <button
          onClick={() => downloadImage("jpeg")}
          className="p-2 bg-purple-800"
        >
          Download JPEG
        </button>
        <button
          onClick={() => downloadImage("png")}
          className="p-2 bg-purple-800"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default Certificate;
