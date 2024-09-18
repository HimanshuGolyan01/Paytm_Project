import React from "react";
import { useNavigate } from "react-router";

export const Appbar = () => {
   const  navigate = useNavigate();

    const user = localStorage.getItem("name");
    function Logout() {
      localStorage.clear();
      navigate("/signup");
    }
    return (
        <div className="w-full flex justify-between items-center shadow px-4 sm:px-14 bg-blue-900 text-white">
            <div className="text-xl sm:text-2xl font-bold">Payments App</div>
            <div className="flex items-center">
                <div className="font-bold">Hello, {user}</div>
                {/* <div className="rounded-full h-12 w-12 flex justify-center items-center bg-slate-300 ml-2 my-1">
                    <div className="text-xl font-bold"></div>
                </div> */}
                <button 
                    onClick={Logout} 
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
