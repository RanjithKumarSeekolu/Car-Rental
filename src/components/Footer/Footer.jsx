import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-8 bg-gray-300 py-12 px-[6%] text-black cursor-pointer">
      <div className="col-span-2 md:col-span-1 flex justify-start md:justify-center items-start">
        <Link to="/">
          <img src={Logo} alt={"renNHost"} className="w-[150px] md:w-[200px]" />
        </Link>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="font-bold text-lg mb-1 cursor-auto text-indigo-900">Company</div>
        <div className="hover:text-indigo-700 transition-colors">About Us</div>
        <div className="hover:text-indigo-700 transition-colors">Category</div>
        <div className="hover:text-indigo-700 transition-colors">Resources</div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="font-bold text-lg mb-1 cursor-auto text-indigo-900">Developer</div>
        <div className="hover:text-indigo-700 transition-colors">Github</div>
        <div className="hover:text-indigo-700 transition-colors">Linkedin</div>
        <div className="hover:text-indigo-700 transition-colors">Leetcode</div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="font-bold text-lg mb-1 cursor-auto text-indigo-900">Social</div>
        <div className="hover:text-indigo-700 transition-colors">Linkedin</div>
        <div className="hover:text-indigo-700 transition-colors">Twitter</div>
        <div className="hover:text-indigo-700 transition-colors">Youtube</div>
        <div className="hover:text-indigo-700 transition-colors">Quora</div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="font-bold text-lg mb-1 cursor-auto text-indigo-900">Legal</div>
        <div className="hover:text-indigo-700 transition-colors">Terms of services</div>
        <div className="hover:text-indigo-700 transition-colors">Privacy Policy</div>
        <div className="hover:text-indigo-700 transition-colors">Return Policy</div>
      </div>
    </div>
  );
};

export default Footer;
