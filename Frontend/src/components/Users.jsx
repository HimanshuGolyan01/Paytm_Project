import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button"; 
import { useNavigate } from "react-router-dom"; 

export const Users = () => {
    const [filterUser, setFilterUser] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/v1/alluser/bulk?filter=${filter}`);
                console.log(result.data); 
                setFilterUser(result.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-7 text-lg ml-10">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className=" ml-6 w-30 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="bg-blue-800">
                {filterUser.length ? (
                    filterUser.map((user) => <User key={user._id} user={user} />)
                ) : (
                    <div>No users found</div>
                )}
            </div>
        </>
    );
};

export function User({ user }) {
    const navigate = useNavigate(); 

    return (
        <div className="flex justify-between bg-white rounded p-2 my-2 shadow">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mr-2">
                    <div className="text-xl">
                        {user.name[0]}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>
                        {user.name}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <Button 
                    label="Send Money" 
                    onClick={() => navigate(`/Payment?id=${user._id}&name=${user.name}`)} 
                />
            </div>
        </div>
    );
}
