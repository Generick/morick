<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 文件上传
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 * 
 * @access   public
 * @param    string   上传域的 name 值
 * @param    array    上传的参数配置
 * @return   array    处理后形成的一维数据数组
 * 
 * @param list
 * upload_path     文件上传路径。该路径必须是可写的，相对路径和绝对路径均可以。已写入 my_upload_helper.php
 * allowed_types   允许上传文件的MIME类型；通常文件扩展名可以做为MIME类型. 允许多个类型用竖线'|'分开。已写入 my_upload_helper.php
 * file_name       如果设置了这个参数，ci 将根据这里设置的文件名来对上传的文件进行重命名。文件名中的扩展名也必须是允许的文件类型。
 * overwrite       是否覆盖。该参数为TRUE时，如果上传文件时碰到重名文件，将会把原文件覆盖；如果该参数为FALSE，CI将会在新文件的文件名后面加一个数字。
 * max_size        允许上传文件大小的最大值（以K为单位）。该参数为0则不限制。注意：通常PHP也有这项限制，可以在php.ini文件中指定。通常默认为2MB。
 * max_width       上传文件的宽度最大值（像素为单位）。0为不限制。
 * max_height      上传文件的高度最大值（像素为单位）。0为不限制。
 * max_filename    文件名的最大长度。0为不限制。
 * encrypt_name    是否重命名文件。如果该参数为TRUE，上传的文件将被重命名为随机的加密字符串。当 overwrite 为 FALSE 时，此选项才起作用。
 * remove_spaces   参数为TRUE时，文件名中的空格将被替换为下划线。推荐使用。
 */
function upload_file($input_name, $_config = array())
{
	$CI = &get_instance();
	$CI->load->library('upload');
	$config['upload_path'] = '';
	$config['allowed_types'] = 'image';
	$config['file_name']     = time() . mt_rand(100, 999);
	$config['overwrite']     = FALSE;
	switch($config['allowed_types'])
	{
		case 'image':
			$config['max_size'] = SITE_UPLOAD_IMAGE_SIZE / 1024;
		break;
		case 'flash':
			$config['max_size'] = SITE_UPLOAD_FLASH_SIZE / 1024;
		break;
		case 'media':
			$config['max_size'] = SITE_UPLOAD_MEDIA_SIZE / 1024;
		break;
		case 'file':
			$config['max_size'] = SITE_UPLOAD_FILE_SIZE / 1024;
		break;
		default:
			$config['max_size'] = 100;
		break;
	}
	$config['max_width']     = 0;
	$config['max_height']    = 0;
	$config['max_filename']  = 0;
	$config['encrypt_name']  = FALSE;
	$config['remove_spaces'] = TRUE;
	$config = array_merge($config, $_config);
	$config['upload_path'] = str_replace(base_url(), '', SITE_UPLOADS) . '/' . ($config['upload_path'] ? $config['upload_path'] . '/' : '');
	$file_type = array
	(
		'image' => array('gif', 'jpg', 'jpeg', 'png', 'bmp'),
		'flash' => array('swf', 'flv'),
		'media' => array('swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'),
		'file'  => array('doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2'),
	);
	$config['allowed_types'] = implode('|', isset($file_type[$config['allowed_types']]) ? $file_type[$config['allowed_types']] : $file_type['image']);
	$CI->upload->initialize($config);
	$successed = $CI->upload->do_upload($input_name);
	if($successed)
	{
		return $CI->upload->data();
	} else {
		return $CI->upload->display_errors();
	}
}

/* End of file my_upload_helper.php */
/* Location: ./application/helpers/my_upload_helper.php */