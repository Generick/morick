<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 上午11:07
 */

class Goods extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_goods");
    }

    function getGoods()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $goods = array();
        $count = 0;

        $this->load->model("m_user");
        $userObj = $this->m_user->getSelfUserObj();
        $whereArr = array();
        if($userObj)
        {
            if($userObj->userType == USER_TYPE_ADMIN  && $userObj->adminType == ADMIN_TYPE_NORMAL)
            {
                $whereArr["owner_id"] = $userObj->userId;
            }
        }

        $retCode = $this->m_goods->getGoods($startIndex, $num, $goods, $count, $whereArr);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("goods" => $goods, "count" => $count));
        return;
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
     * 获取单个商品详情
     */
    function getOneGoods()
    {
        if(!$this->checkParam(array("goodsId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsId = intval($this->input->post("goodsId"));

        $allData = $this->m_goods->getGoodsAll($goodsId);

        $this->responseSuccess(array("goodsInfo" => $allData));
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
}