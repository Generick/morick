/*
 * login
 */

app.controller("ctrl", function($scope) {
    LoginCtrl.init($scope);
});

var LoginCtrl =
{
    scope : null,
    
    loginModel : 
    {
    	userType : 1,
    	platform : 5,
    	platformId : null,
    	password : null,
    	codeCount : "获取验证码",
    	status : true
    },
    
    init: function ($scope)
    {
        this.scope = $scope;
        var self = this; 
        
        self.scope.loginModel = self.loginModel;
        
        self.onEvent();
    },

    //检查参数
    checkParams: function(type){
        var self = this;
         
        if(commonFu.isEmpty(self.loginModel.platformId))
        {
            $dialog.msg("请输入手机号");
            return false;
        }
        if(!commonFu.isLegalPhone(self.loginModel.platformId))
        {
            $dialog.msg("请输入正确的手机号");
            return false;
        }
        if(type && commonFu.isEmpty(self.loginModel.password))
        {
            $dialog.msg("请输入验证码");
            return false;
        }
        if(type && self.loginModel.password.length != 4)
        {
        	
            $dialog.msg("验证码为4位");
            return false;
        }
       
        if(type && commonFu.isEmpty(self.loginModel.password))
        {   
            $dialog.msg("验证码错误");
            return false;
        }
        
        return true;
    },
    
    onEvent: function()
    {
    	var self = this;

    	//获取验证码
		self.scope.onClickGetCode = function()
		{
			if(self.checkParams(0) && self.loginModel.status)
            {
                var timer = 60;

                self.loginModel.status = false;
                self.loginModel.codeCount = timer + "s";

                var codeCountInter = setInterval(function(){
                    timer--;

                    if(timer >= 0)
                    {
                        self.loginModel.codeCount = timer + "s";
                    }
                    else
                    {
                        self.loginModel.codeCount = "再次获取";
                        clearInterval(codeCountInter);
                        self.loginModel.status = true;
                    }

                    self.scope.$apply();
                }, 1000);

                var params = {
                    mobile : self.loginModel.platformId,
                    type : 2
                };

                jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_MOBILE_CODE, params, function(data){})
            }
		};
    	
    	//登录
    	self.scope.onClickLogin = function ()
        {
        	var param = {}; 
        	param.userType = self.loginModel.userType;
        	param.platform = self.loginModel.platform;
        	param.platformId = self.loginModel.platformId;
        	param.password = self.loginModel.password;
            
          
            if(self.checkParams(1))
            {
            
                jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_LOGIN, param,

                    /**
                     * 登陆
                     * @param data.token
                     * @param data.sessionId
                     * @param data.userInfo 用户信息
                     * @param data.configData
                     */
                    function(data){
//                      alert(JSON.stringify(data))

						
                        localStorage.setItem(localStorageKey.TOKEN,data.token);
                        localStorage.setItem(localStorageKey.SESSIONID,data.sessionId);
                        localStorage.setItem(localStorageKey.userId, data.userInfo.userId);
                        localStorage.setItem(localStorageKey.configData, JSON.stringify(data.configData));
                        
                        localStorage.setItem(localStorageKey.vipOrNot, data.userInfo.isVIP);
                        
                        
                        //登陆的回调里，在本地缓存一个从登录页面进入的标志，在列表页判断，如果它存在，就不用掉用重登陆接口，否则再进行下一步判断
                        sessionStorage.setItem("formLoginCome",1);
                        
                        sessionStorage.removeItem("loginSucess");
                        //不管是重登陆还是登录界面登录的，登录成功的标志，关闭浏览器后自动失效
                        sessionStorage.setItem("loginSucess",1)
                      
                        sessionStorage.removeItem("reloginFail")
                        //跳到精选
                        if(commonFu.isEmpty(localStorage.getItem(localStorageKey.DEFAULT)))
                        {
//                          location.href = pageUrl.SELECTED_GOODS;
                            location.href = pageUrl.GUESS_PAGE;
                        }
                        else
                        {
                            location.href = localStorage.getItem(localStorageKey.DEFAULT);
                            localStorage.setItem(localStorageKey.DEFAULT, "");
                        }
                    }
                );
            }
        }
    }
};