/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-03-15 17:46:01
*/

SET FOREIGN_KEY_CHECKS=0;

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
