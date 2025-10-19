import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import {
  FaBookOpen,
  FaUserGraduate,
  FaCartArrowDown,
  FaMoneyBillWave,
} from "react-icons/fa";

import { StatCard } from "./StatCard";
import { ChartRevenue } from "./ChartRevenue";
import { TopCourses } from "./TopCourses";
import { RecentOrders } from "./RecentOrders";
import { RecentReviews } from "./RecentReviews";
import { Notifications } from "./Notifications";
import type { VisibleSections } from "../../../types/dashboard";

interface DashboardPDFPreviewProps {
  summary: any;
  loading: boolean;
  visibleSections: VisibleSections;
  onClose: () => void;
}

export const DashboardPDFPreview = ({
  summary,
  loading,
  visibleSections,
  onClose,
}: DashboardPDFPreviewProps) => {
  const [previewSections, setPreviewSections] =
    useState<VisibleSections>(visibleSections);

  const togglePreviewSection = (key: keyof VisibleSections) => {
    setPreviewSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDownloadPDF = async () => {
    const pdfContent = document.getElementById("pdf-preview-content");
    if (!pdfContent) return;

    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      windowWidth: pdfContent.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("dashboard-report.pdf");

    // ✅ Lưu config PDF riêng biệt
    localStorage.setItem(
      "dashboardPDFSections",
      JSON.stringify(previewSections)
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-5xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Xem trước & chỉnh sửa PDF</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Chọn phần */}
        <div className="flex flex-wrap gap-4 border-b pb-3">
          {Object.keys(previewSections).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm capitalize cursor-pointer"
            >
              <input
                type="checkbox"
                checked={previewSections[key as keyof VisibleSections]}
                onChange={() => togglePreviewSection(key as keyof VisibleSections)}
              />
              {key}
            </label>
          ))}
        </div>

        {/* Nội dung preview */}
        <div
          id="pdf-preview-content"
          className="p-4 border rounded-md space-y-6 bg-white"
        >
          {previewSections.summary && (
            <div contentEditable suppressContentEditableWarning>
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
                  value={`₫${Math.ceil(summary?.totalRevenue ?? 0).toLocaleString("vi-VN")}`}
                  icon={<FaMoneyBillWave className="text-green-500" />}
                  loading={loading}
                />
              </div>
            </div>
          )}

          {previewSections.chart && (
            <div contentEditable suppressContentEditableWarning>
              <ChartRevenue />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {previewSections.topCourses && (
              <div contentEditable suppressContentEditableWarning>
                <TopCourses />
              </div>
            )}
            {previewSections.orders && (
              <div contentEditable suppressContentEditableWarning>
                <RecentOrders />
              </div>
            )}
          </div>

          {previewSections.reviews && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div contentEditable suppressContentEditableWarning>
                <RecentReviews />
              </div>
            </div>
          )}

          {previewSections.notifications && <Notifications />}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Tải xuống PDF
          </button>
        </div>
      </div>
    </div>
  );
};
