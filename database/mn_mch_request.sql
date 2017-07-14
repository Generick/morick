/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-14 18:09:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_mch_request`
-- ----------------------------
DROP TABLE IF EXISTS `mn_mch_request`;
CREATE TABLE `mn_mch_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mch_commodity_id` int(11) DEFAULT NULL COMMENT '商户商品id',
  `requestType` tinyint(4) DEFAULT NULL COMMENT '请求类型1上架申请2下架申请3请求同步',
  `handleResult` tinyint(4) DEFAULT '0' COMMENT '处理结果0未处理1同意2拒绝',
  `requestTime` int(11) DEFAULT NULL COMMENT '申请时间',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除0未删除1删除',
  `userId` int(11) DEFAULT NULL COMMENT '申请者id',
  PRIMARY KEY (`id`),
  KEY `requestTime` (`requestTime`) USING BTREE,
  KEY `mch_commodity_id` (`mch_commodity_id`) USING BTREE,
  KEY `requestType` (`requestType`) USING BTREE,
  KEY `handleResult` (`handleResult`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_mch_request
-- ----------------------------
