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
		else{
			
			phpSessionId = getCookie(localStorageKey.SESSIONID);
			
			if ((phpSessionId != null) && (phpSessionId != ''))
			{ 
				s_url = s_url + "?sid=" + phpSessionId;
			}
			
		}
		$.ajax({
			type: "post",
			url: s_url,
			async: true,
			data: params,
			cache:false,
			dataType: 'json',
			success: function(data){
                
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(commonFu.equal(err,errCode.SUCCESS))
				{   
					callback(data.data);
				}
				else if((err == '800') || (err == '2303')||(err == "2302"))
				{
					$dialog.msg(errMsg);
					if(err == '800')
					{
					    localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
//					   $dialog.msg("余额不足，前去充值", 1);
//					   setTimeout(function(){
//					    	location.href = pageUrl.ACCOUNT_RECHARGE;
   							location.href = pageUrl.TOCUSTOMER_PAGE;
//					    },1200)
                 		
					}

				}
				else if(err == '2304')
				{
					$dialog.msg(errMsg);
				}
				else if(err == 6)
				{
					$dialog.msg(errMsg);
					setTimeout(function(){
//                  	alert("ajax555"+JSON.stringify(data))
					localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
                  	location.href = pageUrl.LOGIN_PAGE;
                    	
                    	
                    },1300)
				}
				else if(commonFu.equal(err,errCode.CODEERR))
				{
					$dialog.msg(errMsg);
				}
				else if(commonFu.equal(err, errCode.TOKEN_FAILED) || commonFu.equal(err, errCode.TOKEN_WRONG)) //token过期跳或出错跳登录页
				{    
                    localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
                    sessionStorage.setItem("reloginFail",1);
                    $dialog.msg("会话过期，请先登录");
                    setTimeout(function(){
//                  	alert("ajax555"+JSON.stringify(data))
                  	location.href = pageUrl.LOGIN_PAGE;
                    	
                    	
                    },1300)
                    
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
//					alert("ajax9999"+JSON.stringify(data))
//					alert(localStorage.getItem(localStorageKey.orderNo));
//					alert(s_url)
				localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
                location.href = pageUrl.LOGIN_PAGE;
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
