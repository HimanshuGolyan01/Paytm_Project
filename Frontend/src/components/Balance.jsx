import { useEffect, useState } from "react";
import axios from "axios";

export const BalanceCard = ({ value }) => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/transaction/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                setBalance(response.data);
            })
            .catch((error) => console.error("Error fetching balance:", error));
    }, []);

    
        return (
            <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 rounded-lg p-6 w-full max-w-xs text-white h-32 flex flex-col justify-center shadow-lg shadow-gray-900 mt-6 ml-6">
                <div className="font-bold text-2xl">Your Balance</div>
                <div className="font-semibold mt-4 text-3xl text-green-400">₹ {balance}</div>
            </div>
        );
};
