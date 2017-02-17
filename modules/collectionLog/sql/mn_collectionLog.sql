/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : car

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-10-26 20:46:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_collectionlog`
-- ----------------------------
DROP TABLE IF EXISTS `mn_collectionlog`;
CREATE TABLE `mn_collectionlog` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '用户唯一ID',
  `collectionType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '收藏类型',
  `collectionId` int(10) NOT NULL DEFAULT '0' COMMENT '被收藏ID',
  `collectionTime` int(10) NOT NULL DEFAULT '0' COMMENT '收藏时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `informationId` (`collectionId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_collectionlog
-- ----------------------------
