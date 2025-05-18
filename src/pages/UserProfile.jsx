import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    logout,
    token,
  } = useAuth();
  const navigate = useNavigate();

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [pwdSubmitting, setPwdSubmitting] = useState(false);
  const [showPwdForm, setShowPwdForm] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [nameEdit, setNameEdit] = useState(user.name);
  const [phoneEdit, setPhoneEdit] = useState(user.phone || "");
  const [infoSubmitting, setInfoSubmitting] = useState(false);

  if (!authLoading && !isAuthenticated) {
    navigate("/login");
    return null;
  }

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Đăng xuất thành công");
  };

  /* ---------- ĐỔI MẬT KHẨU ---------- */
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPwd || !newPwd) {
      toast.error("Vui lòng nhập đủ mật khẩu cũ và mới");
      return;
    }
    if (newPwd.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    if (oldPwd === newPwd) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu cũ");
      return;
    }

    setPwdSubmitting(true);
    try {
      await axios.post(
        "http://tour.phamhuuthuan.io.vn:8080/customer/changepassword",
        { oldPassword: oldPwd, newPassword: newPwd },
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );
      toast.success("Đổi mật khẩu thành công");
      setOldPwd("");
      setNewPwd("");
      setShowPwdForm(false);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Mật khẩu cũ không đúng, vui lòng thử lại");
      } else {
        toast.error(err.response?.data || "Đổi mật khẩu thất bại");
      }
    } finally {
      setPwdSubmitting(false);
    }
  };

  const handleUpdateInfo = async () => {
    if (!nameEdit.trim()) {
      toast.error("Họ tên không được để trống");
      return;
    }

    // Kiểm tra số điện thoại
    const phone = phoneEdit.trim();
    const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0, tiếp theo 9 số (tổng 10 số)

    if (!phone) {
      toast.error("Số điện thoại không được để trống");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số");
      return;
    }

    const payload = {
      id: user.id,
      name: nameEdit.trim(),
      phone: phone,
      email: user.email, // giữ nguyên, để backend không null field
    };

    setInfoSubmitting(true);
    try {
      const { data } = await axios.put(
        "http://tour.phamhuuthuan.io.vn:8080/customer/update",
        payload,
        {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      );

      toast.success("Cập nhật thành công");

      user.name = data.name;
      user.phone = data.phone;

      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data || "Cập nhật thất bại");
    } finally {
      setInfoSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-600 hover:underline"
              >
                Sửa thông tin
              </button>
            )}
          </div>

          {!editMode && (
            <div className="grid grid-cols-2 gap-6">
              <Info label="Họ tên" value={user.name} />
              <Info label="Email" value={user.email} />
              <Info
                label="Số điện thoại"
                value={user.phone || "Chưa cập nhật"}
              />
            </div>
          )}

          {editMode && (
            <div className="space-y-4">
              <Input
                label="Họ tên"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
              <Input
                label="Số điện thoại"
                value={phoneEdit}
                onChange={(e) => setPhoneEdit(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="border border-gray-400 rounded px-4 py-2"
                  onClick={() => {
                    setEditMode(false);
                    setNameEdit(user.name);
                    setPhoneEdit(user.phone || "");
                  }}
                >
                  Huỷ
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded disabled:opacity-60"
                  disabled={infoSubmitting}
                  onClick={handleUpdateInfo}
                >
                  {infoSubmitting ? "Đang lưu..." : "LƯU"}
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
            {!showPwdForm && (
              <button
                onClick={() => setShowPwdForm(true)}
                className="text-blue-600 hover:underline"
              >
                Hiển thị
              </button>
            )}
          </div>

          {showPwdForm && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                type="password"
                label="Mật khẩu cũ"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Mật khẩu mới"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPwdForm(false)}
                  className="border border-gray-400 rounded px-4 py-2"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={pwdSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded disabled:opacity-60"
                >
                  {pwdSubmitting ? "Đang xử lý..." : "XÁC NHẬN"}
                </button>
              </div>
            </form>
          )}
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <p className="text-gray-700">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      {...props}
    />
  </div>
);

export default UserProfile;
