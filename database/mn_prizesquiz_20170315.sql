/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-03-15 17:01:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_prizesquiz`
-- ----------------------------
DROP TABLE IF EXISTS `mn_prizesquiz`;
CREATE TABLE `mn_prizesquiz` (
  `auction_id` int(11) NOT NULL COMMENT '商品id',
  `goods_icon` text COLLATE utf8_unicode_ci,
  `goods_name` text COLLATE utf8_unicode_ci COMMENT '商品名称',
  `limitNum` int(11) NOT NULL DEFAULT '100' COMMENT '竞猜人数上限',
  `currentNum` int(11) NOT NULL DEFAULT '0' COMMENT '当前竞猜人数',
  `sum` int(11) NOT NULL DEFAULT '0' COMMENT '竞猜奖金',
  `status` int(11) NOT NULL COMMENT '状态',
  `purchasePrice` float DEFAULT '0' COMMENT '成交价格',
  `tickets` int(11) DEFAULT NULL COMMENT '门票',
  PRIMARY KEY (`auction_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_prizesquiz
-- ----------------------------
/*
INSERT INTO `mn_prizesquiz` VALUES ('11', null, 'dfsdf', '100', '5', '50', '4', '0', '5');
INSERT INTO `mn_prizesquiz` VALUES ('1', null, null, '50', '11', '205', '1', '0', '5');
INSERT INTO `mn_prizesquiz` VALUES ('57', '[\"http://localhost/auction/uploads/other/1488535525_58b93fe550f72.png\"]', 'sffewrew', '30', '7', '350', '1', '0', '50');
INSERT INTO `mn_prizesquiz` VALUES ('67', '[\"http://localhost/auction/uploads/other/1489544766_58c8a63e3dc30.crx\"]', 'bnjkbj', '100', '2', '100', '1', '0', '50');
INSERT INTO `mn_prizesquiz` VALUES ('68', '[\"http://localhost/auction/uploads/other/1489544752_58c8a630c8ef0.crx\"]', 'gh', '100', '4', '200', '1', '0', '50');
*/
