/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-28 15:15:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_user_order_statistics`
-- ----------------------------
DROP TABLE IF EXISTS `mn_user_order_statistics`;
CREATE TABLE `mn_user_order_statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '用户Id',
  `orderSumMoney` int(11) DEFAULT '0' COMMENT '订单总额',
  `recentOrderTime` int(11) DEFAULT NULL COMMENT '最近下单时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_user_order_statistics
-- ----------------------------
