<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-07-11 14:23:33 --> Severity: Warning --> mysql_query(): MySQL server has gone away F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 14:23:33 --> Severity: Warning --> mysql_query(): Error reading result set's header F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 14:23:33 --> Query error: MySQL server has gone away - Invalid query: SELECT *
FROM `mn_passport`
WHERE `platform` = '5'
AND `platformId` = '15877390255'
ERROR - 2017-07-11 14:25:33 --> Severity: Warning --> mysql_query(): MySQL server has gone away F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 14:25:33 --> Severity: Warning --> mysql_query(): Error reading result set's header F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 14:25:33 --> Query error: MySQL server has gone away - Invalid query: UPDATE `mn_passport` SET `token` = '2f00cc782c38d433409604586027a1f0', `tokenEndTime` = 1500618324
WHERE `platform` = '5'
AND `platformId` = '15877390255'
ERROR - 2017-07-11 14:26:50 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:26:50 --> Unable to select database: auction
ERROR - 2017-07-11 14:28:54 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:28:54 --> Unable to select database: auction
ERROR - 2017-07-11 14:29:27 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:29:27 --> Unable to select database: auction
ERROR - 2017-07-11 14:30:34 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:30:34 --> Unable to select database: auction
ERROR - 2017-07-11 14:31:09 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:31:09 --> Unable to select database: auction
ERROR - 2017-07-11 14:31:42 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:31:42 --> Unable to select database: auction
ERROR - 2017-07-11 14:32:11 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:32:11 --> Unable to select database: auction
ERROR - 2017-07-11 14:32:42 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:32:42 --> Unable to select database: auction
ERROR - 2017-07-11 14:35:25 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:35:25 --> Unable to select database: auction
ERROR - 2017-07-11 14:37:24 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:37:24 --> Unable to select database: auction
ERROR - 2017-07-11 14:37:56 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 14:37:56 --> Unable to select database: auction
ERROR - 2017-07-11 15:10:56 --> Severity: Warning --> mysql_query(): MySQL server has gone away F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 15:10:56 --> Severity: Warning --> mysql_query(): Error reading result set's header F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 15:10:56 --> Query error: MySQL server has gone away - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_sale_meeting`
JOIN `mn_commodity` ON `mn_sale_meeting`.`commodity_id` = `mn_commodity`.`id`
WHERE `mn_sale_meeting`.`is_delete` =0
AND `mn_commodity`.`is_up` = 1
ERROR - 2017-07-11 15:22:43 --> Severity: Warning --> mysql_query(): MySQL server has gone away F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 15:22:43 --> Severity: Warning --> mysql_query(): Error reading result set's header F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 262
ERROR - 2017-07-11 15:22:43 --> Query error: MySQL server has gone away - Invalid query: SELECT COUNT(*) AS `numrows`
FROM `mn_sale_meeting`
JOIN `mn_commodity` ON `mn_sale_meeting`.`commodity_id` = `mn_commodity`.`id`
WHERE `mn_sale_meeting`.`is_delete` =0
AND `mn_commodity`.`is_up` = 1
ERROR - 2017-07-11 15:59:52 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 15:59:52 --> Update user failed: 15
ERROR - 2017-07-11 15:59:52 --> Save user failed: 15
ERROR - 2017-07-11 16:01:37 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:01:38 --> Update user failed: 15
ERROR - 2017-07-11 16:01:38 --> Save user failed: 15
ERROR - 2017-07-11 16:05:18 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:05:18 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711160518","traceNO":"wx20170711345082","requestAmount":1,"paymentCount":1,"payment_1":"6_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"orderId%3Dwx20170711345082","sign":"2dc6bc94ad67803c61253757f2ff32a279ab1dc88f887a801654ac23144a3326"}
ERROR - 2017-07-11 16:05:19 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:05:19 --> Update user failed: 15
ERROR - 2017-07-11 16:05:19 --> Save user failed: 15
ERROR - 2017-07-11 16:07:37 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u79e6\u7687\u5c9b\u5e02\",\"district\":\"\u5c71\u6d77\u5173\u533a\",\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"13196352342\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":\"1\"}"}
ERROR - 2017-07-11 16:07:51 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:07:51 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711160751","traceNO":"wx20170711389766","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711389766","sign":"d640dbba11e3d48ff97ebed3d7e1cbea170f0c3d43e459c3882210ab029b9ad4"}
ERROR - 2017-07-11 16:07:52 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:07:53 --> Update user failed: 15
ERROR - 2017-07-11 16:07:53 --> Save user failed: 15
ERROR - 2017-07-11 16:10:33 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:10:33 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711161033","traceNO":"wx20170711869079","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711869079","sign":"c75869bcc1d8555826c21923639e5380fae9eb65916b93f83eeabde6b4f712a2"}
ERROR - 2017-07-11 16:10:34 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:10:34 --> Update user failed: 15
ERROR - 2017-07-11 16:10:34 --> Save user failed: 15
ERROR - 2017-07-11 16:12:05 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:12:05 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711161205","traceNO":"wx20170711181817","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711181817","sign":"236e4468977c8e465f6bf6f2a16dd3107aca6145c5fd692bffc067b7c8f252bc"}
ERROR - 2017-07-11 16:12:05 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:12:06 --> Update user failed: 15
ERROR - 2017-07-11 16:12:06 --> Save user failed: 15
ERROR - 2017-07-11 16:12:33 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/order/U_order.php:getOrderInfo:{"order_no":"wx20170711181817"}
ERROR - 2017-07-11 16:12:33 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":""}
ERROR - 2017-07-11 16:12:34 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/order/U_order.php:getOrderInfo:{"order_no":"wx20170711181817"}
ERROR - 2017-07-11 16:12:34 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":""}
ERROR - 2017-07-11 16:12:35 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/order/U_order.php:getOrderInfo:{"order_no":"wx20170711181817"}
ERROR - 2017-07-11 16:12:36 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":""}
ERROR - 2017-07-11 16:13:25 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:13:25 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711161325","traceNO":"wx20170711644841","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711644841","sign":"d5d6be4d8b5cfaa34ad2d99900dce05d9b9f5154eac3f0c174560c3cde749305"}
ERROR - 2017-07-11 16:13:26 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:13:27 --> Update user failed: 15
ERROR - 2017-07-11 16:13:27 --> Save user failed: 15
ERROR - 2017-07-11 16:18:42 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:18:42 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711161842","traceNO":"wx20170711785246","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711785246","sign":"f93730ece3c64cc910f2553627aa2dfc64e30087ce83d1a2daf9a08267843736"}
ERROR - 2017-07-11 16:18:42 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:18:43 --> Update user failed: 15
ERROR - 2017-07-11 16:18:43 --> Save user failed: 15
ERROR - 2017-07-11 16:30:13 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:30:13 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163013","traceNO":"wx20170711696680","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711696680","sign":"4f2efc27b1cb0e2631a0604424afaa4068d98ff65569d4a92dff7083a28ec390"}
ERROR - 2017-07-11 16:30:14 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:30:14 --> Update user failed: 15
ERROR - 2017-07-11 16:30:14 --> Save user failed: 15
ERROR - 2017-07-11 16:31:02 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:31:02 --> continue pay order params:-------->{"order_no":"wx20170711696680","userId":"15","deliveryType":"0","orderTime":"1499759843","goodsPrice":"1","payPrice":1,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"1"}
ERROR - 2017-07-11 16:31:02 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:31:02 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163102","traceNO":"wx20170711696680","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711696680","sign":"e5f1469b5549d1a99cf45289de357907e56cc5c97b2226cf8b8c5022d86faa8f"}
ERROR - 2017-07-11 16:31:21 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"province\":\"\u5c71\u897f\u7701\",\"city\":\"\u957f\u6cbb\u5e02\",\"district\":\"\u957f\u6cbb\u53bf\",\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"13196352342\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":\"1\"}"}
ERROR - 2017-07-11 16:32:53 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:32:53 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163253","traceNO":"wx20170711492342","requestAmount":1999834,"paymentCount":1,"payment_1":"5_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711492342","sign":"365a9941abb70140211d6075df3047e40582b12c204129bf9c0e747acc06d360"}
ERROR - 2017-07-11 16:32:54 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:32:54 --> Update user failed: 15
ERROR - 2017-07-11 16:32:54 --> Save user failed: 15
ERROR - 2017-07-11 16:33:04 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"province\":\"\u5317\u4eac\u5e02\",\"city\":\"\u53bf\",\"district\":\"\u5bc6\u4e91\u53bf\",\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"13196352342\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":\"1\"}"}
ERROR - 2017-07-11 16:33:10 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:33:10 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163310","traceNO":"wx20170711925779","requestAmount":1999834,"paymentCount":1,"payment_1":"5_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711925779","sign":"2caa050a8691ce8ffb9bd392dfb9e3b42193c276b1b250865d569089d8f0e591"}
ERROR - 2017-07-11 16:33:11 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:33:11 --> Update user failed: 15
ERROR - 2017-07-11 16:33:11 --> Save user failed: 15
ERROR - 2017-07-11 16:33:18 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:33:18 --> continue pay order params:-------->{"order_no":"wx20170711925779","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"2"}
ERROR - 2017-07-11 16:33:18 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:33:18 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163318","traceNO":"wx20170711925779","requestAmount":1999834,"paymentCount":1,"payment_1":"5_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711925779","sign":"7f78a252b0a92d4007d75fbad8e137a8c34799abe1feb364d6ba0f8da5be490d"}
ERROR - 2017-07-11 16:33:41 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:33:41 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163341","traceNO":"wx20170711713955","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711713955","sign":"c1768484df1fd3ef848122963ff3e17082d54402a989ac49cffeb80d0fae6b00"}
ERROR - 2017-07-11 16:33:42 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:33:42 --> Update user failed: 15
ERROR - 2017-07-11 16:33:42 --> Save user failed: 15
ERROR - 2017-07-11 16:33:44 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:33:44 --> continue pay order params:-------->{"order_no":"wx20170711713955","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"6","buyNum":"2"}
ERROR - 2017-07-11 16:33:44 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:33:44 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163344","traceNO":"wx20170711713955","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711713955","sign":"5e065fe2c3b6c92863bf407ba552fec3ed34175351af8cce15baa0142da9221d"}
ERROR - 2017-07-11 16:34:12 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"74","modInfo":"{\"acceptName\":\"\u6076\u8da3\u5473\u8bf7\u95ee\",\"mobile\":\"131****2342\",\"province\":\"\u5c71\u897f\u7701\",\"city\":\"\u957f\u6cbb\u5e02\",\"district\":\"\u957f\u6cbb\u53bf\",\"address\":\"\u8c46\u8150\u5e72\u8c46\u8150\u5e72\u8c46\u8150\u5206\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:34:12 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"131****2342\",\"province\":\"\u5317\u4eac\u5e02\",\"city\":\"\u53bf\",\"district\":\"\u5bc6\u4e91\u53bf\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":\"1\"}"}
ERROR - 2017-07-11 16:34:29 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:addShippingAddress:{"acceptName":"\u5e72\u9ed1\u6d3b","mobile":"13185698563","province":"\u6cb3\u5317\u7701","city":"\u79e6\u7687\u5c9b\u5e02","district":"\u5c71\u6d77\u5173\u533a","address":"894994949","isCommon":"1"}
ERROR - 2017-07-11 16:34:32 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"74","modInfo":"{\"acceptName\":\"\u6076\u8da3\u5473\u8bf7\u95ee\",\"mobile\":\"131****2342\",\"province\":\"\u5c71\u897f\u7701\",\"city\":\"\u957f\u6cbb\u5e02\",\"district\":\"\u957f\u6cbb\u53bf\",\"address\":\"\u8c46\u8150\u5e72\u8c46\u8150\u5e72\u8c46\u8150\u5206\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:34:32 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"75","modInfo":"{\"acceptName\":\"\u5e72\u9ed1\u6d3b\",\"mobile\":\"131****8563\",\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u79e6\u7687\u5c9b\u5e02\",\"district\":\"\u5c71\u6d77\u5173\u533a\",\"address\":\"894994949\",\"isCommon\":0}"}
ERROR - 2017-07-11 16:34:32 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"131****2342\",\"province\":\"\u5317\u4eac\u5e02\",\"city\":\"\u53bf\",\"district\":\"\u5bc6\u4e91\u53bf\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":0}"}
ERROR - 2017-07-11 16:34:32 --> Update shipping_address failed: 74
ERROR - 2017-07-11 16:34:32 --> Save shipping_address failed: 74
ERROR - 2017-07-11 16:34:32 --> Update shipping_address failed: 73
ERROR - 2017-07-11 16:34:32 --> Save shipping_address failed: 73
ERROR - 2017-07-11 16:34:39 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:34:39 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163439","traceNO":"wx20170711363554","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711363554","sign":"a184e00dd3cd4eb4012517b100bfbbda0dfd754d8f5e7337c868297d6bf777ab"}
ERROR - 2017-07-11 16:34:39 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:34:40 --> Update user failed: 15
ERROR - 2017-07-11 16:34:40 --> Save user failed: 15
ERROR - 2017-07-11 16:34:42 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:34:42 --> continue pay order params:-------->{"order_no":"wx20170711363554","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"6","buyNum":"2"}
ERROR - 2017-07-11 16:34:42 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:34:42 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163442","traceNO":"wx20170711363554","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711363554","sign":"7f4c434e38e63eb3c5fa21ace92324b19a4d72f4b5c4e6276a412669500bf848"}
ERROR - 2017-07-11 16:34:52 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:34:52 --> continue pay order params:-------->{"order_no":"wx20170711363554","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"6","buyNum":"2"}
ERROR - 2017-07-11 16:34:52 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:34:52 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163452","traceNO":"wx20170711363554","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711363554","sign":"eda9517c9e291ddeb69ca169e5a86ac75791642bbbc6d990c5a4e2368d5476fa"}
ERROR - 2017-07-11 16:35:11 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:35:11 --> continue pay order params:-------->{"order_no":"wx20170711492342","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"2"}
ERROR - 2017-07-11 16:35:11 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:35:11 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163511","traceNO":"wx20170711492342","requestAmount":1999834,"paymentCount":1,"payment_1":"5_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711492342","sign":"48ff0d04272e6b2ac838385667aabc6b5ff19b32e14dce0b2dfdc06fcc4355c7"}
ERROR - 2017-07-11 16:35:22 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:35:22 --> continue pay order params:-------->{"order_no":"wx20170711713955","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"6","buyNum":"2"}
ERROR - 2017-07-11 16:35:22 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:35:22 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163522","traceNO":"wx20170711713955","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711713955","sign":"046b16798ba6624f82f553ccfc527e45442b273c9752588ae1a82ac6d7ac1031"}
ERROR - 2017-07-11 16:35:45 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"74","modInfo":"{\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u90af\u90f8\u5e02\",\"district\":\"\u590d\u5174\u533a\",\"acceptName\":\"\u6076\u8da3\u5473\u8bf7\u95ee\",\"mobile\":\"13195632342\",\"address\":\"\u8c46\u8150\u5e72\u8c46\u8150\u5e72\u8c46\u8150\u5206\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:35:55 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:35:55 --> continue pay order params:-------->{"order_no":"wx20170711925779","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"2"}
ERROR - 2017-07-11 16:35:55 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:35:55 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163555","traceNO":"wx20170711925779","requestAmount":1999834,"paymentCount":1,"payment_1":"5_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711925779","sign":"2e8f28aa8e10868a71a429a77e64f9606833f4909b7f07c7448fec41450069f9"}
ERROR - 2017-07-11 16:36:19 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:36:19 --> continue pay order params:-------->{"order_no":"wx20170711696680","userId":"15","deliveryType":"0","orderTime":"1499759843","goodsPrice":"1","payPrice":1,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"1"}
ERROR - 2017-07-11 16:36:19 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:36:19 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163619","traceNO":"wx20170711696680","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711696680","sign":"1f53e35d1b6fc0a887d834873ddd5150581db8ca41db42ae7041bef400f8f28b"}
ERROR - 2017-07-11 16:36:37 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:36:38 --> Update user failed: 15
ERROR - 2017-07-11 16:36:38 --> Save user failed: 15
ERROR - 2017-07-11 16:36:48 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"75","modInfo":"{\"acceptName\":\"\u5e72\u9ed1\u6d3b\",\"mobile\":\"131****8563\",\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u79e6\u7687\u5c9b\u5e02\",\"district\":\"\u5c71\u6d77\u5173\u533a\",\"address\":\"894994949\",\"isCommon\":0}"}
ERROR - 2017-07-11 16:36:48 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"74","modInfo":"{\"acceptName\":\"\u6076\u8da3\u5473\u8bf7\u95ee\",\"mobile\":\"131****2342\",\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u90af\u90f8\u5e02\",\"district\":\"\u590d\u5174\u533a\",\"address\":\"\u8c46\u8150\u5e72\u8c46\u8150\u5e72\u8c46\u8150\u5206\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:36:48 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"131****2342\",\"province\":\"\u5317\u4eac\u5e02\",\"city\":\"\u53bf\",\"district\":\"\u5bc6\u4e91\u53bf\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:36:48 --> Update shipping_address failed: 75
ERROR - 2017-07-11 16:36:48 --> Save shipping_address failed: 75
ERROR - 2017-07-11 16:37:29 --> [methodError]:[]:F:\work\program\server\application\controllers/shippingAddress/U_ShippingAddress.php:modShippingAddress:{"addressId":"73","modInfo":"{\"province\":\"\u6cb3\u5317\u7701\",\"city\":\"\u79e6\u7687\u5c9b\u5e02\",\"district\":\"\u5317\u6234\u6cb3\u533a\",\"acceptName\":\"\u963f\u8428\u5fb7\",\"mobile\":\"13196322342\",\"address\":\"\u989d\u5916\u70ed\u6e29\u70ed\u6211\u6211\",\"isCommon\":1}"}
ERROR - 2017-07-11 16:37:40 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:37:40 --> continue pay order params:-------->{"order_no":"wx20170711363554","userId":"15","deliveryType":"0","orderTime":"1499762001","goodsPrice":"999888","payPrice":1999834,"orderType":2,"orderStatus":1,"payType":"6","buyNum":"2"}
ERROR - 2017-07-11 16:37:40 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:37:40 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163740","traceNO":"wx20170711363554","requestAmount":1999834,"paymentCount":1,"payment_1":"6_1999834","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"dswwde","goodsCount":"2","ip":"140.206.112.170","extend":"orderId%3Dwx20170711363554","sign":"63f366419481e0f108e5fd44af8d3ea08756480c503677994e6bbf97546c6398"}
ERROR - 2017-07-11 16:37:57 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:37:57 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163757","traceNO":"wx20170711453945","requestAmount":1,"paymentCount":1,"payment_1":"6_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"orderId%3Dwx20170711453945","sign":"358b9e7580f85ac60bfb3f551ec2b20b5a18c7ea2f64acaef6307e2df5a0d90d"}
ERROR - 2017-07-11 16:37:58 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:37:58 --> Update user failed: 15
ERROR - 2017-07-11 16:37:58 --> Save user failed: 15
ERROR - 2017-07-11 16:38:12 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:38:12 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163812","traceNO":"wx20170711960948","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711960948","sign":"3c783f2cbc242c4f5bebb873f9e0c44210312d690aed6f64e0d0c40325627ddd"}
ERROR - 2017-07-11 16:38:13 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 16:38:14 --> Update user failed: 15
ERROR - 2017-07-11 16:38:14 --> Save user failed: 15
ERROR - 2017-07-11 16:38:17 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:38:17 --> continue pay order params:-------->{"order_no":"wx20170711960948","userId":"15","deliveryType":"0","orderTime":"1499762305","goodsPrice":"1","payPrice":1,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"1"}
ERROR - 2017-07-11 16:38:17 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:38:17 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163817","traceNO":"wx20170711960948","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711960948","sign":"61e519703b3130b67477f078c1e855521a1d8de551c635de1359a51aeffa314a"}
ERROR - 2017-07-11 16:38:25 --> ---|----|---start continue pay---|------|----
ERROR - 2017-07-11 16:38:25 --> continue pay order params:-------->{"order_no":"wx20170711960948","userId":"15","deliveryType":"0","orderTime":"1499762305","goodsPrice":"1","payPrice":1,"orderType":2,"orderStatus":1,"payType":"5","buyNum":"1"}
ERROR - 2017-07-11 16:38:25 --> -|----|----|----start call pay API---|---|----
ERROR - 2017-07-11 16:38:25 --> prePayParams:---->:{"version":"1.1","merchantId":"201025","merchantTime":"20170711163825","traceNO":"wx20170711960948","requestAmount":1,"paymentCount":1,"payment_1":"5_1","payment_2":"","returnUrl":"http:\/\/192.168.0.163\/auction\/personCenter\/orderDetail.html","notifyUrl":"http:\/\/192.168.0.121:8088\/auction\/index.php\/wx\/WxCallback\/callbackFunc","goodsName":"\u53d1\u751f\u7684\u8303\u5fb7\u8428\u53d1","goodsCount":"1","ip":"140.206.112.170","extend":"wap_url%3D192.168.0.121%3A8088%26wap_name%3D%E9%9B%85%E7%8E%A9%E4%B9%8B%E5%AE%B6%26orderId%3Dwx20170711960948","sign":"d0d51e876640d626e2b7f5d31fbd06532e110518099afb3ef186cdbeed199aec"}
ERROR - 2017-07-11 16:39:45 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 16:39:45 --> Unable to select database: auction
ERROR - 2017-07-11 16:39:46 --> Severity: Warning --> mysql_select_db() expects parameter 2 to be resource, boolean given F:\work\program\server\system\database\drivers\mysql\mysql_driver.php 208
ERROR - 2017-07-11 16:39:46 --> Unable to select database: auction
ERROR - 2017-07-11 16:44:25 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/u_user.php:getSelfInfo:[]
ERROR - 2017-07-11 16:44:25 --> [methodError]:[重登录失败：令牌错误!]:F:\work\program\server\application\controllers/account.php:reLogin:{"userType":"1","token":""}
ERROR - 2017-07-11 17:52:02 --> user:15balance change. the transactionType:12before:3725.50 after:3725.50
ERROR - 2017-07-11 17:52:03 --> Update user failed: 15
ERROR - 2017-07-11 17:52:03 --> Save user failed: 15
