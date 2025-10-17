import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchDashboardData } from "../../../redux/dashboardSlice";
import { StatCard } from "../../../components/admin/dashboards/StatCard";
import { ChartRevenue } from "../../../components/admin/dashboards/ChartRevenue";
import { TopCourses } from "../../../components/admin/dashboards/TopCourses";
import { RecentOrders } from "../../../components/admin/dashboards/RecentOrders";
import { Notifications } from "../../../components/admin/dashboards/Notifications";
import { RecentReviews } from "../../../components/admin/dashboards/RecentReviews";
import {
  FaBookOpen,
  FaUserGraduate,
  FaCartArrowDown,
  FaMoneyBillWave,
} from "react-icons/fa";


const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { summary, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard tổng quan</h1>

      {/* Section 1: Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tổng khóa học"
          value={summary?.totalCourses ?? 0}
          icon={<FaBookOpen className="text-orange-500" />}
          loading={loading}
        />
        <StatCard
          title="Tổng học viên"
          value={summary?.totalUsers ?? 0}
          icon={<FaUserGraduate className="text-blue-500" />}
          loading={loading}
        />
        <StatCard
          title="Tổng đơn hàng"
          value={summary?.totalOrders ?? 0}
          icon={<FaCartArrowDown className="text-yellow-500" />}
          loading={loading}
        />
        <StatCard
          title="Doanh thu"
          value={`₫${summary?.totalRevenue?.toLocaleString("vi-VN") ?? 0}`}
          icon={<FaMoneyBillWave className="text-green-500" />}
          loading={loading}
        />
      </div>

      {/* Section 2: Chart + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartRevenue />
        </div>
        <Notifications />
      </div>

      {/* Section 3: Top Courses + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCourses />
        <RecentOrders />
      </div>

      {/* Section 4: Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReviews />
      </div>
    </div>
  );
};

export default DashboardPage;
