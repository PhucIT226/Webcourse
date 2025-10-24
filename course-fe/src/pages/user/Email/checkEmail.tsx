import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy email từ state (được truyền từ trang đăng ký)
  const email = location.state?.email.email;
  console.log(email);
  console.log(location);

  // Nếu không có email (truy cập trực tiếp), quay lại trang đăng ký
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          🎉 Đăng ký thành công!
        </h2>
        <p className="text-gray-700 mb-2">
          Cảm ơn bạn đã đăng ký tài khoản tại <b>Học Dễ Thôi</b>.
        </p>
        <p className="text-gray-600">
          Vui lòng kiểm tra email
          <a className="font-medium text-indigo-600"> {email}</a> để xác minh
          tài khoản của bạn.
        </p>
        <p className="text-sm text-gray-400 mt-6">
          Nếu không thấy email, vui lòng kiểm tra hộp thư <b>Spam</b> hoặc{" "}
          <b>Thư rác</b>.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
        >
          Đến trang đăng nhập
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
