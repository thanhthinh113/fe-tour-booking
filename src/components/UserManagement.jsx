import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách đã lọc
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  const BASE_URL = "http://tour.phamhuuthuan.io.vn:8080/customer";

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customerlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setFilteredUsers(response.data); // Ban đầu, danh sách đã lọc giống danh sách gốc
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  // Handle search on frontend
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredUsers(users); // Nếu không có từ khóa, hiển thị toàn bộ danh sách
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTermLower) ||
        user.email?.toLowerCase().includes(searchTermLower) ||
        user.phone?.toLowerCase().includes(searchTermLower)
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [token]);

  // Update filtered users whenever searchTerm changes
  useEffect(() => {
    handleSearch();
  }, [searchTerm, users]);

  // Delete user

  const handleDeleteUser = (id) => {
    const toastId = toast.info(
      <div>
        <p>Bạn có chắc chắn muốn xoá người dùng này?</p>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={async () => {
              try {
                const response = await axios.delete(
                  `${BASE_URL}/delete/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (response.status === 204) {
                  const updatedUsers = users.filter((user) => user.id !== id);
                  setUsers(updatedUsers);
                  setFilteredUsers(updatedUsers);
                  toast.success("Đã xoá người dùng thành công!", {
                    autoClose: 5000,
                  });
                } else {
                  toast.error("Xoá người dùng thất bại!");
                }
              } catch (error) {
                console.error("Error deleting user:", error);
                toast.error("Đã xảy ra lỗi khi xoá!");
              }
              toast.dismiss(toastId); // 🔥 chỉ tắt toast xác nhận
            }}
          >
            Xoá
          </button>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(toastId)}
          >
            Huỷ
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
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
                {users.length === 0
                  ? "Loading..."
                  : "Không tìm thấy người dùng"}
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
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:underline"
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
