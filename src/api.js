const API_BASE_URL = "http://tour.phamhuuthuan.io.vn:8080/api"; // địa chỉ của API gateway

export const getAllTours = async () => {
  const response = await fetch(`${API_BASE_URL}/tours`);
  return response.json();
};

export const bookTour = async (data) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getCustomerById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`);
  return response.json();
};

export const sendPaymentNotification = async (userId, tourId, bookingId) => {
  const response = await fetch(`http://localhost:8087/api/notifications/payment-success?userId=${userId}&tourId=${tourId}&bookingId=${bookingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response.json();
};

export const sendBookingNotification = async (userId, tourId, bookingId) => {
  const response = await fetch(`http://localhost:8087/api/notifications/booking-success?userId=${userId}&tourId=${tourId}&bookingId=${bookingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response.json();
};
