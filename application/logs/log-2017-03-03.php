<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-03-03 09:44:28 --> Severity: Notice --> Undefined property: CUser::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 09:44:39 --> Severity: Notice --> Undefined property: CUser::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 09:56:01 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/bids/A_bids.php:getBidList:{"startIndex":"0","num":"10"}
ERROR - 2017-03-03 11:44:15 --> Severity: Notice --> Use of undefined constant PQ_AUCTION_ON - assumed 'PQ_AUCTION_ON' F:\work\program\server\modules\prizesQuiz\define\defines.php 9
ERROR - 2017-03-03 11:44:15 --> Severity: Notice --> Use of undefined constant PQ_REPEAT - assumed 'PQ_REPEAT' F:\work\program\server\modules\prizesQuiz\define\defines.php 10
ERROR - 2017-03-03 11:44:15 --> Severity: Notice --> Use of undefined constant PQ_BALANCE_NOT_ENOUGH - assumed 'PQ_BALANCE_NOT_ENOUGH' F:\work\program\server\modules\prizesQuiz\define\defines.php 11
ERROR - 2017-03-03 11:44:15 --> Severity: Notice --> Use of undefined constant PQ_NUM_FULL - assumed 'PQ_NUM_FULL' F:\work\program\server\modules\prizesQuiz\define\defines.php 12
ERROR - 2017-03-03 11:58:04 --> Severity: Notice --> Use of undefined constant PQ_AUCTION_ON - assumed 'PQ_AUCTION_ON' F:\work\program\server\modules\prizesQuiz\define\defines.php 9
ERROR - 2017-03-03 11:58:04 --> Severity: Notice --> Use of undefined constant PQ_REPEAT - assumed 'PQ_REPEAT' F:\work\program\server\modules\prizesQuiz\define\defines.php 10
ERROR - 2017-03-03 11:58:04 --> Severity: Notice --> Use of undefined constant PQ_BALANCE_NOT_ENOUGH - assumed 'PQ_BALANCE_NOT_ENOUGH' F:\work\program\server\modules\prizesQuiz\define\defines.php 11
ERROR - 2017-03-03 11:58:04 --> Severity: Notice --> Use of undefined constant PQ_NUM_FULL - assumed 'PQ_NUM_FULL' F:\work\program\server\modules\prizesQuiz\define\defines.php 12
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 11:59:53 --> Severity: Notice --> Undefined property: CAuction::$isVIP F:\work\program\server\application\core\classbase.php 229
ERROR - 2017-03-03 15:28:15 --> [methodError]:[订单不存在！]:F:\work\program\server\application\controllers/order/A_order.php:operateOrder:{"order_no":"","type":""}
ERROR - 2017-03-03 16:18:41 --> Severity: Notice --> Undefined variable: status F:\work\program\server\modules\order\M_order.php 314
ERROR - 2017-03-03 16:47:03 --> Severity: Notice --> Undefined variable: status F:\work\program\server\modules\order\M_order.php 314
ERROR - 2017-03-03 17:10:11 --> Severity: Notice --> Undefined variable: status F:\work\program\server\modules\order\M_order.php 314
ERROR - 2017-03-03 17:18:39 --> 404 Page Not Found: Resources/bootstrap.css
ERROR - 2017-03-03 17:18:39 --> 404 Page Not Found: Resources/jquery.js
ERROR - 2017-03-03 17:28:48 --> Severity: Notice --> Undefined variable: status F:\work\program\server\modules\order\M_order.php 314
ERROR - 2017-03-03 17:29:22 --> Severity: Notice --> Undefined variable: status F:\work\program\server\modules\order\M_order.php 314
ERROR - 2017-03-03 18:01:52 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'auction.mn_biddingLogs.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `id`, `auctionItemId`, `userId`, `createTime`, max(nowPrice) as nowPrice
FROM `mn_biddingLogs`
WHERE `userId` = 48
GROUP BY `auctionItemId`
ORDER BY `createTime` desc
 LIMIT 10
ERROR - 2017-03-03 18:05:57 --> [methodError]:[]:F:\work\program\server\application\controllers/auction/A_auction.php:releaseAuctionItem:{"goodsId":"52","initialPrice":"0","lowestPremium":"1","margin":"0","startTime":"2017-03-03 18:05:33","endTime":"2017-03-10 18:05:33","cappedPrice":"13","isVIP":"0"}
ERROR - 2017-03-03 18:23:04 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/auction/A_auction.php:getAuctionItems:{"startIndex":"0","num":"10","isVIP":"0"}
