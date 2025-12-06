import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ closeModal, logoutHandler }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div 
      ref={menuRef}
      className="absolute top-0 right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200"
    >
      
      {/* Optional: Add profile link or other items here */}
      <Link 
          to="/dashboard"
          onClick={closeModal}
          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors"
      >
          My Dashboard
      </Link>
      <Link 
          to="/carHost"
          onClick={closeModal}
          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors"
      >
          Host My Car
      </Link>
      
      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

      <button 
        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium flex items-center gap-2" 
        onClick={() => logoutHandler()}
      >
        <img width="16" height="16" src="https://img.icons8.com/ios-glyphs/30/fa314a/exit.png" alt="exit"/>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
