<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 自定义 md5 加密算法
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 * 
 * @access   public
 * @param    string   需加密的字符串
 * @return   string   加密后的字符串
 */
function str_md5($str)
{
	return md5(ACCOUNT_PASSWORD_ENCRYPTION_KEY . $str);
}

/**
 * 生成一个token
 * @return string
 */
function generate_token()
{
    return md5(uniqid());
}
/* End of file my_md5_helper.php */
/* Location: ./application/helpers/my_md5_helper.php */