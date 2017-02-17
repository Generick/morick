<?php

if (! defined ( 'BASEPATH' ))
    exit ( 'No direct script access allowed' );
/**
 * Created by PhpStorm.
 * User: HumphreyLiu
 * Date: 14-12-6
 * Time: 下午5:45
 */
class Test extends My_Controller
{
    public function index()
    {
        $this->load->helper ( 'url' );
        $this->load->view ( "test" );
    }
}