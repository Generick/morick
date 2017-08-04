/*
 * login
 */

app.controller("loginCtr", function($scope) {
    LoginCtrl.init($scope);
});

var  LoginCtrl = {
	
	scope : null,
	
	loginModel :{
		loginNameIp : '',
		loginPassIp : '',
		isRemember : true
	},
	
	loginPassIp : '',
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.scope.loginModel = this.loginModel;

		this.bindClick();
	},
	
	
	bindClick : function(){
		
		var self = this;
		
		self.scope.NameClick = function(){
			
		};
		
		
		self.scope.passClick = function(){
			
		};
		
		
		self.scope.loginClick = function(){
			
			
			if(!self.judgeParam(0))
			{
				return;
			}
			if(!self.judgeParam(1))
			{
				return;
			}
            
            var param = {}; 
        	param.userType = 5;
        	param.platform = 1;
        	param.platformId = self.loginModel.loginNameIp;
        	param.password = self.loginModel.loginPassIp;
        	param.PMTID = null,
//      	alert(JSON.stringify(param))
        	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_LOGIN, param,function(data){
//      	 	console.log(JSON.stringify(data))
        	 	localStorage.setItem(localStorageKey.Name,data.userInfo.name)
        	 	localStorage.setItem(localStorageKey.SESSIONID,data.sessionId);
        	 	localStorage.setItem(localStorageKey.TOKEN,data.token);
        	 	localStorage.setItem(localStorageKey.userId,data.userInfo.userId)
        	
        	 	location.href = pageUrl.HOME_PAGE;
               
                
        	 })
        	
			
			
		
		};
		

	},
	
	judgeParam : function(type){
		
		var self = this;
		
		if(type == 0){
			
			if(commonFu.isEmpty(self.loginModel.loginNameIp))
			{   
				$dialog.msg("账号不能为空")
				return false;
			}
			else if(self.loginModel.loginNameIp.length < 4)
			{   
				$dialog.msg("账号长度应大于4位")
				return false;
			}
			else{
				
				return true;
			}
			
		}
		else
		{
			if(commonFu.isEmpty(self.loginModel.loginPassIp))
			{
				$dialog.msg("密码不能为空");
				return false;
			}
			else if(self.loginModel.loginPassIp.length < 4)
			{
				$dialog.msg("密码长度应大于4位");
				return false; 
			}
			else{
				return true;
			}
		}
	}
}
