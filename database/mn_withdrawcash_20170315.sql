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
