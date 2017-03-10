<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-03-10 09:27:52 --> [My_Controller] A_messagePush does not have this method: chackParam
ERROR - 2017-03-10 09:27:52 --> Severity: error --> Exception: [My_Controller] A_messagePush does not have this method: chackParam F:\work\program\server\application\core\My_Controller.php 60
ERROR - 2017-03-10 09:28:20 --> [My_Controller] A_messagePush does not have this method: chackParam
ERROR - 2017-03-10 09:28:20 --> Severity: error --> Exception: [My_Controller] A_messagePush does not have this method: chackParam F:\work\program\server\application\core\My_Controller.php 60
ERROR - 2017-03-10 09:32:47 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":"8b38cfb26c13d5efc2aad7cd8a1d42a3"}
ERROR - 2017-03-10 09:33:55 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":"8b38cfb26c13d5efc2aad7cd8a1d42a3"}
ERROR - 2017-03-10 09:34:21 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 09:41:25 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":"63735aa9cce3b203fa3baf5f02327beb"}
ERROR - 2017-03-10 09:57:14 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_prizesQuiz/getUserQuiz	Params:{"userId":"34"}
ERROR - 2017-03-10 09:57:14 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/prizesQuiz/U_prizesQuiz.php:getUserQuiz:{"userId":"34"}
ERROR - 2017-03-10 10:13:20 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 10:22:44 --> Query error: Unknown column 'pushType' in 'field list' - Invalid query: INSERT INTO `mn_message` (`msg_title`, `msg_content`, `msg_type`, `create_time`, `href_id`, `pushType`, `userId`) VALUES ('title', 'title', 0, 1489112564, 0, 0, 0)
ERROR - 2017-03-10 10:23:14 --> Query error: Unknown column 'userId' in 'field list' - Invalid query: INSERT INTO `mn_message` (`msg_title`, `msg_content`, `msg_type`, `create_time`, `href_id`, `push_type`, `userId`) VALUES ('title', 'title', 0, 1489112594, 0, 0, 0)
ERROR - 2017-03-10 10:25:54 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_messagePush/getUserMsgList	Params:{"userId":"1","startIndex":"0","num":"10"}
ERROR - 2017-03-10 10:25:54 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/messagePush/U_messagePush.php:getUserMsgList:{"userId":"1","startIndex":"0","num":"10"}
ERROR - 2017-03-10 10:26:22 --> Lack of param: userType
ERROR - 2017-03-10 10:26:22 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/account.php:login:[]
ERROR - 2017-03-10 10:27:03 --> Query error: Unknown column 'pushType' in 'where clause' - Invalid query: SELECT *
FROM `mn_message`
WHERE `pushType` !=0
AND `userId` =0
OR `user_id` = '1'
ORDER BY `create_time` desc
 LIMIT 10
ERROR - 2017-03-10 10:27:38 --> Query error: Unknown column 'userId' in 'where clause' - Invalid query: SELECT *
FROM `mn_message`
WHERE `push_type` !=0
AND `userId` =0
OR `user_id` = '1'
ORDER BY `create_time` desc
 LIMIT 10
