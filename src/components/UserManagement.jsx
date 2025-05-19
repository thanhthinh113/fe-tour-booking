import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  // Handle search on frontend
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredUsers(users);
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
              toast.dismiss(toastId);
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

  // Reset password for user
  const handleResetPassword = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/resetpassword/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        toast.success("Đã đặt lại mật khẩu thành công!");
      } else {
        toast.error("Đặt lại mật khẩu thất bại!");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Đã xảy ra lỗi khi đặt lại mật khẩu!");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
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
                <td className="border px-4 py-2 space-x-2">
                  {user.authProvider !== "GOOGLE" && (
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Reset PW
                    </button>
                  )}
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
