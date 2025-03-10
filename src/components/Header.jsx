import React from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <button className="flex items-center" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        <span>TOUR DU LỊCH</span>
      </button>
      <nav className="flex space-x-4">
        <a href="/" className="hover:text-gray-300">
          Trang chủ
        </a>
        <a href="#" className="hover:text-gray-300">
          Danh sách Tour
        </a>
        <a href="#" className="hover:text-gray-300">
          Khuyến mãi
        </a>
        <a href="/contact" className="hover:text-gray-300">
          Liên hệ
        </a>
      </nav>
      <button
        className="flex items-center"
        onClick={() => navigate("/profile")}
      >
        <img src={user} alt="Avatar" className="h-8 w-8 rounded-full mr-2" />
        <span>Xin chào, Phạm Hữu Thuận</span>
      </button>
    </header>
  );
}

export default Header;
