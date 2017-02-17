/*
 * 付费服务
 */

app.controller("ctrl", function ($scope)
{
    PaidServicesCtrl.init($scope);
});


var PaidServicesCtrl = {
    scope : null,
    
    selfPaidServicesModel:
    {
    	services : [],
    	hasOpen1 : false,
    	hasOpen2 : false,
    	msgStartTime : null,
    	msgEndTime : null,
    	selfPaidStartTime : null,
    	selfPaidEndTime : null
    },
    
    configData : {},//包月服务价格
    
    cfg_sms : null,
    cfg_bids : null,
    
    balance : null,
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.getSelfInfo();
    	
    	this.initData();
    },
    
    initData : function ()
    {
    	var self = this;
    	$('.animation').css('display','block');
    	
    	self.configData = JSON.parse(localStorage.getItem(localStorageKey.configData));
    	
    	self.cfg_sms = self.configData.cfg_sms;
    	self.cfg_bids = self.configData.cfg_bids;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_SELF_PAID_SERVICES, {}, function(data)
    	{
    		self.selfPaidServicesModel.services = [];
    		self.selfPaidServicesModel.services = data.services;
    		if (self.selfPaidServicesModel.services.length == 0)
    		{
    			self.selfPaidServicesModel.hasOpen1 = false;
    			self.selfPaidServicesModel.hasOpen2 = false;
    		}
    		else if (self.selfPaidServicesModel.services.length == 1)
    		{
    			var timestamp = commonFu.getTimeStamp();
    			if (self.selfPaidServicesModel.services[0].serviceType == 0)
    			{
    				self.selfPaidServicesModel.hasOpen2 = false;
    				
    				if (self.selfPaidServicesModel.services[0].endTime > timestamp)
    				{
    					self.selfPaidServicesModel.hasOpen1 = true;
    					self.selfPaidServicesModel.msgStartTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[0].startTime, 2);
    					self.selfPaidServicesModel.msgEndTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[0].endTime, 2);
    				}
    				else
    				{
    					self.selfPaidServicesModel.hasOpen1 = false;
    				}
    			}
    			else
    			{
    				self.selfPaidServicesModel.hasOpen1 = false;
    				if (self.selfPaidServicesModel.services[0].endTime > timestamp)
    				{
    					self.selfPaidServicesModel.hasOpen2 = true;
    					self.selfPaidServicesModel.selfPaidStartTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[0].startTime, 2);
    					self.selfPaidServicesModel.selfPaidEndTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[0].endTime, 2);
    				}
    				else
    				{
    					self.selfPaidServicesModel.hasOpen1 = false;
    				}
    			}
    		}
    		
    		else
    		{
    			for (var i = 0;i < self.selfPaidServicesModel.services.length;i ++)
    			{
    				var timestamp = commonFu.getTimeStamp();
    				if (self.selfPaidServicesModel.services[i].serviceType == 0)
    				{
    					self.selfPaidServicesModel.hasOpen1 = false;
    					if (self.selfPaidServicesModel.services[i].endTime > timestamp)
    					{
    						self.selfPaidServicesModel.hasOpen1 = true;
    						self.selfPaidServicesModel.msgStartTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[i].startTime,2);
    						self.selfPaidServicesModel.msgEndTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[i].endTime,2);
    					}
    				}
    				else
    				{
    					self.selfPaidServicesModel.hasOpen2 = false;
    					if (self.selfPaidServicesModel.services[i].endTime > timestamp)
    					{
    						self.selfPaidServicesModel.hasOpen2 = true;
    						self.selfPaidServicesModel.selfPaidStartTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[i].startTime,2);
    						self.selfPaidServicesModel.selfPaidEndTime = commonFu.getFormatDate(self.selfPaidServicesModel.services[i].endTime,2);
    					}
    				}
    			}
    		}

    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		
    		self.scope.configData = self.configData;
    		self.scope.selfPaidServicesModel = self.selfPaidServicesModel;
    		self.scope.$apply();
    	})
    },
    
    //获取个人账户信息
    getSelfInfo : function()
    {
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data)
    	{
    		self.balance = data.userInfo.balance;
    		self.scope.$apply();
    	})
    },

    bindClick: function ()
    {
    	var self = this;

        self.scope.agreeProtocol = function(){
            $dialog.msg("功能更新中，敬请期待...");
        };
    	
    	//开通服务
    	self.scope.onClickToOpenService = function(index)
    	{
    		if (index == 0)
    		{
    			if (parseFloat(self.cfg_sms) < parseFloat(self.balance))
    			{
    				$confirmDialog.show('是否开通短信包月服务',function()
	    			{
	    				var param = {
		    				serviceType: 0
		    			};
		    			
		    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_OPEN_SELF_PAID, param, function(data)
		    			{
		    				$confirmTip.show("开通成功");
		    				self.initData();
		    			})
	    			})
    			}
    			else
    			{
    				$confirmTip.show("余额不足，请及时充值");
    				setTimeout(function()
    				{
    					location.href = pageUrl.ACCOUNT_RECHARGE;
    				},1000)
    			}
	    		
    		}
    		else
    		{
    			if (parseFloat(self.cfg_bids) < parseFloat(self.balance))
    			{
    				$confirmDialog.show('是否开通委托出价服务',function()
	    			{
	    				var param = 
		    			{
		    				serviceType : 1
		    			};
		    			
		    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_OPEN_SELF_PAID, param, function(data)
		    			{
		    				$confirmTip.show("开通成功");
		    				self.initData();
		    			})
	    			})
    			}
    			else
    			{
    				$confirmTip.show("余额不足，请及时充值");
    				setTimeout(function()
    				{
    					location.href = pageUrl.ACCOUNT_RECHARGE;
    				},1000)
    			}
    		}
    	}
    }
};
