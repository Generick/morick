/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.88
Source Server Version : 50520
Source Host           : 192.168.0.88:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-07-19 10:18:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_prompt_condition`
-- ----------------------------
DROP TABLE IF EXISTS `mn_prompt_condition`;
CREATE TABLE `mn_prompt_condition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '推广员id',
  `condition_money` int(11) DEFAULT NULL COMMENT '条件金额',
  `condition_rate` tinyint(4) DEFAULT NULL COMMENT '条件比率',
  `add_time` int(11) DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_prompt_condition
-- ----------------------------
