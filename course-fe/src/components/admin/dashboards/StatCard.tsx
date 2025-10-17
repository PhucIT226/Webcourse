type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  loading?: boolean;
};

export const StatCard = ({ title, value, icon, loading }: StatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {loading ? (
          <p className="text-gray-400 text-sm mt-1 animate-pulse">
            Đang tải...
          </p>
        ) : (
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        )}
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  );
};
