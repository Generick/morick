SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mn_commodity`
-- ----------------------------
DROP TABLE IF EXISTS `mn_commodity`;
CREATE TABLE `mn_commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_name` varchar(128) DEFAULT NULL COMMENT '商品名称',
  `commodity_pic` text COMMENT '商品图片',
  `commodity_desc` text COMMENT '商品描述',
  `commodity_price` int(10) DEFAULT NULL COMMENT '商品价格',
  `stock_num` int(10) DEFAULT NULL COMMENT '库存',
  `commodity_detail` text COMMENT '商品详情',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除 0未删除 1删除',
  `is_up` tinyint(4) DEFAULT '0' COMMENT '是否上架 0未上架 1已上架',
  `add_time` int(11) DEFAULT NULL COMMENT '添加时间',
  `commodity_cover` varchar(256) DEFAULT NULL COMMENT '商品封面',
  PRIMARY KEY (`id`),
  KEY `isdelete` (`is_delete`) USING BTREE,
  KEY `id` (`id`) USING BTREE,
  KEY `commotidy_name` (`commodity_name`) USING BTREE,
  KEY `is_up` (`is_up`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for `mn_sale_meeting`
-- ----------------------------
DROP TABLE IF EXISTS `mn_sale_meeting`;
CREATE TABLE `mn_sale_meeting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) DEFAULT NULL COMMENT '商品id',
  `is_delete` tinyint(4) DEFAULT '0' COMMENT '是否删除 0未删除 1删除',
  `add_time` int(11) DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `commodity_id` (`commodity_id`) USING BTREE,
  KEY `is_delete` (`is_delete`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for `mn_sale_record`
-- ----------------------------
DROP TABLE IF EXISTS `mn_sale_record`;
CREATE TABLE `mn_sale_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_id` int(11) DEFAULT NULL COMMENT '商品id',
  `commodity_name` varchar(256) DEFAULT NULL COMMENT '商品名称',
  `commodity_price` int(11) DEFAULT NULL COMMENT '商品价格',
  `sale_time` int(11) DEFAULT NULL COMMENT '销售时间',
  `sale_num` int(11) DEFAULT NULL COMMENT '销售数量',
  PRIMARY KEY (`id`),
  KEY `sale_time` (`sale_time`) USING BTREE,
  KEY `commodity_id` (`commodity_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for `mn_commodity_del_record`
-- ----------------------------
DROP TABLE IF EXISTS `mn_commodity_del_record`;
CREATE TABLE `mn_commodity_del_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) DEFAULT NULL COMMENT '管理员id',
  `commodity_id` int(11) DEFAULT NULL COMMENT '商品id',
  `delete_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `delete_time` (`delete_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;