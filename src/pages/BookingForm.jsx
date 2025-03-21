import React from "react";
import hinh1 from "../assets/hinh1.png";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      {/* Tiến trình đặt tour */}
      <div className="flex justify-center items-center mb-8 w-3/4 mx-auto">
        {/* Bước 1 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
            1
          </div>
          <span className="font-semibold">Điền thông tin</span>
        </div>

        {/* Thanh ngang 1 - Điều chỉnh độ dài */}
        <div className="w-16 border-b border-gray-300 mx-2 h-1"></div>

        {/* Bước 2 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center mr-2">
            2
          </div>
          <span className="text-gray-600">Thanh toán</span>
        </div>

        {/* Thanh ngang 2 - Điều chỉnh độ dài */}
        <div className="w-16 border-b border-gray-300 mx-2 h-1"></div>

        {/* Bước 3 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center mr-2">
            3
          </div>
          <span className="text-gray-600">Xác nhận</span>
        </div>
      </div>

      {/* Form điền thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Điền thông tin liên hệ</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Họ và tên *</label>
            <input type="text" className="border rounded p-2 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1">Email *</label>
              <input type="email" className="border rounded p-2 w-full" />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Số điện thoại *
              </label>
              <input type="tel" className="border rounded p-2 w-full" />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Dịch vụ khác</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Hút thuốc
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Phòng tăng cao
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Trẻ em hiếu động
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Ăn chay
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Có người khuyết tật
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Phụ nữ có thai
              </label>
            </div>
          </div>
          <button className="text-blue-600 font-semibold">
            + Thêm yêu cầu đặc biệt khác
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            onClick={() => navigate("/payment")}
          >
            Tiếp tục
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Thông tin đặt tour</h2>
          <div className="bg-gray-100 p-4 rounded">
            <div className="flex items-center mb-4">
              <img
                src={hinh1} // Thay đổi đường dẫn ảnh
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

export default BookingForm;
