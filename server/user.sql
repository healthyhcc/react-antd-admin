/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50739
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50739
 File Encoding         : 65001

 Date: 12/10/2022 17:43:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (34, 'profile-fb-adult-01.png', '9ae352845d3c3cadf8a7f2b515612904.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (35, 'profile-fb-adult-02.png', '857f73f86bd3001fa37bc320cf4ef2ec.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (36, 'profile-fb-adult-03.png', 'a2875c18bdffd311e1e40a2e4fb33f5b.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (37, 'profile-fb-adult-04.png', 'ad916fa021f15c141df03f0fd0fd46c1.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (38, 'profile-fb-adult-05.png', '57ad3a2740da8ef69abd748d47c67fc8.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (39, 'profile-fb-kid-02.png', '5270529f4f85401839530c7de0052148.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (40, 'profile-fb-kid-03.png', '5ac912b16779727d28218f685ccc8021.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (41, 'profile-fb-kid-04.png', 'efd7bc53fc4687771f3e94b656dcabc9.png', '2022-09-06 15:59:26', 59);
INSERT INTO `file` VALUES (42, 'profile-fb-adult-05.png', 'b2d8ad6b3ed30e125839ee04de9b57a3.png', '2022-09-06 16:00:09', 59);
INSERT INTO `file` VALUES (43, 'profile-fb-adult-06.png', 'd2f753a2055ec3aa947047391c71879a.png', '2022-09-06 16:00:09', 59);
INSERT INTO `file` VALUES (44, 'profile-fb-adult-07.png', '049b078e9679305a31515bb1f3230137.png', '2022-09-06 16:00:09', 59);
INSERT INTO `file` VALUES (45, 'profile-fb-adult-08.png', 'ea52cef68e9d20c3ee8fb34e5e822491.png', '2022-09-06 16:00:09', 59);
INSERT INTO `file` VALUES (46, 'profile-fb-kid-01.png', 'ca846e5b33499287f4482f9075921dbc.png', '2022-09-06 16:00:09', 59);
INSERT INTO `file` VALUES (47, '工作报告-韩畅畅.pptx', '5a9e963772d60e4820d66b9c5c794951.pptx', '2022-09-06 16:00:52', 59);
INSERT INTO `file` VALUES (48, '20220705-093120.jpg', 'a162cc5a7eff6b9b7eca79473363e44b.jpg', '2022-09-06 16:00:52', 59);
INSERT INTO `file` VALUES (49, '2022Calendar.pdf', '04cd5cb3b29c35f75241cf72aa7906b6.pdf', '2022-09-06 16:00:52', 59);
INSERT INTO `file` VALUES (50, 'u=1657952994,837822251&fm=253&fmt=auto&app=120&f=JPEG.webp', '29ec9ae7417b7ec37e572a5578681636.webp', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (51, 'd233aeb248644de403140f4a77eeb2c.jpg', 'b9a9411fb49671aa6b463f81c08388c3.jpg', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (52, 'u=551407047,2913020865&fm=253&fmt=auto&app=120&f=JPEG.webp', '314f55f353b5e7b88c12cf7218adb22a.webp', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (53, 'u=3529937599,2897121170&fm=253&fmt=auto&app=138&f=JPEG.webp', 'f4d5c00f5a8a6b13d0902e979f1d1712.webp', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (54, 'u=2896165801,2181483533&fm=253&fmt=auto&app=138&f=JPEG.webp', 'fe62af5e681ead4e1c36ecf95b4f3a42.webp', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (55, 'u=2508023202,2934562447&fm=253&fmt=auto&app=138&f=JPEG.webp', '2ac069bde0288b72527912ee3685cee5.webp', '2022-10-09 16:38:26', 61);
INSERT INTO `file` VALUES (56, '5edea39e9f9b946b2c0151071a7bced9.jpg', '12e83aeb7b44a3a6e7faf62454cc09a9.jpg', '2022-10-10 14:40:30', 61);
INSERT INTO `file` VALUES (57, '49b8d28b3677085f6f73eb07e00ee0a4.jpg', '9cfb579ccba8965271fd555f5112e476.jpg', '2022-10-10 14:45:16', 61);
INSERT INTO `file` VALUES (58, '5edea39e9f9b946b2c0151071a7bced9.jpg', '0e4d179dbe5a147905c72562f87b29a5.jpg', '2022-10-10 14:45:30', 61);
INSERT INTO `file` VALUES (59, '26baa9a8b5bf4526cfd7d0a20173cb79.jpg', 'ef7cafc7f34b5e5ee1ae4b306c2d4bcd.jpg', '2022-10-10 14:45:30', 61);
INSERT INTO `file` VALUES (60, 'LICENSE', '83904801596e6bddb31b929a8ebc5e3a.undefined', '2022-10-10 14:51:20', 61);
INSERT INTO `file` VALUES (61, 'package.json', '22007e4e1756907ef17579f96ae6b7f1.json', '2022-10-10 14:51:20', 61);
INSERT INTO `file` VALUES (62, 'README.md', '1d971d74021df15776d322143c41f877.md', '2022-10-10 14:51:20', 61);
INSERT INTO `file` VALUES (63, 'README.md', 'db190630e80173dbc9f4f0b4914fb5be.md', '2022-10-10 14:51:54', 61);
INSERT INTO `file` VALUES (64, 'LICENSE', '74895ec7eac810211fdb2e097662fd2d.undefined', '2022-10-10 14:57:03', 61);
INSERT INTO `file` VALUES (65, 'package.json', 'a73d2351cf4cf6796ff1d22b219a56c7.json', '2022-10-10 14:57:03', 61);
INSERT INTO `file` VALUES (66, 'README.md', '3b6a4829f02cdc7bca5ad295c5233a65.md', '2022-10-10 14:57:03', 61);
INSERT INTO `file` VALUES (67, '26baa9a8b5bf4526cfd7d0a20173cb79.jpg', 'e8db8c9aa768433c3fb758a53c524a79.jpg', '2022-10-12 16:05:23', 61);
INSERT INTO `file` VALUES (68, '49b8d28b3677085f6f73eb07e00ee0a4.jpg', 'f35e9282fa053e2010d8d371ccf247e8.jpg', '2022-10-12 16:05:23', 61);
INSERT INTO `file` VALUES (69, '26baa9a8b5bf4526cfd7d0a20173cb79.jpg', '837687830b405f2e0aece6a0e8d6312a.jpg', '2022-10-12 16:06:36', 61);
INSERT INTO `file` VALUES (70, '26baa9a8b5bf4526cfd7d0a20173cb79.jpg', '445d930a991229d2b788d894f43c9f43.jpg', '2022-10-12 16:07:00', 61);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tasklevel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, '优化部分页面的样式', '1');
INSERT INTO `task` VALUES (2, '配置自动化更新部署，CI/CD', '2');
INSERT INTO `task` VALUES (3, '优化TypeScript类型', '3');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456',
  `gender` tinyint(1) NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'CC', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122361', 'hcc960923@gmail.com', '2022-10-12 16:13:48', 'afb24c57a3d6bf9872da46a454e19f42.jpg', 'LKLKLKLKLKLKLKLKLKLKLKLKLKLK', 2, '2022-10-12 16:13:48', '127.0.0.1');
INSERT INTO `user` VALUES (2, '曹青青', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2022-09-06 16:11:06', '105fe1ec82fd9bab305116268b12212d.png', 'SSSSSSSSSSSSS', 2, '2022-09-06 16:11:06', '127.0.0.1');
INSERT INTO `user` VALUES (3, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15825759654', 'zjh987@qq.com', '2022-09-06 16:11:12', '1bdb4c82fbea478db41c30ffdbd39f5c.png', 'SSSSSSSSSSSSSSCCCCCCCCCCCCCCCC', 1, '2022-09-06 16:11:12', '127.0.0.1');
INSERT INTO `user` VALUES (4, '曹操', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122369', 'hcc96923@163.com', '2022-09-06 16:11:40', '6147f28d3ed6b97d0769ee6e14e6bcc4.png', 'CXXXXXXXXXXXXXXXXXXXXXXX', 3, '2022-09-06 16:11:40', '127.0.0.1');
INSERT INTO `user` VALUES (5, '刘备', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', '734499162@qq.com', '2022-09-06 16:11:45', 'fc0b555cfb0ccc2c70c9b66e29de8840.png', 'XXXXXXXXXXXXXXX', 1, '2022-09-06 16:11:45', '127.0.0.1');
INSERT INTO `user` VALUES (6, '孙权', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@gmail.com', '2022-09-06 16:11:49', '28b769720746cd2514102ba962e21909.png', 'VVVVVVVVVVVVVVV', 2, '2022-09-06 16:11:49', '127.0.0.1');
INSERT INTO `user` VALUES (7, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@163.com', '2022-09-06 16:11:55', '02570f2e860bf9569e2e91c041369443.png', 'VVVVVDDDDDDDDDDDDD', 1, '2022-09-06 16:11:55', '127.0.0.1');
INSERT INTO `user` VALUES (8, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', '734499162@qq.com', '2022-09-06 16:11:59', '8c2cfe8f1a6ccbbf8a879ab4027829de.png', 'TTTTTTTTTTTTTTTTTTTTT', 2, '2022-09-06 16:11:59', '127.0.0.1');
INSERT INTO `user` VALUES (49, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 0, '15825759654', 'zjh9811171@qq.com', '2022-09-06 16:12:04', 'af984c4bfe2746233e23fb9e36142643.png', 'GHHHHHHHHHHHHHHHHH', 1, '2022-09-06 16:12:04', '127.0.0.1');
INSERT INTO `user` VALUES (50, '张家辉2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15825759654', 'hcc096923@163.com', '2022-09-06 16:12:10', '75c9af95f1c2ffead0263ce07c256d12.png', 'NNNNNNNNNNNNFGFGFG', 1, '2022-09-06 16:12:10', '127.0.0.1');
INSERT INTO `user` VALUES (51, '小乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2022-09-06 16:12:16', '66ebe868306c15bc250a6f0d3e86498f.png', 'NNNNNNHFGFGFGFG', 1, '2022-09-06 16:12:16', '127.0.0.1');
INSERT INTO `user` VALUES (52, '古天乐', 'e10adc3949ba59abbe56e057f20f883e', 0, '15167122361', '15657122362@163.com', '2022-09-06 16:12:20', 'a61c6ab0feddf7ea88214d6997d7a61e.png', 'GFHGFHGFHFGFGFGFGFG', 1, '2022-09-06 16:12:20', '127.0.0.1');
INSERT INTO `user` VALUES (53, '古天乐2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122363', 'hcc09923@163.com', '2022-09-06 16:12:24', 'a3e4fd3691498b4ce3832d13c4cc5c6b.png', 'GFBHNBGFNBGFGFGFGFG', 1, '2022-09-06 16:12:24', '127.0.0.1');
INSERT INTO `user` VALUES (54, '刘青云', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122561', 'ccccccvvv@163.com', '2022-09-06 16:12:29', '35876097a9f3334866a42cb4d0ad40fb.png', 'FGDHFDGGFDGFDGFGFG', 1, '2022-09-06 16:12:29', '127.0.0.1');
INSERT INTO `user` VALUES (55, '刘青云2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157322361', 'cccc@154.com', '2022-09-06 16:12:34', '18147d709034ab5dc13bfd5d9d1e77e9.png', 'HGFDHFDGFDGFDGFDGFDG', 1, '2022-09-06 16:12:34', '127.0.0.1');
INSERT INTO `user` VALUES (56, '刘青云3', 'e10adc3949ba59abbe56e057f20f883e', 0, '18143275149', 'vvvv@456.com', '2022-09-06 16:12:39', '125d0dba1ffa2d91e5f8305b8999ba2e.png', 'GFDDDTGHGHGHGHGHGH', 1, '2022-09-06 16:12:39', '127.0.0.1');
INSERT INTO `user` VALUES (57, '小鬼', 'e10adc3949ba59abbe56e057f20f883e', 0, '15152122361', 'vvvvs@qwsq.com', '2022-09-06 16:12:43', '0b9ae0a74416d9584960a87e031d439b.png', 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', 1, '2022-09-06 16:12:43', '127.0.0.1');
INSERT INTO `user` VALUES (58, '小鬼1', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147295149', 'vvvddvs@qwsq.com', '2022-09-06 16:12:48', 'a384ef8ce147b9d8a2fcb60ac9a45236.png', 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', 1, '2022-09-06 16:12:48', '127.0.0.1');
INSERT INTO `user` VALUES (59, '默然', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275140', 'changchanghan@qq.com', '2022-09-06 16:10:38', '8e0e6fa8fcd5a0e8de10b63e6ba753c3.png', 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', 3, '2022-09-06 16:10:38', '127.0.0.1');
INSERT INTO `user` VALUES (60, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 0, '15825759654', 'hcc0x96923@163.com', '2022-09-07 13:33:09', '8da073feb039d9d50511b5931eeee7b7.png', '', 1, '2022-09-07 13:33:09', '');
INSERT INTO `user` VALUES (61, 'CCH', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122362', 'healthyhcc@gmail.com', '2022-10-12 16:10:50', 'eb33606c7a1913757029a237f854ec40.jpg', '2222222222222222222', 3, '2022-10-12 16:10:50', '127.0.0.1');
INSERT INTO `user` VALUES (62, '太夫人', 'e10adc3949ba59abbe56e057f20f883e', 0, '', 'healthyhcsc@gmail.com', '2022-10-10 09:29:48', 'd8846b94ec98bd9df41f14bc290c340e.jpg', '', 1, '2022-10-10 09:29:48', '127.0.0.1');

SET FOREIGN_KEY_CHECKS = 1;
