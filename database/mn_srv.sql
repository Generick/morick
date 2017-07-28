/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-28 15:31:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_srv`
-- ----------------------------
DROP TABLE IF EXISTS `mn_srv`;
CREATE TABLE `mn_srv` (
  `userId` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(256) DEFAULT NULL COMMENT '昵称',
  `accountName` varchar(128) DEFAULT NULL COMMENT '账号名',
  `registerTime` int(11) DEFAULT NULL COMMENT '注册时间',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除0未删除1已删除',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_srv
-- ----------------------------
