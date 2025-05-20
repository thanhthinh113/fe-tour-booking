import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [processingBookingId, setProcessingBookingId] = useState(null);
  const { token, user, isLoading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
 const BASE_URL = "http://customer.phamhuuthuan.io.vn:8082";
=======

  const BASE_URL = "http://tour.phamhuuthuan.io.vn:8080";

>>>>>>> 097d0381d6ef47c6c7310e8814372827e441bd65
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      navigate("/login");
      return;
    }

    if (!authLoading && isAuthenticated && user) {
      const fetchTourDetails = async (tourId) => {
        try {
          const response = await axios.get(`${BASE_URL}/tour/${tourId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching tour details:", error);
          return null;
        }
      };

      const fetchBookings = async () => {
        try {
<<<<<<< HEAD
          console.log('Fetching bookings for user:', user.id);
          const response = await fetch(`${BASE_URL}/bookings`, {
            headers: {
              'Authorization': `Bearer ${token}`
=======
          console.log("Fetching bookings for user:", user.id);
          const response = await axios.get(
            `${BASE_URL}/bookings/user/${user.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
>>>>>>> 097d0381d6ef47c6c7310e8814372827e441bd65
            }
          );

          const bookingsData = response.data;
          console.log("Bookings data:", bookingsData);

          // Fetch tour details for each booking
          const bookingsWithTourDetails = await Promise.all(
            bookingsData.map(async (booking) => {
              const tourDetails = await fetchTourDetails(booking.tour_id);
              return {
                ...booking,
                tour_title: tourDetails?.title || "Không có thông tin tour",
                tour_description: tourDetails?.description || "",
                tour_location: tourDetails?.location || "",
                tour_duration: tourDetails?.duration || 0,
                tour_price: tourDetails?.price || 0,
                tour_start_date: tourDetails?.start_date || null,
              };
            })
          );

          setBookings(bookingsWithTourDetails);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          toast.error("Không thể tải danh sách đặt tour");
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [token, navigate, user, authLoading, isAuthenticated, BASE_URL]);

  // Kiểm tra trạng thái thanh toán sau khi thanh toán hoàn tất
  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Lấy thông tin từ localStorage nếu tồn tại
      const paymentInfo = localStorage.getItem("currentPayment");
      if (paymentInfo && processingBookingId) {
        try {
          const { bookingId, paymentMethod } = JSON.parse(paymentInfo);

          // Thực hiện kiểm tra trạng thái thanh toán
          // Giả định API endpoint: ${BASE_URL}/payment/check-status/${bookingId}
          const response = await axios.get(
            `${BASE_URL}/payment/check-status/${bookingId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data && response.data.status === "SUCCESS") {
            // Cập nhật trạng thái booking
            const updateResponse = await axios.put(
              `${BASE_URL}/booking`,
              {
                id: bookingId,
                status: "CONFIRMED",
                payment_status: "PAID",
                payment_method: paymentMethod,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (
              updateResponse.status === 200 ||
              updateResponse.status === 204
            ) {
              setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                  booking.id === bookingId
                    ? {
                        ...booking,
                        status: "CONFIRMED",
                        payment_status: "PAID",
                        payment_method: paymentMethod,
                      }
                    : booking
                )
              );

              toast.success("Thanh toán thành công!");

              // Xóa thông tin thanh toán
              localStorage.removeItem("currentPayment");
              setShowPaymentFrame(false);
              setPaymentUrl("");
              setProcessingBookingId(null);
            }
          } else if (response.data && response.data.status === "FAILED") {
            toast.error("Thanh toán thất bại, vui lòng thử lại!");
            localStorage.removeItem("currentPayment");
            setShowPaymentFrame(false);
            setPaymentUrl("");
            setProcessingBookingId(null);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }
    };

    // Kiểm tra trạng thái thanh toán mỗi 5 giây
    const intervalId = setInterval(checkPaymentStatus, 5000);

    return () => clearInterval(intervalId);
  }, [token, BASE_URL, processingBookingId]);

  const canCancelBooking = (booking) => {
    if (booking.status !== "PENDING") {
      return false;
    }

    if (booking.tour_start_date) {
      const startDate = new Date(booking.tour_start_date);
      const now = new Date();
      const hoursUntilStart = (startDate - now) / (1000 * 60 * 60);

      // Không cho phép hủy tour trong vòng 24h trước khi bắt đầu
      return hoursUntilStart > 24;
    }

    return true;
  };

  const cancelBooking = async (id) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    if (!canCancelBooking(booking)) {
      toast.error("Không thể hủy tour này");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy đặt tour này?")) {
      return;
    }

    try {
      const updatedBooking = {
        id: id,
        status: "CANCELLED",
      };

      const response = await axios.put(`${BASE_URL}/booking`, updatedBooking, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        // Update bookings list
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, status: "CANCELLED" } : booking
          )
        );

        toast.success("Hủy đặt tour thành công");
      } else {
        throw new Error("Không thể hủy đặt tour");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Không thể hủy đặt tour");
    }
  };

  const closePaymentFrame = () => {
    if (window.confirm("Bạn có chắc muốn hủy quá trình thanh toán?")) {
      setShowPaymentFrame(false);
      setPaymentUrl("");
      setProcessingBookingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách tour đã đặt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {booking.tour_title}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Địa điểm:</span>{" "}
                {booking.tour_location}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Ngày đặt:</span>{" "}
                {new Date(booking.booking_date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Thời gian:</span>{" "}
                {new Date(booking.booking_date).toLocaleDateString("vi-VN")}
              </p>
              {booking.tour_start_date && (
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Ngày khởi hành:</span>{" "}
                  {new Date(booking.tour_start_date).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
              )}
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Số người:</span>{" "}
                {booking.number_of_people}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Tổng tiền:</span>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(booking.total_price)}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {booking.status === "PENDING"
                    ? "Chờ xác nhận"
                    : booking.status === "CONFIRMED"
                    ? "Đã xác nhận"
                    : booking.status === "CANCELLED"
                    ? "Đã hủy"
                    : booking.status}
                </span>

                <div className="flex space-x-2">
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => navigate(`/payment/${booking.id}`)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                        disabled={
                          paymentLoading || processingBookingId === booking.id
                        }
                      >
                        {paymentLoading &&
                        processingBookingId === booking.id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Đang xử lý
                          </span>
                        ) : (
                          "Thanh toán"
                        )}
                      </button>

                      {canCancelBooking(booking) && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                          disabled={paymentLoading}
                        >
                          Hủy đặt tour
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Bạn chưa đặt tour nào</p>
          <button
            onClick={() => navigate("/tours")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Xem danh sách tour
          </button>
        </div>
      )}

      {/* Payment iframe modal */}
      {showPaymentFrame && paymentUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Thanh toán</h2>
              <button
                onClick={closePaymentFrame}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-hidden rounded">
              <iframe
                src={paymentUrl}
                className="w-full h-full border-0"
                title="Payment Gateway"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Nếu cửa sổ thanh toán không hiển thị, vui lòng{" "}
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                bấm vào đây
              </a>{" "}
              để mở trang thanh toán.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
