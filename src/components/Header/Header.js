import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../init-firebase";
import UserMenu from "../UserModal/UserMenu";
import logo from "../../assets/Logo.png";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div
        className={`flex justify-between bg-gray-300 items-center ${"navbar"} px-[6%] py-2 fixed w-full z-20 bg-white font-bold`}
        style={{
          background: "rgba(217, 217, 217, 0.01)",
          boxShadow: "2px 4px 20px 0px rgba(125, 110, 235, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Link to="/">
          <img src={logo} alt="RentNHost" width={90} height={90} />
        </Link>
        <div className="md:flex items-center justify-between hidden space-x-5">
          <Link to="/about-us">
            <div className="hover:text-blue-800 cursor-pointer">About</div>
          </Link>
          <Link to="/allCars">
            <div className="hover:text-blue-800 cursor-pointer">Cars</div>
          </Link>
          <Link to="/maps">
            <div className="hover:text-blue-800 cursor-pointer">Locations</div>
          </Link>
          <Link to="/dashboard">
            <div className="hover:text-blue-800 cursor-pointer">Dashboard</div>
          </Link>
          <Link to="/contact-us">
            <div className="hover:text-blue-800 cursor-pointer">Contact</div>
          </Link>
        </div>
        {!user ||
          (Object.keys(user).length === 0 && (
            <button
              onClick={googleLoginHandler}
              className="md:flex hidden px-8 py-2 bg-indigo-800 rounded-md cursor-pointer text-white font-semibold shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300"
            >
              Sign In
            </button>
          ))}
        {user && Object.keys(user).length !== 0 && (
          <div className=" flex flex-col items-end">
            <img
              src={user.photoURL}
              alt="avatar"
              className="h-10 w-10 cursor-pointer rounded-full border border-indigo-800"
              onClick={() => setShowModal((prev) => !prev)}
            />

            {showModal && (
              <UserMenu
                closeModal={() => setShowModal(false)}
                logoutHandler={() => {
                  setUser({});
                  setShowModal(false); // Close the menu when logging out
                }}
              />
            )}
          </div>
        )}
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
