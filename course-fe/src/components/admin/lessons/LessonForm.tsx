import { useState, useEffect } from "react";
import type { Lesson } from "../../../types/lesson";
import axios from "../../../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Course = { id: string; title: string };

type Props = {
  initialData?: Lesson | null;
  onSubmit: (data: Partial<Lesson>) => void;
};

export default function LessonForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [resourceUrls, setResourceUrls] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | "">("");
  const [position, setPosition] = useState<number | "">("");
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      const couRes = await axios.get("/courses", {
      params: { page: 1, pageSize: 100 } // lấy nhiều khóa học hơn
    });
      setCourses(couRes.data.data || []);
    };
    fetchData();
  }, []);

  // Load dữ liệu nếu đang edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCourseId(initialData.courseId || "");
      setContent(initialData.content || "");
      setVideoUrl(initialData.videoUrl || "");
      setResourceUrls(initialData.resourceUrls || []);
      setDuration(initialData.duration ?? "");
      setPosition(initialData.position ?? "");
      setIsFreePreview(initialData.isFreePreview ?? false);
    }
  }, [initialData]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Vui lòng nhập tiêu đề bài học";
    if (!courseId) newErrors.courseId = "Vui lòng chọn khóa học";
    if (duration !== "" && duration <= 0) newErrors.duration = "Thời lượng phải > 0";
    if (position === "" || position < 0) newErrors.position = "Vị trí phải >= 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<Lesson> = {
      title: title.trim(),
      courseId,
      content: content.trim(),
      videoUrl: videoUrl.trim(),
      resourceUrls,
      duration: duration === "" ? undefined : Number(duration),
      position: Number(position),
      isFreePreview,
    };

    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Title */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài học"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Course */}
      <div>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Chọn khóa học --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        {errors.courseId && <p className="text-red-500 text-sm mt-1">{errors.courseId}</p>}
      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nội dung bài học"
        className="border px-3 py-2 rounded min-h-[80px] w-full"
      />

      {/* Video URL */}
      <input
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Link video (tùy chọn)"
        className="border px-3 py-2 rounded w-full"
      />

      {/* Resource URLs */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Tài nguyên kèm theo (URL):</label>
        {resourceUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2 items-center">
            <input
                type="text"
                value={url}
                onChange={(e) => {
                const newUrls = [...resourceUrls];
                newUrls[idx] = e.target.value;
                setResourceUrls(newUrls);
                }}
                placeholder={`URL #${idx + 1}`}
                className="border px-3 py-2 rounded w-full"
            />
            <button
                type="button"
                onClick={() => {
                    setResourceUrls(resourceUrls.filter((_, i) => i !== idx));
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
                Xóa
            </button>
            </div>
        ))}
        <button
            type="button"
            onClick={() => setResourceUrls([...resourceUrls, ""])}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mt-1 w-fit"
        >
            Thêm URL
        </button>
      </div>

      {/* Duration */}
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Thời lượng (phút)"
        className="border px-3 py-2 rounded w-full"
      />
      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}

      {/* Position */}
      <input
        type="number"
        value={position}
        onChange={(e) => setPosition(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Vị trí trong khóa học"
        className="border px-3 py-2 rounded w-full"
      />
      {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}

      {/* Free Preview */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFreePreview}
          onChange={(e) => setIsFreePreview(e.target.checked)}
        />
        Cho phép xem thử
      </label>

      {/* Buttons */}
      <div className="mt-8 flex justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg shadow-lg font-medium"
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow-md font-medium"
        >
          {initialData ? "Cập nhật bài học" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
