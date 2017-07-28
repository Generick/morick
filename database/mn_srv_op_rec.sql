/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-28 15:31:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_srv_op_rec`
-- ----------------------------
DROP TABLE IF EXISTS `mn_srv_op_rec`;
CREATE TABLE `mn_srv_op_rec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '客服id',
  `order_no` varchar(128) DEFAULT NULL COMMENT '订单号',
  `fromStatus` tinyint(4) DEFAULT NULL COMMENT '操作前订单状态',
  `toStatus` tinyint(4) DEFAULT NULL COMMENT '操作后订单状态',
  `opTime` int(11) DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_srv_op_rec
-- ----------------------------
