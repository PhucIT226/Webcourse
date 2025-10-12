import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUsers, deleteUser } from "../../../redux/userSlice";
import type { User } from "../../../types/user";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: users, pagination, loading, error } = useAppSelector(
    (state) => state.user
  );

  const [activeRole, setActiveRole] = useState<"student" | "instructor">("student");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    dispatch(fetchUsers({ 
      page, 
      pageSize: 15, 
      search, 
      sortField, 
      sortOrder, 
      role: activeRole,
    }));
  }, [dispatch, page, search, sortField, sortOrder, activeRole ]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="sticky top-16 z-20 p-4 my-4 bg-yellow-700 shadow-lg rounded-sm text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Quản lý người dùng</h1>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setActiveRole("student");
                setPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                activeRole === "student"
                  ? "bg-white text-yellow-700 border-white"
                  : "border-transparent hover:bg-yellow-600"
              }`}
            >
              Học viên
            </button>
            <button
              onClick={() => {
                setActiveRole("instructor");
                setPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                activeRole === "instructor"
                  ? "bg-white text-yellow-700 border-white"
                  : "border-transparent hover:bg-yellow-600"
              }`}
            >
              Giảng viên
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Tìm ${activeRole === "student" ? "học viên" : "giảng viên"}...`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border bg-white px-3 py-2 rounded-md text-sm text-black"
            />
            <button
              onClick={handleSearch}
              className="
                bg-gradient-to-r from-indigo-500 to-purple-500 
                hover:from-indigo-600 hover:to-purple-600
                text-white px-4 py-2 rounded-md text-sm"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Button add */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/courses/create")}
          className="bg-green-600 hover:bg-green-700 text-lg text-white px-4 py-2 rounded-md text-sm"
        >
          Thêm khóa học
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="whitespace-nowrap bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="border text-center px-4 py-3">STT</th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Họ tên {renderSortIcon("name")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email {renderSortIcon("email")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                STĐ {renderSortIcon("phone")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("address")}
              >
                Địa chỉ {renderSortIcon("address")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Trạng thái {renderSortIcon("status")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Ngày tạo {renderSortIcon("createdAt")}
              </th>
              <th className="border text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: User, index: number) => (
                <tr
                  key={user.id}
                  className="border-b whitespace-nowrap hover:bg-gray-50 transition-colors"
                >
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone || "—"}</td>
                  <td className="border px-4 py-2">{user.address || "—"}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          user.status === "active"
                            ? "bg-green-100 text-green-600"
                            : user.status === "inactive"
                            ? "bg-yellow-100 text-yellow-600"
                            : user.status === "banned"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600" // pending
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border text-center px-4 py-2">
                    {new Date(user.createdAt || "").toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() =>
                        navigate(`/admin/users/${user.id}`, { state: { user } })
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                  Không có học viên nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
