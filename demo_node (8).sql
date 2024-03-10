-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 07, 2024 lúc 02:43 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `demo_node`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `request` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `categoryID`, `user_id`, `name`, `quantity`, `price`, `unit`, `description`, `status`, `request`, `created_at`, `image`, `author`, `discount`) VALUES
(44, 60, NULL, 'Lệ lưu ly', '1', 15000.00, '21', 'fffffff', '1', '', '2024-02-19 03:14:53', 'image-1709456899899.png', 'hehe', '1'),
(45, 60, NULL, 'Cà chua', '10', 111.00, 'đ', 'đasddddd', '1', '', '2024-02-19 04:02:12', 'image-1709561511395.png', 'hehe', ''),
(52, 60, NULL, 'd', '10', 7000.00, '21', 'd', '1', '', '2024-02-20 01:52:08', 'image-1709561524560.png', '', ''),
(53, 65, NULL, 'Cà chua', '', 0.00, '', 'dffffff', '1', '', '2024-03-02 11:06:42', '', '', ''),
(54, 65, NULL, 'Cà chua', '', 0.00, '', 'dsssssss', '1', '', '2024-03-02 11:07:48', '', '', ''),
(55, 62, NULL, '', '', 507621.00, '', 'dddd', '', '', '2024-03-02 11:08:05', '', '', ''),
(56, 65, NULL, 'dsđ', '', 30023.00, '21', 'ds', '', '', '2024-03-04 11:40:14', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_images`
--

CREATE TABLE `book_images` (
  `id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `quantity`, `create_at`) VALUES
(60, 'Lê Văn Dũng', 'Mậu Thân, Phường An Phú, Quận Ninh Kiều, Thành phố Cần Thơ.', 'image-1709456880053.png', '', '2024-02-19 02:38:47'),
(62, 'sdfsad', 'Mậu Thân, Phường An Phú, Quận Ninh Kiều, Thành phố Cần Thơ.', 'image-1708448604113.png', '', '2024-02-20 01:20:50'),
(63, 'huy', 'Mậu Thân, Phường An Phú, Quận Ninh Kiều, Thành phố Cần Thơ.', 'image-1708335534603.png', '', '2024-02-20 01:23:50'),
(64, 'ddd', 'Mậu Thân, Phường An Phú, Quận Ninh Kiều, Thành phố Cần Thơ.', 'image-1708335534603.png', '', '2024-02-19 18:24:25'),
(65, 'Cà chua', 'asfdefds', 'image-1708335534603.png\r\n', '', '2024-03-01 07:21:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `total_price` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `customer_name`, `shipping_address`, `payment_method`, `total_price`, `status`, `order_code`, `created_at`) VALUES
(30, 112, 'hhh', '123 Main St, City, Country', 'Credit Card', '200', 'Pending', 'ORD123', '2024-03-07 13:42:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders_items`
--

CREATE TABLE `orders_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders_items`
--

INSERT INTO `orders_items` (`id`, `order_id`, `book_id`, `quantity`, `price`, `name`, `unit`) VALUES
(1, 30, 44, 9, 100.00, 'Product 1', 'USD');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `image` varchar(255) NOT NULL,
  `dateJoin` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `coordinates` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `image`, `dateJoin`, `status`, `payment_method`, `shipping_address`, `phone`, `coordinates`, `created_at`) VALUES
(108, 'huy', 'admin@gmail.com', '123456', 'admin', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-01 09:44:06'),
(110, 'lập trình á', 'adminss@gmail.com', '12345678', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-01 10:58:29'),
(111, 'name22', 'khanhhuy1810k@gmail.com', '12345678', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-01 10:59:17'),
(112, 'dfdsff', 'khanhhuy1810@gmail.com', '$2b$10$cqEjrUtE5JAJFZPQr.aYJ.WGBX9dComX3hpBGkg1FpTJQcCOseUVO', 'user', '', NULL, 'Enable', 'Thanh toán khi nhận hàng', '123 ABC Street, Cua Bac, Ba Dinh, Hanoi', '1234567899', '', '2024-03-01 23:36:53'),
(113, 'lập trình', 'khanhhuy18j10@gmail.com', '$2b$10$Ik9TlaLGQw3bB2SYnEixDusRtOQJbrNVlMa3S9zjVYA/WzgwJM3NG', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-03 02:45:11'),
(114, 'Cà chua', 'khanhhuy180@gmail.com', '$2b$10$QXsix5Ig6a7nYpc/XVmoEeWZgKJXch7qT443.iq9r6tv1ytt8xgLC', 'user', '', NULL, NULL, 'Thanh toán khi nhận hàng', 'dd, dd, dd, dd.', 'dđ', NULL, '2024-03-03 02:47:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`categoryID`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `book_images`
--
ALTER TABLE `book_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orders_items`
--
ALTER TABLE `orders_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `book_images`
--
ALTER TABLE `book_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `orders_items`
--
ALTER TABLE `orders_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `book_images`
--
ALTER TABLE `book_images`
  ADD CONSTRAINT `book_images_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `orders_items`
--
ALTER TABLE `orders_items`
  ADD CONSTRAINT `orders_items_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `orders_items_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
