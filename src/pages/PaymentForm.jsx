import React from "react";
import { useNavigate } from "react-router-dom"; // Import điều hướng
import hinh1 from "../assets/hinh1.png";

function PaymentForm() {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handleConfirm = () => {
    // Sau khi xử lý logic thanh toán (nếu có), điều hướng về trang chủ
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      {/* Tiến trình đặt tour */}
      <div className="flex justify-center items-center mb-8 w-3/4 mx-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
            1
          </div>
          <span className="font-semibold">Điền thông tin</span>
        </div>
        <div className="w-16 border-b bg-blue-600 border-gray-300 mx-2 h-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
            2
          </div>
          <span className="text-gray-600">Thanh toán</span>
        </div>
        <div className="w-16 border-b border-gray-300 mx-2 h-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center mr-2">
            3
          </div>
          <span className="text-gray-600">Xác nhận</span>
        </div>
      </div>

      {/* Form thanh toán */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Thanh toán qua</h2>
          <div className="space-y-2">
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded w-full text-left">
              Thẻ ATM nội địa
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded w-full text-left">
              Thẻ tín dụng quốc tế
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded w-full text-left">
              QR Code
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded w-full text-left">
              Chuyển khoản
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded w-full text-left">
              Tại văn phòng
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Thanh toán qua thẻ ATM nội địa
          </h2>
          <p className="mb-4">Lưu ý trước khi thanh toán</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Thẻ thanh toán phải do ngân hàng nội địa phát hành và đã được kích
              hoạt chức năng thanh toán trực tuyến.
            </li>
            <li>Vui lòng xem hướng dẫn chi tiết tại đây.</li>
            <li>Xuất hóa đơn điện tử qua email.</li>
          </ul>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Tôi đồng ý với các điều khoản đặt hàng của TourDuLich
          </label>
          <button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Xác nhận
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Vui lòng thanh toán trước 00:15:00
          </p>
          <div className="bg-gray-100 p-4 rounded mt-8">
            <div className="flex items-center mb-4">
              <img
                src={hinh1}
                alt="Tour Thumbnail"
                className="w-24 h-20 object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold">
                  Tour Cao Bằng 2 Ngày 1 Đêm: Pác Bó - Thác Bản Giốc - Động
                  Ngườm Ngao
                </h3>
                <p>Mã tour: TOHANDBIMOCSAP5N4D</p>
                <p>Ngày khởi hành: 20/03/2025</p>
                <p>Số khách: 1 khách</p>
                <p>Giá 1 khách: 5,790,000 VND</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <p className="font-semibold">Tổng tiền: 5,790,000 VND</p>
              <p className="text-sm text-gray-600">
                Gọi 0222 2222 2222 để được hỗ trợ 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
