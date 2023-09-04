import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black w-full flex items-start justify-around text-white text-lg py-10 flex-wrap cursor-pointer">
      <Link to="/">
        <div>Logo</div>
      </Link>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600 cursor-auto">Company</div>
        <div>About Us</div>
        <div>Category</div>
        <div>Resources</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600 cursor-auto">Developer</div>
        <div>Github</div>
        <div>Linkedin</div>
        <div>Leetcode</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600 cursor-auto">Social</div>
        <div>Linkedin</div>
        <div>Twitter</div>
        <div>Youtube</div>
        <div>Quora</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-blue-600 cursor-auto">Legal</div>
        <div>Terms of services</div>
        <div>Privacy Policy</div>
        <div>Return Policy</div>
      </div>
    </div>
  );
};

export default Footer;
