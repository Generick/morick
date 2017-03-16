<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-12-12
 * Time: 下午4:58
 */

class Common {

    function __construct()
    {

    }

    function __destruct()
    {

    }

    /**
     * HTTP请求
     * @param $url
     * @param array $data
     * @param bool $cookie
     * @param string $method
     * @return mixed
     */
    function httpRequest($url, $data = array(), $cookie = false, $method = "GET")
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if ($cookie)
        {
            curl_setopt($ch,CURLOPT_COOKIE, $cookie);
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $ret = curl_exec($ch);
        curl_close($ch);
        return $ret;
    }

    /**
     * @return mixed
     */
    function format()
    {
        $args = func_get_args();
        if (count($args) == 0) { return;}

        if (count($args) == 1) { return $args[0]; }

        $str = array_shift($args);

        $str = preg_replace_callback('/\\{(0|[1-9]\\d*)\\}/', create_function('$match', '$args = '.var_export($args, true).'; return isset($args[$match[1]]) ? $args[$match[1]] : $match[0];'), $str);

        return $str;
    }

    /**
     * 获取code 
     */
    function getCode($currentUrl)
    {
        $redirect_uri = $currentUrl . "?hasMakeCode=1";
        $scope = "snsapi_userinfo";
        $state = "精锐教育";
        $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".APPID."&redirect_uri=".urlencode($redirect_uri)."&response_type=code&scope=".$scope."&state=".$state."#wechat_redirect";
        header("Location:".$url);
    }
    
    /**
     * 获取跳转URL
     */
    function getJumpUrl($key)
    {
    	$data = array(
    	    "1" => "../information.html",
    	    "2" => "../courses.html",
    	    "3" => "../consultation.html",
    	    "4" => "../mine.html"
    	);
    	
    	return $data[$key];
    }

}