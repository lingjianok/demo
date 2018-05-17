-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-05-17 17:03:48
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yhd`
--

-- --------------------------------------------------------

--
-- 表的结构 `banner`
--

CREATE TABLE `banner` (
  `sid` tinyint(1) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `banner`
--

INSERT INTO `banner` (`sid`, `url`) VALUES
(1, '//img20.360buyimg.com/img/jfs/t18760/15/2526005241/121983/ec528059/5af91f86N6c0b545a.jpg'),
(2, '//img10.360buyimg.com/img/jfs/t16831/71/2521579509/121104/be07da04/5afa8d5dN4a21f5b9.jpg'),
(3, '//img10.360buyimg.com/img/jfs/t22087/178/16403662/140265/a3967676/5af56cb8N95dc9b82.jpg'),
(4, '//img10.360buyimg.com/img/jfs/t20776/157/63703714/167371/64516ba1/5af946bdNb327669a.jpg'),
(5, '//img10.360buyimg.com/img/jfs/t16750/233/2405396657/116870/874c40b6/5af56575N1671c4c3.jpg'),
(6, '//img12.360buyimg.com/img/jfs/t16855/85/2515508247/146639/c5f2f790/5af947abN489195ba.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `gc`
--

CREATE TABLE `gc` (
  `sid` tinyint(2) UNSIGNED NOT NULL,
  `title` varchar(10) NOT NULL,
  `p` varchar(10) NOT NULL,
  `src` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `gc`
--

INSERT INTO `gc` (`sid`, `title`, `p`, `src`) VALUES
(1, '农夫山泉', '爆款直降', '//img30.360buyimg.com/img/jfs/t17692/44/1440393293/15138/81dd5400/5acc0f5bN2513169b.jpg'),
(2, '1号坚果', '满199减100', '//img12.360buyimg.com/img/jfs/t11794/358/2116704279/15240/9baf1d57/5a126cbaNaf4b204f.jpg'),
(3, '1号零食', '满188减100', '//img10.360buyimg.com/img/jfs/t12463/90/715007504/15442/bb28f365/5a1238ceNc325b46f.png'),
(4, '粮油米面', '领券99减50', '//img10.360buyimg.com/img/jfs/t16825/274/961834525/24099/c50caa25/5ab46ff9Nc7d5896d.jpg'),
(5, '营养保健', '部分满199-50', '//img10.360buyimg.com/img/jfs/t18853/192/274693642/21327/7ef79a16/5a67f772Nd7a07cf2.jpg'),
(6, '水饮冲调', '领券129减10', '//img14.360buyimg.com/img/jfs/t14203/163/2708013342/12280/b592536f/5ab067ccNd9c3aeaf.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `sid` tinyint(2) UNSIGNED NOT NULL,
  `tit` varchar(50) NOT NULL,
  `src` varchar(255) NOT NULL,
  `price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`sid`, `tit`, `src`, `price`) VALUES
(1, '来伊份 坚果炒货 休闲零食 每日坚果7日装什锦混合果仁 天天坚果活力派175g', '//img12.360buyimg.com/n1/s50x50_jfs/t3181/241/9127406531/110691/43733c57/58cf4f7aN28c7d04d.jpg', '31.90'),
(2, '力士 济之州(KJU)宠肤香氛沐浴套装 300g*2+3g宠肤香膏 沐浴露/沐浴乳', '//img13.360buyimg.com/n1/s50x50_jfs/t14047/229/1121385898/98652/a48d9241/5a1ba71cNc6ea2e89.jpg', '69.00'),
(3, '多芬(DOVE)滋养美肤沐浴乳套装 深层营润1000g+樱花甜香1000g送清透水润190mlx2+', '//img14.360buyimg.com/n1/s50x50_jfs/t5605/159/3764585268/228750/67c5565f/594226c7N8a9e207d.jpg', '78.90'),
(4, '小米(MI)Air 13.3英寸金属超轻薄笔记本电脑(i5-7200U 8G 256G PCleSS', '//img12.360buyimg.com/n1/s50x50_jfs/t6700/155/2098998076/156185/6cf95035/595dd5a5Nc3a7dab5.jpg', '4998.00');

-- --------------------------------------------------------

--
-- 表的结构 `nav`
--

CREATE TABLE `nav` (
  `sid` tinyint(2) UNSIGNED NOT NULL,
  `title` varchar(10) NOT NULL,
  `list` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `nav`
--

INSERT INTO `nav` (`sid`, `title`, `list`) VALUES
(0, '乳品生鲜', '["牛奶","成人奶粉","酸奶","豆奶","奶酪","黄油/奶油","水果","肉类","海鲜"]'),
(1, '饼干糕点', '["节庆礼盒","粗粮饼干","曲奇","威化","夹心饼干","苏打饼干","糕点","蛋卷","丹麦蓝罐","莱家"]'),
(2, '酒水饮料', '["葡萄酒","啤酒","洋酒","起泡酒","饮用水","含气水","椰子水","碳酸饮料","果蔬汁","依云","巴黎水","唯他可可"]');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `sid` tinyint(2) UNSIGNED NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `num` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`sid`, `username`, `password`, `num`) VALUES
(1, 'lingjianok', '12345678', '1234454546'),
(2, 'lingj', 'd41d8cd98f00b204e9800998ecf8427e', ''),
(3, 'lindfdf', 'd41d8cd98f00b204e9800998ecf8427e', ''),
(4, '', 'd41d8cd98f00b204e9800998ecf8427e', ''),
(5, 'WEQ234234', '96e79218965eb72c92a549dd5a330112', ''),
(6, 'WEQ234233', '96e79218965eb72c92a549dd5a330112', '14555555555'),
(7, 'WEQ2342333', '96e79218965eb72c92a549dd5a330112', '14555555555'),
(8, 'ling', '30da1670808c2d4bb1371bd0f6ceaa45', '14544444444');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `gc`
--
ALTER TABLE `gc`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `nav`
--
ALTER TABLE `nav`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`sid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `banner`
--
ALTER TABLE `banner`
  MODIFY `sid` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `gc`
--
ALTER TABLE `gc`
  MODIFY `sid` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `sid` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `sid` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
