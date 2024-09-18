import { useEffect , useState } from "react";
import axios from "axios";


export const BalanceCard = ({ value }) => {
    const [balance , setBalance] = useState("");

    useEffect(() => {
            axios.get("http://localhost:8000/api/v1/transaction/balance",{
                headers: {
                   " Authorization ": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(function(response){
                setBalance(response.data);
            })
    },[])

    return (
        <div className="bg-gray-500 rounded-lg p-4 w-full max-w-xs text-white h-32 flex flex-col justify-center mt-6 ml-6">
            <div className="font-bold text-lg">Your Balance</div>
            <div className="font-semibold mt-2 text-xl">Rs {balance}</div>
        </div>
    );
};
