/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-03-15 17:02:47
*/

alter table mn_auctionitems add column isQuiz int(10) NOT NULL DEFAULT '0' COMMENT '是否参与竞猜' after cappedPrice;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_withdrawcash`
-- ----------------------------
DROP TABLE IF EXISTS `mn_withdrawcash`;
CREATE TABLE `mn_withdrawcash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `withdraw_cash` int(11) NOT NULL COMMENT '提现金额',
  `wx_account` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '微信账号',
  `apply_time` int(11) NOT NULL COMMENT '申请时间',
  `status` int(11) DEFAULT NULL COMMENT '提现申请状态0完成1待处理2拒绝',
  `refuse_reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '拒绝理由',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_withdrawcash
-- ----------------------------
/*
INSERT INTO `mn_withdrawcash` VALUES ('1', '2', '200', 'www', '123123', '0', '1111');
INSERT INTO `mn_withdrawcash` VALUES ('2', '34', '222', '', '1489051660', '0', null);
INSERT INTO `mn_withdrawcash` VALUES ('3', '34', '222', '', '1489051692', '2', 'dsgdfg');
INSERT INTO `mn_withdrawcash` VALUES ('4', '34', '22', 'eeewf', '1489051702', '2', 'cgdfgdfg');
INSERT INTO `mn_withdrawcash` VALUES ('5', '34', '222', 'wp', '1489051762', '2', 'rgfsgg');
INSERT INTO `mn_withdrawcash` VALUES ('6', '34', '223', '44', '1489051823', '2', 'dfgdfg ');
INSERT INTO `mn_withdrawcash` VALUES ('7', '7', '100', '12121', '11312', '2', '111');
INSERT INTO `mn_withdrawcash` VALUES ('8', '21', '25', '1111', '424524', '0', null);
INSERT INTO `mn_withdrawcash` VALUES ('9', '28', '45', 'werwe', '342342', '2', 'dgdgdfgdfg');
INSERT INTO `mn_withdrawcash` VALUES ('10', '34', '1', '2', '1489055226', '2', '111');
INSERT INTO `mn_withdrawcash` VALUES ('11', '34', '111', '222222', '1489056011', '0', null);
INSERT INTO `mn_withdrawcash` VALUES ('12', '34', '1', '11111111', '1489462964', '1', null);
INSERT INTO `mn_withdrawcash` VALUES ('13', '34', '12', 'dsfsdfdds', '1489463019', '2', '313213213');
INSERT INTO `mn_withdrawcash` VALUES ('14', '34', '2', '222222', '1489463167', '0', null);
INSERT INTO `mn_withdrawcash` VALUES ('15', '31', '1', '11111111', '1489476078', '1', null);
INSERT INTO `mn_withdrawcash` VALUES ('16', '34', '111', '111111', '1489567224', '1', null);
*/

-- ----------------------------
-- Table structure for `mn_usermsglog`
-- ----------------------------
DROP TABLE IF EXISTS `mn_usermsglog`;
CREATE TABLE `mn_usermsglog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `msg_id` int(11) NOT NULL COMMENT '消息id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_usermsglog
-- ----------------------------
/*
INSERT INTO `mn_usermsglog` VALUES ('1', '1', '1');
INSERT INTO `mn_usermsglog` VALUES ('2', '34', '11');
INSERT INTO `mn_usermsglog` VALUES ('3', '34', '1');
INSERT INTO `mn_usermsglog` VALUES ('4', '34', '10');
INSERT INTO `mn_usermsglog` VALUES ('5', '21', '11');
INSERT INTO `mn_usermsglog` VALUES ('6', '34', '2');
INSERT INTO `mn_usermsglog` VALUES ('7', '21', '10');
INSERT INTO `mn_usermsglog` VALUES ('8', '21', '1');
INSERT INTO `mn_usermsglog` VALUES ('9', '21', '2');
INSERT INTO `mn_usermsglog` VALUES ('10', '16', '1');
INSERT INTO `mn_usermsglog` VALUES ('11', '16', '11');
INSERT INTO `mn_usermsglog` VALUES ('12', '16', '10');
INSERT INTO `mn_usermsglog` VALUES ('13', '16', '2');
INSERT INTO `mn_usermsglog` VALUES ('14', '7', '1');
INSERT INTO `mn_usermsglog` VALUES ('15', '3', '5');
INSERT INTO `mn_usermsglog` VALUES ('16', '3', '11');
INSERT INTO `mn_usermsglog` VALUES ('17', '3', '10');
INSERT INTO `mn_usermsglog` VALUES ('18', '3', '12');
INSERT INTO `mn_usermsglog` VALUES ('19', '3', '13');
INSERT INTO `mn_usermsglog` VALUES ('20', '3', '15');
INSERT INTO `mn_usermsglog` VALUES ('21', '3', '17');
INSERT INTO `mn_usermsglog` VALUES ('22', '3', '16');
INSERT INTO `mn_usermsglog` VALUES ('23', '3', '14');
INSERT INTO `mn_usermsglog` VALUES ('24', '4', '11');
INSERT INTO `mn_usermsglog` VALUES ('25', '4', '10');
INSERT INTO `mn_usermsglog` VALUES ('26', '4', '23');
INSERT INTO `mn_usermsglog` VALUES ('27', '4', '2');
INSERT INTO `mn_usermsglog` VALUES ('28', '4', '13');
INSERT INTO `mn_usermsglog` VALUES ('29', '4', '12');
INSERT INTO `mn_usermsglog` VALUES ('30', '4', '24');
INSERT INTO `mn_usermsglog` VALUES ('31', '4', '16');
INSERT INTO `mn_usermsglog` VALUES ('32', '4', '1');
INSERT INTO `mn_usermsglog` VALUES ('33', '4', '15');
INSERT INTO `mn_usermsglog` VALUES ('34', '4', '14');
INSERT INTO `mn_usermsglog` VALUES ('35', '4', '17');
INSERT INTO `mn_usermsglog` VALUES ('36', '13', '17');
INSERT INTO `mn_usermsglog` VALUES ('37', '13', '24');
INSERT INTO `mn_usermsglog` VALUES ('38', '13', '2');
INSERT INTO `mn_usermsglog` VALUES ('39', '13', '1');
INSERT INTO `mn_usermsglog` VALUES ('40', '13', '15');
INSERT INTO `mn_usermsglog` VALUES ('41', '13', '12');
INSERT INTO `mn_usermsglog` VALUES ('42', '13', '13');
INSERT INTO `mn_usermsglog` VALUES ('43', '12', '14');
INSERT INTO `mn_usermsglog` VALUES ('44', '34', '32');
INSERT INTO `mn_usermsglog` VALUES ('45', '34', '12');
INSERT INTO `mn_usermsglog` VALUES ('46', '34', '13');
INSERT INTO `mn_usermsglog` VALUES ('47', '34', '14');
INSERT INTO `mn_usermsglog` VALUES ('48', '34', '15');
INSERT INTO `mn_usermsglog` VALUES ('49', '34', '16');
INSERT INTO `mn_usermsglog` VALUES ('50', '34', '17');
INSERT INTO `mn_usermsglog` VALUES ('51', '34', '23');
INSERT INTO `mn_usermsglog` VALUES ('52', '34', '24');
INSERT INTO `mn_usermsglog` VALUES ('53', '34', '33');
INSERT INTO `mn_usermsglog` VALUES ('54', '22', '33');
INSERT INTO `mn_usermsglog` VALUES ('55', '31', '1');
INSERT INTO `mn_usermsglog` VALUES ('56', '31', '15');
INSERT INTO `mn_usermsglog` VALUES ('57', '31', '2');
INSERT INTO `mn_usermsglog` VALUES ('58', '31', '10');
INSERT INTO `mn_usermsglog` VALUES ('59', '31', '11');
INSERT INTO `mn_usermsglog` VALUES ('60', '31', '12');
INSERT INTO `mn_usermsglog` VALUES ('61', '31', '13');
INSERT INTO `mn_usermsglog` VALUES ('62', '31', '23');
INSERT INTO `mn_usermsglog` VALUES ('63', '29', '38');
INSERT INTO `mn_usermsglog` VALUES ('64', '29', '36');
INSERT INTO `mn_usermsglog` VALUES ('65', '29', '37');
INSERT INTO `mn_usermsglog` VALUES ('66', '29', '1');
INSERT INTO `mn_usermsglog` VALUES ('67', '29', '10');
INSERT INTO `mn_usermsglog` VALUES ('68', '21', '24');
*/

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


