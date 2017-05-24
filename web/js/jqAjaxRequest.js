/**
 *jq ajax request method
 */

var jqAjaxRequest = 
{
	//异步请求操作 post 操作
	asyncAjaxRequest : function(s_url, params, callback, fail)
	{
		var phpSessionId = localStorage.getItem(localStorageKey.SESSIONID);
		
		if ((phpSessionId != null) && (phpSessionId != ''))
		{
			s_url = s_url + "?sid=" + phpSessionId;
		}
		
		$.ajax({
			type: "post",
			url: s_url,
			async: true,
			data: params,
			cache:false,
			dataType: 'json',
			success: function(data){
//				console.log("ajax"+JSON.stringify(data))
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(commonFu.equal(err,errCode.SUCCESS))
				{   
					callback(data.data);
				}
				else if(commonFu.equal(err,errCode.CODEERR))
				{
					$dialog.msg(errMsg);
				}
				else if(commonFu.equal(err, errCode.TOKEN_FAILED) || commonFu.equal(err, errCode.TOKEN_WRONG)) //token过期跳或出错跳登录页
				{   
					
                    localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
                    sessionStorage.setItem("reloginFail",1)
//                  location.href = pageUrl.LOGIN_PAGE;
				}
				else if(commonFu.equal(err, errCode.SESSION_FAILED)) //session失效重登陆
				{   
					jqAjaxRequest.reLogin();
				}
				else if(commonFu.equal(err, errCode.VIP_LIMIT)) //非vip进入了vip
				{  
					
//					localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
					//请求拍品详情页 回调
					//获取当前url  截取url参数  然后根据参数来跳转到指定页面
					if(!commonFu.isEmpty(sessionStorage.getItem("itIsGuessPage")))
					{
						sessionStorage.setItem("needGuessPage",1)
				    	location.href = pageUrl.GUESS_PAGE +"?backPage=" + GuessInfoCtrl.thisDetailPage + "&thisDataId=" + GuessInfoCtrl.thisDataId;
					}
					else if(!commonFu.isEmpty(sessionStorage.getItem("itIsSelectPage")))
					{
						sessionStorage.setItem("needPage",1)
				    	location.href = pageUrl.SELECTED_GOODS +"?backPage=" + GoodsInfoCtrl.thisDetailPage + "&thisDataId=" + GoodsInfoCtrl.thisDataId;

					}
					else if(!commonFu.isEmpty(sessionStorage.getItem("itIsAuctionPage")))
					{
						sessionStorage.setItem("needPageId",1)
				    	location.href = pageUrl.AUCTION_HISTORY +"?backPage=" + auctedGoodsDetailController.thisDetailPage + "&thisDataId=" + auctedGoodsDetailController.thisDataId;
					}
				}
                else
                {   
                
	                if(!commonFu.isEmpty(fail)){
	                    fail(err); //返回错误码
	                }
          
                }
			},
			error: function(data) {
//                 $dialog.msg(s_url)
            
//                $dialog.msg("请求数据失败");
//                 $dialog.msg("请求数据失败了");
            //    location.href = pageUrl.LOGIN_PAGE;
            }
		});
	},

    reLogin: function() {
        var params =
        {
            userType : 1,
            token : localStorage.getItem(localStorageKey.TOKEN)
        };
        sessionStorage.removeItem("loginSucess"); 
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_RELOGIN, params, function(data){
            sessionStorage.setItem("loginSucess",1);
            sessionStorage.removeItem("reloginFail");
            localStorage.setItem(localStorageKey.TOKEN, data.token);
        })
    }
};
