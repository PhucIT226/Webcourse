import { useEffect, useState } from "react";

type Course = {
  id: number;
  thumbnailUrl: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  students: number;
  createdAt: string;
  status: "published" | "draft" | "closed";
};

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Giả lập API
    setCourses([
      {
        id: 1,
        thumbnailUrl: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
        title: "React Cơ Bản",
        instructor: "Nguyễn Văn A",
        category: "Front-end",
        price: 499000,
        students: 120,
        createdAt: "2025-01-10",
        status: "published",
      },
      {
        id: 2,
        thumbnailUrl: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
        title: "Node.js Nâng Cao",
        instructor: "Trần Thị B",
        category: "Back-end",
        price: 699000,
        students: 80,
        createdAt: "2025-02-09",
        status: "draft",
      },
    ]);
  }, []);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý khóa học</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
            Tìm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên khóa học</th>
              <th className="px-4 py-3">Giảng viên</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Học viên</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{course.id}</td>
                <td className="px-4 py-2">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{course.title}</td>
                <td className="px-4 py-2">{course.instructor}</td>
                <td className="px-4 py-2">{course.category}</td>
                <td className="px-4 py-2">{course.price.toLocaleString()}đ</td>
                <td className="px-4 py-2">{course.students}</td>
                <td className="px-4 py-2">{course.createdAt}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      course.status === "published"
                        ? "bg-green-100 text-green-600"
                        : course.status === "draft"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                    Sửa
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredCourses.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Không có khóa học nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
