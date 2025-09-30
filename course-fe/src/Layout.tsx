import "./styles/user/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/user/Intro/Intro";
import App from "./App";
import Home from "./pages/user/Home/Home";
import Login from "./Auth/login";
import Register from "./Auth/register";

import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard/dashboard";
import ProductList from "./pages/admin/products/product-list";
import UserList from "./pages/admin/users/user-list";
import Categories from "./pages/admin/categories/categories";
import CategoriesForm from "./pages/admin/categories/categories-form";
import Shipping from "./pages/admin/shipping/shipping";
import Profile from "./pages/admin/setting/profile";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="category-list" element={<Categories />} />
        <Route path="category-form" element={<CategoriesForm />} />
        <Route path="category-form/:id" element={<CategoriesForm />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Layout;
