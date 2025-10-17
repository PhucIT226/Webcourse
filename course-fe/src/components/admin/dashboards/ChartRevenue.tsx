import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../hooks";

export const ChartRevenue = () => {
  const { revenueStats, loading } = useAppSelector((state) => state.dashboard);

  const data =
    revenueStats.length > 0
      ? revenueStats.map((item) => ({
          month: item.month,
          revenue: item.totalRevenue,
        }))
      : [];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">
        Doanh thu 6 tháng gần nhất
      </h3>
      {loading ? (
        <p className="text-gray-500 text-sm">Đang tải biểu đồ...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `${value.toLocaleString("vi-VN")}₫`
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
