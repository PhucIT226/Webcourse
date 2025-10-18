import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchDashboardData } from "../../../redux/dashboardSlice";
import {
  FaBookOpen,
  FaUserGraduate,
  FaCartArrowDown,
  FaMoneyBillWave,
  FaFilePdf,
} from "react-icons/fa";

import { StatCard } from "../../../components/admin/dashboards/StatCard";
import { ChartRevenue } from "../../../components/admin/dashboards/ChartRevenue";
import { TopCourses } from "../../../components/admin/dashboards/TopCourses";
import { RecentOrders } from "../../../components/admin/dashboards/RecentOrders";
import { RecentReviews } from "../../../components/admin/dashboards/RecentReviews";
import { Notifications } from "../../../components/admin/dashboards/Notifications";
import { DashboardPDFPreview } from "../../../components/admin/dashboards/DashboardPDFPreview";
import type { VisibleSections } from "../../../types/dashboard";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { summary, loading } = useAppSelector((state) => state.dashboard);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const visibleSections: VisibleSections = {
    summary: true,
    chart: true,
    topCourses: true,
    orders: true,
    reviews: true,
    notifications: true,
  };

  const getPDFSections = (): VisibleSections => {
    const saved = localStorage.getItem("dashboardPDFSections");
    return saved
      ? JSON.parse(saved)
      : {
          summary: true,
          chart: true,
          topCourses: true,
          orders: true,
          reviews: true,
          notifications: true,
        };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-8">
      {/* 🧭 Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Dashboard tổng quan
        </h1>

        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaFilePdf className="text-lg" />
          Xuất PDF
        </button>
      </div>

      {/* 📊 Thống kê */}
      {visibleSections.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
            value={Math.ceil(summary?.totalRevenue ?? 0).toLocaleString("vi-VN")}
            icon={<FaMoneyBillWave className="text-green-500" />}
            loading={loading}
          />
        </div>
      )}

      {/* 📈 Biểu đồ & Thông báo */}
      {visibleSections.chart && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ChartRevenue />
          </div>
          {visibleSections.notifications && <Notifications />}
        </div>
      )}

      {/* 🔥 Top bán chạy & Đơn hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleSections.topCourses && <TopCourses />}
        {visibleSections.orders && <RecentOrders />}
      </div>

      {/* 💬 Đánh giá gần đây */}
      {visibleSections.reviews && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentReviews />
        </div>
      )}

      {/* 🧾 Modal Preview */}
      {showPreview && (
        <DashboardPDFPreview
          summary={summary}
          loading={loading}
          visibleSections={getPDFSections()}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
