# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 = `I. Phạm vi & Yêu cầu chính (Scope)`
 =      *1. Mục tiêu*
 =          - Bán khóa học online: người học đăng ký, mua khóa, học bài (video, tài liệu), làm bài kiểm tra, nhận chứng chỉ.
 =          - Admin quản lý khóa, nội dung, học viên, đơn hàng, báo cáo.
 =          - Thanh toán online (thẻ, ví, chuyển khoản) + COD/Offline (tùy thị trường).
 =          - Hỗ trợ coupon/khuyến mãi, review, rating.
 =
 =      *2. Người dùng (roles)*
 =          - Guest: duyệt, xem chi tiết (một phần), tạo tài khoản.
 =          - Student (Learner): mua, học, theo dõi tiến độ, review, nhận chứng chỉ.
 =          - Admin / Owner: quản lý toàn bộ (sản phẩm, đơn, users, báo cáo).
 =          - (Tùy chọn) Instructor: nếu muốn hỗ trợ nhiều người tạo khóa — có thể thêm sau.
 =
 =      *3. Chức năng MVP (bắt buộc cho đồ án)*
 =          - Đăng ký/Đăng nhập (email + password, OAuth optional)
 =          - Danh mục/khoá học: danh sách, lọc, tìm kiếm
 =          - Trang chi tiết khoá học (mô tả, chương mục, giảng viên, review, giá)
 =          - Giỏ hàng & Thanh toán (order create, payment gateway mock)
 =          - Enroll: quản lý học viên đã mua
 =          - Trình phát bài học (video + tài liệu pdf)
 =          - Admin panel cơ bản: CRUD course, quản lý đơn hàng, users
 =          - API docs (OpenAPI/Swagger) + README + deployed demo
 =
 = `II. Kiến trúc tổng quan`
 =      - Kiến trúc: Client (SPA React) <-> RESTful API (Express) <-> MySQL + Redis (cache/session) + Storage (S3 / Cloud)
 =      - Deployment: Docker Compose (MVP) / K8s (scale) + Nginx reverse-proxy + HTTPS
 =      - Storage cho media: KHÔNG lưu trực tiếp video lớn trong DB/VPS — dùng Cloud (Vimeo Pro / Cloudflare Stream / AWS S3 + CloudFront). Lưu URL  metadata trong DB.
 =
 =      *Mẫu tech stack cụ thể:*
 =          - Frontend: React (TypeScript) + Vite + TailwindCSS + React Router + React Query / Zustand (state)
 =          - Backend: Node.js + Express (TypeScript) + Prisma/TypeORM/Sequelize (ORM cho MySQL)
 =          - Auth: JWT (access + refresh) hoặc HttpOnly cookie cho refresh
 =          - DB: MySQL (phpMyAdmin để quản trị)
 =          - Cache/session: Redis
 =          - File storage: AWS S3 / Cloudflare / Vimeo
 =          - CI/CD: GitHub Actions
 =
 = `III. API Design (REST) — sample endpoints`
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
 =       Profile → user (/users/:userId/profile)
 =       Lessons → course (/courses/:courseId/lessons)
 =       Order Items → order (/orders/:orderId/items)
 =       Reviews → course (/courses/:courseId/reviews)
 =       Enrollments → user & course (/users/:userId/enrollments, /courses/:courseId/enrollments)
 =       Certificates → user (/users/:userId/certificates)
 =
 =   `Others`
 =       POST /api/v1/upload — signed upload for media (images/docs); video uploads handled separately via provider.
 =
 =  Payload & response notes
 = - Trả về metadata, liên kết đến media đã qua CDN/signed URL.
 = - Sử dụng standard HTTP status codes, trả về error object {code, message, details?}.
 =
 = `IV. Luồng nghiệp vụ chính (mô tả step-by-step)`
 =      - LUỒNG: Mua khóa (checkout)

    User login (or guest checkout if support)
    Thêm khóa vào giỏ → client giữ cart + call coupon validate
    User confirm order → POST /orders tạo order status pending
    Backend tạo payment intent / redirect URL cho gateway (Stripe/PayPal/VNPay/MoMo)
    User thanh toán trên gateway → gateway gọi POST /payments/webhook
    Nếu thành công: update payments + orders.status = paid + tạo enrollment cho user (one row per course) + gửi email xác nhận / hóa đơn
    Admin UI shows order in processing/fulfilled if manual tasks.

 - LUỒNG: Học bài (consuming content
    Student đi đến course page → check if enrolled
    Nếu chưa, xem preview lessons (is_free_preview true)
    Nếu enrolled: fetch module/lesson list, sử dụng signed video URL để phát (Token-based)
    Client gửi progress pings → server lưu enrollments.progress hoặc table riêng lesson_progress
    Khi hoàn thành tất cả lessons → cập nhật completed_at, generate certificate.

`V. Frontend — cấu trúc & UI components`
1. Pages chính

/ Home (featured, categories, latest)
/courses Course list + filters
/courses/:slug Course detail
/courses/:slug/learn Learning area (modules, player)
/cart Giỏ hàng
/checkout Thanh toán
/auth/login, /auth/register
/profile My courses, progress
/admin/* Admin dashboard

2. Component Tree (gợi ý)

App → Routes
Layout (Header, Footer, Sidebar)
Header (search, auth, cart)
CourseCard, CourseList, Pagination, FilterPanel
CourseDetail (hero, curriculum, reviews)
Player (video player wrapper) — load signed URL, track time
Admin (CourseEditor, OrderList, UserList)

3. State management

Use React Query for server state (caching, refetching) — rất phù hợp cho data-driven apps.
Zustand hoặc Context cho UI state (cart local, theme)
Keep auth token in memory + refresh token in HttpOnly cookie.

4. UX/SEO
Vì Vite + SPA có hạn chế SEO; nếu SEO quan trọng (course pages cần index) — giải pháp:
Pre-render key pages (react-snap) OR
Dùng Next.js (SSR) — cân nhắc nếu cần SEO lớn.
Thêm Open Graph / JSON-LD cho mỗi course page.

`VI. Backend — cấu trúc folder gợi ý (Express + TypeScript)`
/src
  /controllers
  /services
  /routes
  /middlewares (auth, role, rateLimit, validation)
  /models (Prisma schema hoặc TypeORM entities)
  /utils (email, payments, storage)
  /jobs (background workers: email sending, report)
  /config
  app.ts
  server.ts


Tách rõ controller (HTTP) và service (logic).

Payment webhooks xử lý async (queue) — dùng BullMQ + Redis nếu cần.

`VII. Bảo mật & best practices`

Password: bcrypt (salt), không dùng MD5.
Auth: JWT short-lived (15m) + Refresh token (HttpOnly cookie, rotate & store hashed token in DB).
HTTPS: Bắt buộc trên production.
Helmet + CORS strict + rate-limiter (express-rate-limit).
Input validation & sanitization: express-validator hoặc zod.
File upload: virus scanning, file size limit, content-type check.
Protect video/media: signed URLs (expiring), token-based playback.
SQL injection: dùng ORM/parameterized queries.
XSS: sanitize any user-generated HTML (reviews).
Logging: centralized logger (winston), tránh log sensitive data (passwords/tokens).

`VIII. Hiệu năng & scale (khi cần)`

Cache: Redis cho sessions, course list caching, rate-limit store.
CDN: CloudFront / Cloudflare cho static + media.
DB: indices trên fields query thường xuyên (slug, category_id, user_id). Sử dụng read replica khi scale đọc.
Video: sử dụng streaming provider (Cloudflare Stream) để offload bandwidth.
Search: MySQL full-text hoặc ElasticSearch cho search/filters.
Background jobs: xử lý gửi email, báo cáo, video processing bằng queue (Redis + Bull).

`IX. DevOps, testing & monitoring`

Dockerfile + docker-compose.yml (db, redis, phpmyadmin, api, frontend) cho dev.
CI: Github Actions: build/test/lint -> push image -> deploy.
CD: deploy to VPS (docker) hoặc cloud (ECS/GKE).
Monitoring: Sentry (errors), Prometheus + Grafana (metrics).
Health checks: /healthz, readiness/liveness.
Backups: Scheduled DB dump -> S3.
Testing:
Backend: Jest + Supertest (unit + API)
Frontend: Jest + React Testing Library
E2E: Cypress

`X. Gợi ý thư viện & tools cụ thể`

Backend: express, typeorm OR prisma, bcrypt, jsonwebtoken, express-validator, helmet, cors, morgan, winston, bullmq (jobs)
Frontend: react, typescript, vite, tailwindcss, react-router-dom, react-query, axios, react-hook-form, zustand (optional)
Video & storage: Cloudflare Stream / Vimeo / S3 + CloudFront
Payments: Stripe (international) / VNPay / MoMo (Vietnam)
Email: SendGrid / Mailgun
ORM: Prisma strongly recommended for developer DX with MySQL

`XI. MVP roadmap (prioritized — không phải thời gian, chỉ là thứ tự)`

Milestone A (MVP core): Auth, course list/detail, cart, checkout mock (no payment gateway integration), enrollments, player for free preview, admin CRUD course.
Milestone B (Monetization): Real payment gateway, coupon, order history, receipts/email.
Milestone C (Quality): Progress tracking, certificates, reviews, analytics, SEO improvements.
Milestone D (Scale & Ops): CDN, video streaming provider, background jobs, monitoring.

`XII. Checklist nộp đồ án (để điểm cao)`
 - Source code (frontend + backend) + commit history rõ ràng
 - README chi tiết (setup, env vars, cách chạy)
 - DB schema + ERD ảnh (PNG/SVG)
 - OpenAPI / Postman collection cho API
 - Deployed demo (link) hoặc video demo (5–10 phút)
 - Test evidence (unit test coverage, E2E runs)
 - Security notes (auth flow, how you protect media)
 - Nhiệm vụ admin + báo cáo (screenshots)
 - Tài liệu hướng dẫn/cách dùng (cho giảng viên test)




