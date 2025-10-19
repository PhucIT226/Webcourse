import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  fetchProfile,
  editProfile,
  fetchUserCourses,
} from "../../../../redux/profileSlice";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "courses">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { profile, loading, error, courses } = useAppSelector(
    (state) => state.profile
  );
  console.log(courses);

  useEffect(() => {
    if (userId) dispatch(fetchProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserCourses(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        address: profile.address || "",
        dateOfBirth: profile.dateOfBirth || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (userId) {
      dispatch(editProfile({ userId, data: formData }));
      setIsEditing(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Đang tải...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Lỗi: {error}</p>;
  if (!profile)
    return (
      <p className="text-center mt-10 text-gray-600">Không có dữ liệu hồ sơ</p>
    );

  const user = {
    name: profile.user?.name,
    email: profile.user?.email,
    location: profile.address || "Đà Nẵng, Việt Nam",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Tài khoản</h2>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🧍 Hồ sơ
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              activeTab === "courses"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            📚 Khoá học của tôi
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" ? (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-5 border-t pt-4 text-sm text-gray-500">
                  <p>📍 {user.location}</p>
                  <p>📞 {profile.phone}</p>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Chỉnh sửa
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa hồ sơ</h2>
                <div className="flex flex-col gap-3 text-left">
                  <label>
                    Họ và tên:
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Số điện thoại:
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Địa chỉ:
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Ngày sinh:
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">📚 Khoá học của tôi</h2>

            {loading ? (
              <p>Đang tải khoá học...</p>
            ) : (
              <div className="grid gap-4">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white shadow rounded-xl p-5 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {course.title}
                        </h3>
                        <div className="mt-2 bg-gray-200 h-2 rounded-full w-40">
                          <div className="bg-blue-500 h-2 rounded-full"></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500"></span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Bạn chưa mua khoá học nào.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
