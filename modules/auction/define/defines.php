<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午7:28
 */

define("CACHE_PREFIX_AUCTION",                CACHE_PREFIX . "auction_");
define("CACHE_AUCTION_LIVE_TIME",                   86400);

define('AUCTION_ON',    0);//上架状态
define('AUCTION_OFF',   1);//下架状态

define('AUCTION_ING',  0);//正在拍卖
define('AUCTION_END',  1);//拍卖历史
define('AUCTION_ALL',   2);//全部【正在拍卖+拍卖历史】

define('AUCTION_TYPE_SMALL', 0);
define('AUCTION_TYPE_BASE', 1);
define('AUCTION_TYPE_ALL', 2);


define('AUCTION_STATUS_GOING', 0);//进行中
define('AUCTION_STATUS_ANNOUNCED', 1);//已揭晓
define('AUCTION_STATUS_SELF', 2);//已拍下
define('AUCTION_STATUS_NONE', 3);//流拍