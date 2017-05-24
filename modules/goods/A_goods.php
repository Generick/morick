<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-19
 * Time: 下午1:27
 */
class A_goods extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_goods");
    }

    /**
     * 新增商品信息
     */
    function createGoods()
    {
        if(!$this->checkParam(array("goodsInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsInfo = json_decode(trim($this->input->post("goodsInfo")), true) ? json_decode(trim($this->input->post("goodsInfo")), true)  : array();
        if(empty($goodsInfo))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsId = 0;
        $retCode = $this->m_goods->createGoods($goodsInfo, $goodsId);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("goodsId" => $goodsId));
        return;
    }

    /**
     * 修改商品信息
     */
    function modGoods()
    {
        if(!$this->checkParam(array("goodsId", "modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsId = intval($this->input->post("goodsId"));
        $modInfo = json_decode(trim($this->input->post("modInfo")), true) ? json_decode(trim($this->input->post("modInfo")), true) : array();
        if(empty($modInfo))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $retCode = $this->m_goods->modGoods($goodsId, $modInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 删除商品
     */
    function delGoods()
    {
        if(!$this->checkParam(array("goodsIds")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsIds = trim($this->input->post("goodsIds"));
        $goodsIdArr = json_decode($goodsIds, true) ? json_decode($goodsIds, true) : array();
        if(empty($goodsIdArr))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $delArr = array();
        foreach($goodsIdArr as $goodsId)
        {
            $retCode = $this->m_goods->delGoods($goodsId);
            if($retCode == ERROR_OK)
            {
                $delArr[] = $goodsId;
            }
        }

        $this->responseSuccess(array("delArr" => $delArr));
    }

    //出库
    function outLibrary($goodsId)
    {
        if (!$this->checkParam(array('goodsId'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        
        $goodsId = $this->input->post('goodsId');
        $res = $this->m_goods->outLibrary($goodsId);
        if($res !== ERROR_OK)
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }
    
}