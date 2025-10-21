import { useNavigate } from "react-router-dom";
import LessonForm from "../../../components/admin/lessons/LessonForm";
import LessonService from "../../../services/lessonService";

export default function LessonCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    try {
      await LessonService.create(data);
      alert("Thêm bài học thành công!");
      navigate("/admin/lessons");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm bài học");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-6 py-4">
        Thêm bài học mới
      </h1>
      <LessonForm onSubmit={handleCreate} />
    </div>
  );
}
