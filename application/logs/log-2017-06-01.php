<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-06-01 10:27:23 --> Severity: Notice --> Undefined variable: arr F:\work\program\server\modules\saleMeeting\A_saleMeeting.php 25
ERROR - 2017-06-01 10:31:31 --> Severity: Notice --> Undefined variable: tis F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 38
ERROR - 2017-06-01 10:31:31 --> Severity: Error --> Call to a member function getCommodityInfo() on null F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 38
ERROR - 2017-06-01 10:54:23 --> Severity: Parsing Error --> syntax error, unexpected '->' (T_OBJECT_OPERATOR), expecting ')' F:\work\program\server\modules\saleMeeting\SaleMeeting.php 27
ERROR - 2017-06-01 10:54:41 --> Severity: Notice --> Undefined property: saleMeeting::$saleMeeting F:\work\program\server\modules\saleMeeting\SaleMeeting.php 46
ERROR - 2017-06-01 10:54:41 --> Severity: Error --> Call to a member function getTMHList() on null F:\work\program\server\modules\saleMeeting\SaleMeeting.php 46
ERROR - 2017-06-01 10:55:02 --> Query error: Column 'is_delete' in where clause is ambiguous - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_sale_meeting`
JOIN `mn_commodity` ON `mn_sale_meeting`.`commodity_id` = `mn_commodity`.`id`
WHERE `is_delete` =0
ERROR - 2017-06-01 10:55:24 --> Severity: Notice --> Undefined variable: tis F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 194
ERROR - 2017-06-01 10:55:24 --> Severity: Notice --> Trying to get property of non-object F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 194
ERROR - 2017-06-01 10:55:24 --> Severity: Warning --> Cannot modify header information - headers already sent by (output started at F:\work\program\server\modules\saleMeeting\M_saleMeeting.php:194) F:\work\program\server\system\core\Common.php 573
ERROR - 2017-06-01 10:55:24 --> Severity: Error --> Call to a member function order_by() on null F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 194
ERROR - 2017-06-01 11:07:53 --> Severity: Notice --> Undefined variable: modCommodity F:\work\program\server\modules\saleMeeting\M_saleMeeting.php 104
ERROR - 2017-06-01 11:09:03 --> Severity: Notice --> Array to string conversion F:\work\program\server\system\database\DB_driver.php 1525
ERROR - 2017-06-01 11:09:03 --> Query error: Unknown column 'Array' in 'field list' - Invalid query: UPDATE `mn_commodity` SET `commodity_name` = 'new name mod', `commodity_desc` = 'new desc', `commodity_detail` = 'new detail', `commodity_price` = 100, `stock_num` = 5000, `commodity_pic` = Array
WHERE `id` = '2'
ERROR - 2017-06-01 11:13:46 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:13:46 --> Unable to select database: auction
ERROR - 2017-06-01 11:14:06 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:14:06 --> Unable to select database: auction
ERROR - 2017-06-01 11:14:15 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:14:15 --> Unable to select database: auction
ERROR - 2017-06-01 11:14:31 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:14:31 --> Unable to select database: auction
ERROR - 2017-06-01 11:14:35 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:14:35 --> Unable to select database: auction
ERROR - 2017-06-01 11:15:02 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:15:02 --> Unable to select database: auction
ERROR - 2017-06-01 11:15:18 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-06-01 11:15:18 --> Unable to select database: auction
ERROR - 2017-06-01 17:18:44 --> Severity: Warning --> json_decode() expects parameter 1 to be string, array given F:\work\program\server\modules\saleMeeting\A_saleMeeting.php 28
ERROR - 2017-06-01 17:18:52 --> Severity: Warning --> json_decode() expects parameter 1 to be string, array given F:\work\program\server\modules\saleMeeting\A_saleMeeting.php 28
ERROR - 2017-06-01 17:20:23 --> Severity: Warning --> json_decode() expects parameter 1 to be string, array given F:\work\program\server\modules\saleMeeting\A_saleMeeting.php 28
ERROR - 2017-06-01 17:21:53 --> Query error: Unknown column 'commodity_num' in 'field list' - Invalid query: INSERT INTO `mn_commodity` (`commodity_name`, `commodity_desc`, `commodity_detail`, `commodity_price`, `commodity_pic`, `commodity_num`, `add_time`) VALUES ('asd', 'qweqweqw', '<img style=\"width:100%;\" src=\"http://meeno.f3322.net:8082/auction/uploads/photo/1496308896_592fdca089170.jpg\" /><img style=\"width:100%;\" src=\"http://meeno.f3322.net:8082/auction/uploads/photo/1496308900_592fdca468e7a.jpg\" />', 3, '\"[\\\"http:\\/\\/meeno.f3322.net:8082\\/auction\\/uploads\\/photo\\/1496308889_592fdc997e6ce.jpg\\\",\\\"http:\\/\\/meeno.f3322.net:8082\\/auction\\/uploads\\/photo\\/1496308889_592fdc99a1463.jpg\\\"]\"', 42, 1496308913)
ERROR - 2017-06-01 17:43:54 --> IP:::1	NOT ADMIN using this method! 	UserId:10127	UserType:3	Method:A_saleMeeting/commodityDelRec	Params:{"startIndex":"0","num":"10","startTime":"","endTime":""}
ERROR - 2017-06-01 17:43:54 --> [methodError]:[权限不正确！]:F:\work\program\server\application\controllers/saleMeeting/A_saleMeeting.php:commodityDelRec:{"startIndex":"0","num":"10","startTime":"","endTime":""}
ERROR - 2017-06-01 18:35:46 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/saleMeeting/A_saleMeeting.php:getCommodityInfo:{"id":"1"}
ERROR - 2017-06-01 18:36:53 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/saleMeeting/A_saleMeeting.php:getCommodityInfo:{"id":"13"}
