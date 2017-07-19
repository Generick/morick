/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-19 10:18:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_pmt`
-- ----------------------------
DROP TABLE IF EXISTS `mn_pmt`;
CREATE TABLE `mn_pmt` (
  `userId` int(11) NOT NULL DEFAULT '0',
  `name` varchar(256) DEFAULT NULL COMMENT '推广员昵称',
  `telephone` varchar(32) DEFAULT NULL COMMENT '手机号',
  `qrcode` varchar(128) DEFAULT NULL COMMENT '二维码地址',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除0未删除1删除',
  `registerTime` int(11) DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId` (`userId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_pmt
-- ----------------------------
