// src/components/Statistical.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const COLORS = ["#8884d8", "#82ca9d", "#ff7f7f", "#ffc658", "#8dd1e1", "#a4de6c"];

// Custom active shape to highlight hovered segment with percentage and value
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold" fontSize={18}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
      <circle cx={mx} cy={my} r={3} fill={fill} stroke="none" />
      <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} textAnchor={textAnchor} fill="#333">{`Số lượng: ${value}`}</text>
      <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} dy={18} textAnchor={textAnchor} fill="#999">
        {`Tỷ lệ: ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const Statistical = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const BASE_URL = "http://tour.phamhuuthuan.io.vn:8080";

  const fetchData = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Thống kê trạng thái đặt tour</h2>
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Đang tải..." : "Làm mới"}
        </button>
      </div>

      {data.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">Không có dữ liệu để hiển thị.</p>
      )}

      {loading && (
        <p className="text-center text-gray-700 mt-10">Đang tải dữ liệu...</p>
      )}

      {!loading && data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              isAnimationActive={true}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cursor="pointer" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, `Trạng thái: ${name}`]}
              contentStyle={{ backgroundColor: "#f0f0f0", borderRadius: "8px", border: "none" }}
              itemStyle={{ color: "#555", fontWeight: "bold" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Statistical;
