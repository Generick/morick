alter table mn_biddingLogs add column `isHigh` tinyint(4) DEFAULT '0' COMMENT '是否为最高出价 0否 1是' after nowPrice;
alter table mn_auctionItems add column cappedPrice int(10) NOT NULL DEFAULT '0' COMMENT '封顶价' after lowestPremium;   
alter table mn_auctionItems drop referencePrice;
update mn_biddingLogs set isHigh = 0 where id not in (select id from (select MAX(id) as id from mn_biddingLogs GROUP BY auctionItemId) as a);