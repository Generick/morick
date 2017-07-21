user auction_test;
alter table mn_order add column condition_rate tinyint(4) default 0;
alter table mn_order add column isChecked tinyint(4) default 0;