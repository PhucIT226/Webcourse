import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  courseCount: number;
  status: "active" | "hidden";
  createdAt: string;
};

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Giả lập API
    setCategories([
      {
        id: 1,
        name: "Lập trình",
        slug: "lap-trinh",
        description: "Khóa học về phát triển phần mềm",
        courseCount: 12,
        status: "active",
        createdAt: "2025-01-05",
      },
      {
        id: 2,
        name: "Thiết kế",
        slug: "thiet-ke",
        description: "Khóa học thiết kế đồ họa & UI/UX",
        courseCount: 8,
        status: "hidden",
        createdAt: "2025-01-20",
      },
    ]);
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý danh mục</h1>
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
              <th className="px-4 py-3">Tên danh mục</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3">Số khóa học</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2 font-medium">{cat.name}</td>
                <td className="px-4 py-2 text-gray-500">{cat.slug}</td>
                <td className="px-4 py-2 text-gray-700">
                  {cat.description || "-"}
                </td>
                <td className="px-4 py-2">{cat.courseCount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cat.status === "active" ? "Hoạt động" : "Ẩn"}
                  </span>
                </td>
                <td className="px-4 py-2">{cat.createdAt}</td>
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
            {filteredCategories.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Không có danh mục nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
