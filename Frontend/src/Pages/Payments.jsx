import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";


const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  async function PaymentHandler() {
    try {
      const response = await axios.post(
        "https://paytm-project-phi.vercel.app/api/v1/transaction/transfer",
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      toast.success(response.data.msg)
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response.data.error)
      toast.error(error.response.data.error)
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg shadow-gray-900 w-96">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Send Money</h2>

        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mr-4 shadow-lg">
            <span className="text-3xl text-white">{name ? name[0].toUpperCase() : "?"}</span>
          </div>
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
        </div>

        <h2 className="text-xl font-light text-center text-gray-300 mb-4">Enter the Amount</h2>

        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter the Amount"
          className="w-full p-3 border-2 border-gray-700 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          value={amount}
        />

        <button 
          onClick={PaymentHandler}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Pay Now
        </button>

        
      </div>
    </div>
  );
};

export default PaymentPage;
