import { useLocation, useNavigate } from "react-router-dom";
import type { Course } from "../../../types/course";

export default function CourseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Course | undefined;

  if (!course) {
    return (
      <div className="p-6">
        <p className="text-red-500">Không tìm thấy dữ liệu khóa học</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Chi tiết khóa học</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Quay lại
        </button>
      </div>

      {/* Nội dung */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold">{course.title}</h2>
        <p className="text-gray-700">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p>
              <span className="font-semibold">Giảng viên:</span>{" "}
              {course.instructor?.name} ({course.instructor?.email})
            </p>
            <p>
              <span className="font-semibold">Danh mục:</span>{" "}
              {course.category?.name}
            </p>
            <p>
              <span className="font-semibold">Giá:</span>{" "}
              {Number(course.price).toLocaleString("vi-VN")} đ
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Học viên:</span>{" "}
              {course.studentCount ?? 0}
            </p>
            <p>
              <span className="font-semibold">Trạng thái:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-xs ${
                  course.status === "published"
                    ? "bg-green-100 text-green-600"
                    : course.status === "draft"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {course.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Ngày tạo:</span>{" "}
              {new Date(course.createdAt || "").toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Thumbnail */}
        {course.thumbnailUrls && course.thumbnailUrls.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Ảnh khóa học:</p>
            <div className="flex gap-2 flex-wrap">
              {course.thumbnailUrls.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={course.title}
                  className="w-40 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