ERROR - 2017-03-10 10:28:10 --> Query error: Table 'auction.mn_readlogs' doesn't exist - Invalid query: SELECT `msg_id`
FROM `mn_readlogs`
WHERE `user_id` = '1'
ERROR - 2017-03-10 10:54:32 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 10:54:40 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 10:54:42 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 10:55:01 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 14:31:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 14:31:15 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 14:32:19 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 15:07:58 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_prizesQuiz/getUserQuiz	Params:{"userId":"2"}
ERROR - 2017-03-10 15:07:58 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/prizesQuiz/U_prizesQuiz.php:getUserQuiz:{"userId":"2"}
ERROR - 2017-03-10 15:08:27 --> Severity: Notice --> Undefined variable: userId F:\work\program\server\modules\prizesQuiz\U_prizesQuiz.php 46
ERROR - 2017-03-10 15:08:27 --> Severity: Notice --> Array to string conversion F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:08:27 --> Severity: Notice --> Undefined variable: Array F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:08:27 --> Severity: Warning --> Invalid argument supplied for foreach() F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:09:39 --> Severity: Notice --> Array to string conversion F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:09:39 --> Severity: Notice --> Undefined variable: Array F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:09:39 --> Severity: Warning --> Invalid argument supplied for foreach() F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 317
ERROR - 2017-03-10 15:40:23 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 15:51:48 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 15:52:34 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 15:53:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"52"}
ERROR - 2017-03-10 15:53:04 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"53"}
ERROR - 2017-03-10 15:53:08 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-10 15:54:10 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-10 15:55:01 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 15:55:04 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 15:55:15 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 15:55:35 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 15:55:37 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"null"}
ERROR - 2017-03-10 16:03:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"null"}
ERROR - 2017-03-10 16:04:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:04:31 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"0"}
ERROR - 2017-03-10 16:04:31 --> [methodError]:[展品不存在！]:F:\work\program\server\application\controllers/auction/Auction.php:getAuctionAllInfo:{"itemId":"0"}
ERROR - 2017-03-10 16:04:54 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:06:31 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"0"}
ERROR - 2017-03-10 16:06:31 --> [methodError]:[展品不存在！]:F:\work\program\server\application\controllers/auction/Auction.php:getAuctionAllInfo:{"itemId":"0"}
ERROR - 2017-03-10 16:06:59 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:07:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:07:39 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:07:48 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:11:15 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:11:26 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:11:30 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:12:30 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:12:52 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:13:28 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"52"}
ERROR - 2017-03-10 16:13:37 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"50"}
ERROR - 2017-03-10 16:15:57 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:16:34 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"52"}
ERROR - 2017-03-10 16:17:01 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"52"}
ERROR - 2017-03-10 16:22:47 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"52"}
ERROR - 2017-03-10 16:22:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 16:49:30 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 16:51:24 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 16:55:15 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 17:20:41 --> [My_Model] M_prizesQuiz does not have this method: select_max
ERROR - 2017-03-10 17:20:41 --> Severity: error --> Exception: [My_Model] M_prizesQuiz does not have this method: select_max F:\work\program\server\application\core\My_Model.php 36
ERROR - 2017-03-10 17:21:02 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 329
ERROR - 2017-03-10 17:22:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"undefined"}
ERROR - 2017-03-10 17:22:13 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 327
ERROR - 2017-03-10 17:22:13 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 327
ERROR - 2017-03-10 17:22:16 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 327
ERROR - 2017-03-10 17:22:27 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 327
ERROR - 2017-03-10 17:22:27 --> Severity: Notice --> Undefined index: auction_id F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 327
ERROR - 2017-03-10 17:22:38 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:22:49 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:38:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:40:29 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:41:12 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:41:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:42:02 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:49:57 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:50:02 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:50:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:50:10 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:50:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:51:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:51:46 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:52:03 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:52:30 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:53:29 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:53:33 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 17:53:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 17:54:46 --> 404 Page Not Found: A_prizesQuiz/test
ERROR - 2017-03-10 17:58:49 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 17:59:04 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 18:02:24 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-10 18:03:02 --> Query error: In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column 'auction.mn_biddingLogs.id'; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
ORDER BY `createTime` desc
ERROR - 2017-03-10 18:03:06 --> Query error: In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column 'auction.mn_biddingLogs.id'; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
ORDER BY `createTime` desc
ERROR - 2017-03-10 18:03:50 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:04:42 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:04:54 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
 LIMIT 10
ERROR - 2017-03-10 18:05:20 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:05:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:05:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:06:07 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:06:59 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:07:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:07:08 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:07:53 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:08:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:09:19 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, `nowPrice`
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
 LIMIT 10
ERROR - 2017-03-10 18:10:16 --> Query error: Unknown column 'mn_.userId' in 'group statement' - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `mn_`.`userId`, `auctionItemId`
ERROR - 2017-03-10 18:10:33 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `userId`, `auctionItemId`
ORDER BY `createTime` desc
 LIMIT 10
ERROR - 2017-03-10 18:10:35 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:10:39 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:11:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:11:20 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"53"}
ERROR - 2017-03-10 18:11:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"49"}
ERROR - 2017-03-10 18:11:33 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:11:55 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"44"}
ERROR - 2017-03-10 18:11:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"44"}
ERROR - 2017-03-10 18:12:07 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"26"}
ERROR - 2017-03-10 18:12:17 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:13:55 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:13:57 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:09 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:20 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:26 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:30 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:41 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"55"}
ERROR - 2017-03-10 18:14:44 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:14:51 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:19:35 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:19:37 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:19:52 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:23:32 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:23:42 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:23:48 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:23:49 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-10 18:23:58 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:09 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:15 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:27 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:44 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:24:52 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:25:01 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"57"}
ERROR - 2017-03-10 18:25:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:25:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:25:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:26:25 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-10 18:26:34 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"51"}
ERROR - 2017-03-10 18:26:38 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"50"}
ERROR - 2017-03-10 18:26:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"45"}
ERROR - 2017-03-10 18:27:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-10 18:27:06 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-10 18:27:09 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
