import { Route, Routes } from "react-router-dom";

// User pages
import User from "./pages/user/user";
import Home from "./pages/user/Home/Home";
import DetailCourse from "./pages/user/Home/Content/DetailCourse";
import CourseVid from "./pages/user/Home/Content/CourseVid";
import SearchCourses from "./pages/user/Home/Header/SearchCourse";
import Login from "./Auth/login";
import Register from "./Auth/register";

// Admin pages
import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard/dashboard";

import CourseList from "./pages/admin/courses/courses";
import CourseDetail from "./components/admin/courses/CourseDetail";
import CourseCreate from "./pages/admin/courses/Course-create";
import CourseEdit from "./pages/admin/courses/Course-edit";

import UserList from "./pages/admin/users/users";
import UserDetail from "./components/admin/users/UserDetail";
import UserCreate from "./pages/admin/users/user-create";

import InstructorList from "./pages/admin/instructors/instructor-list";
import CategoryList from "./pages/admin/categories/category-list";
import CategoryDetail from "./components/admin/CategoryDetail";
import OrderList from "./pages/admin/orders/order-list";
import ReviewList from "./pages/admin/reviews/review-list";
import CouponList from "./pages/admin/coupons/coupon-list";
import Profile from "./pages/admin/setting/profile";
import PaymentPage from "./pages/user/Payment/PaymentPage";

function App() {
  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<User />}>
        <Route index element={<Home />} />
        <Route path="/course/:id" element={<DetailCourse />} />
        <Route path="/coursevid/:id" element={<CourseVid />} />
        <Route path="/coursesfound" element={<SearchCourses />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />

        {/* Course routes */}
        <Route path="courses">
          <Route index element={<CourseList />} />
          <Route path="create" element={<CourseCreate />} />
          <Route path=":id" element={<CourseDetail />} />
          <Route path=":id/edit" element={<CourseEdit />} />
        </Route>

        {/* Student routes */}
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path=":id" element={<UserDetail />} />
          {/* <Route path=":id/edit" element={<StudentEdit />} /> */}
        </Route>

        <Route path="instructor-list" element={<InstructorList />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="category/:id" element={<CategoryDetail />} />
        <Route path="order-list" element={<OrderList />} />
        <Route path="review-list" element={<ReviewList />} />
        <Route path="coupon-list" element={<CouponList />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
