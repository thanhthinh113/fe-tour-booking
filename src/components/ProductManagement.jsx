import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const EMPTY = {
  title: "",
  description: "",
  location: "",
  duration: "",
  price: "",
  max_participants: "",
  start_date: "",
  end_date: "",
  image: null,
};

export default function ProductManagement() {
  const { token } = useAuth();
  const api = useMemo(
    () =>
      axios.create({
        baseURL: "http://tour.phamhuuthuan.io.vn:8080",
        headers: { Authorization: `Bearer ${token}` },
      }),
    [token]
  );

  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(null); // ảnh xem trước
  const [oldImage, setOldImg] = useState(null); // URL ảnh cũ
  const [editing, setEdit] = useState(null);
  const [filter, setFilter] = useState("");

  // Ref để reset input file
  const fileInputRef = useRef(null);

  const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");
  const reset = () => {
    setForm(EMPTY);
    setPreview(null);
    setOldImg(null);
    setEdit(null);
  };

  /* fetch tours */
  useEffect(() => {
    api.get("/tours").then((r) => setTours(r.data));
  }, [api]);

  /* ─────────────── ADD ─────────────── */
  const addTour = async () => {
    if (!form.image) return toast.error("Vui lòng chọn ảnh!");

    const fd = new FormData();
    const { image, ...rest } = form;
    fd.append(
      "tour",
      JSON.stringify({
        ...rest,
        start_date: fmt(rest.start_date),
        end_date: fmt(rest.end_date),
      })
    );
    fd.append("file", image);

    try {
      const { data } = await api.post("/tour/with-image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTours((p) => [...p, data]);
      toast.success("Thêm tour thành công!");
      reset();

      // Reset input file UI
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      toast.error("Thêm tour thất bại!");
    }
  };

<<<<<<< HEAD
  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0]; 
  };

  const handleAdd = () => {
    const {
      title,
      description,
      location,
      duration,
      price,
      max_participants,
      start_date,
      end_date,
      image,
    } = newTour;

    if (
      !title.trim() ||
      !description.trim() ||
      !location.trim() ||
      !duration ||
      !price ||
      !max_participants ||
      !start_date ||
      !end_date
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin tour!");
      return;
    }

    if (
      Number(duration) <= 0 ||
      Number(price) <= 0 ||
      Number(max_participants) <= 0
    ) {
      toast.error("Thời lượng, giá và số người tối đa phải là số dương!");
      return;
    }

    if (new Date(start_date) > new Date(end_date)) {
      toast.error("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu!");
      return;
    }

    if (!image) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }

    const formData = new FormData();
    const tourData = {
      ...newTour,
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
      created_at: formatDate(new Date()),
    };

    const { image: imageFile, ...tourWithoutImage } = tourData;

    formData.append("tour", JSON.stringify(tourWithoutImage));
    formData.append("file", imageFile);
=======
  const updateTour = async () => {
    const payload = {
      ...form,
      id_tour: editing,
      start_date: fmt(form.start_date),
      end_date: fmt(form.end_date),
    };

    try {
      let imageUrl = oldImage;

      if (form.image) {
        // 1. Upload ảnh mới trước
        const fd = new FormData();
        fd.append("file", form.image);
>>>>>>> 097d0381d6ef47c6c7310e8814372827e441bd65

        const uploadResp = await api.post("/tour/upload-image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadResp.data; // giả sử backend trả về URL ảnh
      }

      // 2. Cập nhật tour với URL ảnh (cũ hoặc mới)
      payload.image = imageUrl;
      const { data } = await api.put("/tour", payload);

      setTours((p) => p.map((t) => (t.id_tour === editing ? data : t)));

      toast.success("Cập nhật thành công!");
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  const save = () => (editing ? updateTour() : addTour());

  /* ─────────────── DELETE ─────────────── */
  const removeTour = (id) => {
    const toastId = toast.info(
      <div>
        <p>Bạn có chắc xoá tour này?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={async () => {
              try {
                await api.delete(`/tour/${id}`);
                setTours((p) => p.filter((t) => t.id_tour !== id));
                toast.dismiss(toastId);
                toast.success("Đã xoá tour!");
              } catch {
                toast.dismiss(toastId);
                toast.error("Xoá thất bại!");
              }
            }}
          >
            Xoá
          </button>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss(toastId)}
          >
            Huỷ
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  /* ─────────────── UI ─────────────── */
  const fields = [
    ["title", "Tiêu đề"],
    ["description", "Mô tả"],
    ["location", "Địa điểm"],
    ["duration", "Thời lượng (ngày)", "number"],
    ["price", "Giá", "number"],
    ["max_participants", "Số người tối đa", "number"],
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Quản lý Tour</h2>

      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Tìm theo địa điểm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* form */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {fields.map(([k, label, type = "text"]) => (
          <div key={k}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              className="w-full border px-2 py-1 rounded"
              type={type}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          </div>
        ))}

        {/* file input */}
        <div>
          <label className="block text-sm font-medium">Ảnh</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full border px-2 py-1 rounded"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setForm({ ...form, image: file });
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded shadow"
            />
          )}
        </div>
      </div>

      <button
        onClick={save}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {editing ? "Lưu thay đổi" : "Thêm Tour"}
      </button>
      {editing && (
        <button
          onClick={reset}
          className="ml-2 px-4 py-2 mb-4 bg-gray-400 text-white rounded"
        >
          Huỷ
        </button>
      )}

      {/* table */}
      <table className="min-w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            {["ID", ...fields.map(([, l]) => l), "Ảnh", "Hành động"].map(
              (h) => (
                <th key={h} className="border p-2">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {tours
            .filter((t) =>
              t.location.toLowerCase().includes(filter.toLowerCase())
            )
            .map((t) => (
              <tr
                key={t.id_tour}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setForm({
                    ...t,
                    start_date: fmt(t.start_date),
                    end_date: fmt(t.end_date),
                    image: null,
                  });
                  setPreview(t.image);
                  setOldImg(t.image);
                  setEdit(t.id_tour);
                }}
              >
                <td className="border p-2">{t.id_tour}</td>
                <td className="border p-2">{t.title}</td>
                <td className="border p-2">{t.description}</td>
                <td className="border p-2">{t.location}</td>
                <td className="border p-2">{t.duration}</td>
                <td className="border p-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(t.price)}
                </td>
                <td className="border p-2">{t.max_participants}</td>
                <td className="border p-2">
                  <img
                    src={t.image}
                    alt="tour"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTour(t.id_tour);
                    }}
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
}
