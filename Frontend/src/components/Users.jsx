import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button"; 
import { useNavigate } from "react-router-dom"; 
import PaymentPage from "../Pages/Payments";

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
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
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
