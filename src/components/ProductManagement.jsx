import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    price: "",
    max_participants: "",
    start_date: "",
    end_date: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3333/tours")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch dữ liệu tours:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setNewTour({ ...newTour, image: files[0] });
    } else {
      setNewTour({ ...newTour, [name]: value });
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleAdd = () => {
    if (!newTour.image) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }

    const formData = new FormData();
    const tourData = {
      ...newTour,
      start_date: formatDate(newTour.start_date),
      end_date: formatDate(newTour.end_date),
      created_at: formatDate(new Date()),
    };

    const { image, ...tourWithoutImage } = tourData;

    formData.append("tour", JSON.stringify(tourWithoutImage));
    formData.append("file", image);

    axios
      .post("http://localhost:3333/tour/with-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setProducts([...products, res.data]);
        setNewTour({
          title: "",
          description: "",
          location: "",
          duration: "",
          price: "",
          max_participants: "",
          start_date: "",
          end_date: "",
          image: null,
        });
        toast.success("Thêm tour thành công!");
      })
      .catch((err) => {
        console.error("Lỗi khi thêm tour:", err);
        toast.error("Thêm tour thất bại!");
      });
  };

  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>Bạn có chắc chắn muốn xoá tour này?</p>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => {
              axios
                .delete(`http://localhost:3333/tour/${id}`)
                .then(() => {
                  setProducts((prev) => prev.filter((p) => p.id_tour !== id));
                  toast.success("Đã xoá tour thành công!");
                })
                .catch(() => toast.error("Xoá thất bại!"));
              toast.dismiss();
            }}
          >
            Xoá
          </button>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss()}
          >
            Huỷ
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleEdit = (id) => {
    const tour = products.find((p) => p.id_tour === id);
    const updatedTour = {
      ...tour,
      title: tour.title + " (Updated)",
      start_date: formatDate(tour.start_date),
      end_date: formatDate(tour.end_date),
    };

    axios
      .put(`http://localhost:3333/tours/${id}`, updatedTour)
      .then(() => {
        setProducts((prev) =>
          prev.map((p) => (p.id_tour === id ? updatedTour : p))
        );
        toast.success("Cập nhật thành công!");
      })
      .catch((err) => {
        console.error("Lỗi cập nhật:", err);
        toast.error("Cập nhật thất bại!");
      });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Quản lý Tour</h2>
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
        <div>
          <label className="block text-sm font-medium">Ảnh</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm Tour
      </button>

      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Địa điểm</th>
            <th className="border p-2">Thời lượng</th>
            <th className="border p-2">Giá (VND)</th>
            <th className="border p-2">SL tối đa</th>
            <th className="border p-2">Bắt đầu</th>
            <th className="border p-2">Kết thúc</th>
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
              <td className="border p-2">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(tour.price)}
              </td>
              <td className="border p-2">{tour.max_participants}</td>
              <td className="border p-2">{formatDate(tour.start_date)}</td>
              <td className="border p-2">{formatDate(tour.end_date)}</td>
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
