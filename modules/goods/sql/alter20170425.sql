use auction;
alter table mn_goods add column goods_cover text(128) comment '藏品封面' after create_time;
alter table mn_goods add column outLibrary tinyint(4) default 0 comment '出库0未出库1已出库' after goods_cover;