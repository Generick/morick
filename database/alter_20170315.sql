use auction;
alter table mn_auctionItems add column isQuiz int(10) NOT NULL DEFAULT '0' COMMENT '是否参与竞猜' after cappedPrice;