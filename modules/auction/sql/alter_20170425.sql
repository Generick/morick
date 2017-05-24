use auction;
alter table mn_biddingLogs add column note text(0) COMMENT '竞拍记录备注' after createTime;