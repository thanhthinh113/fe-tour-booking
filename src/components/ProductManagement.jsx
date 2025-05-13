import React, { useState } from "react";

const initialProducts = [
  {
    id_tour: 1,
    title: "Ha Long Bay Cruise",
    description: "Explore Ha Long Bay.",
    location: "Ha Long",
    duration: 2,
    price: 200.0,
    max_participants: 20,
    start_date: "2025-06-01",
    end_date: "2025-06-03",
    created_at: "2025-05-01",
    image: "https://example.com/image.jpg",
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    price: "",
    max_participants: "",
    start_date: "",
    end_date: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewTour({ ...newTour, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newProduct = {
      ...newTour,
      id_tour: products.length + 1,
      created_at: new Date().toISOString().split("T")[0],
    };
    setProducts([...products, newProduct]);
    setNewTour({
      title: "",
      description: "",
      location: "",
      duration: "",
      price: "",
      max_participants: "",
      start_date: "",
      end_date: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id_tour !== id));
  };

  const handleEdit = (id) => {
    const updated = products.map((p) =>
      p.id_tour === id ? { ...p, title: p.title + " (Updated)" } : p
    );
    setProducts(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý Tour</h2>

      {/* Form thêm tour */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          ["title", "Tiêu đề"],
          ["description", "Mô tả"],
          ["location", "Địa điểm"],
          ["duration", "Thời lượng (ngày)"],
          ["price", "Giá"],
          ["max_participants", "Số người tối đa"],
          ["start_date", "Ngày bắt đầu"],
          ["end_date", "Ngày kết thúc"],
          ["image", "Link ảnh"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={
                ["price", "duration", "max_participants"].includes(name)
                  ? "number"
                  : name.includes("date")
                  ? "date"
                  : "text"
              }
              name={name}
              value={newTour[name]}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm Tour
      </button>

      {/* Bảng hiển thị */}
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Địa điểm</th>
            <th className="border p-2">Thời lượng</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">SL tối đa</th>
            <th className="border p-2">Bắt đầu</th>
            <th className="border p-2">Kết thúc</th>
            <th className="border p-2">Tạo lúc</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((tour) => (
            <tr key={tour.id_tour}>
              <td className="border p-2">{tour.id_tour}</td>
              <td className="border p-2">{tour.title}</td>
              <td className="border p-2">{tour.description}</td>
              <td className="border p-2">{tour.location}</td>
              <td className="border p-2">{tour.duration}</td>
              <td className="border p-2">${tour.price}</td>
              <td className="border p-2">{tour.max_participants}</td>
              <td className="border p-2">{tour.start_date}</td>
              <td className="border p-2">{tour.end_date}</td>
              <td className="border p-2">{tour.created_at}</td>
              <td className="border p-2">
                <img
                  src={tour.image}
                  alt="tour"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(tour.id_tour)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(tour.id_tour)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
