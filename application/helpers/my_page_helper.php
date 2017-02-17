<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 实现分页
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 * 
 * @access   public
 * @param    array    分页配置参数
 * @return   string   分页代码
 */
function page_links($config = array())
{
	$CI = &get_instance();
    $CI->load->library('pagination');
	$CI->pagination->initialize($config);
	return $CI->pagination->create_links();
}

/* End of file my_page_helper.php */
/* Location: ./application/helpers/my_page_helper.php */