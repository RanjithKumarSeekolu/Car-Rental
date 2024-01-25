import React from "react";
import { Link } from "react-router-dom";
import { Logo1 } from "../../assets/Logo1.png";

const Footer = () => {
  return (
    <div
      className=" w-full flex items-start justify-around text-[#bdb6b6] text-lg py-10 flex-wrap cursor-pointer"
      style={{
        background: "rgb(55, 48, 163)",
        boxShadow: "2px 4px 20px 0px rgba(125, 110, 235, 0.5)",
        backdropFilter: "blur(50px)",
      }}
    >
      <Link to="/">
        <img src={Logo1} alt={"renNHost"} width={200} height={200} />
      </Link>
      <div className="flex flex-col space-y-2">
        <div className="text-[#fff] cursor-auto">Company</div>
        <div>About Us</div>
        <div>Category</div>
        <div>Resources</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-[#fff] cursor-auto">Developer</div>
        <div>Github</div>
        <div>Linkedin</div>
        <div>Leetcode</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-[#fff] cursor-auto">Social</div>
        <div>Linkedin</div>
        <div>Twitter</div>
        <div>Youtube</div>
        <div>Quora</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-[#fff] cursor-auto">Legal</div>
        <div>Terms of services</div>
        <div>Privacy Policy</div>
        <div>Return Policy</div>
      </div>
    </div>
  );
};

export default Footer;
