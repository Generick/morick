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
			dataType: 'json',
			success: function(data){
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(commonFu.equal(err,errCode.SUCCESS))
				{
					callback(data.data);
				}
				else if(commonFu.equal(err, errCode.TOKEN_FAILED) || commonFu.equal(err, errCode.TOKEN_WRONG)) //token过期跳或出错跳登录页
				{
                    localStorage.setItem(localStorageKey.DEFAULT, location.href); //存储当前页面地址
                    location.href = pageUrl.LOGIN_PAGE;
				}
				else if(commonFu.equal(err, errCode.SESSION_FAILED)) //session失效重登陆
				{
					jqAjaxRequest.reLogin();
				}
                else
                {
                    $dialog.msg(errMsg);
                    if(!commonFu.isEmpty(fail)){
                        fail(err); //返回错误码
                    }
                }
			},
			error: function() {
                //alert("请求数据失败");
                //location.href = pageUrl.LOGIN_PAGE;
            }
		});
	},

    reLogin: function() {
        var params =
        {
            userType : 1,
            token : localStorage.getItem(localStorageKey.TOKEN)
        };

        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_RELOGIN, params, function(data){
            localStorage.setItem(localStorageKey.TOKEN, data.token);
        })
    }
};
