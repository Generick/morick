/*
 * 
 * 充值
 * 
 */

app.controller("ctrl", function ($scope)
{
    RechargeCtrl.init($scope);
});

var RechargeCtrl =
{
    scope : null,
     
    rechargeModel : 
    {
    	money : null
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.scope.rechargeModel = this.rechargeModel;
    	
    	this.bindClick();
    	
    	this.initData();
    },
    
    initData : function ()
    {
    	var self = this;
    },
    
    
    bindClick  : function ()
    {
    	var self = this;
        
        //清空输入列表
        self.scope.clearTheBox = function(){
        	
        	$("#inputed-money").val('');
        };
    	//提交充值请求
    	self.scope.onClickRechargeAccount = function()
    	{   
    		var priceCount = self.rechargeModel.money;
    		
    		if(commonFu.isEmpty(priceCount))
	    	{   
	    		$confirmTip.show("请输入充值金额");
	    	    return;
	    	}
	    	if(parseFloat(priceCount) == 0)
    		{
    			$confirmTip.show("充值金额不能为0");
	    	    return;
    		}
    		if(priceCount.indexOf('.') != -1)
			{
				var preStr = null,nexStr = null;
				
				if(priceCount.split('.')[0] == '')
				{
					preStr = '0.';
				}
				else{
					
					preStr = priceCount.split('.')[0]+'.';
				}
				
				nexStr = priceCount.split('.')[1].substring(0,2);
				
				if(nexStr.indexOf('.') != -1)
				{
					nexStr = nexStr.replace('.','0')
				}
				priceCount =  preStr + nexStr;
				
			}
    		if(parseFloat(priceCount) > 100000)
    		{   
    			if(parseFloat(priceCount) > 100000 && parseFloat(priceCount) < 1000000)
    			{
    				$confirmTip.show("金额不能大于10万");
    			}
    			if(parseFloat(priceCount) >= 1000000)
    			{
    				$confirmTip.show('充值金额达'+ (parseFloat(priceCount)/10000).toFixed(2)+'万，系统原地爆炸!');
    		   
    			}
    		    return;
    		}
    		if(parseFloat(priceCount) == 0)
    		{
    			$confirmTip.show("充值金额不能为0");
	    	    return;
    		}
	    	priceCount = parseFloat(priceCount).toFixed(2);//限制最小只能输入到分
	    	
	    	var params= {};
	    	params.money = priceCount;
	       
	    	//输入金额合法后，调后台接口
	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_RECHARGE, params, function(data)
	    	{
	    		
				if(data == null || data == "")
				{
				    return;
				}   
	    		//当从后台得到商品单号等数据后，跳转到微信授权页面进行授权，带过去的参数有，单号的id，交易金额price
	    		var total = parseInt(data.rechargeInfo.price) * 100;
	    		location.href = pageUrl.TO_WX_LOGIN + "?rechargeId=" + data.rechargeInfo.rechargeId + "&price=" + total;

	    	});  
    	};

    }
		//测试环境的微信支付回调地址  http://meeno.f3322.net:8082/auction/index.php/wx/WxCallback/notify
};



function checkMoney(obj){  
      var id = obj.id;  
      var val =obj.value;  
      var regStrs = [  
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0  
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点  
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点  
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上  
    ];  
      for(i=0; i<regStrs.length; i++){  
        var reg = new RegExp(regStrs[i][0]);  
        obj.value = obj.value.replace(reg, regStrs[i][1]);  
    }  
    }  