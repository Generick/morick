<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: Humphrey
 * Date: 14-12-7
 * Time: 上午1:18
 */

/**
 * Class M_errors
 * 用于定义错误码、错误描述
 */
class M_errors extends My_Model
{
    private $err2Msg = array();

    /**
     * 构造函数，在其中设置所有的错误码及错误信息
     */
    function __construct()
    {
        parent::__construct();

        $nowIndex = -1;
        $definedErr = array();

        $errors = Error::getAllErrors();

        foreach ($errors as $key => $val)
        {
            // 检查是否没有错误定义或错误消息
            if (!isset($val['errDefine']) || !isset($val['errMsg']))
            {
                $this->log->write_log('error', 'errDefine not found!: ' . print_r($val, true));
                break;
            }

            // 检查错误定义是否重复
            if (in_array($val['errDefine'], $definedErr))
            {
                $this->log->write_log('error', 'Redefinition of ' . $val['errDefine']);
                break;
            }

            if (isset($val['index']))
            {
                $nowIndex = $val['index'];
            }
            else
            {
                $nowIndex++;
            }

            //判断序号是否重叠
            if(isset($this->err2Msg[$nowIndex]))
            {
                log_message("error", "the errDefine index error. the errMsg:" . $val['errMsg']);
                break;
            }

            define($val['errDefine'], $nowIndex);

            $this->err2Msg[$nowIndex] = $val['errMsg'];
        }
    }

    /**
     * 根据错误码返回错误描述文本
     * @param $errCode  错误码
     * @return string   错误描述
     */
    public function getErrMsg($errCode)
    {
        if (array_key_exists($errCode, $this->err2Msg))
        {
            return $this->err2Msg[$errCode];
        }

        $this->log->write_log('error', 'Error not found: ' . $errCode);
        return "";
    }

}
