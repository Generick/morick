/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-14 18:09:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_mch_commodity`
-- ----------------------------
DROP TABLE IF EXISTS `mn_mch_commodity`;
CREATE TABLE `mn_mch_commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mch_commodity_name` varchar(128) DEFAULT NULL COMMENT '商户商品名',
  `mch_commodity_pic` text COMMENT '商户商品图片',
  `mch_commodity_detail` text COMMENT '商户商品详情',
  `mch_commodity_desc` text COMMENT '商户商品描述',
  `mch_commodity_price` int(10) DEFAULT NULL COMMENT '商户商品价格',
  `mch_bid_price` int(10) DEFAULT NULL COMMENT '商户商品进价',
  `mch_stock_num` int(10) DEFAULT NULL COMMENT '商户商品库存',
  `mch_add_time` int(11) DEFAULT NULL COMMENT '商户商品添加时间',
  `mch_annualized_return` tinyint(10) DEFAULT NULL COMMENT '商户商品年化收益率',
  `mch_commodity_attr` tinyint(4) DEFAULT NULL COMMENT '商户商品类型0单件1多件',
  `mch_commodity_cover` text COMMENT '商户商品封面',
  `mch_is_delete` tinyint(4) DEFAULT '0' COMMENT '商户商品是否删除0未删除1删除',
  `userId` int(11) DEFAULT NULL COMMENT '商户id',
  `up_status` tinyint(4) DEFAULT '0' COMMENT '商品状态0空1上架2下架',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `mch_is_delete` (`mch_is_delete`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE,
  KEY `mch_commodity_name` (`mch_commodity_name`) USING BTREE,
  KEY `mch_add_time` (`mch_add_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_mch_commodity
-- ----------------------------
