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

alter table mn_auctionItems add column isQuiz int(10) NOT NULL DEFAULT '0' COMMENT '是否参与竞猜' after cappedPrice;

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


