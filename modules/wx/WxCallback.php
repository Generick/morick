<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-27
 * Time: 下午10:35
 */
class WxCallback extends My_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    function notify()
    {
        $this->responseError(ERROR_OK);
        return;
    }
}