<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/20
 * Time: 17:28
 */

class Error
{
    static $errors = array(
        array('errDefine' => 'ERROR_OK', 'index' => 0, 'errMsg' => ''),

        // 通用错误
        array('errDefine' => 'ERROR_PARAM', 'index' => 1, 'errMsg' => '参数错误！'),
        array('errDefine' => 'ERROR_SYSTEM', 'errMsg' => '系统错误！'),
        array('errDefine' => 'ERROR_EXISTS', 'errMsg' => ''), // 已存在（不用于返回客户端）
        array('errDefine' => 'ERROR_NOT_EXISTS', 'errMsg' => ''), // 不存在（不用于返回客户端）
        array('errDefine' => 'ERROR_SESSION_ERROR', 'errMsg' => '会话不存在！'),
        array('errDefine' => 'ERROR_SESSION_PRIVILEGE_ERROR', 'errMsg' => '权限不正确！'),
        array('errDefine' => 'ERROR_MODIFY_INFO_FAILED', 'errMsg' => '修改数据失败！'),

        // 账号相关错误
        array('errDefine' => 'ERROR_ACCOUNT_LOGIN_FAILED', 'index' => 101, 'errMsg' => '账号名或密码错误！'),
        array('errDefine' => 'ERROR_ACCOUNT_RELOGIN_FAILED_WRONG_TOKEN', 'errMsg' => '重登录失败：令牌错误!'), // 重登录失败：令牌错误!
        array('errDefine' => 'ERROR_ACCOUNT_RELOGIN_FAILED_TOKEN_TIMEOUT', 'errMsg' => '重登录失败：令牌已超时!'), // 重登录失败：令牌已超时!
        array('errDefine' => 'ERROR_ACCOUNT_PASSPORT_EXISTS', 'errMsg' => '该账号已存在！'),
        array('errDefine' => 'ERROR_ACCOUNT_NOT_EXIST_PASSPORT', 'errMsg' => '账号不存在！'),
        array('errDefine' => 'ERROR_ACCOUNT_RELOGIN_FAILED', 'errMsg' => '设置重登录信息出错!'),
        array('errDefine' => 'ERROR_ACCOUNT_WRONG_PLATFORM', 'errMsg' => '未知的用户平台!'),
        array('errDefine' => 'ERROR_ACCOUNT_NO_INVITE_CODE', 'errMsg' => '您不能填写自己的邀请码!'),
        array('errDefine' => 'ERROR_ACCOUNT_NO_INVITE', 'errMsg' => '您填写的邀请码不存在!'),
        array('errDefine' => 'ERROR_ACCOUNT_PERMANENT_TITLE', 'errMsg' => '此账号已被永久封号！'),
        array('errDefine' => 'ERROR_ACCOUNT_UPDATE_PASSWORD_FAIL', 'errMsg' => '修改密码失败,请稍后再试！'),
        array('errDefine' => 'ERROR_ACCOUNT_FORBIDDEN', 'errMsg' => '账号已被封禁，如有疑虑请您联系客服!'),
        array('errDefine' => 'ERROR_ACCOUNT_DEL', 'errMsg' => '账号已被删除，如有疑虑请您联系客服!'),
        array('errDefine' => 'ERROR_ACCOUNT_ADMIN_EXISTS', 'errMsg' => '管理员已存在!'),
        array('errDefine' => 'ERROR_ACCOUNT_USER_EXISTS', 'errMsg' => '用户已存在!'),
        array('errDefine' => 'ERROR_ACCOUNT_ADMIN_CANT_DELETE_SELF', 'errMsg' => '不可以删除自己!'),

        //用户相关错误
        array('errDefine' => 'ERROR_USER_NOT_FOUND', 'index' => 201, 'errMsg' => '用户未找到！'),
        array('errDefine' => 'ERROR_NO_USE_PHONE_CODE_TO_LOGIN', 'errMsg' => '不能使用手机验证登陆。'),
        array('errDefine' => 'ERROR_THE_ACCOUNT_IS_DELETE', 'errMsg' => '该账号已被删除'),

        //验证码相关错误
        array('errDefine' => 'ERROR_GET_CODE_FAILED', 'index' => 401, 'errMsg' => '获取短信验证码失败！'),
        array('errDefine' => 'ERROR_GET_CODE_OVERDUE', 'errMsg' => '您输入的验证码已过期！'),
        array('errDefine' => 'ERROR_GET_CODE_ERROR', 'errMsg' => '您输入的验证码有误！'),
        array('errDefine' => 'ERROR_GET_CODE_ILLEGAL', 'errMsg' => '操作太频繁！'),
        array('errDefine' => 'ERROR_GET_CODE_NOT_FOUND', 'errMsg' => '请先获取验证码！'),
        array('errDefine' => 'ERROR_GET_PHONENUM_NOT_FOUND', 'errMsg' => '验证码不存在！'),

    );

    // 获取所有的错误信息数组
    static function getAllErrors()
    {
        return self::$errors;
    }

    static function registerErrors($errors)
    {
        self::$errors = array_merge(self::$errors, $errors);
    }
}


