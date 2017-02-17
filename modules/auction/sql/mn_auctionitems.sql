/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-11-04 15:27:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_auctionitems`
-- ----------------------------
DROP TABLE IF EXISTS `mn_auctionitems`;
CREATE TABLE `mn_auctionitems` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `ownerId` int(10) NOT NULL DEFAULT '0' COMMENT '展品所有者ID',
  `details` text NOT NULL COMMENT '展品文本介绍',
  `pics` text CHARACTER SET utf8 COMMENT '展品图片',
  `readNum` int(10) DEFAULT '0' COMMENT '阅读数',
  `collectionNum` int(10) DEFAULT '0' COMMENT '收藏数',
  `shareNum` int(10) DEFAULT '0' COMMENT '分享数目',
  `currentPrice` float(10,2) DEFAULT '0.00' COMMENT '当前出价',
  `bidsNum` int(10) DEFAULT '0' COMMENT '出价人数',
  `initialPrice` float(10,2) DEFAULT '0.00' COMMENT '初始价格',
  `lowestPremium` float(10,2) DEFAULT '0.00' COMMENT '最低加价',
  `referencePrice` float(10,2) DEFAULT '0.00' COMMENT '参考价格',
  `postponeTime` int(10) DEFAULT '0' COMMENT '顺延时间【单位分钟】',
  `margin` float(10,2) DEFAULT '0.00' COMMENT '保证金',
  `isFreeShipment` tinyint(4) DEFAULT '0' COMMENT '0包邮 1不包邮',
  `isFreeExchange` tinyint(4) DEFAULT '0' COMMENT '0包退 1不包退',
  `startTime` int(10) DEFAULT '0' COMMENT '开始时间',
  `endTime` int(10) DEFAULT '0' COMMENT '结束时间',
  `createTime` int(10) DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_auctionitems
-- ----------------------------

-- ----------------------------
-- Table structure for `mn_biddinglogs`
-- ----------------------------
DROP TABLE IF EXISTS `mn_biddinglogs`;
CREATE TABLE `mn_biddinglogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `auctionItemId` int(10) NOT NULL DEFAULT '0' COMMENT '展品ID',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '出价用户ID',
  `nowPrice` float(10,2) NOT NULL DEFAULT '0.00' COMMENT '当前出价价格',
  `createTime` int(10) DEFAULT '0' COMMENT '出价时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_biddinglogs
-- ----------------------------
