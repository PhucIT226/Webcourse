import { useAppSelector } from "../../../hooks";

export const Notifications = () => {
  const { recentReviews, recentOrders } = useAppSelector(
    (state) => state.dashboard
  );

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Thông báo</h3>
      <ul className="space-y-3 text-sm text-gray-600">
        <li>🛒 {recentOrders.length} đơn hàng gần đây</li>
        <li>💬 {recentReviews.length} đánh giá mới</li>
      </ul>
    </div>
  );
};
