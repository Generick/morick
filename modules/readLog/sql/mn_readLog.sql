/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : car

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-10-26 20:22:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_readlog`
-- ----------------------------
DROP TABLE IF EXISTS `mn_readlog`;
CREATE TABLE `mn_readlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `readType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '阅读类型',
  `readId` int(10) NOT NULL DEFAULT '0' COMMENT '被阅读的对象ID',
  `readTime` int(10) NOT NULL DEFAULT '0' COMMENT '阅读时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_readlog
-- ----------------------------
