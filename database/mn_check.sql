/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-19 10:19:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_check`
-- ----------------------------
DROP TABLE IF EXISTS `mn_check`;
CREATE TABLE `mn_check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '推广员Id',
  `amount` int(11) DEFAULT '0' COMMENT '结账金额',
  `check_time` int(11) DEFAULT NULL COMMENT '结账时间',
  PRIMARY KEY (`id`),
  KEY `check_time` (`check_time`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_check
-- ----------------------------
