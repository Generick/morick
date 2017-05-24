<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/18
 * Time: 17:42
 */

///////////////////////////////
// 扩展user的数据
CUser::registerFields(array(
    "note" =>       new CField(FIELD_TYPE_NORMAL),
    "balance" =>  new CField(FIELD_TYPE_NORMAL),
    "frozen" =>  new CField(FIELD_TYPE_NORMAL),
    "isVIP" => new CField(FIELD_TYPE_NORMAL),
));

// 扩展user的方法
// 实际中的调用方法： $userObj->test($a, $b);
CUser::registerExtFunction('test', function($obj, $a, $b)
{
//    echo $obj->name . " - " . $a . " - " . $b;
});

///////////////////////////////
// 扩展user数据萃取的字段
CUserInfo::registerFields(array(
    'note',
    'balance',
    'frozen',
    "isVIP",
));

CUserBaseInfo::registerFields(array(
    'note',
));

///////////////////////////////
// 如果有其他需要萃取数据的需求，则增加
