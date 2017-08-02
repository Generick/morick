
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
	$flag = strpos($_SERVER['HTTP_HOST'],'yawan365.com')>0?($_SERVER['SERVER_PORT'] == 80? true:false):false;
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') == true && $flag) {

            //配置参数的数组
            $CONF =  array(
                '__APPID__' =>'wx8aa4883c737caaaa',
                '__SERECT__' =>'620937dd20bdecf9e84f369d2ef64305',
                '__CALL_URL__' =>$currentUrl //当前页地址
            );
            //没有传递code的情况下，先登录一下
            if(!isset($_REQUEST['code']) || empty($_REQUEST['code'])){

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
	    if($code == $_SESSION['code']){
		header('Location:'.'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
	}
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
	    $_SESSION['code'] = $code;

        }else{
//echo 'not in wechat';

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
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		<div class="container" style="overflow-y: scroll;padding-bottom:16vw;background: #FFFFFF;margin-bottom:56px">
			<!-- Swiper -->
		    <div class="swiper-container">
		        <div class="swiper-wrapper" id="preImages">
		            <div class="swiper-slide item-img" ng-repeat="item in specilSellPictureArr" on-Finish-Render-Filters>
		            	<img ng-src="{{item}}" style="height:auto;margin:0 auto">
		            		<!--<div class="swiper-imgs" style="background-image: url({{item}})"></div>-->
		            </div>
		        </div>
 
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <div class="goods-content" style="padding-bottom:0;width:100%;overflow:hidden;padding-top:12px">
            	<div class="num-name-box">
            		<p class="special-sell-name" ng-bind="specialName">
	            		第三方第三方三发斯蒂芬大师法第三地方撒第三方大分
	            	</p>
	            	
            		<p class="special-sell-num">
            		<!--李小波 改动-->
            	    <!--<span ng-bind="specialNumber"></span>
            	    <span>库存</span>-->
            	    <span ng-bind='specialNumber'></span>
	            	</p>
	            	
            	</div>
            	
            	<p class="special-sell-content" ng-bind="specialDesc">
            		的广泛的施工方覆盖是的法规地方地方撒对方是个对方是个广东佛山覆盖格式个地方和高度规范规范沪电股份沪电股份沪电股份
            	</p>
            </div>
            <div class="sell-price-number-box">
            	<span style="padding-left:5px;" class="sell-price-box" ng-bind="viewPrice">
            		￥50000
            	</span>
            	<!--<span class="sell-number-box">
            	     <span>库存</span>
            	     <span ng-bind="specialNumber">222</span>
            	     <span>件</span>
            	</span>-->
            </div>
            
            <div class="special-sell-rich"  id="preImagesTwo">
            	<!--李小波 改动-->
            	<!--<p class="special-sell-rich-title">
            		商品详情
            	</p>-->
            	
            	<div id="special-sell-detail-content" style="line-height:23px"></div>
            </div>
		</div>
		<!--<div class="click-to-buy">
			购买
		</div>-->
		<div class="bottom-bye-button" ng-click="jumpToBye()">
			立即购买
			<!--<div class="opc-bye-button"></div>
			-->
		</div>
		
		
		<div class="fixed-add-goods-box" ng-click="cancleAddNumber()"></div>
		<div class="add-goodsNumber-box">
			<div class="add-goodsNumber-box-inner">
				<div class="add-goodsNumber-title-cancle" ng-click="cancleAddNumber()">
					<img src="img/newPic/deleicon.png" /> 
			    </div>
				<div class="add-goodsNumber-title">
					<div class="add-goodsNumber-title-words">请选择您购买的商品数量</div>
					<!--<div class="add-goodsNumber-title-cancle" ng-click="cancleAddNumber()">X</div>-->
					
				</div>
				<div class="add-goodsNumber-content">
					<div class="add-goodsNumber-content-inner">
						<div class="add-goodsNumber-pre" ng-click="reduceNumber(0)">
							<img src="img/newPic/bodcut.png" /> 
						</div>
						<div class="add-goodsNumber-input">
							<input id="chooseGoodsNum" type="number" ng-model="buyNumber" ng-change="checkNumber()"/>
						</div>
						<div class="add-goodsNumber-nex" ng-click="reduceNumber(1)">
							<img src="img/newPic/bodadd.png" /> 
						</div>
					</div>
					
				</div>
				<div class="add-goodsNumber-bottom">
					<!--<div class="add-goodsNumber-bottom-cancle" ng-click="cancleAddNumber()">取消</div>-->
					<!--<img src="img/newPic/pay_bg.png"  />-->
					<div class="add-goodsNumber-bottom-sure" ng-click="yesToCheckOver()">确定</div>
				</div>
			</div>
			
		</div>
		
		
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
	<script src="controller/auctedGoodsDetailController.js" ></script>
	<script>

		app.controller("ctrl", function ($scope)
		{
			
			sessionStorage.setItem("itIsAuctionPage",1);
		    
		    var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
		    specialSellController.init($scope,wxParams); 
		  
		});

	</script>
	
</html>
