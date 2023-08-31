import React, { useState } from "react";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <div className="flex justify-between items-center shadow-md px-[6%] py-5 fixed w-full z-20 bg-white font-bold">
        <div>Logo</div>
        <div className="md:flex items-center justify-between hidden space-x-5">
          <div className="hover:text-blue-800 cursor-pointer">About</div>
          <div className="hover:text-blue-800 cursor-pointer">Features</div>
          <div className="hover:text-blue-800 cursor-pointer">Pricing</div>
          <div className="hover:text-blue-800 cursor-pointer">Resources</div>
          <div className="hover:text-blue-800 cursor-pointer">Contact</div>
        </div>
        <button className="md:flex hidden px-8 py-2 bg-indigo-800 rounded-md cursor-pointer text-white font-semibold shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300">
          Sign In
        </button>
        <div className="md:hidden">
          <div onClick={toggleDrawer}>
            {openDrawer ? <>&#10005;</> : <>&#8801;</>}
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {openDrawer && (
          <div
            className={`fixed top-0 right-0 h-screen w-64 bg-white overflow-y-auto z-30`}
            // style={{
            //   transform: `translateX(${openDrawer ? "0" : "100%"})`,
            //   transition: "transform 0.3s ease-in-out",
            //   zIndex: 999,
            // }}
          >
            <div onClick={toggleDrawer} className="absolute top-5 right-5">
              &#10005;
            </div>
            <div className="p-4 pt-14">
              <div className="mb-4 hover:text-blue-800 cursor-pointer">
                About
              </div>
              <div className="mb-4 hover:text-blue-800 cursor-pointer">
                Features
              </div>
              <div className="mb-4 hover:text-blue-800 cursor-pointer">
                Pricing
              </div>
              <div className="mb-4 hover:text-blue-800 cursor-pointer">
                Resources
              </div>
              <div className="mb-4 hover:text-blue-800 cursor-pointer">
                Contact
              </div>
              <button className="px-8 py-2 bg-indigo-800 rounded-md cursor-pointer text-white font-semibold shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
