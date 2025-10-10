import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      let url = "http://localhost:8080/api/users";
      if (query) url += `/search?q=${encodeURIComponent(query)}`;

      const res = await fetch(url, {
        headers: token
          ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(value);
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in to delete a user.");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete user");
      fetchUsers(search);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Registered Users</h2>

      <input
        type="text"
        placeholder="Search by username, email, or phone..."
        value={search}
        onChange={handleSearch}
        className="w-full sm:w-1/2 px-5 py-3 mb-6 rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-lg font-medium">Loading users...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                {token && <th className="px-6 py-3 text-right text-sm font-semibold uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={user.id} className={`transition-colors hover:bg-blue-50 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-4 text-gray-700 font-medium">{user.id}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{user.username}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">{user.phone || "-"}</td>
                    {token && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={token ? 5 : 4} className="text-center py-10 text-gray-400 text-lg">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
