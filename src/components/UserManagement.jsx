import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
    authProvider: "LOCAL",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false); // Track if we are editing an existing user
  const [editUserId, setEditUserId] = useState(null); // Store the ID of the user being edited

  const { token } = useAuth();

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://customer.phamhuuthuan.io.vn:8081/customer/customerlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://customer.phamhuuthuan.io.vn:8081/customer/update",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers([...users, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Update existing user
  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://customer.phamhuuthuan.io.vn:8081/customer/update`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === editUserId ? { ...user, ...newUser } : user
          )
        );
        resetForm();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://customer.phamhuuthuan.io.vn:8081/customer/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Filter out the deleted user from the list
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Reset form state
  const resetForm = () => {
    setIsEdit(false);
    setEditUserId(null);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "CUSTOMER",
      authProvider: "LOCAL",
    });
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* User form for adding/updating */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          ["name", "Name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["role", "Role"],
          ["authProvider", "Auth Provider"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={name === "phone" ? "tel" : "text"}
              name={name}
              value={newUser[name]}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded"
              placeholder={`Enter ${label.toLowerCase()}`}
              required
            />
          </div>
        ))}
        <button
          onClick={isEdit ? handleUpdateUser : handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? "Update User" : "Add User"}
        </button>
        {isEdit && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Users table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Auth Provider</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.authProvider}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setEditUserId(user.id);
                      setNewUser({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        authProvider: user.authProvider,
                      });
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
