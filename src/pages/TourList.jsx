import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  // Gọi API khi component mount
  useEffect(() => {
    console.log("Load tour");
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tours`);
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Lỗi khi gọi API tour:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách tour</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tours.map((tour) => (
          <div key={tour.id_tour} className="rounded-lg shadow-lg p-4 bg-white">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold text-lg">{tour.name}</h3>
            <p className="text-sm text-gray-600">{tour.description}</p>
            <p className="font-bold text-blue-600">{tour.price.toLocaleString()} đ</p>

            {/* Nút xem chi tiết */}
            <button
              onClick={() => navigate(`/tourdetail/${tour.id}`)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourList;