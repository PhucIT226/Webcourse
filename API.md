# ------------------------------------------------------------------------------- `API` ---------------------------------------------------------------------------------
 =
 =   📌 `Roles`
 =       GET    /api/v1/roles                   → danh sách roles
 =       POST   /api/v1/roles                   → tạo role
 =       GET    /api/v1/roles/:id               → chi tiết role
 =       PATCH  /api/v1/roles/:id               → cập nhật role
 =       DELETE /api/v1/roles/:id               → xóa role
 =
 =   📌 `Auth & Users`
 =       POST   /api/v1/auth/register           → đăng ký user mới
 =       POST   /api/v1/auth/login              → đăng nhập lấy JWT
 =       POST   /api/v1/auth/logout             → đăng xuất
 =       POST   /api/v1/auth/refresh            → cấp lại access token (refresh token)
 =       GET    /api/v1/auth/me                 → lấy thông tin user hiện tại (JWT)
 =
 =       GET    /api/v1/users                   → [admin] danh sách users
 =       GET    /api/v1/users/:id               → xem chi tiết user
 =       PATCH  /api/v1/users/:id               → cập nhật user
 =       DELETE /api/v1/users/:id               → xóa user
 =
 =   📌 `Profiles`
 =       *// User chỉ thao tác profile của mình*
 =          GET /api/v1/users/me/profile
 =          POST /api/v1/users/me/profile
 =          PATCH /api/v1/users/me/profile
 =          DELETE /api/v1/users/me/profile
 =
 =      *// Admin thao tác profile của tất cả user*
 =          GET /api/v1/profiles
 =          GET /api/v1/profiles/:id
 =          PATCH /api/v1/profiles/:id
 =          DELETE /api/v1/profiles/:id
 =
 =   📌 `Categories`
 =       GET    /api/v1/categories              → danh sách category
 =       GET    /api/v1/categories/:id          → chi tiết category
 =       POST   /api/v1/categories              → [admin] thêm category
 =       PUT    /api/v1/categories/:id          → [admin] cập nhật category
 =       DELETE /api/v1/categories/:id          → [admin] xóa category
 =
 =   📌 `Courses`
 =       GET    /api/v1/courses                 → danh sách course
 =       GET    /api/v1/courses/:id             → chi tiết course
 =       POST   /api/v1/courses                 → [instructor/admin] tạo course
 =       PATCH  /api/v1/courses/:id             → [instructor/admin] update course
 =       DELETE /api/v1/courses/:id             → [instructor/admin] xóa course
 =
 =   Instructor dashboard:
 =       GET /api/v1/instructors/me/courses     → list courses của instructor hiện tại
 =       GET /api/v1/instructors/me/students    → list học viên trong các course của instructor
 =       GET /api/v1/instructors/me/revenue     → báo cáo doanh thu (optional)
 =
 =   📌 `Lessons`
 =       GET    /api/v1/courses/:courseId/lessons           → list lessons trong course
 =       GET    /api/v1/courses/:courseId/lessons/:id       → chi tiết lesson
 =       POST   /api/v1/courses/:courseId/lessons           → [instructor] thêm lesson
 =       PATCH  /api/v1/courses/:courseId/lessons/:id       → [instructor] update lesson
 =       DELETE /api/v1/courses/:courseId/lessons/:id       → [instructor] xóa lesson
 =
 =   📌 `Orders`
 =       GET    /api/v1/users/:userId/orders                → danh sách order của user
 =       GET    /api/v1/orders/:id                          → chi tiết order
 =       POST   /api/v1/users/:userId/orders                → tạo order mới
 =       PATCH  /api/v1/orders/:id                          → cập nhật order (status, payment)
 =       DELETE /api/v1/orders/:id                          → xóa order
 =
 =   📌 `Order Items`
 =       GET    /api/v1/orders/:orderId/items               → danh sách order items
 =       GET    /api/v1/orders/:orderId/items/:id           → chi tiết order item
 =       POST   /api/v1/orders/:orderId/items               → tạo order item
 =       PATCH  /api/v1/orders/:orderId/items/:id           → cập nhật order item
 =       DELETE /api/v1/orders/:orderId/items/:id           → xóa order item
 =
 =   📌 `Payments`
 =       GET    /api/v1/orders/:orderId/payments               → danh sách payments của order
 =       GET    /api/v1/orders/:orderId/payments/:id           → chi tiết payment
 =       POST   /api/v1/orders/:orderId/payments               → tạo payment (khi user/instructor/admin thanh toán order)
 =       PATCH  /api/v1/orders/:orderId/payments/:id           → cập nhật trạng thái payment (pending → succeeded/failed/refunded)
 =       DELETE /api/v1/orders/:orderId/payments/:id           → xóa payment (trong trường hợp admin rollback / test data)
 =
 =   📌 `Enrollments`
 =       GET    /api/v1/users/:userId/enrollments           → danh sách khóa học user đã đăng ký
 =       GET    /api/v1/courses/:courseId/enrollments       → danh sách học viên trong course
 =       GET    /api/v1/enrollments/:id                     → chi tiết enrollment
 =       POST   /api/v1/enrollments                         → tạo enrollment
 =       PATCH  /api/v1/enrollments/:id                     → cập nhật enrollment (progress, completedAt)
 =       DELETE /api/v1/enrollments/:id                     → xóa enrollment
 =
 =   📌 `Coupons`
 =       GET    /api/v1/coupons                 → danh sách coupon
 =       GET    /api/v1/coupons/:id             → chi tiết coupon
 =       POST   /api/v1/coupons                 → tạo coupon mới
 =       PATCH  /api/v1/coupons/:id             → cập nhật coupon
 =       DELETE /api/v1/coupons/:id             → xóa coupon
 =
 =   📌 `Reviews`
 =       GET    /api/v1/courses/:courseId/reviews               → list reviews của course
 =       GET    /api/v1/courses/:courseId/reviews/:id           → chi tiết review
 =       POST   /api/v1/courses/:courseId/reviews               → tạo review mới
 =       PATCH  /api/v1/courses/:courseId/reviews/:id           → cập nhật review
 =       DELETE /api/v1/courses/:courseId/reviews/:id           → xóa review
 =
 =   📌 `Certificates`
 =       GET    /api/v1/users/:userId/certificates              → list certificate của user
 =       GET    /api/v1/users/:userId/certificates/:id          → chi tiết certificate
 =       POST   /api/v1/certificates                            → [system] phát hành certificate (userId + courseId)
 =       PATCH  /api/v1/certificates/:id                        → cập nhật certificate (certificateUrl)
 =       DELETE /api/v1/certificates/:id                        → xóa certificate
 =
 =  ✅ `Lưu ý về quan hệ cha – con:`
 =       Profile            → user (/users/:userId/profile)
 =       Lessons            → course (/courses/:courseId/lessons)
 =       Order Items        → order (/orders/:orderId/items)
 =       Reviews            → course (/courses/:courseId/reviews)
 =       Enrollments        → user & course (/users/:userId/enrollments, /courses/:courseId/enrollments)
 =       Certificates       → user (/users/:userId/certificates)
 =
 =   `Others`
 =       POST /api/v1/upload — signed upload for media (images/docs); video uploads handled separately via provider.
 =
 =  Payload & response notes
 = - Trả về metadata, liên kết đến media đã qua CDN/signed URL.
 = - Sử dụng standard HTTP status codes, trả về error object {code, message, details?}.
 =
# ------------------------------------------------------------------------------- `API` ---------------------------------------------------------------------------------





Những module có thể cân nhắc thêm nếu muốn hoàn thiện hơn:

Quản lý Voucher / Coupon / Khuyến mãi

Cho phép tạo mã giảm giá, ngày hết hạn, số lượng, áp dụng cho khóa học nào.

Quản lý Trang / Nội dung (CMS)

Trang About, FAQ, Blog, hoặc banner quảng cáo.

Quản lý Báo cáo / Thống kê

Doanh thu, số học viên theo khóa học, khóa học hot, lượt đăng ký theo tháng…

Quản lý Cấu hình Website / Cài đặt

Logo, favicon, email liên hệ, phương thức thanh toán.

Quản lý Vai trò / Quyền hạn (Roles & Permissions)

Nếu admin có nhiều cấp (super admin, editor, etc).

Hỗ trợ / Ticket / Chat (optional)

Quản lý yêu cầu hỗ trợ của học viên, feedback từ user.