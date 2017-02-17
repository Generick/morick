/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-11-10 14:45:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_goods`
-- ----------------------------
DROP TABLE IF EXISTS `mn_goods`;
CREATE TABLE `mn_goods` (
  `goods_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `cat_id` int(10) DEFAULT '0' COMMENT '商品分类ID',
  `goods_type` tinyint(4) DEFAULT '0' COMMENT '商品类型',
  `brand_id` int(10) DEFAULT '0' COMMENT '品牌ID',
  `tag_id` int(10) DEFAULT '0' COMMENT '标签ID',
  `owner_id` int(10) DEFAULT '0' COMMENT '商品所有者ID',
  `goods_name` varchar(512) CHARACTER SET utf8 DEFAULT '' COMMENT '商品名称',
  `goods_detail` text COMMENT '商品详情',
  `goods_pics` text CHARACTER SET utf8 COMMENT '商品图片数组',
  `bak_id` int(10) DEFAULT '0' COMMENT '快照ID  默认为0表示没有快照',
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_goods
-- ----------------------------

-- ----------------------------
-- Table structure for `mn_goods_bak`
-- ----------------------------
DROP TABLE IF EXISTS `mn_goods_bak`;
CREATE TABLE `mn_goods_bak` (
  `goods_bak_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `goods_id` int(10) NOT NULL DEFAULT '0' COMMENT '商品ID',
  `cat_id` int(10) DEFAULT '0' COMMENT '分类ID',
  `goods_type` tinyint(4) DEFAULT '0' COMMENT '商品类型',
  `brand_id` int(10) DEFAULT '0' COMMENT '品牌ID',
  `tag_id` int(10) DEFAULT '0' COMMENT '标签ID',
  `owner_id` int(10) DEFAULT '0' COMMENT '商品所有者ID',
  `goods_name` varchar(512) CHARACTER SET utf8 DEFAULT '' COMMENT '商品名称',
  `goods_detail` text COMMENT '商品详情 ',
  `goods_pics` text CHARACTER SET utf8 COMMENT '商品图片数组',
  PRIMARY KEY (`goods_bak_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_goods_bak
-- ----------------------------