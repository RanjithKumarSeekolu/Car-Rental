import React from "react";

const Footer = () => {
  return (
    <div className="bg-black w-full flex items-start justify-around text-white text-lg py-10 flex-wrap">
      <div>Logo</div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600">Company</div>
        <div>About Us</div>
        <div>Category</div>
        <div>Resources</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600">Developer</div>
        <div>Github</div>
        <div>Linkedin</div>
        <div>Leetcode</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600">Social</div>
        <div>Linkedin</div>
        <div>Twitter</div>
        <div>Youtube</div>
        <div>Quora</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600">Legal</div>
        <div>Terms of services</div>
        <div>Privacy Policy</div>
        <div>Return Policy</div>
      </div>
    </div>
  );
};

export default Footer;
