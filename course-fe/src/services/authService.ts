import type {
  LoginForm,
  LoginRes,
  RegisterForm,
  RegisterRes,
} from "../types/auth";
import axios from "../services/axiosClient";

export const authService = {
  async signin(data: LoginForm): Promise<LoginRes> {
    const res = await axios.post<LoginRes>("auth/login", data);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }
    return res.data;
  },
  async signup(data: RegisterForm): Promise<RegisterRes> {
    const res = await axios.post<RegisterRes>("auth/register", data);
    return res.data;
  },
};
