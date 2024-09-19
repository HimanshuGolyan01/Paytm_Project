import React from "react";
import { useNavigate } from "react-router";

export const Appbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("name");

  function Logout() {
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <div className="w-full h-16 p-5 flex justify-between items-center shadow-md bg-gradient-to-r bg-blue-950 text-white">
      <div className="text-2xl font-bold">SwiftTransfer</div>
      <div className="flex items-center">
        <div className="font-semibold text-lg">Hello, {user}</div>
        <button
          onClick={Logout}
          className="ml-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
