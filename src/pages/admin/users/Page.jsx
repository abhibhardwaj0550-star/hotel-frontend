import { useEffect, useState } from "react";
import Navbar from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 p-4 md:p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">All Users</h2>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 shadow rounded-lg text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">#</th>
                    <th className="border px-3 py-2 text-left">Name</th>
                    <th className="border px-3 py-2 text-left">Email</th>
                    <th className="border px-3 py-2 text-left">Role</th>
                    <th className="border px-3 py-2 text-left">Created At</th>
                    <th className="border px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="border px-3 py-2">{index + 1}</td>
                        <td className="border px-3 py-2">{user.name}</td>
                        <td className="border px-3 py-2 break-all">{user.email}</td>
                        <td className="border px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs md:text-sm capitalize ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="border px-3 py-2">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="border px-3 py-2">
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="px-2 py-1 bg-red-600 text-white text-xs md:text-sm rounded hover:bg-red-700 transition"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
