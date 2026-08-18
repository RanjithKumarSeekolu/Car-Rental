import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ closeModal, logoutHandler, isAdmin }) => {
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
      className="absolute top-0 right-0 w-48 bg-[var(--surface)] rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] border border-[var(--line)] z-50 overflow-hidden py-1"
    >
      <Link
        to="/dashboard"
        onClick={closeModal}
        className="block px-4 py-3 text-sm text-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--accent)] transition-colors"
      >
        {isAdmin ? "Admin dashboard" : "My Dashboard"}
      </Link>
      {!isAdmin && (
        <Link
          to="/carHost"
          onClick={closeModal}
          className="block px-4 py-3 text-sm text-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--accent)] transition-colors"
        >
          Host My Car
        </Link>
      )}

      <div className="border-t border-[var(--line)] my-1" />

      <button
        type="button"
        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
        onClick={() => logoutHandler()}
      >
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
