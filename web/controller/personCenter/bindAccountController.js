/*
 * 
 * 账号绑定
 * 
 */
var bindAccountApp = angular.module('bindAccountApp', []); 
//点击事件的初始化
bindAccountApp.run(function (){
    FastClick.attach(document.body); 
});

bindAccountApp.controller("bindAccountController", function ($scope)
{
    bindAccountController.init($scope);
});


var bindAccountController = 
{
    scope : null,
    
    bindModel : 
    {
    	bindType : null,
    	bindAccount : null,
    	
    	mail : null,
    	QQ : null,
    	weChat : null,
    	
    	mailBind : false,
    	QQBind : false,
    	weChatBind : false
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
    },
    
    initData : function ()
    {
    	var self = this;
    	
    	self.bindModel.mailBind = false;
    	self.bindModel.QQBind = false;
    	self.bindModel.weChatBind = false;
    	
    	if(location.href.indexOf("?") > 0)
    	{
    		self.bindModel.bindType = commonFu.getQueryStringByKey("bindType");
    		self.bindModel.bindAccount = commonFu.getQueryStringByKey("bindAccount");
    		
    		if (self.bindModel.bindType == 0)
    		{
    			self.bindModel.QQBind = true;
    			self.bindModel.QQ = parseInt(self.bindModel.bindAccount);
    		}
    		else if (self.bindModel.bindType == 1)
    		{
    			self.bindModel.weChatBind = true;
    			self.bindModel.weChat = self.bindModel.bindAccount;
    		}
    		else
    		{
    			self.bindModel.mailBind = true;
    			self.bindModel.mail = self.bindModel.bindAccount;
    		}
    	}
    	
    	
    	
    	self.scope.bindModel = self.bindModel;
    	
    },
    
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	
    	//提交
    	self.scope.onClickSubmitBind = function()
    	{
    		if (self.bindModel.bindType == 0)
    		{
    			if (commonFu.isEmpty(self.bindModel.QQ))
    			{
    				$confirmTip.show("请填写QQ号");
    				return;
    			}
                if(!commonFu.isIntNumber(self.bindModel.QQ))
                {
                    $confirmTip.show("请填写正确的QQ号");
                    return;
                }

    			self.bindModel.bindAccount = self.bindModel.QQ;
    		}

    		if (self.bindModel.bindType == 1)
    		{
    			if (commonFu.isEmpty(self.bindModel.weChat))
    			{
    				$confirmTip.show("请填写微信号");
    				return;
    			}
    			self.bindModel.bindAccount = self.bindModel.weChat;
    		}

    		if (self.bindModel.bindType == 2)
    		{
    			if (commonFu.isEmpty(self.bindModel.mail))
    			{
    				$confirmTip.show("请填写邮箱号");
    				return;
    			}

				if (!commonFu.isLegalEmail(self.bindModel.mail))
				{
					$confirmTip.show("请填写正确的邮箱号");
					return;
				}

				self.bindModel.bindAccount = self.bindModel.mail;

    		}

    		var params = 
    		{
    			bindType : self.bindModel.bindType,
    			bindAccount : self.bindModel.bindAccount
    		};
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_BIND_ACCOUNT, params, function()
    		{
    			$confirmTip.show("绑定成功");
    			setTimeout(function(){
    				window.history.go(-1);
    			},500)
    		})
    	}
    }
};
