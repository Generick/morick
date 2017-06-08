<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-06-07 16:41:53 --> Query error: Table 'auction.mn_usemsglog' doesn't exist - Invalid query: SELECT `msg_id`
FROM `mn_usemsglog`
WHERE `user_id` = '3'
ERROR - 2017-06-07 16:43:00 --> Query error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ')' at line 6 - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_message`
WHERE `user_id` =0
AND `push_type` =0
OR `user_id` = '3'
AND `msg_id` NOT IN()
ERROR - 2017-06-07 16:58:26 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/saleMeeting/A_saleMeeting.php:getCommodities:{"startIndex":"0","num":"10","is_up":"0"}
ERROR - 2017-06-07 17:07:36 --> IP:192.168.0.163	NOT ADMIN using this method! 	UserId:1	UserType:2	Method:U_messagePush/getUnReadMsg	Params:{"userId":"1","startIndex":"0","num":"10"}
ERROR - 2017-06-07 17:07:36 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/messagePush/U_messagePush.php:getUnReadMsg:{"userId":"1","startIndex":"0","num":"10"}
ERROR - 2017-06-07 17:14:23 --> Update order failed: 20170525117605
ERROR - 2017-06-07 17:14:23 --> Save order failed: 20170525117605
ERROR - 2017-06-07 17:14:42 --> Update order failed: 20170525117605
ERROR - 2017-06-07 17:14:42 --> Save order failed: 20170525117605
