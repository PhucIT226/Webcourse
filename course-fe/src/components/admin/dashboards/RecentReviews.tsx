// components/admin/dashboards/RecentReviews.tsx
import { useAppSelector } from "../../../hooks";

export const RecentReviews = () => {
  const { recentReviews } = useAppSelector((state) => state.dashboard);

  if (!recentReviews?.length) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Đánh giá gần đây</h3>
        <p className="text-gray-500 text-sm">Chưa có đánh giá nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Đánh giá gần đây</h3>
      <ul className="divide-y divide-gray-100">
        {recentReviews.map((r) => (
          <li key={r.id} className="py-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-700">{r.user.name}</p>
                <p className="text-sm text-gray-500">
                  {r.course.title} • ⭐ {r.rating}
                </p>
                <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
