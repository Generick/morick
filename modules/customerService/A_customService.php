<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/27/2017
 * Time: 4:09 PM
 */
class A_customService extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_customService');
    }

    //获取客服账号列表
    function getServices()
    {
        if (!$this->checkParam(array('startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');
        $whr = array('is_delete' => DELETE_NO);
        $data = array();
        $count = 0;
        $this->m_customService->getServices($startIndex, $num, $whr, $data, $count);
        $this->responseSuccess(array('serviceList' => $data, 'count' => $count));
    }

    //管理员添加客服账号
    function addService()
    {
        if (!$this->checkParam(array('accountName', 'name', 'password'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $name = $this->input->post('name');
        $accountName = $this->input->post('accountName');
        $password = $this->input->post('password');
        $res = $this->m_customService->addService($name, $accountName, $password);
        if ($res !== ERROR_OK) 
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }

    //管理员修改客户密码
    function modServicePassword()
    {
        if (!$this->checkParam(array('accountName', 'newPWD'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $accountName = $this->input->post('accountName');
        $password = $this->input->post('password');
        $res = $this->m_customService->modServicePassword($accountName, $newPWD);
        if ($res !== ERROR_OK) 
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }

    //删除客服
    function delService()
    {
        if (!$this->checkParam(array('ids'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $ids = $this->input->post('ids');
        $ids = is_array($ids)?$ids:json_decode($ids, true);
        foreach ($ids as $v) 
        {
            $res = $this->m_customService->delService($v);
        }
        if ($res !== ERROR_OK) 
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }

    //获取订单操作记录
    function getOPREC()
    {
        if (!$this->checkParam(array('startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');
        $startTime = $this->input->post('startTime');
        $endTime = $this->input->post('endTime');
        $whr = array();
        if (!empty($startTime) && !empty($endTime)) 
        {
            $whr['opTime >='] = $startTime;
            $whr['opTime <='] = $endTime;
        }
        $data = array();
        $count = 0;
        $this->m_customService->getOPREC($startIndex, $num, $whr, $data, $count);
        $this->responseSuccess(array('OPList' => $data, 'count' => $count));
    }
}