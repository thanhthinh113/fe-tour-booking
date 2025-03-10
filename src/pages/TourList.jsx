import React from "react";
import { useNavigate } from "react-router-dom";

function TourList({ title, tours }) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {tours.map((tour) => (
          <div key={tour.id} className="rounded-lg shadow-lg p-4">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-54 object-cover mb-2"
            />
            <h3 className="font-semibold">{tour.name}</h3>
            <p>{tour.description}</p>
            <p className="font-bold text-blue-600">{tour.price}</p>

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
