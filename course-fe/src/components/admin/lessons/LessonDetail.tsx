import { useLocation, useNavigate } from "react-router-dom";
import type { Lesson } from "../../../types/lesson";
import {
  FaKey,
  FaFolderOpen,
  FaVideo,
  FaCalendarAlt,
  FaArrowLeft,
  FaFileAlt,
  FaAlgolia,
} from "react-icons/fa";

export default function LessonDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const lesson = location.state?.lesson as Lesson | undefined;

  if (!lesson) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu bài học
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
          Chi tiết bài học
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Title */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{lesson.title}</h2>
        </div>

        {/* Content */}
        {lesson.content && (
          <p className="text-gray-700 leading-relaxed text-lg">
            Nội dung: {lesson.content}
          </p>
        )}

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-yellow-500 text-lg" />
              ID bài học: {lesson.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaFolderOpen className="mr-3 text-blue-600 text-lg" />
              Khóa học: {lesson.course?.title ?? "—"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaVideo className="mr-3 text-green-500 text-lg" />
              Thời lượng: {lesson.duration ? `${lesson.duration} phút` : "—"}
            </p>
            {/* Video */}
            {lesson.videoUrl && (
                <div className="flex flex-col">
                    <span className="text-gray-800 font-medium mb-1 flex items-center">
                    <FaVideo className="mr-3 text-red-500 text-lg" />
                    Video bài học:
                    </span>
                    <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                    >
                    {lesson.videoUrl}
                    </a>
                </div>
            )}
            <p className="flex items-center text-gray-800 font-medium">
              <FaAlgolia className="mr-3 text-pink-500 text-lg" />
              Trạng thái xem thử: {lesson.isFreePreview ? "Có" : "Không"}
            </p>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            {/* Resource URLs */}
            {lesson.resourceUrls && lesson.resourceUrls.length > 0 && (
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium mb-1 flex items-center">
                  <FaFileAlt className="mr-3 text-blue-500 text-lg" />
                  Tài nguyên:
                </span>
                <ul className="list-disc list-inside text-gray-700">
                  {lesson.resourceUrls.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ngày tạo & cập nhật */}
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo: {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString("vi-VN") : "—"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất: {lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleDateString("vi-VN") : "—"}
            </p>
          </div>
        </div>
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