-- ----------------------------
-- Table structure for `mn_message`
-- ----------------------------
DROP TABLE IF EXISTS `mn_message`;
CREATE TABLE `mn_message` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息id',
  `msg_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息标题',
  `msg_content` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息内容',
  `create_time` int(11) NOT NULL COMMENT '消息创建时间',
  `msg_type` int(11) DEFAULT NULL COMMENT '消息类型',
  `href_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '消息跳转id',
  `push_type` int(11) DEFAULT NULL COMMENT '推送类型0系统消息1竞猜得奖2获拍3发货',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID,',
  PRIMARY KEY (`msg_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mn_message
-- ----------------------------
/*
INSERT INTO `mn_message` VALUES ('1', 'title', '啊打', '1489112620', '0', '0', '0', '0');
INSERT INTO `mn_message` VALUES ('2', 'title', '啊打', '1489112704', '0', '0', '0', '0');
INSERT INTO `mn_message` VALUES ('3', 'user', '啊实打实大', '213131', '0', '0', '3', '1');
INSERT INTO `mn_message` VALUES ('4', 'user1', '啊打', '323423', '0', '0', '3', '2');
INSERT INTO `mn_message` VALUES ('5', 'gg', '按时打算', '23423', '0', '0', '1', '0');
INSERT INTO `mn_message` VALUES ('6', '是干啥', '胜多负少', '3423', '1', '1', '3', '1');
INSERT INTO `mn_message` VALUES ('7', '的发给对方', '跟对方', '234', '2', '1', '3', '1');
INSERT INTO `mn_message` VALUES ('8', '个会', '规范化', '34', '3', '1', '3', '1');
INSERT INTO `mn_message` VALUES ('9', '啊打', '打算', '234', '0', '0', '2', '1');
INSERT INTO `mn_message` VALUES ('10', '122333', '111111', '1489383560', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('11', '11111', '111111', '1489383634', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('12', '111', '11111', '1489394687', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('13', '111', '111', '1489394824', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('14', '111', '111', '1489394906', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('15', '111', '111', '1489394925', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('16', '111', '111', '1489394954', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('17', '1111', '1111111', '1489395194', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('18', '11111', '11111', '1489395229', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('19', '111111', '11111', '1489395263', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('20', '11111', '111111', '1489395281', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('21', '111111', '11111', '1489395307', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('22', '11111', '11111', '1489395443', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('23', '33333', '33333', '1489395545', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('24', '44444', '444444', '1489395567', '0', '0', '0', '0');
INSERT INTO `mn_message` VALUES ('25', '55555', '555555', '1489395576', '0', '0', '1', '0');
INSERT INTO `mn_message` VALUES ('26', '66666', '66666', '1489395587', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('27', '66666', '11111111', '1489395632', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('28', '77777', '777777', '1489395872', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('29', '777777', '666666', '1489395924', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('30', '66666', '1111111', '1489396076', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('31', '1111', '1111', '1489401758', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('32', '11111', '11111', '1489457883', '0', '0', '0', '0');
INSERT INTO `mn_message` VALUES ('33', '1111', '1111', '1489457895', '0', '0', '2', '0');
INSERT INTO `mn_message` VALUES ('34', '1234', '1234', '1489457904', '0', '0', '1', '0');
INSERT INTO `mn_message` VALUES ('35', '1234', '1111', '1489457916', '0', '0', '3', '47');
INSERT INTO `mn_message` VALUES ('36', 'dd', 'dd', '1489112620', '1', '68', '3', '29');
INSERT INTO `mn_message` VALUES ('37', 'sa', 'asa', '1489112620', '2', '1', '3', '29');
INSERT INTO `mn_message` VALUES ('38', 'wew', 'we', '1489112620', '3', '20170314606333', '3', '29');
*/
