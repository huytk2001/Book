-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 18, 2024 lúc 07:14 PM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `categoryID`, `user_id`, `name`, `quantity`, `price`, `unit`, `description`, `status`, `request`, `created_at`) VALUES
(19, 49, NULL, 'Cà chua', '', 0.00, '', 'Cà chua, thuộc họ Cà, là một loại rau quả làm thực phẩm. Quả ban đầu có màu xanh, chín ngả màu từ vàng đến đỏ. Cà chua có vị hơi chua và là một loại thực phẩm bổ dưỡng, tốt cho cơ thể, giàu vitamin C và A, đặc biệt là giàu lycopene tốt cho sức khỏe.', '', '', '2024-02-17 10:55:29');

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
(49, '123', 'Cà chua, thuộc họ Cà, là một loại rau quả làm thực phẩm. Quả ban đầu có màu xanh, chín ngả màu từ vàng đến đỏ. Cà chua có vị hơi chua và là một loại thực phẩm bổ dưỡng, tốt cho cơ thể, giàu vitamin C và A, đặc biệt là giàu lycopene tốt cho sức khỏe.', 'image-1708235970440.png', '10d', '2024-02-17 09:25:11'),
(50, '2', '', 'image-1708277849805.png', '', '2024-02-17 09:25:14'),
(51, '3', '', 'image-1708235983045.png', '', '2024-02-17 09:25:17'),
(52, '4', '', '', '', '2024-02-17 09:25:18'),
(53, '5', '', '', '', '2024-02-17 09:25:20'),
(54, 'Lê Văn Dũng1', '', 'home-life-2.png', '10', '2024-02-17 09:53:31'),
(55, '', '', 'image-1708277725589.png', '', '2024-02-17 10:15:37'),
(56, 'Lệ lưu ly', '', 'uploads/image-1708234277117.png', '', '2024-02-17 11:08:32'),
(57, 'Cà chua', '', 'xhkt.jpg', '', '2024-02-17 17:37:13'),
(58, 'Lê Văn Dũng', '', '', '', '2024-02-18 17:37:36'),
(59, 'lập trình', '', '', '', '2024-02-18 17:49:45');

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders_items`
--

CREATE TABLE `orders_items` (
  `id` int(11) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Admin', 'admin@gmail.com', '12345', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-05 17:29:45'),
(3, '', 'adm@gmail.com', '12345', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-05 17:29:45'),
(10, '', 'khanhhuy2001@gmail.com', '12345', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-05 17:29:45'),
(15, '', 'khanhhuy2001', '12345', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-05 17:29:45'),
(21, 'Admin', 'admin@gmail.com', '$2b$10$BX2S2wIlEwXPz2S8DUOVme13ivrlqNayp.OqF5768QY1buyJABmsa', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:10:03'),
(31, 'Admin', 'admin@gmail.com', '$2b$10$iyZM1QAk3v1PgiIGWRaAvOkdGwHTlujYWkJz0J5hFyoNe..agmtou', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:17:26'),
(32, 'Admind', 'admin@gmail.com', '$2b$10$wI1AAWuxIbT8iQVRL8n/Vu4tpST3YH.leBf02VNDXZ0l.m3b7pG6u', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:22:07'),
(33, 'Admind', 'admin@gmail.com', '$2b$10$g7CnZaesw/UFJgcv8BfaXuomTC/0N3pHUAGgXCLHa4Ca.uiUQAPkC', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:23:23'),
(34, 'Admind', 'adamidn@gmail.com', '$2b$10$VsTJoNL04BWPxpPyv4Tb9.cgIQ.ryHMc4oqg/BUwnwEV7fSsfxFYS', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:31:57'),
(35, 'Admind', 'adamidn@gmail.com', '$2b$10$vkHjJPpqHd1.Fu9u/LpSm.j/bxGsBgXMPAWNFBhcEgdr4LVMCGE3W', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:32:51'),
(36, 'Admind', 'adamidn@gmail.com', '$2b$10$FARUzjtqtJrjvXJplK3Em.cLjPmxAWp54qZ1N87OMDIXK8/kPowKG', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:33:01'),
(37, 'as', 'dư2w1@gmail.com', '$2b$10$LEFomUJJIUo45HM.TQ4xx.X3fRLYhboxAdhkmVeKC27a3snmr/9pS', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:44:57'),
(38, 'as', 'dư2w1@gmail.com', '$2b$10$Hb2/cHqxL5x9/L0SFVDgpuNC3wObqpCVjhNSmSeCXl2nnrsGRtoxq', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:37'),
(39, 'as', 'dư2w1@gmail.com', '$2b$10$az3XHXfah/FM..0.poePIul7KRqMm5aQlQ5XQZyTssYTRcAtyIofW', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:40'),
(40, 'as', 'dư2w1@gmail.com', '$2b$10$pfu/ZKDvaDXAV5XlssLznOULF7nf1Jzf0mG6p69JlPurXyRhvftR.', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:41'),
(41, 'as', 'dư2w1@gmail.com', '$2b$10$PWYC8Zi5uvXAX3rxuFQfKu64.6qn4srjqKQVXCE.ru43aKQpPRLDm', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:42'),
(42, 'as', 'dư2w1@gmail.com', '$2b$10$43asFOD00ic/PAalU8mDLOSyWN8eApUdBSdaPdbGVpKhhIPG/30s2', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:44'),
(43, 'as', 'dư2w1@gmail.com', '$2b$10$wy13odtisMLNzoXg5yUcR.bv94/kZ.36...SfhivPUMFxw5xWyOdm', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:45'),
(44, 'as', 'dư2w1@gmail.com', '$2b$10$Y9dbWJR/OcFLbu.EFvAtrOhPYVhaFPDOCNs6x3UQ6PloMFI6vqcBa', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:56'),
(45, 'as', 'dư2w1@gmail.com', '$2b$10$uzJZ8HlWo23KieTKbMuFv.SteLpwf2U4UPkUSbf4k8eFHY.rHNUla', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:45:57'),
(46, 'as', 'dư2w1@gmail.com', '$2b$10$A2j8RjJfTROVhYlYDXnM3OH1Ey25Pcr6dFk8BMqaxg.hytSOHuB2G', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:46:49'),
(47, 'as', 'dư2w1@gmail.com', '$2b$10$B6xrQRM5uFtZ6CY9kb3LiecuFebBuYJ4SYwyR.BFAJOOek5ONdLYO', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:46:50'),
(48, 'as', 'dư2w1@gmail.com', '$2b$10$.o3nlhHHZn7xRimyiMm1I.FeCrW2u2eH.t1yUkCGzOlpMe5Vztc56', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:46:51'),
(49, 'as', 'dư2w1@gmail.com', '$2b$10$ZP1SDk0OlK90b5CN96UYfeiNyhGlv.Tjb/F17A3lB6pDpX90ILalW', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:46:52'),
(50, 'aas', 'd11aư2w1@gmail.com', '$2b$10$DT4iD4RE/htqfVmzEOd.vuQITPpSNGoL70pbTqCpMFJ3gFQzW89Um', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 16:58:22'),
(51, 'addas', 'khanhhuy2001@gmail.com', '$2b$10$uSj8I9zfVrYmCJ4qd3nGa.VFsYKL2vS2.sH4vogdUcMMtcgn/nMKm', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 17:23:45'),
(52, 'addas', 'khanhhuy2001h@gmail.com', '$2b$10$EkSumhCNAXbNZ8w.jd0QiuzPiCA71r4259B14hTyyCySFCzHqN3aS', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 17:28:42'),
(53, 'addas', 'khanhhuy2001hh@gmail.com', '$2b$10$IKVfGZYZHbunPgSopGf5z.0vV55UuHmVwf4Fc.5JDClOlvXjErah.', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 17:41:31'),
(54, 'addas', 'khanhhuy200c1hh@gmail.com', '$2b$10$Qj9EyB.bK3HaEYxKmUBG/eUYAPq2M/2CEATx3pZMhfSJHVwrbaxGW', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 17:47:25'),
(55, 'addas', 'khanhhuy200c1hhh@gmail.com', '$2b$10$DzCs/tQAe.d64sOJm2DEtO6YH3Ij41ad4OHxIwZtvKmag9VZOy3U.', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 17:54:25'),
(56, NULL, 'khanhhuy2@gmail.com', '$2b$10$ZPj8.9hbP0.0KFMWwcTXiuj6axJ/KrcsLyKAOVkCePvCSkURQ.KcC', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 18:03:24'),
(57, NULL, 'khanhhuys2@gmail.com', '$2b$10$dJUDN4feVYL0nPvMBKSJDOetMrPjGKbz7.wuqb23ho0qexnFWeYMa', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 18:10:05'),
(58, NULL, 'khanhhuy@gmail.com', '$2b$10$itLd3u3EF.IJ3t8N0jd8V.G8bplkzYzHtDAr9E4ZycZ76xVk0Z7sK', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-06 18:24:52'),
(59, NULL, 'khanhhduy@gmail.com', '$2b$10$T2x0crSI6vDODkUCjsADw.jG1VOV44dVkFMhl3EBT2UjjBaRV2jOu', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-08 18:14:50'),
(60, NULL, 'adxmin@gmail.com', '$2b$10$pdHrD/f83WrQSKOGO2E2ler5Mr3U1s.NuZuRuGlq6/kCkWKC/6V22', 'user', '', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 07:15:50');

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
  ADD KEY `order_id` (`categoryID`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `book_images`
--
ALTER TABLE `book_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders_items`
--
ALTER TABLE `orders_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
  ADD CONSTRAINT `orders_items_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
