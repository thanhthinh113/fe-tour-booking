// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <ul className="space-y-2 p-4">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-200 ${
              activeTab === tab ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
