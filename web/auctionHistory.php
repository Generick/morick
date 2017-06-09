<!DOCTYPE html>
<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>

<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="email=no">
        <title>雅玩之家</title>
       
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css" />
        <link rel="stylesheet" href="css/newPersonal.css" />
	</head>
	<body ng-controller="ctrl">
		<div id="myself-head"  ng-click="jumpToSelfZone3()" style="position: fixed;top:10px;left:10px;width:16vw;height:16vw;display: block;z-index: 99999;">
			<img src="img/personal-enter.png"> 
		</div>
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		
		<div class="container scroll fullwidthHtml" style="background-color: #fff !important;padding:0.8%;padding-bottom: 60px;overflow:hidden;height:100%;">
			<div class="list" id="list-empty" style="background-color: #fff;overflow: hidden;">
				<ul id="selected-ul">
					<div on-finish-render-filters class="oneList sell-list-item" style="position: relative;"  id="test_{{item.commodity_id}}"  ng-click="onClickToAuctionHistoryDetail(item)" ng-repeat="item in auctionHistoryModel.TMHList">
						<div class="sell-list-item-img">
							<img ng-src="{{item.pictures}}" />
						</div>
						<div class="sell-list-item-name" ng-bind="item.info.commodity_name">
							传送到对方水范德萨范德萨范德萨水电费水电
						</div>
						<div class="sell-list-item-price-box">
							
							<div class="sell-list-item-price-word" ng-bind="'￥'+item.info.commodity_price">
								
							</div>
						</div>
					</div>
			   </ul>
            </div>

<!--			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test1.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥555550
					</div>
				</div>
			</div>
			
			
			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test2.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥222222
					</div>
				</div>
			</div>
			
			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test3.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥100000
					</div>
				</div>
			</div>-->
			<div class="no-data">暂无数据！</div>
		</div>
        
        <div class="goods-cars">
        	
        </div>
        
        <div id="acfixed-shade"  ng-click="acOkToShut()">
        	<div class="acmodied-box" id="acsure-remark">
			    <div class="acvipMark-box">
			        <img src="img/newBigVip.png">
			    </div>
			    <div class="accontents-box">
			                        本件拍品为 “VIP专享”，只有VIP才能查看详情和参与竞价。 申请成为VIP，请联系VIP客服专员, 微信号：tldwzhg(陶兰都吴掌柜)
			    </div>
			    <div class="acsure-to-do">
			    	确定
			    </div> 
			</div>
        </div>
       
        <div class="acu-chrysanthemums">
			<img src="img/loading.gif"/>
		</div>
		<div ng-include="'module/tab/tab.html'"></div>
	</body>

	<!--系统js-->
	<script type="text/javascript" src="js/zepto.min.js"></script>
	<!--<script type="text/javascript" src="js/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/angular.min.js"></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
    <script src="js/commonArr.js"></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="module/tab/tab.js"></script>
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
    <!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
    
	<!--controller-->
	<script type="text/javascript" src="controller/auctionHistoryController.js" ></script>
	
	
	<!--<script type="text/javascript" src="js/htmlNoScroll.js" ></script>-->
	
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
		    		location.href = pageUrl.AUCTION_HISTORY;
		    		
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
	        
		    AuctionHistoryCtrl.init($scope,wxParams);
		   
		});

		
	</script>
</html>
