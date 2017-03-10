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
