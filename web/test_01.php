<?php
require_once "wx/jssdk.php";
		$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
		$signPackage = $jssdk->GetSignPackage();
session_start();
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/24/2017
 * Time: 5:52 PM
 */
	
	$currentUrl = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') == true) {

            //配置参数的数组
            $CONF =  array(
                '__APPID__' =>'wx8aa4883c737caaaa',
                '__SERECT__' =>'620937dd20bdecf9e84f369d2ef64305',
                '__CALL_URL__' =>$currentUrl //当前页地址
            );
            //没有传递code的情况下，先登录一下
            if(!isset($_GET['code']) || empty($_GET['code'])){

                $getCodeUrl  =  "https://open.weixin.qq.com/connect/oauth2/authorize".
                    "?appid=" . $CONF['__APPID__'] .
                    "&redirect_uri=" . $CONF['__CALL_URL__']  .
                    "&response_type=code".
                    "&scope=snsapi_base". #!!!scope设置为snsapi_base !!!
                    "&state=1";

                //跳转微信获取code值,去登陆
                header('Location:' . $getCodeUrl);
                exit;
            }

            $code     		=	trim($_REQUEST['code']);
            //使用code，拼凑链接获取用户openid
            $getTokenUrl    =  "https://api.weixin.qq.com/sns/oauth2/access_token".
                "?appid={$CONF['__APPID__']}".
                "&secret={$CONF['__SERECT__']}".
                "&code={$code}".
                "&grant_type=authorization_code";

            $data = https_request($getTokenUrl);
            $token_get_all = json_decode($data);
            $openid 		=	$token_get_all->openid;
            echo $openid;
	    $_SESSION['openId'] = $openid;

        }else{
echo 'not in wechat';

}

    function https_request($url, $data = null)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }
?>

<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title></title>
        <link rel="stylesheet" href="swiper/swiper.css" />
        <link rel="stylesheet" href="css/base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css" />
        <link rel="stylesheet" href="css/newPersonal.css" /> 
	</head>
	<body ng-controller="ctrl" style="background: #FFFFFF;">
		<!--加载动画-->
		
		     <div>dsfdsgdgdfsgdsgdfsgdfsgdfsgdfsgdfgdfgdgdgdfgdfgdfgdfgdfgdfgdfgdfgdfgdsgdf</div>
		     <div ng-click="to()">下订单</div>
		<!--底部tab-->
	    <div ng-include="'module/tab/tab.html'" style="z-index: 666;position: fixed;bottom:0px;left:0px;width:100%;height:54px;overflow: hidden;"></div>
	</body>
    
	<!--系统js-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/jquery.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="controller/app.js"></script>
	
	 <script>
    	
    	

		if (typeof localStorage === 'object') {
		    try {
				localStorage.setItem('localStorage', 1);
				localStorage.removeItem('localStorage');
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem;
				Storage.prototype.setItem = function() {};
				$dialog.msg('为了正常访问，请关闭无痕模式');
			}
		}


    </script>
	<script src="js/commonArr.js"></script>
	<script src="module/tab/tab.js"></script>   
	
	<script>
		$(function(){
			
			//监听微信返回按钮
			pushHistory();
			var bool=false;  
            setTimeout(function(){  
                bool=true;  
            },1000);
		    window.addEventListener("popstate", function(e) {

		    	if (bool)
		    	{    
		    		if(localStorage.getItem("comeWithGuess") == 4)//表示从个人中心跳转过来的
			        {   
			        
			        	location.href = pageUrl.PERSON_CENTER;
			        }
			        else if(localStorage.getItem("comeWithGuess") == 5)//表示从个人信息跳转过来的
			        {   
			        	
			        	location.href = pageUrl.MY_MESSAGE;
			        }
		    		else
		    		{       
		    			 
		    			    sessionStorage.setItem("needPageId",1)
		    			  
			        	    if(localStorage.getItem("messlistOrauction") == 1)//表示从从消息中心跳转过来的
			        	    {
			        	    	
			        	    	location.href = pageUrl.MY_MESSAGE;
			        	    }
			    			else{
			    				
			    				
			    				var obj = new Base64();
						   	
								var id_base64 = obj.encode(specialSellController.thisDataId);
										    	
								var thisPage_base64 = obj.encode(specialSellController.thisDetailPage);
										
								var str =  pageUrl.AUCTION_HISTORY  +"?backPage=" +thisPage_base64 + "&thisDataId=" + id_base64;		    	
									
								location.href = encodeURI(str);
//			    				
//			    				location.href = pageUrl.AUCTION_HISTORY + "?backPage=" + specialSellController.thisDetailPage + "&thisDataId=" + specialSellController.thisDataId;
			    			}
			    		   
		    		}
		    	}
		    	pushHistory();
		        
		    }, false); 
		    function pushHistory(){
		        var state = {
		            title: "title",
		            url: "#"
		        }; 
		        window.history.pushState(state, "title", "#");
		    }
		})
	</script>
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<script type="text/javascript" src="swiper/swiper.min.js" ></script>
	<!--controller-->
	<script src="controller/test_01_Ctr.js" ></script>
	<script>

		app.controller("ctrl", function ($scope)
		{
			
			sessionStorage.setItem("itIsAuctionPage",1);
		    
		    var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
		    ctrl.init($scope,wxParams); 
		  
		});

	</script>
	
</html>
