<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * excel 读取
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 * 
 * @access   public
 * @return   object   excel 对象实例
 * @example
 * $excel = excel();
 * $excel->read('uploads/test.xls');
 * $datas = $excel->sheets[0]['cells'];
 */
function excel()
{
	$CI = &get_instance();
	if(!isset($CI->excel))
	{
		require_once str_replace(base_url(), '', SITE_RESOURCES) . '/phpexcelreader/reader.php';
		$CI->excel = new Spreadsheet_Excel_Reader();
		$CI->excel->setOutputEncoding('utf-8');
	}
	return $CI->excel;
}

/* End of file my_excel_helper.php */
/* Location: ./application/helpers/my_excel_helper.php */