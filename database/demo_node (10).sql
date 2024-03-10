-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 09, 2024 lúc 05:58 PM
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
  `price` decimal(10,3) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
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
(44, 0, NULL, 'Cây Cam Ngọt Của Tôi', '6', 85.000, 'đ', '“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist\r\n\r\n“Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National\r\n\r\nHãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.\r\n\r\nCó hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.\r\n\r\nMở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.\r\n\r\nTÁC GIẢ:\r\n\r\nJOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi q', '1', '', '2024-02-19 03:14:53', 'image-1709918900030.png', 'José Mauro de Vasconcelos', '1'),
(57, 9, NULL, 'Biển Đảo Việt Nam trong trái tim Tổ Quốc', '10', 205.000, 'đ', 'Lời mở đầu\r\nViệt Nam là quốc gia ven biển nằm bên bờ Tây của Biển Đông, có địa chính trị và địa kinh tế rất quan trọng không phải bất kỳ quốc gia nào cũng có với bờ biển dài trên 3.260km trải dài từ Bắc xuống Nam. Trong lịch sử hàng ngàn năm dựng nước và giữ nước của dân tộc, biển đảo luôn gắn với quá trình xây dựng và phát triển của đất nước và con người Việt Nam.\r\n\r\nTừ bao đời nay biển đảo quê hương đã luôn là một phần máu thịt không thể tách rời trong tim mỗi người dân đất Việt. Chính trên vùng mênh mông đại dương bao la, nơi cột mốc chủ quyền sừng sững như chứng nhân của lịch sử đầy “máu và hoa”, luôn có những con người vẫn ngày đêm canh giữ cho quê hương giấc ngủ yên bình. Chính tại nơi đầu sóng ngọn gió luôn có lá cờ Tổ quốc tung bay, đó là nơi những trái tim đầy nhiệt huyết của tuổi trẻ, của đông đảo các thế hệ Việt Nam hướng về với lòng trân trọng, yêu thương và biết ơn vô hạn.\r\n\r\nĐể góp phần vào việc tuyên truyền bảo vệ chủ quyền biển đảo, Nhà xuất bản Hồng đức giới thiệu cuốn sách “BIỂN ĐẢO VIỆT NAM TRONG TRÁI TIM TỔ QUỐC”. Cuốn sách thể hiện tình cảm của đất nước, của nhân dân Việt Nam với một phần máu thịt không thể tách rời của Tổ quốc – biển đảo Việt Nam.\r\n\r\nSách gồm 3 chương:\r\n\r\nCHƯƠNG I: BIỂN ĐẢO – PHẦN LÃNH THỔ KHÔNG THỂ TÁCH RỜI CỦA ĐẤT NƯỚC VIỆT NAM: Nêu rõ địa lý tự nhiên, quá trình hình thành và phát triển biển đảo Việt Nam, cũng như khẳng định chủ quyền biển đảo Việt Nam qua tiến trình dựng nước và giữ nước của dân tộc Việt Nam. Bên cạnh đó nêu cao việc phát huy sức mạnh tổng hợp bảo vệ vững chắc chủ quyền biển đảo Việt Nam trong tình hình mới.\r\n\r\nCHƯƠNG II. BIỂN ĐẢO VIỆT NAM TRONG TRÁI TIM TỔ QUỐC: Khắc họa rõ nét về tình yêu biển đảo qua văn hóa biển đảo bao đời của dân tộc Việt Nam, qua chân dung những con người tiêu biểu gắn liền với biển đảo Việt Nam, giới thiệu về biển đảo của các tỉnh thành có biển dọc theo đất nước Việt Nam hình chữ S, từ Bắc đến Nam.\r\n\r\nCHƯƠNG III: GIÁO DỤC TÌNH YÊU BIỂN ĐẢO CHO THẾ HỆ TRẺ: Nêu bật vai trò của giáo dục', '0', '', '2024-03-08 18:09:27', 'image-1709921466964.png', 'Mạnh Hùng', ''),
(58, 9, NULL, 'Du lịch thế giới', '48', 84.990, 'đ', 'Văn hóa xuất hiện và trở thành “khách thể giá trị” về sự sinh tồn, phát triển của con người. Do đó, người đời sau đều vô cùng trân trọng những giá trị văn hóa truyền thống, nghiên cứu, tìm hiểu văn hóa. Đặc biệt, lịch sử phát triển đến ngày nay càng chứng minh văn hóa trở thành một sức mạnh của cạnh tranh quốc tế. Cho nên, mỗi dân tộc, mỗi khu vực, mỗi quốc gia đều phải kế thùa và phát huy truyền thống văn hóa của riêng mình, tìm tòi, học tập những nét đặc sắc của các quốc gia khu vực khác, nâng tầm quan trọng của văn hóa trong cuộc sống hằng ngày.Cuốn “Du lịch thế giới qua hình ảnh” với nội dung kiên thức phong phú, đầy đủ, hấp dẫn sẽ cung cấp cho bạn đọc những thông tin cần thiết về các danh lam thắng cảnh đẹp, nổi tiếng của các nước thuộc nhiều châu lục khác nhau trên thế giới.Trân trọng giới thiệu.  ', '1', '0', '2024-03-08 18:11:52', 'image-1709921601526.png', 'Tác giả 1', '0'),
(59, 9, NULL, 'Lịch Sử Chiến Tranh Qua 100 Trận Đánh ', '30', 8.500, 'cuốn', 'Lịch Sử Chiến Tranh Qua 100 Trận Đánh - Nghệ Thuật Quân Sự Đỉnh Cao Theo Dòng Thời Gian - Bìa Cứng\r\n\r\nTrong cuốn sách LỊCH SỬ CHIẾN TRANH QUA 100 TRẬN ĐÁNH , Richard Overy đã dẫn dắt độc giả khám phá hơn 3.000 năm lịch sử của chiến tranh, từ trận chiến thành Troy vào năm 1200 trước Công nguyên đến sự sụp đổ của Baghdad năm 2003, qua 100 trận chiến mà ông cho là quan trọng nhất. Sắp xếp theo chủ đề như lãnh đạo, sáng tạo, mưu kế và lòng dũng cảm, Overy trình bày những luận điểm thú vị về mỗi trận chiến, tạo thành một bức tranh phong phú về cách chiến tranh đã thay đổi qua các thời đại, đồng thời nhấn mạnh những điều bất biến cho dù công nghệ có thay đổi như thế nào đi nữa.\r\n\r\nCác trận chiến được trải dài trên diện rộng về địa lý, từ Hy Lạp cổ đại đến Trung Quốc, từ Constantinople đến Moscow, từ Bắc đến Nam Mỹ, đồng thời so sánh giữa các nền văn hóa quân sự khác nhau. Từ những trận chiến quen thuộc như Thermopylae (480 TCN), Verdun (1916) và Cuộc tấn công Mậu Thân (1968) đến những trận chiến ít được nghiên cứu hơn như Zama (202 TCN), Arsuf (1191) và Navarino Bay (1827), Overy nói về các tay chơi chính, sự lựa chọn và tình huống không ngờ, tập trung vào những chi tiết - đôi khi bị bỏ qua - quyết định kết quả trận chiến. Chẳng hạn, chiến thắng của Mỹ tại Trận Midway được xác định vớichỉ mười quả bom.\r\n\r\nThay vì tập trung vào câu hỏi về chiến thắng hoặc thất bại, Overy xem xét những gì một cuộc đụng độ có thể kể cho chúng ta ở một quy mô lớn hơn về lịch sử của bản thân chiến tranh. Vũ khí và chiến thuật mới có thể ảnh hưởng đột ngột đến kết quả của trận chiến - cũng như lãnh đạo, hoặc tác động của một mưu kế hoặc lòng dũng cảm. Overy mang đến một cái nhìn khéo léo và hấp dẫn về những trận chiến đã định hình hành trình của lịch sử nhân loại và thay đổi bộ mặt của chiến tranh.\r\n\r\nMã hàng	8935235238947\r\nTên Nhà Cung Cấp	Nhã Nam\r\nTác giả	Richard Overy\r\nNgười Dịch	An Thái\r\nNXB	Thế Giới\r\nNăm XB	2023\r\nTrọng lượng (gr)	5000\r\nKích Thước Bao Bì	28.5 x 20.5 x 2.5 cm\r\nSố trang	456\r\n', '1', '0', '2024-03-08 18:11:52', 'image-1709993013226.png', 'Richard Overy', '0'),
(60, 3, NULL, 'Các Nhân Vật Nổi Tiếng ', '20', 295.750, 'cuốn', 'Alexander Đại đế trải qua nhiều cuộc chiến khốc liệt để xây dựng nên để chế rộng lớn nhất thời Cổ đại;\r\n\r\nMarco Polo rơi Venice khi mới 17 tuổi, vượt hành trình đầy trắc trở chu du đến những vùng đất xa xôi;\r\n\r\nNăm 15 tuổi, Eleanor xứ Aquitaine cưới vua Louis VII của Pháp, mang về cho Pháp vùng Aquitaine rộng lớn. Nhưng không lâu sau, số phận lại đưa vùng đất ấy tới với nước Anh;\r\n\r\nCharles Darwin với nước Anh lên đường thực hiện một chuyến thám hiểm dài trước khi xuất bản cuốn sách gây náo động giới khoa học thời bấy giờ;\r\n\r\nThế kỷ 19, cậu bé Thomas Edison dành thời gian rảnh rỗi để hí hoáy sửa chữa trong căn hầm của cha mẹ. Sau này, cậu trở thành một nhà phát minh lớn nằm trong tay vô số bằng sáng chế;\r\n\r\nCuộc đời những nhà chinh phạt, nhà khoa học, nghệ sĩ, nhà thám hểm, những người chiến đấu vì hòa bình,... đến từ các quốc gia và các giai đoạn lịch sử khác nhau đã hiện lên thật cuốn hút và thú vị, truyền cảm hứng mạnh mẽ cho bạn đọc trẻ về lịch sử và tương lai!\r\n\r\nMã hàng	8935235234567\r\nTên Nhà Cung Cấp	Nhã Nam\r\nTác giả	Sophie Crépon, Pascale Bouchié, Béatrice Veillon\r\nNgười Dịch	Huy Minh\r\nNXB	Thế Giới\r\nNăm XB	2022\r\nTrọng lượng (gr)	3000\r\nKích Thước Bao Bì	29 x 19 cm\r\nSố trang	334\r\nHình thức	Bìa Mềm\r\nSản phẩm hiển thị trong	\r\nNhã Nam\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Lịch Sử bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nAlexander Đại đế trải qua nhiều cuộc chiến khốc liệt để xây dựng nên để chế rộng lớn nhất thời Cổ đại;\r\n\r\nMarco Polo rơi Venice khi mới 17 tuổi, vượt hành trình đầy trắc trở chu du đến những vùng đất xa xôi;\r\n\r\nNăm 15 tuổi, Eleanor xứ Aquitaine cưới vua Louis VII của Pháp, mang về cho Pháp vùng Aquitaine rộng lớn. Nhưng không lâu sau, số', '1', '0', '2024-03-08 18:11:52', 'image-1709993107186.png', 'Sophie Crépon, Pascale Bouchi', '0'),
(61, 4, NULL, 'Thương', '40', 57.990, 'cuốn', 'Em nói em từ bỏ\r\n\r\nSao em lại đau lòng?\r\n\r\nEm nói em từ bỏ\r\n\r\nSao em còn trông mong?\"\r\n\r\n \r\n\r\nĐược viết bởi các tác giả đến từ Group Thìa Đầy Thơ - nơi hội tụ thế hệ trẻ yêu thơ và làm thơ, \"Thương\" là một tập thơ rất tình, ngẫu hứng, và đầy sáng tạo. Ở “Thương ” không có bóng dáng của một nhân vật nhất định, nhưng mang lại cho người đọc đầy đủ tất cả cảm xúc về tình yêu, tuổi trẻ và cuộc đời.\r\n\r\n \r\n\r\nThực sự không khó để tìm được sự đồng điệu tâm hồn với những dòng thơ ấy. Sự đồng cảm trong giai điệu mà “Thương” phủ lên đôi môi của độc giả có chút nhẹ nhàng, bâng quơ, gần gũi, dễ đọc, dễ  đánh thức sự lãng mạn cùng những tâm tư chưa từng tỏ bày cùng ai. Đó là thứ thơ phóng khoáng, trẻ trung đầy sức sống, đôi khi da diết, đôi khi lửng lơ, phảng phất đủ loại thăng trầm được biểu đạt theo một cách hết sức dễ chịu. Bạn hẳn sẽ thấy chính mình trong đó. Đó là những ấm áp len lỏi của tình cảm gia đình, là ngọt ngào hạnh phúc của tình yêu, là những phút giây chậm lại để sống. Là nhớ thương chờ đợi, là giận hờn vu vơ, là lo sợ được mất và cả những tổn thương, những lần tự chữa lành.\r\n\r\n \r\n\r\nMàu sắc đặc biệt trong “Thương” nằm ở sự thành thật nhưng mang đậm chất mơ mộng rất đặc trưng của thơ. Những góc nhìn về cuộc sống, về quan hệ bạn bè, với xã hội và vẻ đẹp tình yêu đều được phơi bày hết sự giản đơn, đời thường:\r\n\r\n \r\n\r\n“Ba giờ mẹ vẫn dậy\r\n\r\nMặc giá rét mùa đông\r\n\r\nVì tình mẹ ấm áp\r\n\r\nCòn hơn bếp lửa hồng.”\r\n\r\n \r\n\r\nKhông gò bó về phương thức diễn đạt, đa dạng về thể loại, chất lượng về nội dung, cùng sự linh hoạt trẻ trung, nhưng cũng rất lắng đọng và nghệ thuật, “Thương” chắc chắn sẽ đem lại cho bạn những rung cảm đẹp đẽ và nhiều bất ngờ vể một thế hệ trẻ làm thơ . Một thế hệ vẫn luôn tìm cách giữ gìn và phát huy sự diệu kỳ của tiếng Việt.\r\n\r\n \r\n\r\nDù là đọc để thưởng thức, hay đọc để tìm sự ủi an. Gấp lại “Thương”,  mong rằng những “thương đau” nếu có trong lòng bạn cũng tới ngày được xoa dịu và hơn cả là để “thương yêu”, thêm một lần nữa đầy trong tim!\r\n\r\n \r\n\r\nĐây sẽ mó', '1', '0', '2024-03-08 18:11:52', 'image-1710002974739.png', 'Nhiều Tác Giả', '0'),
(62, 9, NULL, 'Nhâm Nhi Tết - Tân Sửu 2021 - Tặng Thiệp Pop-up 3D', '25', 104.990, 'đ', 'Mô tả cuốn sách 5', '1', '0', '2024-03-08 18:11:52', 'image-1710003086313.png', 'Nhiều Tác Giả', '0'),
(63, 7, NULL, 'Cuốn sách TƯ DUY NHANH VÀ CHẬM', '35', 100.500, 'cuốn', 'Mô tả cuốn sách 6', '1', '0', '2024-03-08 18:11:52', 'image-1710003167833.png', 'Tác giả 6', '0'),
(64, 0, NULL, 'Sơn Trà Nở Muộn', '45', 75.250, 'cuốn', 'Nếu mỗi cuốn tiểu thuyết được ví như thời gian trong một ngày, thì “Sơn Trà Nở Muộn” có lẽ đã được bắt đầu vào thời điểm tăm tối nhất, đó chính là nửa đêm.\r\n\r\nHứa Huệ Chanh là một cô gái bán hoa ở hộp đêm, biệt danh là Sơn Trà. Ở độ tuổi xấp xỉ 30 như Hứa Huệ Chanh, chẳng còn gì gọi là giá trị để gìn giữ nữa, cô chẳng còn gì để mất, thậm chí, khát vọng sống mong manh của cô tưởng như đã tắt hẳn rồi, chỉ có thể sống vô hồn, vớt vát chút hơi thở từng ngày, chỉ có thể hèn mọn chờ đợi, hoặc là khách, hoặc là những trận đòn roi đau đớn quằn quại của ông chủ giữa giá lạnh.\r\n\r\nRơi vào cảnh khốn cùng đến vậy, cô lại gặp được Chung Định, người đàn ông bên ngoài tô vàng nạm ngọc, bên trong mục rỗng, bệnh hoạn, tàn độc không ai bằng. Hết lần này tới lần khác, hắn lôi cô vào những vụ cá cược oái oăm, những cuộc chơi đánh đổi cả sinh mạng, để thỏa mãn thú vui kỳ lạ của hắn và đám bạn, khiến cô không ít lần sống dở chết dở. Hứa Huệ Chanh vừa hận lại vừa khiếp sợ Chung Định, tìm đủ cách trốn tránh, cuối cùng vẫn không thoát khỏi nanh vuốt sắc nhọn kia.\r\n\r\nNhưng cô nào ngờ được rằng, người đàn ông từng dày vò cô đến thảm hại ấy, lại cứu rỗi cuộc đời cô…\r\n\r\n__________\r\n\r\n“Kiếp người bi thương nhường này của cô, nếu như gom dũng khí mà chấm dứt, vậy thì đau khổ gì cũng kết thúc rồi. Nhưng dù có giãy dụa thế nào thì cô vẫn muốn tiếp tục sống, cho dù là sống rất hèn mọn, rất đê tiện.”\r\n\r\n“Cô sẽ mãi mãi ghi nhớ, có một tên khốn nạn tự luyến như thế này, đã xua than hết mây mù dày đặc trong thế giới của cô.”\r\n\r\n\"Till death do us part.\"\r\n\r\nMã hàng	8935212360913\r\nĐộ Tuổi	15+\r\nTên Nhà Cung Cấp	Đinh Tị\r\nTác giả	Giá Oản Chúc\r\nNgười Dịch	Thu Trang\r\nNXB	Thanh Niên\r\nNăm XB	2023\r\nNgôn Ngữ	Tiếng Việt\r\nTrọng lượng (gr)	650\r\nKích Thước Bao Bì	24 x 16 x 3 cm\r\nSố trang	648\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có t', '1', '0', '2024-03-08 18:11:52', 'image-1710003287530.png', 'Giá Oản Chúc', '0'),
(65, 5, NULL, 'Cuốn sách 8', '15', 55.990, 'đ', 'Toán học hiện diện ở mọi nơi mọi chỗ mọi thời điểm trong cuộc sống của chúng ta. Nhưng chúng ta không hề nhìn thấy, để ý hay thậm chí còn chán ngán vì chúng quá khó.\r\n\r\nThực tế, toán học vô cùng quan trọng. Nhờ có toán và những thuật toán, con người có thể xây dựng được những công trình vĩ đại, hay nhỏ bé như những ngôi nhà chúng ta đang ở. Dường như các nhà khoa học ứng dụng toán học nhiều hơn để tìm kiếm và sáng tạo.\r\nCùng tìm hiểu về lý thuyết tìm kiếm để tìm đồ đạc để quên hay làm sao máy tính sử dụng thuật toán giúp con người kết đôi trên mạng. Dựa vào thông tin và toán học, mọi số liệu con người đưa ra sẽ được xử lý để tiến tới kết quả mong muốn. Thời đại của Big Data mà.\r\nCó một vài thực tế hiển nhiên mà chúng ta chẳng hề để ý nhưng lại nghĩ rằng chúng xảy ra được là điều kỳ diệu, trong thể thao và trong đời sống. Hay sự kỳ dị của một vài nghịch lý toán học. Cái cách mà toán học chi phối số liệu làm thay đổi định hướng phát triển hay vạch trần tội phạm sẽ làm bạn phải suy nghĩ về sự hữu ích của chúng thay vì cố gắng lảng tránh. Mọi thứ sẽ được phơi bày ra qua những con số đơn giản thôi.\r\nCùng tìm hiểu cách loài người phát triển toán học và tầm quan trọng của nó trong thời đại Dữ liệu Lớn này để thấy nó rất thú vị chứ không hề Ngán.\r\n\r\nVề tác giả :\r\n\r\nTimothy Revell có bằng thạc sĩ Toán học và tiến sĩ ngành Khoa học máy tính. Anh yêu Toán học, và nghĩ rằng mọi người cũng nên yêu nó. Anh cộng tác với BBC Horizon trong chương trình radio mang The Naked Scientist, một trong những chương trình truyền hình về khoa học nổi nhất thế giới, đồng thời là cây viết cho tạp chí New Scientist. Timothy dấn thân vào kinh doanh bằng việc vận hành một nhóm truyền thông ở Glasgow có tên theGIST – nhóm đã đoạt giải thưởng về khoa học và thường xuyên xuất bản báo, video và podcast.\r\n\r\nMã hàng	8935251414882\r\nTên Nhà Cung Cấp	Alpha Books\r\nTác giả	Timothy Revell\r\nNgười Dịch	Thúy Nga\r\nNXB	NXB Dân Trí\r\nNăm XB	2020\r\nTrọng lượng (gr)	377\r\nKích Thước Bao Bì	20.5 x 14 cm\r\nSố trang	268\r\nHìn', 'available', '0', '2024-03-08 18:11:52', 'image-1710003339040.png', 'Timothy Revell', '0');

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
(0, 'Tiểu thuyết', 'Sách tiểu thuyết của các tác giả nổi tiếng', 'image-1709920579717.png', '', '2024-02-19 02:38:47'),
(1, 'Kinh tế', 'Sách về các lĩnh vực kinh tế', 'image-1709920701765.png', '100', '2024-03-08 17:48:22'),
(2, 'Văn học', 'Sách văn học của các tác giả nổi tiếng', 'image-1709920727214.png', '80', '2024-03-08 17:48:22'),
(3, 'Lịch sử', 'Sách về lịch sử các quốc gia và sự kiện lịch sử', 'image-1709920846933.png', '120', '2024-03-08 17:48:22'),
(4, 'Thơ', 'Sách thơ của các nhà thơ danh tiếng', 'image-1709920875074.png', '50', '2024-03-08 17:48:22'),
(5, 'Toán học', 'Sách về các chủ đề toán học và ứng dụng', 'image-1709921104875.png', '90', '2024-03-08 17:48:22'),
(6, 'Kinh doanh', 'Sách về kỹ năng quản lý, khởi nghiệp và marketing', 'image-1709921190282.png', '110', '2024-03-08 17:48:22'),
(7, 'Tâm lý học', 'Sách về tâm lý học và phát triển bản thân', 'image-1709921215081.png', '70', '2024-03-08 17:48:22'),
(8, 'Nấu ăn', 'Sách về nghệ thuật nấu ăn và các công thức', 'image-1709921248391.png', '60', '2024-03-08 17:48:22'),
(9, 'Du lịch', 'Sách về các điểm đến du lịch và kinh nghiệm du lịch', 'image-1709921280599.png', '85', '2024-03-08 17:48:22');

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
(30, 112, 'hhh', '123 Main St, City, Country', 'Credit Card', '200', 'Pending', 'ORD123', '2024-03-07 13:42:46'),
(31, 112, 'dfdsff', '123 ABC Street, Cua Bac, Ba Dinh, Hanoi', 'Thanh toán khi nhận hàng', '360', 'Đang xử lý', '781071', '2024-03-08 18:31:11'),
(33, 112, 'dfdsff', '123 ABC Street, Cua Bac, Ba Dinh, Hanoi', 'Thanh toán khi nhận hàng', '104.99', 'Đang xử lý', '382159', '2024-03-09 13:56:02'),
(34, 112, 'dfdsff', '123 ABC Street, Cua Bac, Ba Dinh, Hanoi', 'Thanh toán khi nhận hàng', '104.99', 'Đang xử lý', '363368', '2024-03-09 14:01:20');

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
(1, 30, 44, 9, 100.00, 'Product 1', 'USD'),
(2, 31, 44, 4, 85.00, 'Cây Cam Ngọt Của Tôi', 'đ'),
(5, 33, 58, 1, 84.99, 'Du lịch thế giới', 'đ'),
(6, 34, 58, 1, 84.99, 'Du lịch thế giới', 'đ');

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
(112, 'dfdsff', 'khanhhuy1810@gmail.com', '$2b$10$cqEjrUtE5JAJFZPQr.aYJ.WGBX9dComX3hpBGkg1FpTJQcCOseUVO', 'user', '', NULL, 'Enable', 'Thanh toán khi nhận hàng', '123 ABC Street, Cua Bac, Ba Dinh, Hanoi', '1234567899', '', '2024-03-01 23:36:53');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `orders_items`
--
ALTER TABLE `orders_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
