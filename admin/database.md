-- =============================
-- `DATABASE: online_learning`
-- =============================

CREATE DATABASE IF NOT EXISTS online_learning
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE online_learning;

-- =============================
-- 1. USERS
-- =============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    role ENUM('student','admin','instructor') DEFAULT 'student',
    avatar_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================
-- 2. CATEGORIES
-- =============================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    parent_id INT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- =============================
-- 3. COURSES
-- =============================
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(512),
    price DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('draft','published','archived') DEFAULT 'draft',
    thumbnail_url VARCHAR(500),
    category_id INT,
    instructor_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =============================
-- 4. LESSONS (Bài học gắn trực tiếp với Course)
-- =============================
CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    video_url VARCHAR(500),
    resource_urls JSON,
    duration INT, -- seconds
    position INT DEFAULT 0,
    is_free_preview BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =============================
-- 5. ORDERS (gộp luôn thông tin thanh toán)
-- =============================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','cancelled','refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    provider VARCHAR(50),               -- ví dụ: Stripe, MoMo, VNPay
    provider_payment_id VARCHAR(100),   -- mã giao dịch từ cổng thanh toán
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================
-- 6. ORDER ITEMS
-- =============================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    course_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    qty INT DEFAULT 1,
    discount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =============================
-- 7. ENROLLMENTS
-- =============================
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    order_item_id INT,
    progress JSON,
    started_at DATETIME,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE SET NULL,
    UNIQUE KEY uq_user_course (user_id, course_id)
);

-- =============================
-- 8. COUPONS
-- =============================
CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('percent','amount') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    usage_count INT DEFAULT 0,
    max_usage INT DEFAULT 0,
    valid_from DATETIME,
    valid_to DATETIME,
    min_order_value DECIMAL(10,2) DEFAULT 0.00
);

-- =============================
-- 9. REVIEWS
-- =============================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =============================
-- 10. CERTIFICATES
-- =============================
CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    certificate_url VARCHAR(500) NOT NULL,
    issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =============================
-- `SAMPLE DATA`
-- =============================

-- USERS
INSERT INTO users (email, password, name, role, avatar_url) VALUES
('student1@example.com', 'hashed_password', 'Nguyen Van A', 'student', NULL),
('student2@example.com', 'hashed_password', 'Tran Thi B', 'student', NULL),
('teacher1@example.com', 'hashed_password', 'Le Van C', 'instructor', NULL),
('admin@example.com', 'hashed_password', 'Admin User', 'admin', NULL);

-- CATEGORIES
INSERT INTO categories (name, slug) VALUES
('Programming', 'programming'),
('Design', 'design'),
('Business', 'business');

-- COURSES
INSERT INTO courses (title, slug, description, short_description, price, status, thumbnail_url, category_id, instructor_id) VALUES
('React for Beginners', 'react-for-beginners', 'Learn React from scratch', 'React basics course', 49.99, 'published', NULL, 1, 3),
('UI/UX Design Fundamentals', 'ui-ux-design-fundamentals', 'Design modern interfaces', 'Design basics course', 39.99, 'published', NULL, 2, 3),
('Startup 101', 'startup-101', 'Learn how to build a startup', 'Business startup course', 59.99, 'published', NULL, 3, 3);

-- LESSONS
INSERT INTO lessons (course_id, title, content, video_url, duration, position, is_free_preview) VALUES
(1, 'Introduction to React', 'Getting started with React', NULL, 600, 1, TRUE),
(1, 'React Components', 'Learn about components', NULL, 900, 2, FALSE),
(2, 'What is UX?', 'Understanding user experience', NULL, 700, 1, TRUE),
(2, 'UI Principles', 'Visual design principles', NULL, 800, 2, FALSE),
(3, 'Idea Validation', 'How to validate your idea', NULL, 750, 1, TRUE);

-- ORDERS
INSERT INTO orders (user_id, total_amount, status, payment_method, provider, provider_payment_id, paid_at) VALUES
(1, 49.99, 'paid', 'credit_card', 'Stripe', 'pay_123abc', NOW()),
(2, 89.98, 'paid', 'momo', 'MoMo', 'momo_456xyz', NOW());

-- ORDER ITEMS
INSERT INTO order_items (order_id, course_id, price, qty) VALUES
(1, 1, 49.99, 1),
(2, 2, 39.99, 1),
(2, 3, 49.99, 1);

-- ENROLLMENTS
INSERT INTO enrollments (user_id, course_id, order_item_id, started_at) VALUES
(1, 1, 1, NOW()),
(2, 2, 2, NOW()),
(2, 3, 3, NOW());

-- COUPONS
INSERT INTO coupons (code, type, value, usage_count, max_usage, valid_from, valid_to) VALUES
('DISCOUNT10', 'percent', 10, 0, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('SAVE20', 'amount', 20, 0, 50, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY));

-- REVIEWS
INSERT INTO reviews (user_id, course_id, rating, comment) VALUES
(1, 1, 5, 'Great course, easy to understand!'),
(2, 2, 4, 'Good content but could be more detailed.');

-- CERTIFICATES
INSERT INTO certificates (user_id, course_id, certificate_url) VALUES
(1, 1, 'https://example.com/certs/cert1.pdf'),
(2, 2, 'https://example.com/certs/cert2.pdf');
