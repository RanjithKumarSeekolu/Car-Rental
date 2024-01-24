import React from "react";

const UserMenu = ({ closeModal, logoutHandler }) => {
  return (
    <div className="absolute top-16 px-4 py-2 rounded-sm bg-indigo-400 text-white border">
      <button className="cursor-pointer" onClick={() => logoutHandler()}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
