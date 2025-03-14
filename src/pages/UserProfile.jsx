import React, { useState } from "react";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile"); // Trạng thái mặc định là hồ sơ cá nhân
  const [orders, setOrders] = useState([
    {
      id: 1,
      tourCode: "#TOUR128A5",
      tourName: "Khám phá Sapa - Lào Cai",
      destination: "Sapa",
      status: "Sắp khởi hành",
      payment: "Đã thanh toán",
    },
    {
      id: 2,
      tourCode: "#TOUR12BA5",
      tourName: "Khám phá Đà Nẵng - Hội An",
      destination: "Đà Nẵng",
      status: "Đang xử lý",
      payment: "Chưa thanh toán",
    },
  ]);

  // Hàm hủy đơn hàng
  const cancelOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    alert(`Đã hủy đơn hàng có ID: ${id}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 pr-8">
          <h2 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left ${
                  activeTab === "profile" ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Hồ sơ cá nhân
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  activeTab === "orders" ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Đơn hàng của tôi
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  activeTab === "reviews" ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Đánh giá tour đã đi
              </button>
            </li>
          </ul>
        </div>

        {/* Nội dung thay đổi theo tab */}
        <div className="w-3/4">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>
              <p className="mb-4">
                Lưu thông tin của quý khách để đặt dịch vụ nhanh hơn
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Họ tên</label>
                  <p>Nguyễn Văn A</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <p>nguyenvana@gmail.com</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Số điện thoại
                  </label>
                  <p>0123456789</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ngày sinh</label>
                  <p>01/01/1990</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Giới tính</label>
                  <p>Nam</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Địa chỉ</label>
                  <p>Hà Nội, Việt Nam</p>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                  Chỉnh sửa thông tin
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  ĐĂNG XUẤT
                </button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
              <p className="mb-4">Chúc quý khách có chuyến đi vui vẻ</p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Mã Tour</th>
                      <th className="border p-2">Tên chuyến</th>
                      <th className="border p-2">Điểm đến</th>
                      <th className="border p-2">Trạng thái</th>
                      <th className="border p-2">Thanh toán</th>
                      <th className="border p-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="border p-2">{order.id}</td>
                        <td className="border p-2">{order.tourCode}</td>
                        <td className="border p-2">{order.tourName}</td>
                        <td className="border p-2">{order.destination}</td>
                        <td className="border p-2">{order.status}</td>
                        <td className="border p-2">{order.payment}</td>
                        <td className="border p-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded mr-2"
                            onClick={() =>
                              alert(`Chi tiết đơn hàng: ${order.id}`)
                            }
                          >
                            Chi tiết
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                            onClick={() => cancelOrder(order.id)}
                          >
                            Hủy đơn
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Đánh giá tour đã đi</h2>
              <p>Chưa có đánh giá nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
