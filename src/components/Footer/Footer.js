import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <div className=" w-full flex items-start bg-gray-300 justify-around text-black text-lg py-10 flex-wrap cursor-pointer">
      <Link to="/">
        <img src={Logo} alt={"renNHost"} width={250} height={250} />
      </Link>
      <div className="flex flex-col space-y-2">
        <div className="font-bold cursor-auto">Company</div>
        <div>About Us</div>
        <div>Category</div>
        <div>Resources</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="font-bold cursor-auto">Developer</div>
        <div>Github</div>
        <div>Linkedin</div>
        <div>Leetcode</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="font-bold  cursor-auto">Social</div>
        <div>Linkedin</div>
        <div>Twitter</div>
        <div>Youtube</div>
        <div>Quora</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="font-bold  cursor-auto">Legal</div>
        <div>Terms of services</div>
        <div>Privacy Policy</div>
        <div>Return Policy</div>
      </div>
    </div>
  );
};

export default Footer;
