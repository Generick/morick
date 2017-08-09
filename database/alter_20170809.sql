use auction_test;
alter table mn_commodity add column videoURL text(0) default null;
alter table mn_order add column note text(0) default null;