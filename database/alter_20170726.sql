use auction;
alter table mn_commodity add column pos int(11) default 1;
alter table mn_user add column remark text(0) default '';