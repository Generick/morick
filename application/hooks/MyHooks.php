<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/18
 * Time: 14:18
 */

class MyHooks
{
    /**
     * 在进入系统前先调用此方法，MeenoFramework主要执行引入预定义内容
     */
    function preSystem()
    {
        // include 核心 defines
        include_once(APPPATH . 'core/defines.php');
        include_once(APPPATH . 'core/errors.php');

        // include 扩展的 defines
        $this->_include_all_php(APPEXTPATH . 'define');

        // include 所有模块的defines
        if($handle = opendir(MODULEPATH)) {
            while (($file = readdir($handle)) !== false) {
                if ($file != '.' && $file != "..") {
                    if (is_dir(MODULEPATH . $file)) {
                        $this->_include_all_php(MODULEPATH . $file . DIRECTORY_SEPARATOR . 'define');
                    }
                }
            }
        }

        // include 核心基类
        include_once(APPPATH . 'core/classbase.php');

        // 遍历所有核心class
        $this->_include_all_php(APPPATH . 'models/class');

        // 遍历所有class的扩展
        $this->_include_all_php(APPEXTPATH . 'class');

        // include 所有模块的class
        if($handle = opendir(MODULEPATH)) {
            while (($file = readdir($handle)) !== false) {
                if ($file != '.' && $file != "..") {
                    if (is_dir(MODULEPATH . $file)) {
                        $this->_include_all_php(MODULEPATH . $file . DIRECTORY_SEPARATOR . 'class');

                        $this->_include_all_php(MODULEPATH . $file . DIRECTORY_SEPARATOR . 'extends/class');
                    }
                }
            }
        }
    }

    /**
     * 加载完core/My_Controller之后执行的此函数，MeenoFramework主要用此方法检测是否有其他的Controller基类
     */
    function postCoreController()
    {
        // include core 的扩展
        $this->_include_all_php(APPEXTPATH . 'core');
    }

    /**
     * 当还没有创建Controller实例之前调用此方法
     */
    function preController()
    {
    }

    /**
     * 创建完Controller实例后调用此方法
     */
    function postControllerConstructor($params)
    {
        $isModuleController = $params[0];
        $directory = $params[1];
        $class = $params[2];
        if (!$isModuleController)
        {
            // 判断是否有extends
            if (file_exists(APPEXTPATH . $directory . $class.'_ext.php'))
            {
                require_once(APPEXTPATH . $directory . $class.'_ext.php');
            }
        }
        else
        {
            // 判断是否有extends
            if (file_exists(MODULEPATH . $directory. "extends" . DIRECTORY_SEPARATOR . $class.'_ext.php'))
            {
                require_once(MODULEPATH . $directory. "extends" . DIRECTORY_SEPARATOR . $class.'_ext.php');
            }
        }
    }

    /**
     * Controller方法执行之后调用此方法
     */
    function postController()
    {
    }

    /**
     * 输出view之后调用此方法
     */
    function postSystem()
    {
    }

    /**
     * 遍历包含目录下的所有php
     * @param $folder
     */
    private function _include_all_php( $folder )
    {
        if (is_dir($folder))
        {
            foreach( glob( "{$folder}/*.php" ) as $filename )
            {
                require_once ($filename);
            }
        }
    }
}
