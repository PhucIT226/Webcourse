import { useEffect, useState } from "react";
import axios from "../../../services/axiosClient";
import ThemeToggle from "./ThemeToggle";
import { toast } from "react-toastify";

export const SystemSettings = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Khi load trang -> lấy trạng thái từ localStorage + API
  useEffect(() => {
    const cached = localStorage.getItem("maintenanceMode");
    if (cached !== null) {
      setIsMaintenance(JSON.parse(cached));
    }

    const fetchSetting = async () => {
      try {
        const res = await axios.get("/settings/maintenance");
        setIsMaintenance(res.data.maintenanceMode);
        localStorage.setItem(
          "maintenanceMode",
          JSON.stringify(res.data.maintenanceMode)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSetting();
  }, []);

  // 🔹 Toggle bật/tắt bảo trì
  const handleToggleMaintenance = async () => {
    try {
      const newStatus = !isMaintenance;
      setIsMaintenance(newStatus);
      localStorage.setItem("maintenanceMode", JSON.stringify(newStatus));

      await axios.put("/settings/maintenance", {
        maintenanceMode: newStatus,
      });

      toast.success(
        newStatus ? "Đã bật chế độ bảo trì" : "Đã tắt chế độ bảo trì"
      );
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật trạng thái bảo trì");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold bg-base-100 mb-4">Cấu hình hệ thống</h3>
      <div className="space-y-4">
        <div className="py-4">
          <span>Ngôn ngữ</span>
          <select className="w-full bg-base-100 mt-3 -mb-2 border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
        </div>

        <div className="flex items-center py-4 justify-between">
          <span>Chế độ màn hình</span>
          <ThemeToggle />
        </div>

        <div className="flex items-center py-4 justify-between">
          <span>Chế độ bảo trì</span>
          <input
            type="checkbox"
            className="toggle toggle-error"
            checked={isMaintenance}
            onChange={handleToggleMaintenance}
          />
        </div>
      </div>
    </div>
  );
};
