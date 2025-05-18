import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Statistical = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);

  const BASE_URL = "http://tour.phamhuuthuan.io.vn:8080";

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Không thể lấy dữ liệu thống kê!");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  // Thống kê
  const totalBookings = bookings.length;
  const totalPeople = bookings.reduce((acc, b) => acc + b.number_of_people, 0);
  const totalRevenue = bookings.reduce((acc, b) => acc + b.total_price, 0);

  const statusCount = {
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thống kê đặt tour</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-blue-700">Tổng số đơn</h3>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-green-700">Tổng số người</h3>
          <p className="text-2xl font-bold">{totalPeople}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Tổng doanh thu</h3>
          <p className="text-2xl font-bold">
            {totalRevenue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h4 className="text-md font-semibold">Đơn đang chờ</h4>
          <p className="text-xl text-gray-700">{statusCount.PENDING}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h4 className="text-md font-semibold">Đơn đã xác nhận</h4>
          <p className="text-xl text-green-700">{statusCount.CONFIRMED}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h4 className="text-md font-semibold">Đơn đã hủy</h4>
          <p className="text-xl text-red-700">{statusCount.CANCELLED}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
