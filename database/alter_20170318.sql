alter table mn_quizuser modify column awardMoney float(10,2);

ALTER TABLE mn_prizesquiz change purchasePrice isDeal int(10) COMMENT '是否处理0未处理1已处理';