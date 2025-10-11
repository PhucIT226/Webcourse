import { useLocation, useNavigate } from "react-router-dom";
import type { Course } from "../../types/course";
import {
  FaKey,
  FaUserTie,
  FaUser,
  FaFolderOpen,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaAlgolia,
  FaArrowLeft,
} from "react-icons/fa";

export default function CourseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Course | undefined;

  console.log("🖼️ Course data:", course);

  if (!course) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu khóa học
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-600 tracking-wide">
          Chi tiết khóa học
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Title & slug */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{course.title}</h2>
          <p className="text-sm text-indigo-500 italic">/{course.slug}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-lg">
          Mô tả: {course.description}
        </p>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-yellow-500 text-lg" />
              Mã khóa học: {course.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaUserTie className="mr-3 text-blue-600 text-lg" />
              Giảng viên: {course.instructor?.name}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaFolderOpen className="mr-3 text-yellow-500 text-lg" />
              Danh mục: {course.category?.name}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaMoneyBillAlt className="mr-3 text-green-500 text-lg" />
              Giá: <span className="text-xl font-bold">{Number(course.price).toLocaleString("vi-VN")} đ</span>
            </p>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaUser className="mr-3 text-purple-500 text-lg" />
              Học viên: {course.studentCount ?? 0}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaAlgolia className="mr-3 text-pink-500 text-lg" />
              Trạng thái:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  course.status === "published"
                    ? "bg-green-100 text-green-700"
                    : course.status === "draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {course.status}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo: {new Date(course.createdAt || "").toLocaleDateString("vi-VN")}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất: {new Date(course.updatedAt || "").toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Thumbnail dạng carousel mini */}
        {course.thumbnailUrls && course.thumbnailUrls.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold mb-3 text-gray-800 text-lg">Ảnh khóa học:</p>
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 rounded-xl">
              {course.thumbnailUrls.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:3000${img.url}`}
                  alt={course.title}
                  className="w-48 h-32 object-cover rounded-xl border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button quay lại */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 
            hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg 
            shadow-lg transition-all duration-300 font-medium"
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>
      </div>
    </div>
  );
}
