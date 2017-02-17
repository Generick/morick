<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/20
 * Time: 16:13
 */


/**
 * Model的扩展需要先获取到Model对象，然后为该对象添加方法
 * 方法的参数第一个为model对象
 */
$CI = get_instance();
$model = $CI->m_account;

$model->test = function($m, $a, $b){
};
