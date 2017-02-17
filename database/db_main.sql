/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : car

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-11-07 20:22:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_admin`
-- ----------------------------
DROP TABLE IF EXISTS `mn_admin`;
CREATE TABLE `mn_admin` (
  `userId` int(11) NOT NULL COMMENT 'userId',
  `adminType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:超级管理员, 1:普通管理员',
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '昵称',
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除：0为正常，1为删除',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_admin
-- ----------------------------
INSERT INTO `mn_admin` VALUES ('1', '0', 'admin', '0');

-- ----------------------------
-- Table structure for `mn_adminpageentry`
-- ----------------------------
DROP TABLE IF EXISTS `mn_adminpageentry`;
CREATE TABLE `mn_adminpageentry` (
  `entryId` int(11) NOT NULL AUTO_INCREMENT,
  `pageLevel` tinyint(4) NOT NULL DEFAULT '0' COMMENT '菜单级别',
  `parentEntryId` int(11) NOT NULL DEFAULT '0' COMMENT '所属页面',
  `name` char(32) NOT NULL DEFAULT '' COMMENT '入口名',
  PRIMARY KEY (`entryId`)
) ENGINE=InnoDB AUTO_INCREMENT=602 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_adminpageentry
-- ----------------------------
INSERT INTO `mn_adminpageentry` VALUES ('1', '1', '0', 'Ituning-管理员管理');
INSERT INTO `mn_adminpageentry` VALUES ('2', '1', '0', 'Ituning-用户管理');
INSERT INTO `mn_adminpageentry` VALUES ('3', '1', '0', 'Ituning-常量管理');
INSERT INTO `mn_adminpageentry` VALUES ('4', '1', '0', 'Ituning-手册&视频管理');
INSERT INTO `mn_adminpageentry` VALUES ('5', '1', '0', 'Ituning-反馈管理');
INSERT INTO `mn_adminpageentry` VALUES ('6', '1', '0', 'Ituning-FAQ管理');
INSERT INTO `mn_adminpageentry` VALUES ('101', '2', '1', 'Ituning-管理员列表');
INSERT INTO `mn_adminpageentry` VALUES ('201', '2', '2', 'Ituning-用户列表');
INSERT INTO `mn_adminpageentry` VALUES ('202', '2', '2', 'Ituning-报警记录');
INSERT INTO `mn_adminpageentry` VALUES ('301', '2', '3', 'Ituning-常量管理');
INSERT INTO `mn_adminpageentry` VALUES ('401', '2', '4', 'Ituning-上传视频&安装视频');
INSERT INTO `mn_adminpageentry` VALUES ('501', '2', '5', 'Ituning-反馈列表');
INSERT INTO `mn_adminpageentry` VALUES ('601', '2', '6', 'Ituning-FAQ列表');

-- ----------------------------
-- Table structure for `mn_adminpagemethod`
-- ----------------------------
DROP TABLE IF EXISTS `mn_adminpagemethod`;
CREATE TABLE `mn_adminpagemethod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryId` int(11) NOT NULL DEFAULT '0' COMMENT '所属页面',
  `methodName` varchar(128) NOT NULL DEFAULT '' COMMENT '会调用的接口',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_adminpagemethod
-- ----------------------------

-- ----------------------------
-- Table structure for `mn_adminpageprivilege`
-- ----------------------------
DROP TABLE IF EXISTS `mn_adminpageprivilege`;
CREATE TABLE `mn_adminpageprivilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminUserId` int(11) NOT NULL DEFAULT '0',
  `entryId` int(11) NOT NULL DEFAULT '0' COMMENT '所属页面',
  PRIMARY KEY (`id`),
  KEY `adminUserId` (`adminUserId`),
  CONSTRAINT `mn_adminpageprivilege_ibfk_1` FOREIGN KEY (`adminUserId`) REFERENCES `mn_admin` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_adminpageprivilege
-- ----------------------------

-- ----------------------------
-- Table structure for `mn_passport`
-- ----------------------------
DROP TABLE IF EXISTS `mn_passport`;
CREATE TABLE `mn_passport` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `platform` int(11) DEFAULT '0' COMMENT '账号类型:0自有账号,1微信账号,2微博',
  `platformId` varchar(56) DEFAULT '' COMMENT '账号Id手机号、第三方平台唯一标识',
  `password` varchar(56) DEFAULT '' COMMENT '密码',
  `token` varchar(56) DEFAULT '' COMMENT '用户登录Token',
  `tokenEndTime` int(11) DEFAULT '0' COMMENT '用户登录Token过期时间',
  `createTime` int(11) DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_passport
-- ----------------------------
INSERT INTO `mn_passport` VALUES ('1', '1', 'admin', '47cf6a1162599b0ac01515775098d6f2', 'f26870e32c8b6f017cf72075362115d4', '1479384874', '0');

-- ----------------------------
-- Table structure for `mn_user`
-- ----------------------------
DROP TABLE IF EXISTS `mn_user`;
CREATE TABLE `mn_user` (
  `userId` int(11) NOT NULL,
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '昵称',
  `gender` tinyint(4) NOT NULL DEFAULT '0' COMMENT '性别：0为女，1为男',
  `smallIcon` varchar(256) NOT NULL DEFAULT '' COMMENT '小头像',
  `icon` varchar(256) NOT NULL DEFAULT '' COMMENT '大头像',
  `telephone` varchar(32) NOT NULL DEFAULT '' COMMENT '手机号',
  `birthday` int(11) NOT NULL DEFAULT '0' COMMENT '生日',
  `address` text NOT NULL COMMENT '地址，格式为：[{"name", "phoneNumber", "province", "city", "county", "detail", "isDefault"}, ...]',
  `filledPersonalInfo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否已经填写个人信息',
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除：0为正常，1为删除',
  `platformId` varchar(168) DEFAULT '0',
  `registerTime` varchar(256) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_user
-- ----------------------------

-- ----------------------------
-- Table structure for `mn_user_relation`
-- ----------------------------
DROP TABLE IF EXISTS `mn_user_relation`;
CREATE TABLE `mn_user_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'userId: 对应到所有的user、admin以及其他类型用户',
  `userType` tinyint(11) DEFAULT '0' COMMENT '用户类型：普通用户0, 管理员1',
  `accountId` int(11) DEFAULT '0' COMMENT '账号Id',
  `userStatus` tinyint(4) DEFAULT '0' COMMENT '用户状态 0正常',
  `lastLoginTime` int(11) DEFAULT '0' COMMENT '上次登录时间',
  `registerTime` int(11) DEFAULT '0' COMMENT '注册时间',
  PRIMARY KEY (`id`),
  KEY `accountId` (`accountId`)
) ENGINE=InnoDB AUTO_INCREMENT=10037 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of mn_user_relation
-- ----------------------------
INSERT INTO `mn_user_relation` VALUES ('1', '2', '1', '0', '1478520874', '0');
