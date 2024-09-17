import React from "react";
import { Heading } from "../components/Heading";

const PaymentPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Send Money</h2>
        <h2 className="text-2xl font-thin mt-8 text-center">Enter the Amount</h2>

        
        <div className="flex items-center justify-center mt-6">
        
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <span className="text-2xl text-white">H</span>
          </div>
          
          <h3 className="text-2xl font-semibold">Friend's Name</h3>
        </div>

        
        <input
          type="number"
          placeholder="Enter the Amount"
          className="w-full p-3 border rounded-md mt-5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />

       
        <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
