<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-07-18 11:03:46 --> [createNormalUser] User already exists!!!
ERROR - 2017-07-18 11:03:46 --> [methodError]:[用户已存在!]:F:\work\program\server\application\controllers/promoter/A_promoter.php:addPromoter:{"name":"test","telephone":"t001","password":"123456"}
ERROR - 2017-07-18 11:07:39 --> [My_Model] M_promoter does not have this method: createNormalPMT
ERROR - 2017-07-18 11:07:39 --> Severity: error --> Exception: [My_Model] M_promoter does not have this method: createNormalPMT F:\work\program\server\application\core\My_Model.php 36
ERROR - 2017-07-18 11:08:51 --> Query error: Unknown column 'accountName' in 'field list' - Invalid query: INSERT INTO `mn_pmt` (`userId`, `name`, `registerTime`, `accountName`) VALUES (40, 'test', 1500347331, 't001')
ERROR - 2017-07-18 11:11:45 --> Error not found: 
ERROR - 2017-07-18 11:11:45 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:12:54 --> Error not found: 
ERROR - 2017-07-18 11:12:54 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:13:03 --> Error not found: 
ERROR - 2017-07-18 11:13:03 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:14:08 --> Error not found: 
ERROR - 2017-07-18 11:14:08 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:14:59 --> Severity: Parsing Error --> syntax error, unexpected ':' F:\work\program\server\modules\promoter\M_promoter.php 215
ERROR - 2017-07-18 11:15:12 --> Error not found: 
ERROR - 2017-07-18 11:15:12 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:15:57 --> Error not found: 
ERROR - 2017-07-18 11:15:57 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":"41"}
ERROR - 2017-07-18 11:28:31 --> Query error: Duplicate entry '41' for key 'userId' - Invalid query: INSERT INTO `mn_prompt_condition` (`userId`, `condition_money`, `condition_rate`, `add_time`) VALUES ('41', '5000', '5', 1500348511)
ERROR - 2017-07-18 11:30:09 --> Severity: Notice --> Undefined variable: id F:\work\program\server\modules\promoter\A_promoter.php 174
ERROR - 2017-07-18 11:30:09 --> [methodError]:[没有此分成条件。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminDelCondition:{"id":"3"}
ERROR - 2017-07-18 11:31:37 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"41","condition_money":"2000","condition_rate":"2"}
ERROR - 2017-07-18 11:33:30 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"userId":"41","startIndex":"0","num":"10","startTime":"","endTime":""}
ERROR - 2017-07-18 14:47:56 --> Severity: Notice --> Undefined variable: ids F:\work\program\server\modules\promoter\M_promoter.php 260
ERROR - 2017-07-18 14:47:56 --> Severity: Warning --> Invalid argument supplied for foreach() F:\work\program\server\modules\promoter\M_promoter.php 260
ERROR - 2017-07-18 14:48:30 --> Severity: Warning --> Missing argument 2 for M_user::getUserObj(), called in F:\work\program\server\modules\promoter\M_promoter.php on line 270 and defined F:\work\program\server\application\models\M_user.php 112
ERROR - 2017-07-18 14:48:30 --> Severity: Notice --> Undefined variable: userId F:\work\program\server\application\models\M_user.php 114
ERROR - 2017-07-18 14:48:30 --> Severity: Notice --> Undefined variable: userId F:\work\program\server\application\models\M_user.php 120
ERROR - 2017-07-18 14:48:30 --> Severity: Notice --> Undefined variable: userId F:\work\program\server\application\models\M_user.php 138
ERROR - 2017-07-18 14:48:30 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-18 14:48:30 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT `orderTime`
FROM `mn_order`
WHERE `userId` = `Array`
ORDER BY `orderTime` desc
ERROR - 2017-07-18 14:48:30 --> Severity: Warning --> Cannot modify header information - headers already sent by (output started at F:\work\program\server\system\core\Exceptions.php:272) F:\work\program\server\system\core\Common.php 573
ERROR - 2017-07-18 14:49:02 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-18 14:49:02 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT `orderTime`
FROM `mn_order`
WHERE `userId` = `Array`
ORDER BY `orderTime` desc
ERROR - 2017-07-18 14:49:40 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_query_builder.php 669
ERROR - 2017-07-18 14:49:40 --> Query error: Unknown column 'Array' in 'where clause' - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_order`
WHERE `userId` = `Array`
ERROR - 2017-07-18 14:50:47 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')' at line 3 - Invalid query: SELECT SUM(`payPrice`) AS `payPrice`
FROM `mn_order`
WHERE `userId` = 15 and `orderStatus` not in (0,)
ERROR - 2017-07-18 14:52:17 --> [createNormalUser] User already exists!!!
ERROR - 2017-07-18 14:52:17 --> [methodError]:[用户已存在!]:F:\work\program\server\application\controllers/promoter/A_promoter.php:addPromoter:{"telephone":"13790389089","password":"tuiguang","name":"tuiguang"}
ERROR - 2017-07-18 14:59:02 --> Error not found: 
ERROR - 2017-07-18 14:59:02 --> [methodError]:[]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"userId":"41","startIndex":"0","num":"10","startTime":"","endTime":""}
ERROR - 2017-07-18 14:59:30 --> Severity: Parsing Error --> syntax error, unexpected 'return' (T_RETURN), expecting function (T_FUNCTION) F:\work\program\server\modules\promoter\M_promoter.php 353
ERROR - 2017-07-18 15:53:57 --> Severity: Notice --> Undefined variable: check_time F:\work\program\server\modules\promoter\M_promoter.php 230
ERROR - 2017-07-18 15:53:57 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'and `orderStatus` not in (0,1)' at line 3 - Invalid query: SELECT `payPrice`
FROM `mn_order`
WHERE `userId` = 15 and `orderTime` >  and `orderStatus` not in (0,1)
ERROR - 2017-07-18 15:54:33 --> Severity: Notice --> Undefined variable: check_time F:\work\program\server\modules\promoter\M_promoter.php 230
ERROR - 2017-07-18 15:54:33 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'and `orderStatus` not in (0,1)' at line 3 - Invalid query: SELECT `payPrice`
FROM `mn_order`
WHERE `userId` = 15 and `orderTime` >  and `orderStatus` not in (0,1)
ERROR - 2017-07-18 16:01:51 --> [My_Model] M_promoter does not have this method: getIP
ERROR - 2017-07-18 16:01:51 --> Severity: error --> Exception: [My_Model] M_promoter does not have this method: getIP F:\work\program\server\application\core\My_Model.php 36
ERROR - 2017-07-18 16:29:30 --> 404 Page Not Found: Loginhtml/index
ERROR - 2017-07-18 16:35:37 --> Severity: Notice --> Undefined variable: SERVER F:\work\program\server\modules\promoter\M_promoter.php 143
ERROR - 2017-07-18 16:35:37 --> Severity: Notice --> Undefined variable: SERVER F:\work\program\server\modules\promoter\M_promoter.php 143
ERROR - 2017-07-18 16:35:37 --> Severity: Notice --> Undefined variable: SERVER F:\work\program\server\modules\promoter\M_promoter.php 143
ERROR - 2017-07-18 19:01:00 --> Lack of param: userId
ERROR - 2017-07-18 19:01:00 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"condition_money":"100","condition_rate":"5"}
ERROR - 2017-07-18 19:08:13 --> Lack of param: userId
ERROR - 2017-07-18 19:08:13 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterConditions:{"startIndex":"0","num":"0"}
ERROR - 2017-07-18 19:09:04 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"43","condition_money":"700","condition_rate":"20"}
ERROR - 2017-07-18 19:10:38 --> Lack of param: userId
ERROR - 2017-07-18 19:10:38 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterConditions:[]
ERROR - 2017-07-18 19:21:54 --> [methodError]:[分成参数错误。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:adminAddCondition:{"userId":"43","condition_money":"3300","condition_rate":"33"}
ERROR - 2017-07-18 19:39:50 --> Lack of param: userId
ERROR - 2017-07-18 19:39:50 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterConditions:{"startIndex":"0","num":"0"}
ERROR - 2017-07-18 19:40:02 --> Lack of param: userId
ERROR - 2017-07-18 19:40:02 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterConditions:{"startIndex":"0","num":"0"}
ERROR - 2017-07-18 20:43:30 --> [methodError]:[没有此推广员。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getPromoterInfo:{"userId":""}
ERROR - 2017-07-18 20:44:57 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"43"}
ERROR - 2017-07-18 20:45:11 --> [methodError]:[您还没有好友。]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriendsOrders:{"startIndex":"0","num":"10","userId":"42"}
ERROR - 2017-07-18 21:18:55 --> Lack of param: startIndex
ERROR - 2017-07-18 21:18:55 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/promoter/A_promoter.php:getFriends:{"num":"10","userId":"41"}
