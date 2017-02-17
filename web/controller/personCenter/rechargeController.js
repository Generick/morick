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

    	//提交
    	self.scope.onClickRechargeAccount = function()
    	{
            $dialog.msg("充值功能，敬请期待");
    		//if (commonFu.isEmpty(self.rechargeModel.money))
    		//{
    		//	$confirmTip.show("请输入金额");
    		//}
    	};

        self.scope.wxRecharge = function(){
            $dialog.msg("充值功能，敬请期待")
        }
    }
};
