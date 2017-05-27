use auction;
alter table mn_user add column sms_obtain_status tinyint(4) default 1 comment "获拍短信提醒开关"after registerTime;
alter table mn_user add column sms_beyond_status tinyint(4) default 1 comment "超价短信提醒开关" after sms_obtain_status;
alter table mn_user add column sms_over_status tinyint(4) default 1 comment "截拍短信提醒开关" after sms_beyond_status;
alter table mn_user add column deposit_cash float(10,2) default 0 comment "个人保证金" after sms_over_status;
alter table mn_prizesquiz add column isDeal tinyint(4) default 0 comment "是否处理";