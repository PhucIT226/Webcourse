import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonForm from "../../../components/admin/lessons/LessonForm";
import LessonService from "../../../services/lessonService";
import type { Lesson } from "../../../types/lesson";

export default function LessonEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await LessonService.getById(id!);
        setLesson(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy bài học");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data: Partial<Lesson>) => {
    try {
      await LessonService.update(id!, data);
      alert("Cập nhật bài học thành công!");
      navigate("/admin/lessons");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật bài học");
    }
  };

  if (!lesson) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">
        Chỉnh sửa bài học
      </h1>
      <LessonForm initialData={lesson} onSubmit={handleUpdate} />
    </div>
  );
}
