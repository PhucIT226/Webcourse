import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchLessons } from "../../../../redux/lessonSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const DetailCourse = () => {
  const location = useLocation();
  console.log(location);
  const courseId = location.state?.courseId;
  const courseTitle = location.state?.courseTitle;
  const coursePrice = location.state?.coursePrice;
  console.log(coursePrice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: lessons, loading } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons({ courseId }));
    }
  }, [courseId, dispatch]);

  const totalDuration =
    lessons.length > 0
      ? Math.round(
          lessons.map((l) => l.duration || 0).reduce((a, b) => a + b, 0) /
            lessons.length
        )
      : 0;

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

        {/* Info summary */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <span>Tổng {lessons.length} bài học</span>
          {lessons.length > 0 && (
            <span>⏱️ Thời lượng trung bình: {totalDuration} phút</span>
          )}
        </div>

        {/* Lesson list */}
        {loading ? (
          <p>Đang tải...</p>
        ) : lessons.length === 0 ? (
          <p>Chưa có bài học nào trong khóa này.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={`item-${index}`}>
                <AccordionTrigger>{lesson.title}</AccordionTrigger>
                <AccordionContent>
                  {lesson.content || "Nội dung đang cập nhật..."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
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
          onClick={() =>
            navigate(`/payment/${courseId}`, {
              state: {
                courseId: courseId,
                courseTitle: courseTitle,
                coursePrice: coursePrice,
              },
            })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow"
        >
          ĐĂNG KÝ HỌC
        </button>

        <ul className="text-gray-600 text-sm mt-5 space-y-2">
          <li>💡 Trình độ cơ bản</li>
          <li>📚 Tổng {lessons.length} bài học</li>
          <li>⏱️ Thời lượng trung bình {totalDuration} phút</li>
          <li>💻 Học mọi lúc, mọi nơi</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCourse;
