<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html ng-app="app">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="telephone=no">
        <title></title>
        <link rel="stylesheet" href="swiper/swiper.css" />
        <link rel="stylesheet" href="css/base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link href="plugin/layerMobile/need/layer.css">
	</head>
	<body ng-controller="ctrl">

		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
        
        <div class="container noScroll" style="overflow-y: scroll;padding-bottom: 65px;">
			<!-- Swiper -->
			<div  id="preImages" style="overflow: hidden;">
				  <div class="swiper-container">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide item-img" ng-repeat="item in goodsDetailModel.allInfo.goodsInfo.goods_pics" on-Finish-Render-Filters>
			            	<img ng-src="{{item}}"/>
			            </div>
			        </div>
	                <!-- Add Pagination -->
	                <div class="swiper-pagination"></div>
			    </div>
	
				<div class="goods-content">
					<p id="goodsContent"></p>
				</div>
			</div>
		   
			<div class="time-operate">
				<div class="end-time">
					<div class="endtime-fresh" ng-click="onClickUpdateTime()">
						<img src="img/fresh.png" />更&nbsp;新<span id="updateTime" ></span>
					</div>
					<div class="endtime-realtime clear">
						<div class="endtime-text">距离截拍:</div>
						<div class="endtime-time">
							<div id="endTime">
								<span id="day"></span>天
								<span id="hour"></span>时
								<span id="minute"></span>分
								<!--<span id="second"></span>-->
							</div>
						</div>
					</div>
				</div>
				
				<div class="goods-operate groble-operate-thrity clear">
				<div class="goods-operate-block groble-thrity clear">
					<span class="operate-type">起</span>
					<div>
						￥<span id="initialPrice" ng-bind="goodsDetailModel.allInfo.initialPrice"></span>
					</div>
				</div>
				<div class="goods-operate-block groble-thrity">
					<span class="operate-type">加</span>
					<div>
						￥<span id="lowestPremium" ng-bind="goodsDetailModel.allInfo.lowestPremium"></span>
					</div>
				</div>
				<div class="goods-operate-block groble-thrity">
					<span class="operate-type">保</span>
					<div>
						￥<span ng-bind="goodsDetailModel.allInfo.margin"></span>
					</div>
				</div>
				<!--<div class="goods-operate-block" style="padding-left: 12%;">
					<span class="operate-type">延</span>
					<div>
						<span ng-bind="goodsDetailModel.allInfo.postponeTime"></span>分钟
					</div>
				</div>-->
			</div>           
           
				<button id="goodsBtn" class="goods-btn-2" ng-click="onClickPay()">出&nbsp;价</button>
				<!--<button id="selfGoodsBtn" class="goods-btn-2" ng-click="onClickSelfPay()" ng-bind="selfPaidText"></button>-->
				<!--<button id="selfGoodsBtn" class="goods-btn-2" ng-show="goodsDetailModel.allInfo.isQuiz == '1'" ng-click="jumpToGuess(item)" >成交价竞猜</button>-->
			</div>
            
            
            
			
			<!--已委托出价条件展示-->
			<div class="self-paid-container" ng-show="hasSelfPaid">
				<div ng-repeat="item in bids track by $index">
					<span>{{$index+1}}、当金额达到</span><span ng-bind="item.triggerPrice"></span>时，自动出价到<span ng-bind="item.offerPrice"></span>
				</div>
			</div>
            <!--<div class="goods-operate-box">
                <button class="goods-operate-block2" ng-show="goodsDetailModel.showReference">
                    <span class="reference-price">参考价</span>￥<span ng-bind="goodsDetailModel.allInfo.referencePrice"></span>
                </button>
            </div>-->
          
            <div id="capped-box" class="capped-hide" style="padding-bottom:6px;height:63px">
	            <div id="capped-price-box">
	                <button id="capped-price-btn">
	                    <span id="capped-price">封顶价</span>￥<span ng-bind="goodsDetailModel.allInfo.cappedPrice"></span>
	                </button>
	            </div>
            </div>
			<div class="goods-buyer">
				
				<div class="goods-buyer-block clear">
					<li class="clear" ng-repeat="item in biddingModel.biddingList">
						<img class="buyer-icon" ng-src="{{item.userData.smallIcon}}" />
						<div class="buyer-tel" ng-bind="item.userData.telephone"></div>
						<div class="buyer-money">￥<span ng-bind="item.nowPrice"></span></div>
						<div class="pay-time" ng-bind="item.createTime*1000 | date:'yy-MM-dd HH:mm:ss'"></div>
					</li>
					<div class="check-more" ng-click="onClickCheckMore()" ng-show="biddingModel.isCheckOver" ng-bind="checkMore">查看更多</div>
				</div>
			</div>
        </div>
        <div id="reminding" class="reminding" ng-click="imSure()">
        	<img ng-show="biddingModel.biddingList.length == 0" src="img/remainLogin.png"/>
        </div>
        
        <!--出价弹窗-->
        <div class="pay-block-bg">
            <div class="pay-block" style="bottom:54px">
                <div class="pay-block-top fix">
                    <span>当前出价</span><span class="lead-price"></span><span id="closePayBlock"></span>
                </div>
                <div class="pay-price fix">
                    <span>您的出价</span>
                    <div class="pay-price-input fix">
                        <div id="payPrice"></div>
                        <div class="cursor"></div>
                    </div>
                    <img class="pay-price-img" ng-show="biddingModel.numDel" ng-click="onClickNumDel()" src="img/del.png" />
                </div>

                <div class="pay-txt" ng-show="biddingModel.count == 0 && goodsDetailModel.allInfo.margin != 0">
                    <p>保证金：<span style="color: #FF4506;">{{"￥" + goodsDetailModel.allInfo.margin}}</span></p>
                    <p>此次出价需要缴纳保证金</p>
                    <p>有关保证金详情，请浏览<span style="color: #759FE3" ng-click="onClickPayProtocol()">《雅玩之家服务协议》</span></p>
                </div>
                <!--<div class="phone-message">
	                	<span class="message-title">小贴士：</span>
	                	<span class="message-content">出价超越有短信提醒，您可以到“账户中心/付费服务”开通短信通知服务。</span>
                </div>-->
                <div class="pay-protocol">
                    <div class="goods-btn ripple" ng-click="onClickPayNow()">出价</div>
                    <p>出价即表示同意<span style="color: #759FE3" ng-click="onClickPayProtocol()">《雅玩之家服务协议》</span></p>
                </div>

                <div class="key-board fix">
                    <div class="keyboard-num" ng-click="payNumAdd(1)">
                        <div>1</div>
                        <div></div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(2)">
                        <div>2</div>
                        <div>ABC</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(3)" style="border-right: none;">
                        <div>3</div>
                        <div>DEF</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(4)">
                        <div>4</div>
                        <div>GHI</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(5)">
                        <div>5</div>
                        <div>JKL</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(6)" style="border-right: none;">
                        <div>6</div>
                        <div>MNO</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(7)">
                        <div>7</div>
                        <div>PQRS</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(8)">
                        <div>8</div>
                        <div>TUV</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(9)" style="border-right: none;">
                        <div>9</div>
                        <div>WXYZ</div>
                    </div>

                    <div class="keyboard-num" ng-click="payNumAdd(10)" style="background-color: #d1d5da;">
                        <div class="double-zero">00</div>
                    </div>
                    <div class="keyboard-num" ng-click="payNumAdd(0)">
                        <div class="single-zero">0</div>
                    </div>
                    <div class="keyboard-num" ng-click="delPayNum()" style="background-color: #d1d5da;border-right: none;">
                        <div class="back-del"><img src="img/back-del.png" /></div>
                    </div>
                </div>
            </div>
        </div>
        

        <!--委托出价弹窗-->
        <div class="self-pay-block-bg">
            <div class="pay-block" style="background-color: #fff;padding: 15px 0;margin-bottom:52px">
                <div class="self-pay-title">委托出价</div><img id="closeSelfBlock" style="width: 22px;height: 22px;position: absolute;top: 15px;right: 10px;" src="img/del-big.png" />
                <div class="self-pay-condition">
                    <div ng-repeat="item in priceArr">
                        当出价金额达到 <input type="tel" ng-model="item.triggerPrice" />
                        元时,自动出价至 <input type="tel" ng-model="item.offerPrice" />
                    </div>
                    <!--<div>当出价金额达到 <input type="tel" ng-model="triggerPrice2" /> 元时,自动出价至 <input type="tel" ng-model="offerPrice2" /></div>
                    <div>当出价金额达到 <input type="tel" ng-model="triggerPrice3" /> 元时,自动出价至 <input type="tel" ng-model="offerPrice3" /></div>-->
                    <div style="color: #000;text-align: left;padding-left: 5px;margin-top: 5px;font-size: 13px;">1、自动出价金额不得低于触发金额+拍品加价金额<span style="color: #FF4506;">{{"￥"+goodsDetailModel.allInfo.lowestPremium}}</span>，否则为无效设置</div>
                    <div style="color: #000;text-align: left;padding-left: 5px;font-size: 13px;">2、委托出价只能使用一次，使用委托出价后可使用手动出价</div>
                </div>
                <div class="goods-operate groble-operate-thrity clear">
                    <div class="goods-operate-block groble-thrity  clear">
                        <span class="operate-type">起</span>
                        <div>
                            ￥<span ng-bind="goodsDetailModel.allInfo.initialPrice"></span>
                        </div>
                    </div>
                    <div class="goods-operate-block groble-thrity">
                        <span class="operate-type">加</span>
                        <div>
                            ￥<span ng-bind="goodsDetailModel.allInfo.lowestPremium"></span>
                        </div>
                    </div>
                    <!--<div class="goods-operate-block groble-thrity" style="padding-left: 12%;>
                        <span class="operate-type">加</span>
                        <div>
                            ￥<span ng-bind="goodsDetailModel.allInfo.lowestPremium"></span>
                        </div>
                    </div>-->
                    <div class="goods-operate-block groble-thrity">
                        <span class="operate-type">保</span>
                        <div>
                            ￥<span ng-bind="goodsDetailModel.allInfo.margin"></span>
                        </div>
                    </div>
                    <!--<div class="goods-operate-block" style="padding-left: 12%;">
                        <span class="operate-type">延</span>
                        <div>
                            <span ng-bind="goodsDetailModel.allInfo.postponeTime"></span>分钟
                        </div>
                    </div>-->
                </div>
                <button class="goods-operate-block2" ng-show="goodsDetailModel.allInfo.cappedPrice > 0">
                    <span class="reference-price">封顶价</span>￥<span ng-bind="goodsDetailModel.allInfo.cappedPrice"></span>
                </button>

                <button class="goods-btn-2" ng-click="onClickToSelfPaid()">确&nbsp;定</button>
            </div>
        </div>
        
    
    	<!--底部tab-->
	    <div ng-include="'module/tab/tab.html'"></div>
	</body>
	
	<!--系统js-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	
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
 	<script>
		$(function() {
			//出价弹窗
			$('.pay-block-bg').click(function(){
				$('.pay-block-bg').css('display','none');
			});
			
			$('.pay-block').click(function(e){
				e.stopPropagation();
			});
			
			$('#closePayBlock').click(function(){
				$('.pay-block-bg').css('display','none');
			});
			
			//委托出价弹窗
			$('.self-pay-block-bg').click(function(){
				$('.self-pay-block-bg').css('display','none');
			});
			
			$('#closeSelfBlock').click(function(){
				$('.self-pay-block-bg').css('display','none');
			});
			
			//监听微信返回按钮
			pushHistory();
			var bool=false;

            setTimeout(function(){
                bool=true;
            },1200);
		    window.addEventListener("popstate", function(e) {
		    	if (bool)
		    	{  
		    		if(commonFu.isEmpty(localStorageKey.FROM_LOCATION) || (localStorage.getItem(localStorageKey.FROM_LOCATION) == 0))//0:表示从主页进，1:表示从我的竞拍进入，2:表示从浏览记录进入
		    		{   
		    			
		    			location.href = pageUrl.SELECTED_GOODS +"?backPage=" + GoodsInfoCtrl.thisDetailPage + "&thisDataId=" + GoodsInfoCtrl.thisDataId;
                         sessionStorage.setItem("needPage",1)
		    		
		    		}

		    		else
		    		{
		    			if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
		    			{
		    				if(localStorage.getItem(localStorageKey.FROM_LOCATION) == 1)//0:表示从主页进，1:表示从我的竞拍进入，2:表示从浏览记录进入
		    				{   
		    					location.href = pageUrl.MY_BIDDING + "?userId=" + localStorage.getItem(localStorageKey.userId);
		    				}
		    				else if(localStorage.getItem(localStorageKey.FROM_LOCATION) == 2)//0:表示从主页进，1:表示从我的竞拍进入，2:表示从浏览记录进入
			        	    {
			        			location.href = pageUrl.SCAN_RECORDS;
			        	    }
			        	    else
			        	    {
			        	    	
			        	    }
		    			}
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
		});
		
	
	
	</script>
	<script src="module/tab/tab.js"></script>     
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmDialog.js" ></script>
	
	
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<script type="text/javascript" src="swiper/swiper.min.js" ></script>
	<script type="text/javascript" src="controller/goodsDetailController.js" ></script>
	<script>
		app.controller("ctrl", function($scope) {
	
			sessionStorage.setItem("itIsSelectPage",1);
			
		    var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
	        GoodsInfoCtrl.init($scope,wxParams);
		   
		});
	</script>
	
	
   
</html>