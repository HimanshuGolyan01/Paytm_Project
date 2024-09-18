import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [amount, setAmount] = useState("0");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Send Money</h2>
        <h2 className="text-2xl font-thin mt-8 text-center">Enter the Amount</h2>

        <div className="flex items-center justify-center mt-6">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <span className="text-2xl text-white">{name ? name[0].toUpperCase() : "?"}</span>
          </div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>

        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter the Amount"
          className="w-full p-3 border rounded-md mt-5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
        />

        <button 
          onClick={() => 
            axios.post(
              "http://localhost:8000/api/v1/transaction/transfer",
              {
                to: id,
                amount: amount
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
            )
          }
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
