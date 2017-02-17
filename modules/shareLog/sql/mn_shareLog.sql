/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : car

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-10-26 20:43:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_sharelog`
-- ----------------------------
DROP TABLE IF EXISTS `mn_sharelog`;
CREATE TABLE `mn_sharelog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `shareType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '分享对象类型',
  `shareId` int(10) NOT NULL DEFAULT '0' COMMENT '被分享对象ID',
  `sharePlatform` tinyint(4) NOT NULL DEFAULT '0' COMMENT '分享渠道',
  `shareTime` int(10) NOT NULL DEFAULT '0' COMMENT '分享时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_sharelog
-- ----------------------------
