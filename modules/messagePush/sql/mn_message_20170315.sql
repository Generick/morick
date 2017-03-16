/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : auction

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-03-15 17:02:19
*/

SET FOREIGN_KEY_CHECKS=0;

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
