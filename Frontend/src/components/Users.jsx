import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button"; 
import { useNavigate } from "react-router-dom"; 
import { BalanceCard } from "./Balance";

export const Users = () => {
    const [filterUser, setFilterUser] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/v1/alluser/bulk?filter=${filter}`);
                setFilterUser(result.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 text-white py-10">
            <div className="w-full max-w-6xl p-8 bg-gray-800 rounded-lg shadow-lg shadow-gray-900">
                <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>
                
                {/* Container for BalanceCard and User List */}
                <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Left side: Balance Card */}
                    <div className="w-full md:w-1/3">
                        <BalanceCard />
                    </div>

                    {/* Right side: Search and User List */}
                    <div className="w-full md:w-2/3">
                        <div className="my-4">
                            <input
                                onChange={(e) => setFilter(e.target.value)}
                                type="text"
                                placeholder="Search users..."
                                className="w-full p-3 text-sm border-2 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-4">
                            {filterUser.length ? (
                                filterUser.map((user) => <User key={user._id} user={user} />)
                            ) : (
                                <div className="text-center text-gray-400">No users found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function User({ user }) {
    const navigate = useNavigate(); 

    return (
        <div className="flex justify-between items-center bg-gray-700 rounded-lg p-4 shadow-md shadow-gray-900 space-x-4">
            <div className="flex items-center space-x-4">
                <div className="rounded-full h-12 w-12 bg-gray-600 flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white font-semibold">
                        {user.name[0].toUpperCase()}
                    </span>
                </div>
                <div className="text-white font-medium">
                    {user.name}
                </div>
            </div>
            <Button 
                label="Send Money" 
                onClick={() => navigate(`/Payment?id=${user._id}&name=${user.name}`)} 
            />
        </div>
    );
}
