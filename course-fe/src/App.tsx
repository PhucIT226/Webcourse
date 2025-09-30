
import "./styles/user/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Intro from "./pages/user/Intro/Intro";
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
import User from "./pages/user/user";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate('intro')
  }, [])

  return (
    <Routes>
           {/* User */}
          <Route path="/" element={<User />}>
            <Route index element={<Home />} />
          </Route>

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
          
          <Route path="/intro" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
  );
}

export default App;
