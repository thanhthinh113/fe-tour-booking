import React from "react";

import hinh1 from "../assets/hinh1.png";
import { useNavigate } from "react-router-dom";

function TourDetail() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Tour Information Section */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">
          Tour Hà Giang Cao Bằng 5 Ngày 4 Đêm | Bản Giốc - Pác Bó - Động Ngườm
          Ngao - Ba Bể
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img
              src={hinh1} // Thay đổi đường dẫn ảnh
              alt="Tour 1"
              className="w-full h-100 object-cover mb-4"
            />
            <p className="mb-4">
              {/* Thêm mô tả chi tiết tour ở đây */}
              Hành trình khám phá Hà Giang - Cao Bằng 5 ngày 4 đêm đưa du khách
              đến với những địa danh nổi tiếng như: Bản Giốc, Pác Bó, Động Ngườm
              Ngao, Ba Bể...
            </p>
            <p className="mb-4">
              <strong>Ngày 1:</strong> Hà Nội - Hà Giang - Quản Bạ - Yên Minh
              <br />
              Xe và HDV đón khách tại điểm hẹn trong khu vực Phố Cổ và 10 điểm
              hẹn đón khách trên trục đường Nhật Tân - Nội Bài, khởi hành đi Hà
              Giang.
              <br />
              Đến Yên Minh, Quý khách nhận phòng khách sạn, ăn tối và nghỉ ngơi.
            </p>
            {/* ... Thêm thông tin chi tiết các ngày tiếp theo ... */}
            <p className="mb-4">
              <strong>Lưu ý cho chuyến đi:</strong>
              <br />
              - Quý khách nên mang theo quần áo ấm, giày dép thoải mái, mũ
              nón...
              <br />
              - Mang theo các loại thuốc cá nhân nếu cần thiết.
              <br />- Chuẩn bị máy ảnh, điện thoại để lưu giữ những khoảnh khắc
              đẹp.
            </p>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-xl font-bold text-blue-600 mb-2">
                5,190,000 VND/người
              </p>
              <div className="flex items-center mb-2">
                <label className="mr-2">Khởi hành:</label>
                <input type="date" className="border rounded p-1" />
              </div>
              <div className="flex items-center mb-2">
                <label className="mr-2">Số khách:</label>
                <input type="number" className="border rounded p-1" />
              </div>
              <button
                onClick={() => navigate("/dangky")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                ĐẶT TOUR
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-xl font-bold mb-2">TỔNG ĐÀI TƯ VẤN</p>
              <p>Quý khách có thắc mắc vui lòng gọi:</p>
              <p className="text-blue-600 font-bold">022 2222 2222</p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Tour nổi bật</h3>
              <div className="grid grid-cols-1 gap-4">
                {/* Thêm các tour nổi bật khác */}
                <div className=" rounded-lg  p-4">
                  <img
                    src={hinh1} // Thay đổi đường dẫn ảnh
                    alt="Tour 2"
                    className="w-100 h-54 object-cover mb-2"
                  />
                  <h4 className="font-semibold">Tour Cao Bằng 2N1Đ</h4>
                  <p className="text-blue-600">2,190,000 VND</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
