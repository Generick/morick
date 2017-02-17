<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 加载日历脚本
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 * 
 * @access   public
 * @return   string   加载文件的 html 代码
 * @example
 * Calendar.setup({inputField:'id_calendar', trigger:'id_calendar',	dateFormat:'%Y-%m-%d %H:%M'});
 */
function load_jscal()
{
	$load = '';
	$load .= '<link type="text/css" rel="stylesheet" href="' . SITE_RESOURCES . '/jscal/jscal2.css" />' . "\n";
	$load .= '<link type="text/css" rel="stylesheet" href="' . SITE_RESOURCES . '/jscal/steel.css" />' . "\n";
	$load .= '<script type="text/javascript" src="' . SITE_RESOURCES . '/jscal/jscal2.js"></script>' . "\n";
	$load .= '<script type="text/javascript" src="' . SITE_RESOURCES . '/jscal/cn.js"></script>' . "\n";
	return $load;
}

/* End of file my_jscal_helper.php */
/* Location: ./application/helpers/my_jscal_helper.php */