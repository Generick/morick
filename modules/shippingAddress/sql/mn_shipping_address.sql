/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : shopex

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-12-09 15:33:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `shopex_shipping_address`
-- ----------------------------
DROP TABLE IF EXISTS `mn_shipping_address`;
CREATE TABLE `mn_shipping_address` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '用户唯一标识',
  `acceptName` varchar(128) NOT NULL DEFAULT '''''' COMMENT '收货人名字',
  `province` varchar(255) DEFAULT '' COMMENT '省份',
  `city` varchar(255) DEFAULT '' COMMENT '城市或区',
  `district` varchar(255) DEFAULT '' COMMENT '区县',
  `address` varchar(250) DEFAULT '''''' COMMENT '详细地址',
  `mobile` varchar(20) DEFAULT '''''' COMMENT '手机号',
  `isCommon` tinyint(3) DEFAULT '0' COMMENT '是否常用 0不常用  1常用地址',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
