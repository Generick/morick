<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午8:19
 */
define('TRANSACTION_RECHARGE',  0);//充值
define('TRANSACTION_RETURN_MARGIN',  1);//返还保证金
define('TRANSACTION_WITHDRAWAL',  2);//提现
define('TRANSACTION_MARGIN',  3);//交纳保证金
define('TRANSACTION_SERVICE',  4);//购买服务
define('TRANSACTION_PAY',  5);//订单支付
define('TRANSACTION_SYSTEM_ADD', 6);//管理员充值
define('TRANSACTION_SYSTEM_REDUCE',  7);//管理员扣除
define('TRANSACTION_REFUSE_WITHDRAW',8);//管理员拒绝提现，返还提现金额
define('TRANSACTION_QUIZ_TICKETS', 9);//用户参与有奖竞猜扣除门票
define('TRANSACTION_QUIZ_TICKETS_RETURN', 10);//有奖竞猜人数小于3或者流拍，返还门票
define('TRANSACTION_AWARD', 11);//有奖竞猜获奖奖金
define('TRANSACTION_COMMODITY', 12);//特卖会购买商品成功