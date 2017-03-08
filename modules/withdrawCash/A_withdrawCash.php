<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/8/2017
 * Time: 6:21 PM
 */

class A_withdrawCash extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_withdrawCash');
    }

}