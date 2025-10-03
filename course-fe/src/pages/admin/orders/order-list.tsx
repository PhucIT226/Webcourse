import { useEffect, useState } from "react";

type Order = {
  id: number;
  studentName: string;
  courseTitle: string;
  price: number;
  paymentMethod: "momo" | "vnpay" | "paypal" | "cod";
  paymentStatus: "pending" | "paid" | "refunded";
  orderStatus: "processing" | "completed" | "canceled";
  createdAt: string;
};

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Giả lập API
    setOrders([
      {
        id: 101,
        studentName: "Nguyễn Văn C",
        courseTitle: "React Cơ Bản",
        price: 499000,
        paymentMethod: "momo",
        paymentStatus: "paid",
        orderStatus: "completed",
        createdAt: "2025-03-01",
      },
      {
        id: 102,
        studentName: "Trần Thị D",
        courseTitle: "Node.js Nâng Cao",
        price: 699000,
        paymentMethod: "vnpay",
        paymentStatus: "pending",
        orderStatus: "processing",
        createdAt: "2025-03-02",
      },
    ]);
  }, []);

  const filteredOrders = orders.filter(
    (o) =>
      o.studentName.toLowerCase().includes(search.toLowerCase()) ||
      o.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý đơn hàng</h1>
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
              <th className="px-4 py-3">Mã đơn</th>
              <th className="px-4 py-3">Học viên</th>
              <th className="px-4 py-3">Khóa học</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Phương thức</th>
              <th className="px-4 py-3">TT Thanh toán</th>
              <th className="px-4 py-3">TT Đơn hàng</th>
              <th className="px-4 py-3">Ngày đặt</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2 font-medium">{order.studentName}</td>
                <td className="px-4 py-2">{order.courseTitle}</td>
                <td className="px-4 py-2">{order.price.toLocaleString()}đ</td>
                <td className="px-4 py-2">{order.paymentMethod.toUpperCase()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.orderStatus === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.orderStatus === "processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{order.createdAt}</td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                    Chi tiết
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
