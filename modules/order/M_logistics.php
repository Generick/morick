<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-15
 * Time: 下午2:41
 */
class M_logistics extends My_Model
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取物流信息
     * @param $shipperCode
     * @param $logisticCode
     * @return url响应返回的html
     */
    function getOrderTraces($shipperCode, $logisticCode)
    {
        $requestData= "{'OrderCode':'','ShipperCode':'{$shipperCode}','LogisticCode':'{$logisticCode}'}";
        $data = array(
            'EBusinessID' => EBusinessID,
            'RequestType' => '1002',
            'RequestData' => urlencode($requestData) ,
            'DataType' => '2',
        );
        $data['DataSign'] = $this->encrypt($requestData, AppKey);
        $result = $this->sendPost(ReqURL, $data);
        return $result;
    }

    /**
     *  post提交数据
     * @param  string $url 请求Url
     * @param  array $datas 提交的数据
     * @return url响应返回的html
     */
    private function sendPost($url, $data)
    {
        $temps = array();
        foreach ($data as $key => $value) {
            $temps[] = sprintf('%s=%s', $key, $value);
        }
        $post_data = implode('&', $temps);
        $url_info = parse_url($url);
        if(!isset($url_info["port"]))
        {
            $url_info["port"] = 80;
        }
        $httpHeader = "POST " . $url_info['path'] . " HTTP/1.0\r\n";
        $httpHeader.= "Host:" . $url_info['host'] . "\r\n";
        $httpHeader.= "Content-Type:application/x-www-form-urlencoded\r\n";
        $httpHeader.= "Content-Length:" . strlen($post_data) . "\r\n";
        $httpHeader.= "Connection:close\r\n\r\n";
        $httpHeader.= $post_data;
        $fd = fsockopen($url_info['host'], $url_info['port']);
        fwrite($fd, $httpHeader);
        $gets = "";
        $headerFlag = true;
        while (!feof($fd))
        {
            if (($header = @fgets($fd)) && ($header == "\r\n" || $header == "\n"))
            {
                break;
            }
        }
        while (!feof($fd))
        {
            $gets.= fread($fd, 128);
        }
        fclose($fd);
        return $gets;
    }

    /**
     * 电商Sign签名生成
     * @param data 内容
     * @param appkey Appkey
     * @return DataSign签名
     */
    private function encrypt($data, $appKey)
    {
        return urlencode(base64_encode(md5($data.$appKey)));
    }
}