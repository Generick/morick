<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-03-06 19:13:08 --> 404 Page Not Found: auction/PrizesQuiz/getQuizList
ERROR - 2017-03-06 19:14:21 --> Query error: Column 'status' in field list is ambiguous - Invalid query: SELECT `auction_id`, `goods_icon`, `goods_name`, `limitNum`, `currentNum`, `sum`, `status`
FROM `mn_prizesquiz`
JOIN `mn_auctionitems` ON `mn_prizesquiz`.`auction_id` = `mn_auctionitems`.`id`
 LIMIT 20
ERROR - 2017-03-06 19:15:30 --> Lack of param: fields
ERROR - 2017-03-06 19:15:30 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/prizesQuiz/A_prizesQuiz.php:searchQuizList:[]
ERROR - 2017-03-06 19:15:55 --> Lack of param: auctionId
ERROR - 2017-03-06 19:15:55 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/prizesQuiz/A_prizesQuiz.php:viewQuiz:[]
ERROR - 2017-03-06 19:23:27 --> Lack of param: cappedPrice
ERROR - 2017-03-06 19:23:27 --> [methodError]:[参数错误！]:F:\work\program\server\application\controllers/auction/A_auction.php:releaseAuctionItem:{"goodsId":"53","initialPrice":"0","lowestPremium":"5","referencePrice":"0","margin":"0","startTime":"2017-03-06 22:00:00","endTime":"2017-03-13 22:00:00","isVIP":"0"}
ERROR - 2017-03-06 19:25:07 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/auction/A_auction.php:getAuctionGoods:{"startIndex":"0","num":"0"}
ERROR - 2017-03-06 19:25:07 --> [methodError]:[会话不存在！]:F:\work\program\server\application\controllers/auction/A_auction.php:getAuctionItems:{"startIndex":"0","num":"10"}
ERROR - 2017-03-06 19:26:05 --> [methodError]:[]:F:\work\program\server\application\controllers/auction/A_auction.php:releaseAuctionItem:{"goodsId":"53","initialPrice":"0","lowestPremium":"2","margin":"0","startTime":"2017-03-06 22:00:00","endTime":"2017-03-13 22:00:00","cappedPrice":"11","isVIP":"0"}
