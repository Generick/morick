/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-03-15 17:02:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_quizuser`
-- ----------------------------
DROP TABLE IF EXISTS `mn_quizuser`;
CREATE TABLE `mn_quizuser` (
  `auction_id` int(11) NOT NULL COMMENT '竞猜商品id',
  `user_id` int(11) NOT NULL COMMENT '竞猜用户id',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '用户竞猜次数',
  `quiz_price` float NOT NULL COMMENT '用户的竞猜价格',
  `award` int(11) NOT NULL DEFAULT '0' COMMENT '竞猜中奖等级',
  `part_time` int(10) DEFAULT NULL COMMENT '参与时间',
  `awardMoney` int(11) DEFAULT NULL COMMENT '获奖金额'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_quizuser
-- ----------------------------
/*
INSERT INTO `mn_quizuser` VALUES ('1', '2', '1', '25', '2', '1488185088', null);
INSERT INTO `mn_quizuser` VALUES ('1', '3', '1', '35', '1', '1488188121', null);
INSERT INTO `mn_quizuser` VALUES ('1', '34', '1', '55', '0', '1488945771', null);
INSERT INTO `mn_quizuser` VALUES ('57', '34', '1', '5', '1', '1488960814', null);
INSERT INTO `mn_quizuser` VALUES ('57', '31', '1', '88', '0', '1488961108', null);
INSERT INTO `mn_quizuser` VALUES ('57', '32', '1', '5', '0', '1488962004', null);
INSERT INTO `mn_quizuser` VALUES ('57', '28', '1', '9', '0', '1488962068', null);
INSERT INTO `mn_quizuser` VALUES ('57', '21', '1', '5', '0', '1488962109', null);
INSERT INTO `mn_quizuser` VALUES ('57', '16', '1', '7', '0', '1488962166', null);
INSERT INTO `mn_quizuser` VALUES ('57', '15', '1', '256', '0', '1488962202', null);
INSERT INTO `mn_quizuser` VALUES ('67', '34', '1', '22', '0', '1489544852', null);
INSERT INTO `mn_quizuser` VALUES ('68', '34', '1', '25', '0', '1489546292', null);
INSERT INTO `mn_quizuser` VALUES ('68', '31', '1', '1', '0', '1489546408', null);
INSERT INTO `mn_quizuser` VALUES ('68', '29', '1', '25', '0', '1489547668', null);
INSERT INTO `mn_quizuser` VALUES ('67', '29', '1', '1', '0', '1489547929', null);
INSERT INTO `mn_quizuser` VALUES ('68', '21', '1', '8888890', '0', '1489563554', null);
*/
