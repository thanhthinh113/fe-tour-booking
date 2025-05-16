import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  const BASE_URL = "http://customer.phamhuuthuan.io.vn:8082";

  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setFilteredBookings([]);
      toast.error("Không thể lấy danh sách đặt tour!");
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter(
      (booking) =>
        booking.user_id.toString().includes(searchTerm) ||
        booking.tour_id.toString().includes(searchTerm)
    );
    setFilteredBookings(filtered);
  };

  const handleDeleteBooking = (id) => {
    const toastId = toast.info(
      <div>
        <p>Bạn có chắc muốn xóa đặt tour này không?</p>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={async () => {
              try {
                const response = await axios.delete(
                  `${BASE_URL}/booking/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (response.status === 200 || response.status === 204) {
                  const updatedBookings = bookings.filter(
                    (booking) => booking.id !== id
                  );
                  setBookings(updatedBookings);
                  setFilteredBookings(updatedBookings);
                  toast.success("Xóa đặt tour thành công!", {
                    autoClose: 5000,
                  });
                } else {
                  toast.error("Xóa đặt tour thất bại!");
                }
              } catch (error) {
                console.error("Error deleting booking:", error);
                toast.error("Đã xảy ra lỗi khi xóa!");
              }
              toast.dismiss(toastId);
            }}
          >
            Xóa
          </button>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(toastId)}
          >
            Hủy
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  const handleUpdateStatus = (id, newStatus) => {
    const toastId = toast.info(
      <div>
        <p>
          Bạn có chắc muốn cập nhật trạng thái đặt tour này thành{" "}
          <strong>
            {newStatus === "CONFIRMED" ? "ĐÃ XÁC NHẬN" : "ĐÃ HỦY"}
          </strong>
          ?
        </p>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={async () => {
              try {
                const bookingToUpdate = bookings.find(
                  (booking) => booking.id === id
                );
                const updatedBooking = {
                  ...bookingToUpdate,
                  status: newStatus,
                };

                const response = await axios.put(
                  `${BASE_URL}/booking`,
                  updatedBooking,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (response.status === 200 || response.status === 204) {
                  const updatedBookings = bookings.map((booking) =>
                    booking.id === id
                      ? { ...booking, status: newStatus }
                      : booking
                  );
                  setBookings(updatedBookings);
                  setFilteredBookings(updatedBookings);
                  toast.success(
                    `Cập nhật trạng thái thành ${
                      newStatus === "CONFIRMED" ? "ĐÃ XÁC NHẬN" : "ĐÃ HỦY"
                    } thành công!`,
                    {
                      autoClose: 5000,
                    }
                  );
                } else {
                  toast.error("Cập nhật trạng thái thất bại!");
                }
              } catch (error) {
                console.error("Error updating booking status:", error);
                toast.error("Đã xảy ra lỗi khi cập nhật!");
              }
              toast.dismiss(toastId);
            }}
          >
            Cập nhật
          </button>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(toastId)}
          >
            Hủy
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, bookings]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Quản lý đặt tour</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm theo Mã người dùng hoặc Mã tour"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Bảng dữ liệu */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Mã</th>
            <th className="border px-4 py-2">Người dùng</th>
            <th className="border px-4 py-2">Tour</th>
            <th className="border px-4 py-2">Ngày đặt</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Số người</th>
            <th className="border px-4 py-2">Tổng tiền(VND)</th>
            <th className="border px-4 py-2">Ngày tạo</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4">
                {bookings.length === 0
                  ? "Đang tải dữ liệu..."
                  : "Không tìm thấy kết quả"}
              </td>
            </tr>
          ) : (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.id}</td>
                <td className="border px-4 py-2">{booking.user_id}</td>
                <td className="border px-4 py-2">{booking.tour_id}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.booking_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm font-medium ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-500"
                        : booking.status === "CANCELLED"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="border px-4 py-2">{booking.number_of_people}</td>
                <td className="border px-4 py-2">
                  {booking.total_price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>{" "}
                <td className="border px-4 py-2">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-500 hover:underline mr-2"
                  >
                    Xóa
                  </button>

                  {/* Chỉ hiện nút "Xác nhận" nếu trạng thái hiện tại là PENDING */}
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(booking.id, "CONFIRMED")
                      }
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Xác nhận
                    </button>
                  )}

                  {/* Chỉ hiện nút "Hủy" nếu trạng thái hiện tại là PENDING */}
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(booking.id, "CANCELLED")
                      }
                      className="text-gray-500 hover:underline"
                    >
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
