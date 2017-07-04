use auction;
alter table mn_commodity add column annualized_return tinyint(4) default 20;
update mn_commodity set annualized_return = 20;