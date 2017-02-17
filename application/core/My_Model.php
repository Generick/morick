<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/20
 * Time: 16:09
 */

class My_Model extends CI_Model{

    public function __call($method, $params)
    {
        $className = get_class($this);
        if (method_exists($className, $method))
        {
            // 如果当前类有此方法，则可能是因为调用了私有方法
            log_message("error", "[My_Model] $className called private method: " . $method);
            throw new Exception("[My_Model] $className called private method: " . $method);
            // return call_user_func_array(array($this, $method), $params);
            return;
        }
        else if (isset($this->$method))
        {
            // 判断是否有扩展的方法
            $func = $this->$method;

            $p = array($this);
            $p = array_merge($p, $params);

            return call_user_func_array($func, $params);
        }
        else
        {
            // 没有此方法，提示错误
            log_message("error", "[My_Model] $className does not have this method: " . $method);
            throw new Exception("[My_Model] $className does not have this method: " . $method);
        }
    }
}