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


    //获取出价列表 [support search]

    function getBidList(){
        if (!$this->checkParam(array('startIndex', 'num'))) {
            $this->responseError(ERROR_PARAM);
            return;
        }
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

        $auctionItemId = $this->input->post('auctionItemId');

        $count = 0;
        $bidList = array();
        $retCode = $this->m_bids->getBidList($startIndex, $num, $auctionItemId, $count, $bidList);
        //var_dump($bidList);die;
        foreach ($bidList as &$v) {
            $auctionInfo = $this->m_auction->getAuctionSmall($v['auctionItemId']);
            if (!$auctionInfo) {
                continue;
            }
            if ($v['isHigh'] == 1) {

                if ($auctionInfo->endTime < time()) {
                    $v['isSale'] = 1;
                }
                
            }
        }


        for ($i=0; $i < count($bidList); $i++) {
            $bidList[$i]['createTime'] = date("Y-m-d H:i:s", $bidList[$i]['createTime']);
        }

        if ($retCode != ERROR_OK) {
            $this->responseError($retCode);
            return;
        }
        //var_dump($bidList);die;
        $this->responseSuccess(array('bidList'=>$bidList, 'count' => $count));

    }



    //发送短信
    function smsSend(){
        if (!$this->checkParam(array("params"))) {
            $this->responseError(ERROR_PARAM);
            exit;
        }
        $param = json_decode($this->input->post('params'),true);

        $type = intval($param['type']);
        $goods_name = $param['goods_name'];
        $phoneNum = $param['phoneNum'];
        $price = $param['price'];

        switch ($type) {
            case 1:
                //超价
                $content = $this->m_common->format(SMS_BEYOND_PRICE,$goods_name,$price);
                break;
            case 2:
                //获拍
                $content = $this->m_common->format(SMS_OBTAIN,$goods_name,$price);
                break;
            case 3:
                //截拍
                $content = $this->m_common->format(SMS_NEAR_END,$goods_name,$price);
            default:
                # code...
                break;
        }

        $this->m_smsCode->sendMsg($phoneNum,$content);
        $this->responseSuccess('ok');

    }


}