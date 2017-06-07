use auction;
alter table mn_order add column orderType tinyint(4) not null default '1' comment "订单类型";
update mn_order set orderType = 1 where orderType is null; 