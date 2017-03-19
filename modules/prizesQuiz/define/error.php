<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/15/2017
 * Time: 3:10 PM
 */
Error::registerErrors(array(
    array('errDefine' => 'PQ_NOT_QUIT', 'index' => 20000, 'errMsg' => '参数与人数大于3，不能结束！'),
    array('errDefine' => 'PQ_LIMITNUM_ERROR', 'errMsg' => '人数上限必须大于当前参与人数！'),
    array('errDefine' => 'PQ_AUCTION_ON', 'errMsg' => '商品正在拍卖，不能参与竞猜！'),
    array('errDefine' => 'PQ_REPEAT', 'errMsg' => '不能重复参与'),
    array('errDefine' => 'PQ_BALANCE_NOT_ENOUGH', 'errMsg' => '账户余额不足'),
    array('errDefine' => 'PQ_NUM_FULL', 'errMsg' => '人数已满'),
    array('errDefine' => 'PQ_FAIL', 'errMsg' => '参与失败'),
    array('errDefine' => 'PQ_NO_QUIZ', 'errMsg' => '此件拍品没有参与有奖竞猜'),
));