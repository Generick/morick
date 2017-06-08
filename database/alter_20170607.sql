use auction;
alter table mn_order add column orderType tinyint(4) not null default '1' comment "订单类型";
update mn_order set orderType = 1 where orderType is null;

create index user_id on mn_usermsglog(user_id);
create index msg_id on mn_usermsglog(msg_id);

create index msg_type on mn_message(msg_type);
create index push_type on mn_message(push_type);
create index user_id on mn_message(user_id);
create index msg_id on mn_message(msg_id);