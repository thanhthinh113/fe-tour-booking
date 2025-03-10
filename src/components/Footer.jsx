import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Cột Liên hệ */}
          <div>
            <h3 className="text-lg font-bold mb-3">Liên hệ</h3>
            <p className="mb-2">Hotline tư vấn: 0123 456 789</p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Cột Về Chúng Tôi */}
          <div>
            <h3 className="text-lg font-bold mb-3">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a href="/aboutus" className="hover:text-gray-300">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-300">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="termofservice" className="hover:text-gray-300">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Sản Phẩm */}
          <div>
            <h3 className="text-lg font-bold mb-3">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Tour Du Lịch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Combo giá tốt
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Khác */}
          <div>
            <h3 className="text-lg font-bold mb-3">Khác</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Chăm sóc khách hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Đăng ký đối tác
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-6 text-center border-t border-gray-400 pt-4">
          <p className="text-sm">
            &copy; 2025 Tourdulich. All rights reserved.
          </p>
          <p className="text-sm">
            Đội ngũ: Thanh Dinh - Hữu Thuận - Tuấn Trương - Hoàng Anh Thanh Than
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
