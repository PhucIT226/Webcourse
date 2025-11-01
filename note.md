1.  pool: {

    },
  - Đây là cấu hình connetion pool - tức là nhóm các kết nối mà nodejs có thể tái sử dụng để truy cập vào MySQL mà không cần mở kết nối mới mỗi lần. 
  - Phần Pool này dùng để tối ưu hiệu suất khi nhiều người đăng nhập cùng lúc. Giúp hệ thống chạy nhanh và ổn định hơn

2. Biến môi trường là gì?
  - Biến môi trường là những giá trị được lưu ngoài code, giúp cấu hình ứng dụng mà không cần sửa code
  Mục tiêu: Dễ bảo mật, dễ triển khai, dễ thay đổi giưa môi trường dev và production.

3. NODE_ENV=development
  - Cho biết môi trường đang chạy là gì
    + developer: môi trường phát triển (hiện log, lỗi chi tiết)
    + production: môi trường thực tế (ẩn log, bật bảo mật)

4. DATABASE_LOGGING=false
  - Tắt log câu SQL ra console

5. DB_POOL_IDLE=10000     -   Nếu kết nối rảnh hơn 10s thì tự đóng lại
   DB_POOL_ACQUIRE=30000  -   Chờ tối đa 30s để lấy 1 kết nối trước khi timeout

6. LOG_LEVEL=info - Ghi thông tin bình thường, hoạt động chính

7. up() - Được sequelize gọi khi chạy lệnh migrate -> tạo hoặc thay đổi bảng
8. down() - Được gọi khi rollback migration -> xóa bảng hoặc xóa cột vừa tạo

9. queryInterface - là một đối tượng của Sequelize cho phép ta gửi lệnh SQL đến database

10. UUID - Chuỗi định dạng duy nhất mặc định là UUIDv4 -> ngẫu nhiên
    - UUID là chỗi 128-bit(16byte) - thường dùng biểu diễn dưới dang 36 ký tự(bao gồm dấu -)
    - xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
      + x - Ký tự hex (0–9, a–f)
      + M - Version (1, 3, 4, 5…)
      + Variant (thường là 8, 9, a, hoặc b)

11. onDelete: "RESTRICT" - k cho phép xóa role nễu vẫn còn user dùng role đó
    onDelete: "CASCADE" - khi user bị xóa thì xóa luôn profile của user đó
    onDelete: "SET NULL" - nếu xóa instructor hoặc category thì set null cho cột

12. DATE - dùng để lưu ngày giờ trong DATABASE
13. fn("NOW") - tự động set thời gian hiện tại trong MySQL
14. DATEONLY - Kiểu dữ liệu chỉ chứa ngày k có giờ

15. TEXT kiểu chuỗi văn bản dài, không bị giới hạn như STRING(255)

16. ENUM - nghĩa là giá trị của cột này chỉ được phép nằm trong danh sách cố định 

17. JSON - cho phép lưu trực tiếp object hoặc array trong cột