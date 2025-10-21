import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchLessons } from "../../../../redux/lessonSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CourseVid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const { id } = useParams();
  const { lessons } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons({ courseId }));
    }
  }, [courseId, dispatch]);

  // Tìm bài hiện tại
  let currentIndex = lessons.findIndex((lesson) => lesson.id === id);
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const currentLesson = lessons[currentIndex];
  const formatNum = (num: number) => {
    const str = num.toString().padStart(3, "0");
    return `${str.slice(0, 2)} : ${str.slice(2)}`;
  };

  // Chuyển bài
  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      navigate(`/coursevid/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      navigate(`/coursevid/${prevLesson.id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          {currentLesson ? (
            <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-white">Đang tải video...</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white border-l overflow-y-auto">
          <div className="p-4 border-b font-semibold text-gray-700">
            Nội dung khóa học
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="section-1">
              <AccordionTrigger className="bg-gray-100 px-4 py-3 flex justify-between text-left font-medium text-gray-800 hover:bg-gray-200">
                <span>Bài học</span>
                <span className="text-sm text-gray-500">
                  {lessons.length} bài
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="divide-y">
                  {lessons.map((l, j) => (
                    <li
                      key={l.id}
                      className={`p-3 text-sm flex justify-between items-center cursor-pointer ${
                        currentIndex === j
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        navigate(`/coursevid/${l.id}`, { state: { courseId } })
                      }
                    >
                      <span>▶ {l.title}</span>
                      <span className="text-gray-500 text-xs whitespace-nowrap">
                        {formatNum(l.duration ?? 0)}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 py-3 border-t bg-white">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Bài trước
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Bài tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CourseVid;