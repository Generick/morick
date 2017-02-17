/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-12-10 16:56:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_transaction`
-- ----------------------------
DROP TABLE IF EXISTS `mn_transaction`;
CREATE TABLE `mn_transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `userId` int(10) DEFAULT '0' COMMENT '用户ID',
  `transactionType` tinyint(4) DEFAULT '0' COMMENT '交易类型 0充值 1返还保证金 2提现 3购买服务 4 支付',
  `money` float(10,2) DEFAULT '0.00' COMMENT '交易金额',
  `transactionTime` int(10) DEFAULT '0' COMMENT '交易时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_transaction
-- ----------------------------
