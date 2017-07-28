<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-07-27 09:31:02 --> user:15balance change. the transactionType:12before:20.50 after:20.50
ERROR - 2017-07-27 09:31:03 --> Update user failed: 15
ERROR - 2017-07-27 09:31:03 --> Save user failed: 15
ERROR - 2017-07-27 09:31:05 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-27 09:31:05 --> continue pay order params:-------->{"order_no":"wx20170727620264","userId":"15","deliveryType":"0","orderTime":"1501119029","goodsPrice":"6666667","payPrice":6867282,"orderType":2,"orderStatus":1,"payType":"11","buyNum":"1"}
ERROR - 2017-07-27 09:57:26 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"52"}
ERROR - 2017-07-27 09:57:32 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"52"}
ERROR - 2017-07-27 09:58:44 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"800","condition_rate":"8"}
ERROR - 2017-07-27 09:58:48 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"800","condition_rate":"8"}
ERROR - 2017-07-27 09:58:57 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"800","condition_rate":"8"}
ERROR - 2017-07-27 10:02:23 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"900","condition_rate":"9"}
ERROR - 2017-07-27 10:02:26 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"900","condition_rate":"9"}
ERROR - 2017-07-27 10:04:55 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '1500516260 and `orderTime` <= 1500689064
AND `userId` IN('15')' at line 3 - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_order`
WHERE `orderStatus` not in (0,1) and `orderType` = `2and orderTime >=` 1500516260 and `orderTime` <= 1500689064
AND `userId` IN('15')
ERROR - 2017-07-27 10:05:33 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')' at line 3 - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_order`
WHERE `orderStatus` not in (0,1) and `orderType` = `2and orderTime >=` 1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')
ERROR - 2017-07-27 10:07:48 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')' at line 3 - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_order`
WHERE `orderStatus` not in (0,1) and `orderType` = `2and orderTime >=` 1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')
ERROR - 2017-07-27 10:09:27 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')' at line 3 - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_order`
WHERE `orderStatus` not in (0,1) and `orderType` = `2and orderTime >=` 1500516296 and `orderTime` <= 1500689098
AND `userId` IN('15')
ERROR - 2017-07-27 10:39:33 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"52"}
ERROR - 2017-07-27 10:39:36 --> Query error: Column 'userId' in field list is ambiguous - Invalid query: SELECT `userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '52'
ORDER BY `registerTime` desc
 LIMIT 10
ERROR - 2017-07-27 10:39:45 --> Query error: Column 'userId' in field list is ambiguous - Invalid query: SELECT `userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
ORDER BY `registerTime` desc
 LIMIT 10
ERROR - 2017-07-27 10:40:07 --> Query error: Column 'userId' in field list is ambiguous - Invalid query: SELECT `userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
ORDER BY `registerTime` desc
 LIMIT 10
ERROR - 2017-07-27 10:40:16 --> Query error: Column 'userId' in field list is ambiguous - Invalid query: SELECT `userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
ORDER BY `registerTime` desc
 LIMIT 10
ERROR - 2017-07-27 10:40:54 --> Severity: Parsing Error --> syntax error, unexpected '}', expecting variable (T_VARIABLE) or '$' F:\work\program\server\modules\promoter\M_promoter.php 351
ERROR - 2017-07-27 10:40:55 --> Severity: Parsing Error --> syntax error, unexpected '}', expecting variable (T_VARIABLE) or '$' F:\work\program\server\modules\promoter\M_promoter.php 351
ERROR - 2017-07-27 10:40:57 --> Severity: Parsing Error --> syntax error, unexpected '}', expecting variable (T_VARIABLE) or '$' F:\work\program\server\modules\promoter\M_promoter.php 351
ERROR - 2017-07-27 10:41:00 --> Severity: Parsing Error --> syntax error, unexpected '}', expecting variable (T_VARIABLE) or '$' F:\work\program\server\modules\promoter\M_promoter.php 351
ERROR - 2017-07-27 10:41:45 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"52"}
ERROR - 2017-07-27 11:06:00 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '.`userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`use' at line 1 - Invalid query: SELECT `distinct` `user`.`userId`
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
ORDER BY `registerTime` desc
 LIMIT 10
ERROR - 2017-07-27 11:09:27 --> Query error: Duplicate column name 'userId' - Invalid query: SELECT COUNT(*) AS `numrows`
FROM (
SELECT DISTINCT *
FROM `mn_user`
JOIN `mn_order` ON `mn_order`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
) CI_count_all_results
ERROR - 2017-07-27 14:14:48 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"52"}
ERROR - 2017-07-27 14:14:53 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"46"}
ERROR - 2017-07-27 14:15:01 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-27 14:15:01 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT *
FROM `mn_user_order_statistics`
WHERE `userId` = `Array`
ERROR - 2017-07-27 14:15:25 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-27 14:15:25 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT *
FROM `mn_user_order_statistics`
WHERE `userId` = `Array`
ERROR - 2017-07-27 14:34:41 --> 404 Page Not Found: Resources/bootstrap.css
ERROR - 2017-07-27 14:34:41 --> 404 Page Not Found: Resources/jquery.js
ERROR - 2017-07-27 14:47:00 --> Severity: Parsing Error --> syntax error, unexpected ';', expecting ')' F:\work\program\server\modules\promoter\M_promoter.php 342
ERROR - 2017-07-27 14:47:14 --> Severity: Parsing Error --> syntax error, unexpected ';', expecting ')' F:\work\program\server\modules\promoter\M_promoter.php 342
ERROR - 2017-07-27 14:47:57 --> Severity: Parsing Error --> syntax error, unexpected ';', expecting ')' F:\work\program\server\modules\promoter\M_promoter.php 342
ERROR - 2017-07-27 14:50:17 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '`{$p}`
 LIMIT 10' at line 5 - Invalid query: SELECT `mn_user`.`userId`
FROM `mn_user`
JOIN `mn_user_order_statistics` ON `mn_user_order_statistics`.`userId` = `mn_user`.`userId`
WHERE `PMTID` = '41'
ORDER BY `mn_user_order_statistics`.`orderSumMoney` `{$p}`
 LIMIT 10
ERROR - 2017-07-27 14:57:38 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-27 14:57:38 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT *
FROM `mn_user_order_statistics`
WHERE `userId` = `Array`
