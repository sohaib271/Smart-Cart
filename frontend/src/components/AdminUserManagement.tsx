import { useEffect, useState } from "react";
const AdminUsers = () => {
  const [users,setUsers]=useState([]);
  const [error,setError]=useState("");
  useEffect(()=>{
    const fetchAllUsers=async()=>{
      const response=await fetch(`${import.meta.env.VITE_API_URL}/user/all`);
      const result=await response.json();
      if(result){
        try {
          if(result.user) setUsers(result.user); 
        } catch (error) {
          if(error.result && error.result.error){
            setError(error.result.error)
          }
        }
      }
    }
    fetchAllUsers();
  },[])
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-dark-blue mb-6 text-center">
        Admin Panel - Users
      </h1>
      <h2 className="my-3 text-red-500">{error}</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-dark-blue text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td
                  className={`p-3 font-semibold ${
                    user.role === "seller" ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUsers;
