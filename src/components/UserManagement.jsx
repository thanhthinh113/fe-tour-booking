import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    role: "CUSTOMER",
    authProvider: "LOCAL",
    createdAt: "2024-01-01 10:00:00",
  },
  {
    id: 2,
    name: "Jane Admin",
    email: "admin@example.com",
    phone: "0987654321",
    role: "ADMIN",
    authProvider: "GOOGLE",
    createdAt: "2024-02-15 14:20:00",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
    authProvider: "LOCAL",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    const id = users.length + 1;
    const createdAt = new Date().toISOString();
    setUsers([...users, { ...newUser, id, createdAt }]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "CUSTOMER",
      authProvider: "LOCAL",
    });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc người dùng theo searchTerm
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Form thêm người dùng */}
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
            />
          </div>
        ))}
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      {/* Bảng người dùng */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Auth Provider</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.authProvider}</td>
              <td className="border px-4 py-2">{user.createdAt}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
