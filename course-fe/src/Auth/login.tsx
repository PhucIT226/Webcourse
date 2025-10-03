import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../styles/auth/login.scss";
import type { LoginForm } from "../types/auth";
import { useAppDispatch } from "../hooks";
import { signin } from "../redux/authSlice";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  isRemember: yup.boolean().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isRemember: false,
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const onSubmit = (data: LoginForm) => {
    dispatch(signin(data));
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow col-md-4 col-sm-8 col-12">
        <h3 className="text-center mb-4">Đăng nhập</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="mb-2">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              placeholder="Nhập mật khẩu"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="d-flex justify-content-end mb-3">
            <a href="#" className="small text-decoration-none">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Chưa có tài khoản?{" "}
          <button
            className="btn-register"
            onClick={() => navigate("/register")}
          >
            Resgister
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
