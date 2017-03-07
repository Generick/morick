<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-03-07 11:49:13 --> Severity: Parsing Error --> syntax error, unexpected '$quizUserList' (T_VARIABLE) F:\work\program\server\modules\prizesQuiz\A_prizesQuiz.php 41
ERROR - 2017-03-07 11:52:18 --> Severity: Notice --> Undefined variable: fields F:\work\program\server\modules\prizesQuiz\A_prizesQuiz.php 55
ERROR - 2017-03-07 11:52:18 --> Query error: Unknown column 'user_id' in 'where clause' - Invalid query: SELECT *
FROM `mn_prizesquiz`
WHERE `user_id` IS NULL
ERROR - 2017-03-07 11:53:31 --> Query error: Unknown column 'user_id' in 'where clause' - Invalid query: SELECT *
FROM `mn_prizesquiz`
WHERE `user_id` = '2'
ERROR - 2017-03-07 11:56:22 --> [My_Controller] A_prizesQuiz does not have this method: getPrizesList
ERROR - 2017-03-07 11:56:22 --> Severity: error --> Exception: [My_Controller] A_prizesQuiz does not have this method: getPrizesList F:\work\program\server\application\core\My_Controller.php 60
ERROR - 2017-03-07 11:56:46 --> 404 Page Not Found: prizesQuiz/PrizesQuiz/getPrizesList
ERROR - 2017-03-07 11:57:36 --> 404 Page Not Found: prizesQuiz/PrizesQuiz/getPrizesList
ERROR - 2017-03-07 11:57:51 --> 404 Page Not Found: prizesQuiz/PrizesQuiz/getPrizesList
ERROR - 2017-03-07 11:58:06 --> 404 Page Not Found: prizesQuiz/PrizesQuiz/getPrizesList
ERROR - 2017-03-07 11:59:03 --> Severity: error --> Exception: Unable to locate the model you have specified: M_prizeQuiz F:\work\program\server\system\core\Loader.php 377
ERROR - 2017-03-07 11:59:31 --> Query error: Column 'status' in where clause is ambiguous - Invalid query: SELECT `auction_id`, `startTime`, `goods_icon`, `goods_name`, `limitNum`, `currentNum`, `sum`, `mn_prizesquiz`.`status`
FROM `mn_prizesquiz`
JOIN `mn_auctionitems` ON `mn_prizesquiz`.`auction_id` = `mn_auctionitems`.`id`
WHERE `status` = '1'
ERROR - 2017-03-07 11:59:41 --> Query error: Column 'status' in where clause is ambiguous - Invalid query: SELECT `auction_id`, `startTime`, `goods_icon`, `goods_name`, `limitNum`, `currentNum`, `sum`, `mn_prizesquiz`.`status`
FROM `mn_prizesquiz`
JOIN `mn_auctionitems` ON `mn_prizesquiz`.`auction_id` = `mn_auctionitems`.`id`
WHERE `status` = '1'
ERROR - 2017-03-07 14:33:52 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/u_user.php:getSelfInfo:[]
ERROR - 2017-03-07 14:33:52 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":"055738e957297e65d05d6ce8e2fca3fe"}
ERROR - 2017-03-07 14:33:59 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/u_user.php:getSelfInfo:[]
ERROR - 2017-03-07 14:33:59 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":"055738e957297e65d05d6ce8e2fca3fe"}
ERROR - 2017-03-07 14:39:40 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_prizesQuiz/partakeQuiz	Params:{"auctionId":"2","quizPrice":"50"}
ERROR - 2017-03-07 14:39:40 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/prizesQuiz/U_prizesQuiz.php:partakeQuiz:{"auctionId":"2","quizPrice":"50"}
ERROR - 2017-03-07 14:39:49 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_prizesQuiz/partakeQuiz	Params:{"auctionId":"2","quizPrice":"50"}
ERROR - 2017-03-07 14:39:49 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/prizesQuiz/U_prizesQuiz.php:partakeQuiz:{"auctionId":"2","quizPrice":"50"}
ERROR - 2017-03-07 14:54:44 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 34
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-07 14:55:00 --> [methodError]:[验证码不存在！]:F:\work\program\server\application\controllers/account.php:login:{"userType":"1","platform":"5","platformId":"15877390225","password":"888"}
ERROR - 2017-03-07 14:55:12 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 49
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
ERROR - 2017-03-07 15:15:00 --> IP:::1	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_prizesQuiz/getQuizUserList	Params:{"auctionId":"2"}
ERROR - 2017-03-07 15:15:00 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/prizesQuiz/U_prizesQuiz.php:getQuizUserList:{"auctionId":"2"}
ERROR - 2017-03-07 15:16:02 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 15:16:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"43"}
ERROR - 2017-03-07 15:41:07 --> Query error: Column 'status' in where clause is ambiguous - Invalid query: SELECT `auction_id`, `startTime`, `goods_icon`, `goods_name`, `limitNum`, `currentNum`, `sum`, `mn_prizesquiz`.`status`
FROM `mn_prizesquiz`
JOIN `mn_auctionitems` ON `mn_prizesquiz`.`auction_id` = `mn_auctionitems`.`id`
WHERE `status` IS NULL
ERROR - 2017-03-07 15:45:21 --> 404 Page Not Found: Resources/bootstrap.css
ERROR - 2017-03-07 15:45:21 --> 404 Page Not Found: Resources/jquery.js
ERROR - 2017-03-07 15:45:26 --> 404 Page Not Found: Resources/jquery.js
ERROR - 2017-03-07 15:45:26 --> 404 Page Not Found: Resources/bootstrap.css
ERROR - 2017-03-07 15:46:03 --> 404 Page Not Found: Resources/jquery.js
ERROR - 2017-03-07 15:46:03 --> 404 Page Not Found: Resources/bootstrap.css
ERROR - 2017-03-07 16:28:48 --> Severity: Parsing Error --> syntax error, unexpected ',' F:\work\program\server\modules\prizesQuiz\prizesQuiz.php 26
ERROR - 2017-03-07 16:29:09 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:29:21 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:29:38 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:29:52 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:30:40 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:30:56 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 16:31:12 --> Severity: Notice --> Undefined variable: startTime F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 226
ERROR - 2017-03-07 17:04:12 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 17:04:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 17:04:31 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:06:10 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 17:15:13 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 17:15:20 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:21:27 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:22:18 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:22:21 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:22:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:24:39 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:25:13 --> Severity: Parsing Error --> syntax error, unexpected 'return' (T_RETURN) F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 246
ERROR - 2017-03-07 17:25:19 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:25:23 --> Severity: Parsing Error --> syntax error, unexpected 'return' (T_RETURN) F:\work\program\server\modules\prizesQuiz\M_prizesQuiz.php 246
ERROR - 2017-03-07 17:25:42 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:25:52 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"26"}
ERROR - 2017-03-07 17:25:54 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"26"}
ERROR - 2017-03-07 17:26:25 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"26"}
ERROR - 2017-03-07 17:27:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:31:53 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:32:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:33:59 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:34:41 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:35:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:36:31 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:41:17 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:41:19 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:41:21 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:41:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:41:40 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:42:49 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:42:51 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:43:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:43:19 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"43"}
ERROR - 2017-03-07 17:43:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"43"}
ERROR - 2017-03-07 17:45:00 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"43"}
ERROR - 2017-03-07 17:45:04 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"43"}
ERROR - 2017-03-07 17:45:16 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 17:45:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:48:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:48:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:48:27 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:49:59 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:50:12 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 17:50:13 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 17:50:16 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 17:51:11 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:52:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:53:08 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:53:10 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 17:53:52 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:00:23 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:01:28 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 18:04:03 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 18:10:27 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:10:45 --> Lack of param: auctionId
ERROR - 2017-03-07 18:10:45 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/prizesQuiz/prizesQuiz.php:getQuizInfo:{"itemId":"11"}
ERROR - 2017-03-07 18:10:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:14:02 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:14:04 --> Lack of param: itemId
ERROR - 2017-03-07 18:14:04 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:18:16 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:18:18 --> Lack of param: itemId
ERROR - 2017-03-07 18:18:18 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:21:01 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:21:02 --> Lack of param: itemId
ERROR - 2017-03-07 18:21:02 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:21:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:21:07 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:21:08 --> Lack of param: itemId
ERROR - 2017-03-07 18:21:08 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:21:39 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:21:40 --> Lack of param: itemId
ERROR - 2017-03-07 18:21:40 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:21:57 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:21:58 --> Lack of param: itemId
ERROR - 2017-03-07 18:21:58 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:23:08 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:23:09 --> Lack of param: itemId
ERROR - 2017-03-07 18:23:09 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:24:04 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:24:05 --> Lack of param: itemId
ERROR - 2017-03-07 18:24:05 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:24:58 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:24:59 --> Lack of param: itemId
ERROR - 2017-03-07 18:24:59 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:25:27 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:25:28 --> Lack of param: itemId
ERROR - 2017-03-07 18:25:28 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:26:05 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:26:06 --> Lack of param: itemId
ERROR - 2017-03-07 18:26:06 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:27:28 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:27:29 --> Lack of param: itemId
ERROR - 2017-03-07 18:27:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:27:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:27:46 --> Lack of param: itemId
ERROR - 2017-03-07 18:27:46 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:28:51 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:28:52 --> Lack of param: itemId
ERROR - 2017-03-07 18:28:52 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:29:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:29:15 --> Lack of param: itemId
ERROR - 2017-03-07 18:29:15 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:29:25 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:29:26 --> Lack of param: itemId
ERROR - 2017-03-07 18:29:26 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:29:30 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:30:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:34:25 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:34:25 --> Lack of param: auctionId
ERROR - 2017-03-07 18:34:25 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/prizesQuiz/prizesQuiz.php:getQuizInfo:{"itemId":"11"}
ERROR - 2017-03-07 18:34:29 --> Lack of param: auctionId
ERROR - 2017-03-07 18:34:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/prizesQuiz/prizesQuiz.php:getQuizInfo:{"itemId":"11"}
ERROR - 2017-03-07 18:34:29 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:35:32 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:35:32 --> Lack of param: itemId
ERROR - 2017-03-07 18:35:32 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:21 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:21 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:21 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:36:25 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:25 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:26 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:26 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:27 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:27 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:28 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:28 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:28 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:28 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:29 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:29 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:29 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:30 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:30 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:30 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:30 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:30 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:30 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:30 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:30 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:31 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:31 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:32 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:32 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:32 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:32 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:35 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:36:36 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:36 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:39 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:36:39 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:39 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:36:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:36:56 --> Lack of param: itemId
ERROR - 2017-03-07 18:36:56 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:37:04 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:37:04 --> Lack of param: itemId
ERROR - 2017-03-07 18:37:04 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:38:35 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:38:36 --> Lack of param: itemId
ERROR - 2017-03-07 18:38:36 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:46:18 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:46:20 --> Lack of param: itemId
ERROR - 2017-03-07 18:46:20 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:46:24 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 18:47:36 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 18:47:36 --> Lack of param: itemId
ERROR - 2017-03-07 18:47:36 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"23","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:47:38 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 18:52:15 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 18:52:16 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:16 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:19 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:19 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:19 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 18:52:25 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:25 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:26 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:26 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:27 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:27 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:28 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:28 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:29 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:29 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:45 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"1"}
ERROR - 2017-03-07 18:52:46 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:46 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"1","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:52:56 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"11"}
ERROR - 2017-03-07 18:52:57 --> Lack of param: itemId
ERROR - 2017-03-07 18:52:57 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"11","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:53:03 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"23"}
ERROR - 2017-03-07 18:53:07 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"49"}
ERROR - 2017-03-07 18:53:14 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-07 18:53:22 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-07 18:53:22 --> Lack of param: itemId
ERROR - 2017-03-07 18:53:22 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"48","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:53:25 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
ERROR - 2017-03-07 18:53:25 --> Query error: Unknown column 'sum' in 'field list' - Invalid query: SELECT `sum`
FROM `mn_auctionitems`
WHERE `auction_id` = '1'
ERROR - 2017-03-07 18:53:51 --> Lack of param: itemId
ERROR - 2017-03-07 18:53:51 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/Auction.php:getBiddingList:{"auctionId":"48","startIndex":"0","num":"5"}
ERROR - 2017-03-07 18:53:51 --> [methodError]:[]:F:\work\program\server\application\controllers/readLog/ReadLog.php:readWithType:{"readType":"1","readId":"48"}
