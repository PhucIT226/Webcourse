import { useState } from "react";
import { FaCamera } from "react-icons/fa";

export const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "Admin Master",
    email: "admin@email.com",
    phone: "",
    dob: "",
    address: "",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔄 Profile update:", formData);
    // TODO: Gọi API cập nhật user profile (sau khi có backend)
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="font-semibold text-gray-800 text-center text-3xl mb-4">Thông tin cá nhân</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img
              src={
                formData.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-all cursor-pointer rounded-full"
            >
              <FaCamera className="text-white text-lg" />
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name + Email */}
          <div className="text-center">
            <p className="font-medium text-gray-700 text-lg">{formData.name}</p>
            <p className="text-md text-gray-500">{formData.email}</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-lg text-gray-600">Tên hiển thị</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập tên admin..."
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-lg text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
            placeholder="admin@email.com"
          />
        </div>

        {/* Ngày sinh */}
        <div>
          <label className="text-lg text-gray-600">Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="text-lg text-gray-600">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
            placeholder="Nhập số điện thoại..."
          />
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="text-lg text-gray-600">Địa chỉ</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md resize-none"
            placeholder="Nhập địa chỉ..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};
