<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 公共函数
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 */


/**
 * 生成文件名
 * @param $inputFileName
 * @return string           返回生成的文件名
 */
function genFileName()
{
    return sprintf('%d_%s', microtime(true), uniqid());
}
/* End of file my_common_helper.php */
/* Location: ./application/helpers/my_common_helper.php */