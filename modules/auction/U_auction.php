<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-19
 * Time: 上午11:51
 */
class U_auction extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_auction");
        $this->load->model("m_user");
    }

    /**
     * 竞拍展品
     */
    function biddingAuctionItem()
    {
        if(!$this->checkParam(array("itemId", "price")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $itemId = intval($this->input->post("itemId"));
        $price = floatval(str_replace(',', '', $this->input->post("price")));
        $modInfo = array();
        $retCode = $this->m_auction->biddingAuctionItem($itemId, $this->m_user->getSelfUserId(), $price,$modInfo);
        //var_dump($retCode);
        if ($retCode != ERROR_OK) {
            $this->responseError($retCode);
            exit;
        }
        $this->responseSuccess($modInfo['endTime']);
        
    }
}