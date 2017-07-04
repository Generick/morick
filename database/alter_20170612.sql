use auction;
alter table mn_commodity add column bid_price int(10) default 0 comment "进价";
alter table mn_sale_record add column bid_price int(10) default 0 comment "商品进价";

update mn_commodity set bid_price = 0;
update mn_sale_record set bid_price = 0;