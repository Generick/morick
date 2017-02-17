<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: HumphreyLiu
 * Date: 14-12-6
 * Time: 下午5:21
 */

class My_Loader extends CI_Loader
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * 设置前端视图路径
     *
     * @access   public
     * @param    string   模板名
     */
    function set_template($template)
    {
        $this->_ci_view_paths = array($template . '/' => TRUE);
    }

    /**
     * 设置后端视图路径
     *
     * @access   public
     * @param    string   模板名
     */
    function set_admin_template($template)
    {
        $temp = array_keys($this->_ci_view_paths);
        $this->_ci_view_paths = array($temp[0] . $template . '/' => TRUE);
    }
}