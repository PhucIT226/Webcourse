// types/dashboard.ts

export type DashboardSummary = {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
};

export type RevenueStat = {
  month: string; // format YYYY-MM
  totalRevenue: number;
};

export type TopCourse = {
  id: string;
  title: string;
  price: number;
  thumbnailUrl: string;
  salesCount: number;
};

export type RecentOrder = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type RecentReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: string; name: string };
  course: { id: string; title: string };
};

// Tổng hợp data dashboard (nếu muốn gọi 1 lần)
export type DashboardData = {
  summary: DashboardSummary;
  revenueStats: RevenueStat[];
  topCourses: TopCourse[];
  recentOrders: RecentOrder[];
  recentReviews: RecentReview[];
};
