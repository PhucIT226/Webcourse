import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/auth/register.scss";
import { useNavigate } from "react-router-dom";
import type { RegisterForm } from "../types/auth";
import { authService } from "../services/authService";

// ✅ Schema validate cho Register
const schema = yup.object({
  name: yup.string().required("Họ tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    await authService.signup(data);
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow col-md-5 col-sm-8 col-12">
        <h3 className="text-center mb-4">Đăng ký</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Họ tên</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name")}
              placeholder="Nhập họ tên"
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              placeholder="Nhập email"
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              placeholder="Nhập mật khẩu"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              {...register("confirmPassword")}
              placeholder="Nhập lại mật khẩu"
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Đăng ký
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Đã có tài khoản?{" "}
          <button
            onClickCapture={() => navigate("/login")}
            className="btn-login"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
