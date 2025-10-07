import { useLocation, useNavigate } from "react-router-dom";
import type { Course } from "../../types/course";
import {
  FaUserTie,
  FaUser,
  FaFolderOpen,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";

export default function CourseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Course | undefined;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <p className="text-red-600 text-lg font-semibold mb-4">
          Không tìm thấy dữ liệu khóa học
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Tiêu đề */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-600">
          Chi tiết khóa học
        </h1>
        <p className="text-gray-500 mt-1 italic">/{course.slug}</p>
      </div>

      {/* Thông tin khóa học */}
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-5xl mx-auto space-y-8 border border-gray-100">
        {/* Tiêu đề & mô tả */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            {course.title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {course.description || "Chưa có mô tả cho khóa học này."}
          </p>
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaUserTie className="mr-3 text-blue-600" />
              Giảng viên:{" "}
              <span className="ml-1 text-gray-700 font-semibold">
                {course.instructor?.name || "Chưa cập nhật"}{" "}
                {course.instructor?.email
                  ? `(${course.instructor.email})`
                  : ""}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaFolderOpen className="mr-3 text-yellow-500" />
              Danh mục:{" "}
              <span className="ml-1 text-gray-700 font-semibold">
                {course.category?.name || "Chưa có danh mục"}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaMoneyBillAlt className="mr-3 text-green-500" />
              Giá:{" "}
              <span className="ml-1 text-xl font-bold text-green-700">
                {Number(course.price).toLocaleString("vi-VN")} đ
              </span>
            </p>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaUser className="mr-3 text-purple-500" />
              Học viên:{" "}
              <span className="ml-1 text-gray-700 font-semibold">
                {course.studentCount ?? 0}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaInfoCircle className="mr-3 text-indigo-500" />
              Trạng thái:{" "}
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
              <FaCalendarAlt className="mr-3 text-pink-500" />
              Ngày tạo:{" "}
              <span className="ml-1 text-gray-700 font-semibold">
                {new Date(course.createdAt || "").toLocaleDateString("vi-VN")}
              </span>
            </p>
          </div>
        </div>

        {/* Ảnh khóa học */}
        {course.thumbnailUrls && course.thumbnailUrls.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold mb-3 text-gray-800 text-lg">
              Ảnh khóa học:
            </p>
            <div className="flex gap-4 overflow-x-auto p-2 rounded-xl">
              {course.thumbnailUrls.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={course.title}
                  className="w-48 h-32 object-cover rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nút quay lại */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium"
        >
          <FaArrowLeft className="text-lg" />
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
}
