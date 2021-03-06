<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
<!--		
		<meta  http-equivV="pragma" content="no-cache"> 
        <meta  http-equiv="Cache-Control" content="no-cache, must-revalidate"> 
        <meta  http-equiv="expires" content="0">-->
	
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="email=no">
        <title>雅玩之家</title>
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
	</head>
	<body ng-controller="ctrl" style="background: #FFFFFF;">
		<!--<div id="myself-head" ng-click="jumpToSelfZone2()" style="position: fixed;top:10px;left:10px;width:16vw;height:16vw;display: block;z-index: 99999;">
			<img src="img/personal-enter.png"> 
		</div>-->
		<!--加载动画-->
		<div class="animation" style="position:absolute;">
			<img src="img/loading.gif"/>
		</div>
		
		<!--style="position:absolute; overflow:auto;-webkit-overflow-scrolling: touch; margin-bottom:52px;top:0;left:0;right:0"-->
        <div id="container" class="container scroll" style="background: #FFFFFF;">
            <div class="xzlDown"></div>
            <div class="list" id="list-empty" style="background-color: #fff;width:93%;margin-left:3.5%;padding:12px 0;">
				<ul id="selected-ul">
					<li class="oneList" style="margin-bottom: 3.5vw;box-shadow: 0 0 1.5vw 0 #bebebe;padding-bottom: 1.2vw;" ng-repeat = "item in auctionItems" id="sel_{{item.id}}" ng-click = "onClickToGoodsDetail(item)" on-finish-render-filters>
                        <div class="item-img">
                        	<img style="position: absolute;top:1vw;left:0px;z-index: 5;width:14vw;height:14vw;" class="smallvippic" ng-show="(item.isVIP == 1)" src="img/newVip.png">
                            <b  ng-show="item.itHasBeenOk">
                            	<img src="img/aucted0.png"> 
                            </b>
                            <img style="width:100%;" ng-src="{{item.goodsInfo.goodsPicsShow}}">
                        </div>
						<div class="price" style="border-bottom: none;">
							<div ng-bind="item.goodsInfo.goods_name"></div>
							<div style="float: right;" class="clear"  ng-show="!item.itHasBeenOk">
								<span style="margin-top: 4px;"  ng-show = 'item.isShowPrice || item.initialPrice != 0'>当前价</span>
								<span ng-show = 'item.isShowPrice || item.initialPrice != 0'>
									<span style="color:#d56161;font-size:12px;">￥</span>
								    <span style="color:#d56161;font-size:16px;">{{item.isShowPrice?item.currentPrice: item.initialPrice}}</span>
									
									</span>
								<span ng-show = '!item.isShowPrice && item.initialPrice == 0' style="color:#d56161;font-size:16px;">零起拍</span>
							</div>
							<div class="aucted-content" ng-show="item.itHasBeenOk">
								<span style="color:#d56161;font-size:16px;">{{item.status==1?"流拍":item.isAucted?"成交价":"流拍"}}</span>
								<span style="color:#d56161;font-size:12px;" ng-show="item.status!=1 && item.isAucted">￥</span>
								 <span style="color:#d56161;font-size:16px;" ng-show="item.status==0 && item.isAucted" ng-bind="item.currentPrice"></span>
							</div>
						</div>
						<div ng-show="!item.itHasBeenOk" style="width:100%;overflow: hidden;" class="far-from-end-box">
							<span style="font-size:12px">距离截拍：</span>
							<span  id="sel_day{{item.id}}" style="color:#d56161;font-size:14px;padding-right:3px;"></span>天
							<span  id="sel_hour{{item.id}}" style="color:#d56161;font-size:14px;padding-right:3px;"></span>时
							<span  id="sel_min{{item.id}}" style="color:#d56161;font-size:14px;padding-right:3px;"></span>分
							<span  id="sel_sec{{item.id}}" style="color:#d56161;font-size:14px;padding-right:3px;"></span>秒
							
						</div>
						<div style="width:100%;overflow: hidden;" class="bottom-item-add">
							<span class="bottom-item-add-left">
								<img src="img/add-icon-img_1.png"  />
								<div ng-bind="item.initialPrice"></div>
							</span>
							<span style="margin-left:3vw" class="bottom-item-add-left">
								<img src="img/start-icon-img_1.png"/>
								<div  ng-bind="item.lowestPremium"></div>
							</span>
						</div>
					</li>
				</ul>
				<div class="no-more-data">
					更多精彩拍品，每晚十点上拍！
				</div>
			</div>
			
			<!--暂无数据-->
			<div class="no-data">暂无数据！</div>
		</div>
      
        
        
        <div id="fixed-shade" ng-click="okToShut()">
        	<div class="modied-box" id="sure-remark">
			    <div class="vipMark-box">
			        <img src="img/newBigVip.png">
			    </div>
			    <div class="contents-box">
			                        本件拍品为 “VIP专享”，只有VIP才能查看详情和参与竞价。 申请成为VIP，请联系VIP客服专员, 微信号：tldwzhg(陶兰都吴掌柜)
			    </div>
			    <div class="sure-to-do" ng-click="okToShut()">
			    	确定
			    </div> 
			</div>
        </div>
        
        <div class="chrysanthemums">
			<img src="img/loading.gif"/>
		</div>
		
		<div ng-include="'module/tab/tab.html'"></div>
	</body>

	<!--系统js-->
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
    <script src="js/commonArr.js"></script>
    <script src="module/tab/tab.js"></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="controller/app.js"></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
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
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js"></script>
	<!--<script type="text/javascript" src="js/htmlNoScroll.js"></script>-->
	<script type="text/javascript" src="js/xzl-down-refresh.js" ></script>
	
	<!--controller-->
	<script type="text/javascript" src="controller/selectedGoodsController.js" ></script>
	
	
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
		    		location.href = pageUrl.SELECTED_GOODS;
		    		
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
	<script>
		
	
		app.controller("ctrl", function ($scope)
		{  
			
			var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
			
			SelectCtrl.init($scope,wxParams);
		
		});

	</script>
</html>
