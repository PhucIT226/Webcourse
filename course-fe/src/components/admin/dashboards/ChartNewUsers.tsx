import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaUserGraduate } from "react-icons/fa";
import { useAppSelector } from "../../../hooks";
import dayjs from "dayjs";

export const ChartNewUsers = () => {
  const monthlyNewUsers = useAppSelector(
    (state) => state.dashboard.monthlyNewUsers
  );

  // Chuẩn hóa dữ liệu: luôn có đủ 6 tháng gần nhất
  const last6Months = Array.from({ length: 6 }, (_, i) =>
    dayjs().subtract(5 - i, "month").format("YYYY-MM")
  );

  const chartData = last6Months.map((month) => {
    const found = monthlyNewUsers.find((item) => item.month === month);
    return {
      month,
      count: found ? found.count : 0,
    };
  });

  const colors = ["#6C5DD3", "#7F56D9", "#9A70E3", "#B083ED", "#CA96F7", "#E0AAFF"];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 min-w-[760px] mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <FaUserGraduate className="text-blue-500 w-5 h-5" />
        <h3 className="font-semibold text-gray-800 text-lg">
          Học viên mới theo tháng
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 3" stroke="#e5e7eb" opacity={0.7} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [value, "Học viên mới"]}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
          />
          <Bar dataKey="count" radius={[5, 5, 0, 0]} animationDuration={800} fillOpacity={1}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} cursor="pointer" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
