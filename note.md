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