import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCourses, deleteCourse } from "../../../redux/courseSlice";
import type { Course } from "../../../types/course";

export default function CourseList() {
  const dispatch = useAppDispatch();
  const { data: courses, pagination, loading, error } = useAppSelector(
    (state) => state.course
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCourses({ page, pageSize: 10, search }));
  }, [dispatch, page, search]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      dispatch(deleteCourse(id));
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý khóa học</h1>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Tìm khóa học..."
          className="border px-2 py-1 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">STT</th>
            <th className="border px-2 py-1">Tiêu đề</th>
            <th className="border px-2 py-1">Mô tả</th>
            <th className="border px-2 py-1">Giảng viên</th>
            <th className="border px-2 py-1">Danh mục</th>
            <th className="border px-2 py-1">Giá</th>
            <th className="border px-2 py-1">Học viên</th>
            <th className="border px-2 py-1">Trạng thái</th>
            <th className="border px-2 py-1">Ngày tạo</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course: Course, index: number) => (
              <tr key={course.id}>
                {/* STT = index trong trang + offset theo page */}
                <td className="border px-2 py-1">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="border px-2 py-1">{course.title}</td>
                <td className="border px-2 py-1">{course.description}</td>
                <td className="border px-2 py-1">{course.instructor}</td>
                <td className="border px-2 py-1">{course.category}</td>
                <td className="border px-2 py-1">
                  {course.price.toLocaleString("vi-VN")} đ
                </td>
                <td className="border px-2 py-1">{course.studentCount ?? 0}</td>
                <td className="border px-2 py-1">{course.status}</td>
                <td className="border px-2 py-1">
                  {new Date(course.createdAt || "").toLocaleDateString("vi-VN")}
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(course.id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center py-2">
                Không có khóa học nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  page === p ? "bg-blue-500 text-white" : ""
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
