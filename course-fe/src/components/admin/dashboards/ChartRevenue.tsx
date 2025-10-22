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

  // Chuẩn hóa dữ liệu để luôn có 6 tháng
  const last6Months = Array.from({ length: 6 }, (_, i) =>
    new Date(new Date().setMonth(new Date().getMonth() - (5 - i)))
      .toISOString()
      .slice(0, 7)
  );

  const data = last6Months.map((month) => {
    const found = revenueStats.find((item) => item.month === month);
    return {
      month,
      revenue: found ? found.totalRevenue : 0,
    };
  });

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 min-w-[760px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">
          📈 Doanh thu 6 tháng gần nhất
        </h3>
        <span className="text-sm text-gray-500">
          (đơn vị: <span className="font-medium text-gray-700">VNĐ</span>)
        </span>
      </div>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500 text-sm animate-pulse">
            Đang tải biểu đồ...
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="4 3"
              stroke="#e5e7eb"
              opacity={0.7}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ stroke: "#60a5fa", strokeDasharray: "4 2" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              formatter={(value: number) =>
                [`₫${value.toLocaleString("vi-VN")}`, "Doanh thu"]
              }
              labelStyle={{ color: "#374151", fontWeight: 500 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} // chấm luôn hiện
              activeDot={{
                r: 7,
                fill: "#2563eb",
                strokeWidth: 3,
                stroke: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
