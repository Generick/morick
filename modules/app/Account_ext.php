<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/11
 * Time: 19:21
 */

/**
 * Controller的扩展需要先获取到CI对象，然后为该对象添加方法
 * 方法的参数为controller对象
 */

$CI = &get_instance();

$CI->test = function($ctrl){
    $ctrl->m_account->test(1, 2);
    return;
};

