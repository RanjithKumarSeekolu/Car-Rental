import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import UserMenu from "../UserModal/UserMenu";
import logo from "../../assets/Logo.png";
import useAuthStore from "../../store/useAuthStore";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <header
        className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-[4%] md:px-[6%] py-3 flex justify-between items-center"
      >
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="RentNHost" className="h-10 w-auto md:h-12" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/allCars" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors tracking-wide">
            Cars
          </Link>
          <Link to="/maps" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors tracking-wide">
            Locations
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors tracking-wide">
            Dashboard
          </Link>
          <Link to="/contact-us" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors tracking-wide">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth / User */}
        <div className="hidden md:flex items-center gap-4">
            {!user ? (
                <button
                onClick={googleLoginHandler}
                className="px-6 py-2.5 bg-indigo-600 text-white text-sm rounded-full font-medium shadow-md hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5"
                >
                Sign In
                </button>
            ) : (
            <div className="relative">
                <img
                src={user.photoURL || "https://img.icons8.com/ios-filled/50/user-male-circle.png"}
                alt="avatar"
                className="h-10 w-10 cursor-pointer rounded-full border-2 border-indigo-100 hover:border-indigo-300 transition-colors object-cover"
                onClick={() => setShowModal((prev) => !prev)}
                />

                {showModal && (
                <div className="absolute right-0 mt-2 w-48 z-50">
                    <UserMenu
                        closeModal={() => setShowModal(false)}
                        logoutHandler={() => {
                        logout();
                        setShowModal(false);
                        }}
                    />
                </div>
                )}
            </div>
            )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleDrawer} className="p-2 text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Drawer & Backdrop */}
      {openDrawer && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={toggleDrawer}
          />
          
          <div
            className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${openDrawer ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                 <span className="text-lg font-bold text-gray-900">Menu</span>
                <button onClick={toggleDrawer} className="p-2 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link to="/allCars" onClick={toggleDrawer} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-xl transition-all">
                   <span className="font-medium">Cars</span>
                </Link>
                <Link to="/maps" onClick={toggleDrawer} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-xl transition-all">
                  <span className="font-medium">Locations</span>
                </Link>
                <Link to="/dashboard" onClick={toggleDrawer} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-xl transition-all">
                  <span className="font-medium">Dashboard</span>
                </Link>
                 <Link to="/contact-us" onClick={toggleDrawer} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-xl transition-all">
                  <span className="font-medium">Contact</span>
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                {!user ? (
                   <button 
                    onClick={() => {
                      toggleDrawer();
                      googleLoginHandler();
                    }}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md active:scale-95 transition-all"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 mb-4 px-2">
                        <img
                          src={user.photoURL || "https://img.icons8.com/ios-filled/50/user-male-circle.png"}
                          alt="avatar"
                          className="h-12 w-12 rounded-full border-2 border-indigo-100 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-gray-900 truncate">{user.displayName || "User"}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                     </div>
                     <Link to="/carHost" onClick={toggleDrawer} className="block w-full py-3 text-center bg-indigo-50 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">
                        Host My Car
                     </Link>
                     <button
                        onClick={() => {
                          logout();
                          toggleDrawer();
                        }}
                        className="block w-full py-3 text-center text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Log Out
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
