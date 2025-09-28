# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 = `1. NODE_ENV=development`
 =   NODE_ENV là một biến môi trường chuẩn trong Node.js để xác định app của bạn đang chạy ở môi trường nào.
 =
 =   Thông thường có 3 giá trị chính:
 =
 =       `1. development`
 =          - Dùng khi bạn chạy app ở local để dev.
 =          - Bật nhiều log chi tiết (debug, query SQL, stack trace đầy đủ).
 =          - Cho phép hot reload, auto refresh.
 =          - Không tối ưu hiệu năng.
 =
 =       `2. test`
 =          - Dùng khi chạy unit test / integration test.
 =          - Thường kết nối vào database test riêng (không phải production DB).
 =          - Ít log, hoặc log ở dạng dễ parse cho CI/CD.
 =
 =       `3. production`
 =          - Dùng khi deploy thật cho người dùng.
 =          - Log tối giản (chỉ error, warn, info).
 =          - Tắt hot reload.
 =          - Tối ưu hiệu năng (cache, minify, disable debug…).
 =  `2. SMTP (Simple Mail Transfer Protocol)`
 =      - Là giao thức tiêu chuẩn để gửi email qua mạng.
 =      - Thường được sử dụng bởi các dịch vụ email như Gmail, Outlook, Yahoo Mail, ..., để gửi email từ một server ứng dụng (chứ không phải là gửi trực tiếp từ máy tính cá nhân).
 =
 =  `npx sequelize-cli db:create`
 =  `npx sequelize-cli db:migrate`
 =  `npx sequelize-cli db:seed:all`
 =  `npx sequelize-cli db:seed:undo:all`
 =  `npx sequelize-cli db:seed:all`
 =
 =
 =






🔐 `1. Authentication & Authorization`
    - Auth Middleware: kiểm tra JWT / session hợp lệ trước khi cho truy cập.
    - Role-based Access Control (RBAC): kiểm tra quyền của user (admin, instructor, student, guest).
    - Permission check: ví dụ chỉ instructor mới được tạo course, student mới được enroll.

🛡️ `2. Security Middleware`
    - Helmet (hoặc custom): thêm HTTP security headers (ngăn clickjacking, XSS…).
    - CORS Middleware: cho phép frontend call API an toàn.
    - Rate Limiter: chống brute-force login, DDoS (thường dùng express-rate-limit).
    - CSRF Protection: chống CSRF khi thanh toán hoặc form quan trọng.
    - XSS / SQL Injection filter: sanitize input (vd: xss-clean, express-validator).

📜 `3. Request & Response Middleware`
    - Request Logger: log method, URL, thời gian xử lý (vd: morgan).
    - Error Handler: bắt lỗi tập trung, trả về JSON thống nhất.
    - Validation Middleware: check body/query/params (vd: email hợp lệ, password đủ mạnh).
    - File Upload Middleware: xử lý upload avatar, course thumbnail, video (vd: multer).
    - Pagination Middleware: chuẩn hóa query _page, _limit trước khi vào controller.

💳 `4. Business Middleware (cho web bán khóa học)`
    - Payment Verification: xác thực webhook từ VNPay/MoMo/Stripe khi thanh toán.
    - Coupon Validation: kiểm tra mã giảm giá còn hạn, còn lượt sử dụng.
    - Enrollment Check: khi user mở course → kiểm tra đã mua/enroll chưa.
    - Progress Tracking: log tiến độ học (lesson completed, quiz passed…).

⚙️ `5. Optimization Middleware`
    - Cache Middleware (Redis/Memcached): cache danh sách khóa học, category.
    - Compression Middleware: gzip response.
    - ETag/Conditional GET: cho API trả về 304 Not Modified.

👉 `Tóm gọn, những middleware cần có ngay từ đầu:`
    - Auth (JWT)
    - Role-based Access
    - Validation
    - Error Handler
    - Logger
    - CORS
    - Rate Limit

Còn mấy middleware business (payment, coupon, enrollment) thì thêm khi build feature.

Mày có muốn tao viết code mẫu mấy middleware cơ bản (Auth, Role-based, Error handler)











components 
    - Là các thành phần nhỏ, tái sử dụng được.
    - Chỉ đảm nhiệm một chức năng cụ thể hoặc một phần UI nhỏ.

pages
    - Là các màn hình, trang lớn của ứng dụng.
    - Thường liên kết trực tiếp với route (React Router).
    - Có thể chứa nhiều components bên trong.

styles/user

pages/user

layouts/user

components/user