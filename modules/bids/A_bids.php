<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 3/2/2017
 * Time: 2:26 PM
 */
class A_bids extends Admin_Controller{

    function __construct(){
        parent::__construct();
        $this->load->model('m_auction');
        $this->load->model('m_smsCode');
        $this->load->model('m_bids');
    }


    //get user bids list [support search]

    function getBidList(){
        //get params
        if (isset($_POST['startIndex'])) {
            $startIndex = intval($_POST['startIndex']);
        }else{
            $startIndex = 0;
        }

        if (isset($_POST['num'])) {
            $num = $_POST['num'];
        }else{
            $num = 10;
        }

        $count = 0;
        $bidList = array();
        $retCode = $this->m_bids->getBidList($startIndex,$num,$count,$bidList);
        //var_dump($bidList);die;
        foreach ($bidList as &$v) {
            $auctionInfo = $this->m_auction->getAuctionSmall($v['auctionItemId']);
            if ($v['isHigh']) {

                if ($auctionInfo->endTime < time()) {
                    $v['isSale'] = 1;
                }
                # code
            }
        }


        for ($i=0; $i < count($bidList); $i++) {
            $bidList[$i]['createTime'] = date("Y-m-d H:i:s",$bidList[$i]['createTime']);
        }

        if ($retCode != ERROR_OK) {
            $this->responseError($retCode);
            exit;
        }
        //var_dump($bidList);die;
        $this->responseSuccess(array('bidList'=>$bidList,'count'=>$count));

    }



    //send message to user
    function smsSend(){
        //check params
        if (!$this->checkParam(array("params"))) {
            $this->responseError(ERROR_PARAM);
            exit;
        }
        //get params
        $param = json_decode($this->input->post('params'),true);

        $type = intval($param['type']);
        $goods_name = $param['goods_name'];
        $phoneNum = $param['phoneNum'];
        $price = $param['price'];

        switch ($type) {
            case 1:
                //beyond price
                $content = $this->m_common->format(SMS_BEYOND_PRICE,$goods_name,$price);
                break;
            case 2:
                //obtain
                $content = $this->m_common->format(SMS_OBTAIN,$goods_name,$price);
                break;
            case 3:
                //near end
                $content = $this->m_common->format(SMS_NEAR_END,$goods_name,$price);
            default:
                # code...
                break;
        }

        $this->m_smsCode->sendMsg($phoneNum,$content);
        //return result to font-end
        $this->responseSuccess('ok');

    }


}