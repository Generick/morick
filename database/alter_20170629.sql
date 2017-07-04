use auction;
/*
alter table mn_commodity add column sold_time int(11) default 0;
alter table mn_commodity add column commodity_attr tinyint(4) default 0;
*/

/*formal database;
*/
update mn_commodity set stock_num = 1 where stock_num < 30 and stock_num != 0;
update mn_commodity set commodity_attr = 1 where stock_num > 30;

/*
test database;
update mn_commodity set stock_num = 1;
*/