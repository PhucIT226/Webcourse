import { useAppSelector } from "../../../hooks";

export const TopCourses = () => {
  const { topCourses, loading } = useAppSelector((state) => state.dashboard);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Top khóa học bán chạy</h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Đang tải...</p>
      ) : topCourses.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có dữ liệu</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {topCourses.map((course) => (
            <li key={course.id} className="py-3 flex justify-between">
              <span>{course.title}</span>
              <span className="text-blue-600 font-medium">
                {course.salesCount} lượt bán
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
