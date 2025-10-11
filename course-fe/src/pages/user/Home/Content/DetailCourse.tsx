import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { useSelector } from "react-redux";

import type { RootState } from "../../../../redux/store";
import type { TAny } from "../../../../types/common";
import { fetchLessons } from "../../../../redux/lessonSlice";
import { useAppDispatch } from "../../../../hooks";

const DetailCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch;

  const { lessons, loading } = useSelector((state: RootState) => state.lesson);

  const courseId = location?.state?.courseId;

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons());
    }
  }, [dispatch, courseId]);

  // Lấy danh sách chương (group by position)
  const chapters = lessons.reduce((acc: TAny[], lesson) => {
    const chapterIndex = Math.floor(lesson.position / 10) + 1; // ví dụ mỗi 10 lesson 1 chương
    if (!acc[chapterIndex - 1]) acc[chapterIndex - 1] = [];
    acc[chapterIndex - 1].push(lesson);
    return acc;
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 max-w-6xl mx-auto">
      {/* Left content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">
          {location?.state?.courseTitle}
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {location?.state?.courseDes}
        </p>

        {/* Course info summary */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <span>{chapters.length} chương</span>
          <span>• {lessons.length} bài học</span>
          <span>
            • Thời lượng{" "}
            {lessons.reduce((sum, l) => sum + (l.duration || 0), 0)} phút
          </span>
        </div>

        {/* Sections */}
        <Accordion type="single" collapsible className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            chapters.map((chapter, idx) => (
              <AccordionItem key={idx} value={`item-${idx + 1}`}>
                <AccordionTrigger>Chương {idx + 1}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {chapter.map((lesson: TAny) => (
                      <li key={lesson.id} className="text-gray-700">
                        {lesson.title}{" "}
                        {lesson.isFreePreview && (
                          <span className="text-green-500">(Free Preview)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>

      {/* Right sidebar */}
      <div className="md:w-72 flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-xl overflow-hidden shadow-md">
          <div className="aspect-video flex justify-center items-center">
            <div className="bg-white/20 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <p className="text-center font-medium py-3">
            Xem giới thiệu khóa học
          </p>
        </div>

        <h2 className="text-3xl text-orange-500 font-semibold mt-6 mb-3">
          Miễn phí
        </h2>

        <button
          onClick={() => navigate("/coursevid")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow"
        >
          ĐĂNG KÝ HỌC
        </button>

        <ul className="text-gray-600 text-sm mt-5 space-y-2">
          <li>💡 Trình độ cơ bản</li>
          <li>📚 Tổng số {lessons.length} bài học</li>
          <li>
            ⏱️ Thời lượng{" "}
            {lessons.reduce((sum, l) => sum + (l.duration || 0), 0)} phút
          </li>
          <li>💻 Học mọi lúc, mọi nơi</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCourse;
