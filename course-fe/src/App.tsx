import { Route, Routes, useNavigate } from "react-router-dom";
import Intro from "./pages/user/Intro/Intro";
import Home from "./pages/user/Home/Home";
import Login from "./Auth/login";
import Register from "./Auth/register";

import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard/dashboard";
import CourseList from "./pages/admin/courses/course-list";
import UserList from "./pages/admin/users/user-list";
import InstructorList from "./pages/admin/instructors/instructor-list";
import CategoryList from "./pages/admin/categories/category-list";
import OrderList from "./pages/admin/orders/order-list";
import ReviewList from "./pages/admin/reviews/review-list";
import CouponList from "./pages/admin/coupons/coupon-list";
import Profile from "./pages/admin/setting/profile";
import User from "./pages/user/user";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const hasSeenIntro = localStorage.getItem("hasSeeIntro");

  useEffect(() => {
    if (hasSeenIntro && showIntro) {
      navigate("intro");
    }
  }, [showIntro, navigate]);

  const handleFinishIntro = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    navigate("/");
  };

  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<User />}>
        <Route index element={<Home />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="course-list" element={<CourseList />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="instructor-list" element={<InstructorList />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="order-list" element={<OrderList />} />
        <Route path="review-list" element={<ReviewList />} />
        <Route path="coupon-list" element={<CouponList />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      {showIntro && (
        <Route
          path="/intro"
          element={<Intro onHandleFinish={handleFinishIntro} />}
        />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
