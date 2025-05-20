// src/components/Statistical.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const COLORS = ["#8884d8", "#82ca9d", "#ff7f7f"];

const Statistical = () => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const BASE_URL = "http://tour.phamhuuthuan.io.vn:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allBookings = response.data;

        // Đếm số lượng theo status
        const statusCounts = allBookings.reduce((acc, booking) => {
          acc[booking.status] = (acc[booking.status] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(statusCounts).map(([status, count]) => ({
          name: status,
          value: count,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
        toast.error("Không thể lấy dữ liệu thống kê!");
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thống kê trạng thái đặt tour</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistical;
