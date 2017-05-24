/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-04-26 14:57:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_del_record`
-- ----------------------------
DROP TABLE IF EXISTS `mn_del_record`;
CREATE TABLE `mn_del_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `adminId` int(11) DEFAULT NULL,
  `TID` int(11) DEFAULT NULL COMMENT '藏品或者拍品的id',
  `delTime` int(11) DEFAULT NULL COMMENT '删除时间',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型 0藏品 1拍品',
  `cName` text COLLATE utf8_unicode_ci COMMENT '物品名称',
  `cPic` text COLLATE utf8_unicode_ci COMMENT '物品图片',
  PRIMARY KEY (`id`),
  KEY `type` (`type`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_del_record
-- ----------------------------

