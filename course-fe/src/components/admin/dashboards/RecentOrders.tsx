import { useAppSelector } from "../../../hooks";

export const RecentOrders = () => {
  const { recentOrders, loading } = useAppSelector((state) => state.dashboard);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Đơn hàng gần đây</h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Đang tải...</p>
      ) : recentOrders.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có đơn hàng nào gần đây</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <li key={order.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium text-gray-700">
                  {order.user?.name || "Người dùng ẩn danh"}
                </p>
                <p className="text-sm text-gray-500">#{order.id}</p>
              </div>
              <span className="font-semibold text-gray-800">
                ₫{order.totalAmount.toLocaleString("vi-VN")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
