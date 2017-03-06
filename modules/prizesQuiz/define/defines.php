<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/3/2017
 * Time: 11:30 AM
 */

define("PQ_AUCTION_ON","商品正在拍卖，不能参与竞猜");
define("PQ_REPEAT","不能重复参与");
define("PQ_BALANCE_NOT_ENOUGH","账户余额不足");
define("PQ_NUM_FULL","人数已满");
define("PQ_FAIL","参与失败");

define("QP_STATUS_AUCTION",0);//正在拍卖，不能竞猜
define("PQ_STATUS_QUIZ",1);//有奖竞猜中
define("PQ_ADMIN_QUIT",2);//人数小于3
define("PQ_ADMIN_QUIT_LP",3);//流拍
define("PQ_NORMAL_OVER",4);//正常结束

define("PQ_NOT_QUIT","参数与人数大于3，不能结束");

define("FIRST_PRIZE",1);
define("SECOND_PRIZE",2);
define("THIRD_PRIZE",3);