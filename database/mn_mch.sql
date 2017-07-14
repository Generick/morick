/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-14 18:09:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_mch`
-- ----------------------------
DROP TABLE IF EXISTS `mn_mch`;
CREATE TABLE `mn_mch` (
  `userId` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL COMMENT '昵称',
  `registerTime` int(11) DEFAULT NULL COMMENT '注册时间',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除0为删除1删除',
  `accountName` varchar(256) DEFAULT NULL COMMENT '账号名',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId` (`userId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_mch
-- ----------------------------
