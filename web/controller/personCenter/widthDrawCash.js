

var withDrawCash = angular.module("drawCashApp",[]);

withDrawCash.controller("ctrl", function($scope){
	
	withDrawCashController.init($scope);
	
});

var  withDrawCashController = 
{
	scope : null,
	
	isSelected : true,
	
	userId : null,
	
	myBalance : null,
	
	noticeModel : {
		
		highestPrice : 3000
	},
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getUserInfo();
		
		this.getDrawCashData();
		
		this.clickBinnd();
		
	},
	
	getUserInfo : function(){
		
		var self =this;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){

			self.userId = data.userInfo.userId;
			self.myBalance = data.userInfo.balance;
			self.scope.noticeModel =  self.noticeModel;
		    self.scope.$apply();
		});
		
	   
	},
	
	getDrawCashData : function(){
		
		var self = this;
		
		$("#draw-way-no").css("display","none");
    	$("#draw-way-yes").css("display","block");
	},
	
	
	clickBinnd : function(){
		var self = this;
		
		self.scope.toShowNotice = function(){
			
			$("#notice-mession").css("display","block");
		};
		
		
		self.scope.closeNotice = function(){
			
			$("#notice-mession").css("display","none");
		};
		
		//清除微信输入框
		self.scope.clearWxBox = function(){
			
			$("#type-wx-input").val("");
		};
		
		self.scope.sureToDraw = function(){
			
			var priceCount = $("#type-money-count").val();
			
			var wxNum = $("#type-wx-input").val();
			if(commonFu.isEmpty(priceCount))
			{   
				$dialog.msg("请输入金额");
				return;
			}
			
			if(isNaN(parseFloat(priceCount)))
			{   
				
				$dialog.msg("输入金额不合法");
				return;
			}
			
			if(parseFloat(priceCount) <= 0)
			{
				$dialog.msg("提现金额应大于0");
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
			
			if(parseFloat(priceCount) <= 0)
			{
				$dialog.msg("提现金额应大于0");
				return;
			}
			
			if(parseFloat(self.myBalance) < parseFloat(priceCount))
			{
				$dialog.msg("您的余额不足！");
				return;
			}
			if(parseFloat(priceCount) > self.highestPrice)
			{
				$dialog.msg("提现金额不能大于" + self.highestPrice);
				return;
			}
			
			if(wxNum.length < 5)
			{
				$dialog.msg("请输入正确的微信号");
				return;
			}
			
			if(self.isSelected)
			{
				var params = {};
				params.userId = self.userId;
				params.withdrawCash = priceCount;
				params.wx_account = wxNum;
                
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_WITHDRAWCRASH, params, function(data){
			
						$dialog.msg("提现申请已提交！");
			            $("#type-money-count").val("");
						$("#type-wx-input").val("");
		     
				});
			}
			else
			{
				$dialog.msg("请选择提现方式")
			}
			
		};
		
		self.scope.cancleOrsure = function(){
		
			if (self.isSelected)
    		{
    			self.isSelected = false;
    			self.showOrHide(0);
    		}
    		else
    		{
    		    self.isSelected = true;
    			self.showOrHide(1);
    		}
    		
		};
		
		self.scope.clearInputBox = function(){
			
			$("#type-money-count").val("");
			
		};
	},
	
	 //显示隐藏选择按钮
    showOrHide : function(type){
    	if(type == 0)
    	{
    		$("#draw-way-no").css("display","block");
    		$("#draw-way-yes").css("display","none");
    	}
    	else
    	{
    		$("#draw-way-no").css("display","none");
    		$("#draw-way-yes").css("display","block");
    	}
    	
    },
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