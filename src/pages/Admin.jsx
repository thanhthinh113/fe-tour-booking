// // src/pages/Admin.js
// import React from "react";
// import NotFound from "./NotFound";

// const Admin = () => {
//   const user = JSON.parse(localStorage.getItem("userProfile"));

//   // if (!user || user.role !== "ADMIN") {
//   //   return <NotFound />; // hoặc trang báo lỗi
//   // }

//   return (
//     <div>
//       {/* Nội dung trang admin */}
//       <h1>Welcome Admin</h1>
//     </div>
//   );
// };

// export default Admin;

// src/pages/Admin.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserManagement from "../components/UserManagement";
import ProductManagement from "../components/ProductManagement";
import Revenue from "../components/Revenue";

const tabs = ["Users", "Products", "Revenue"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Users");
  // const user = JSON.parse(localStorage.getItem("userProfile"));

  // if (!user || user.role !== "ADMIN") {
  //   return <NotFound />; // hoặc trang báo lỗi
  // }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <div className="flex">
        <Sidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>
          {activeTab === "Users" && <UserManagement />}
          {activeTab === "Products" && <ProductManagement />}
          {activeTab === "Revenue" && <Revenue />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
