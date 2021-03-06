<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/24/2017
 * Time: 5:52 PM
 */
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
    session_start();

	
	$currentUrl = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
	$_SESSION['id'] = isset($_GET['id'])?$_GET['id']:'';
	$_SESSION['thisAcPage'] = isset($_GET['thisAcPage'])?$_GET['thisAcPage']:'';
	$flag = strpos($_SERVER['HTTP_HOST'],'yawan365.com')>0?($_SERVER['SERVER_PORT'] == 80? true:false):false;
//	$flag = false;
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') == true && $flag) 
    {

	    //配置参数的数组
	    $CONF =  array(
	        '__APPID__' =>'wx8aa4883c737caaaa',
	        '__SERECT__' =>'620937dd20bdecf9e84f369d2ef64305',
	        '__CALL_URL__' =>$currentUrl, //当前页地址
	    );
	    //没有传递code,先获取code
	    if(!isset($_REQUEST['code']) || empty($_REQUEST['code']))
	    {

	        $getCodeUrl  =  "https://open.weixin.qq.com/connect/oauth2/authorize".
	            "?appid=" . $CONF['__APPID__'] .
	            "&redirect_uri=" . urlencode($CONF['__CALL_URL__']).//需要encode url
	            "&response_type=code".
	            "&scope=snsapi_base". //scope设置为snsapi_base
	            "&state=1";

	        //跳转微信获取code值,去登陆
	        header('Location:' . $getCodeUrl);
	        exit;
	    }

        $code = trim($_REQUEST['code']);
	    if($code == $_SESSION['code'])
	    {
			$params = "?id=".$_SESSION['id'].'&thisAcPage='.$_SESSION['thisAcPage'];
			header('Location:'.'http://'.$_SERVER['SERVER_NAME'].$_SERVER['PHP_SELF'].$params);die;
		}
        //使用code，拼凑链接获取用户openid
        $getTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token".
            "?appid={$CONF['__APPID__']}".
            "&secret={$CONF['__SERECT__']}".
            "&code={$code}".
            "&grant_type=authorization_code";

        $data = https_request($getTokenUrl);
        $token_get_all = json_decode($data);
        $openid = $token_get_all->openid;
        // echo $openid;
	    $_SESSION['openId'] = $openid;
	    $_SESSION['code'] = $code;

    }
    else
    {
		//echo 'not in wechat';
	}

    function https_request($url, $data = null)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data))
        {
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
		<meta name="format-detection" content="telephone=no">
        <title>雅玩之家</title>
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="css/person_center.css" />
        <link rel="stylesheet" href="css/ui.mine.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css">
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="css/newPersonal.css" />
	</head>
	<body ng-controller="ctrl">
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif"/>
		</div>

	<div class="container scroll" id="myselfbox" style="position:absolute; overflow:auto;-webkit-overflow-scrolling: touch; top:0; left:0; bottom:54px; right:0;background: #ffffff;">
			<div class="up-part-box">
				<div class="new-per-head-box">
				<div class="new-per-head-box-img" ng-click="onClickToPersonInfo()">
					<img ng-src="{{mySmallIcon}}"  />
				</div>
				<div class="new-per-head-box-name" ng-click="onClickToPersonInfo()" ng-bind="mySelfName">
					
				</div>
				<div class="new-per-head-box-bottom" ng-click="onClickToMyAccount()">
					<div class="new-per-head-box-bottom-harf" style="padding-left:14px">
						<span class="new-per-head-box-bottom-icon">
							<img src="img/newPic/icrons.png" />
						</span>
						<span class="new-per-head-box-bottom-number" style="margin-left:5px;margin-right:5px" ng-bind="balanceMoney">
						
						</span>
						<span class="new-per-head-box-bottom-word">
						    可用金币
						</span>
					</div>
					<div class="new-per-head-box-bottom-harf">
						<span class="new-per-head-box-bottom-icon">
							<img src="img/newPic/icrons.png" />
						</span>
						<span class="new-per-head-box-bottom-number" style="margin-left:5px;margin-right:5px" ng-bind="frizenMoney">
							
						</span>
						<span class="new-per-head-box-bottom-word">
						    冻结金币
						</span>
					</div>
				</div>
			</div>
			<div class="new-per-head-box-tab">
				<!--<div class="new-per-middle-line">
					
				</div>-->
				<div class="new-per-head-box-tab-harf" ng-click="toAnotherSlide(0)">
					<span class="new-per-mess-title">
						消息批阅
					    <span class="new-per-mess-number" ng-bind="unReadCount" ng-show="unReadCount !=0">11</span>
					</span>
					
				</div>
				<!--<div class="new-per-head-box-tab-harf" ng-click="toAnotherSlide(1)">
					<span class="new-per-mess-title">已批阅</span>
				</div>
				<div class="new-per-head-box-tab-slide">
					
				</div>-->
			</div>
			</div>
			
			
	    <div class="the-big-scroll-content" style="position: relative;">
			<div class="new-pre-message-box">
				
				
<!--				
				<div class="new-pre-message-box-item">
					<div class="new-pre-deleteIn-box">
						<div class="new-pre-content-box">
									<div class="new-pre-message-box-item-left">
								<img class="new-pre-message-box-item-left-box-bg" src="img/newPic/systembg.png" /> 
								
							</div>
							<div class="new-pre-message-box-item-center">
								<div  class="new-pre-message-box-item-center-title">
									打广告和
								</div>
								<div  class="new-pre-message-box-item-center-content">
									是发送方单方
								</div>
							</div>
							<div class="new-pre-message-box-item-right">
								<div class="new-pre-message-box-item-right-time">
									2017-5-23
								</div>
							</div>
						</div>
						
						<div class="new-pre-delete-button" ng-click="deleteThis()">
							删除
						</div>
					</div>
					
				</div>
				-->
				
				
				<div class="new-pre-message-box-item" ng-class="{true:'bg-black-half',false:''}[item.isRead == 0]" ng-repeat="item in messageList" ng-click="readMessage(item)">
					<div class="new-pre-message-box-item-left">
						<img class="new-pre-message-box-item-left-box-bg" ng-show="item.msg_type == 0" src="img/newPic/systembg.png" /> 
						<!--<img class="new-pre-message-box-item-left-box-bg" ng-show="item.msg_type == 3" src="img/newPic/auctionbg.png" />--> 
						<!--<img class="new-pre-message-box-item-left-box-bg" ng-show="item.msg_type == 4" src="img/newPic/guessbg.png" />--> 
						<img class="new-pre-message-box-item-left-box-bg" ng-show="item.msg_type != 0" src="img/newPic/orderbg.png" /> 
					</div>
					<div class="new-pre-message-box-item-center">
						<div  class="new-pre-message-box-item-center-title" ng-bind="item.msg_title">
							
						</div>
						<div class="new-pre-message-box-item-right">
							<div class="new-pre-message-box-item-right-time" ng-bind="item.create_time*1000 | date:'MM-dd HH:mm'">
								
							</div>
					    </div>
						<div  class="new-pre-message-box-item-center-content" ng-bind="item.msg_content">
							
						</div>
						<div class="unreadRound" ng-show="item.isRead == 0"></div>
					</div>
					
				</div>
				
				<!--<div class="new-pre-message-box-item">
					<div class="new-pre-message-box-item-left">
						<img class="new-pre-message-box-item-left-box-bg" src="img/newPic/auctionbg.png" /> 
						
					</div>
					<div class="new-pre-message-box-item-center">
						<div  class="new-pre-message-box-item-center-title">
							打广告和规范价格规范和师傅
						</div>
						<div  class="new-pre-message-box-item-center-content">
							是发送方单方大概对方答复挂的法规和对方水电费嘎哈的功夫大
						</div>
					</div>
					<div class="new-pre-message-box-item-right">
						<div class="new-pre-message-box-item-right-time">
							2017-5-23
						</div>
					</div>
				</div>
				<div class="new-pre-message-box-item">
					<div class="new-pre-message-box-item-left">
						<img class="new-pre-message-box-item-left-box-bg" src="img/newPic/guessbg.png" /> 
						
					</div>
					<div class="new-pre-message-box-item-center">
						<div  class="new-pre-message-box-item-center-title">
							打广告和
						</div>
						<div  class="new-pre-message-box-item-center-content">
							是发送方单方大概对方答复挂的法规和对方水电费嘎哈的功夫大师当
						</div>
					</div>
					<div class="new-pre-message-box-item-right">
						<div class="new-pre-message-box-item-right-time">
							2017-5-23
						</div>
					</div>
				</div>
				<div class="new-pre-message-box-item">
					<div class="new-pre-message-box-item-left">
						<img class="new-pre-message-box-item-left-box-bg" src="img/newPic/orderbg.png" /> 
						
					</div>
					<div class="new-pre-message-box-item-center">
						<div  class="new-pre-message-box-item-center-title">
							打广告和规范价格规
						</div>
						<div  class="new-pre-message-box-item-center-content">
							是发送方单方大概对方答复挂的法规和
						</div>
					</div>
					<div class="new-pre-message-box-item-right">
						<div class="new-pre-message-box-item-right-time">
							2017-5-23
						</div>
					</div>
				</div>
				-->
				
				<div class="there-is-no-data">
					<img src="img/newPic/thereIsNoData.png" /> 
					<div class="there-is-no-data-word">
						没有待批阅的消息哦
					</div>
			    </div>
			</div>
		</div>  
		<!--<div class="no-data-2">暂无数据！</div>-->  
	</div>
		<div class="animation-2">
			<img src="img/loading.gif"/>
		</div>
		<div class="chrysanthemums">
			<img src="img/loading.gif"/>
		</div>
        <div ng-include="'module/tab/tab.html'"></div>
        
        
	</body>
	<!--系统js-->
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	<!--<script type="text/javascript" src="js/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
  
    <script src="controller/app.js"></script>
    <script src="js/commonArr.js"></script>
    <script src="module/tab/tab.js"></script>
      
    <!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<!--<script type="text/javascript" src="js/htmlNoScroll.js" ></script>-->
   
	<!--controller-->
	<script type="text/javascript" src="controller/newPersonerController.js"></script>
	<script>
		
		
		app.controller("ctrl", function ($scope)
		{   
			
			localStorage.removeItem("comeIntoOrder");
			var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
		    newPersonCenterCtrl.init($scope,wxParams);
		   
		});
	</script>
   
	 <script>
		$(function() {
			
			//监听微信返回按钮
			pushHistory();
			var bool=false;

            setTimeout(function(){
                bool=true;
            },1000);
		    window.addEventListener("popstate", function(e) {
		    	if (bool)
		    	{   
		    		
		    			if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
		    			{   
		    				
			        	    location.href = pageUrl.PERSON_CENTER;
			        
		    			}
		    	
		    	}
		    	pushHistory();

		    }, false);
		    function pushHistory() {
		        var state = {
		            title: "title",
		            url: "#"
		        };
		        window.history.pushState(state, "title", "#");
		    }
		})
	</script>
	
</html>

