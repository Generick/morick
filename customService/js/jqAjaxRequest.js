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
				
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(commonFu.equal(err,errCode.SUCCESS))
				{   
					callback(data.data);
				}
				else if(err == '201')
				{
					$dialog.msg(errMsg);
				}
			    else if(err == '202')
			    {
			    	$dialog.msg("不能用验证码登录！");
			    	
			    }
				else if(err == '5' || err == '6')
				{
					$dialog.msg("您还未登录，请先登录！");
					setTimeout(function(){
						
						location.href = pageUrl.LOGIN_PAGE;
						
					},1200)
				}
				else if(err == '102' || err == '103')
				{
					$dialog.msg("会话过期，请重新登录！");
					setTimeout(function(){
						
					    location.href = pageUrl.LOGIN_PAGE;
					},1200)
				}
				else if(err == '101')
				{
					$dialog.msg("密码错误！");
				}
				else if(err == '49004')
				{
					$dialog.msg(errMsg);
				}
				else if(err == '49001')
				{
					$dialog.msg(errMsg);
				}
				else if(err == '49109')
				{
					$dialog.msg(errMsg);
				}
				else if(err == '105'){
					$dialog.msg(errMsg);
				}
				else if(err == '2304')
				{
					$dialog.msg(errMsg);
				}
				else if(commonFu.equal(err,errCode.CODEERR))
				{
					$dialog.msg(errMsg);
				}
				
				else if(commonFu.equal(err, errCode.SESSION_FAILED)) //session失效重登陆
				{  
				
					jqAjaxRequest.reLogin();
				}
                else
                {   
                
	                if(!commonFu.isEmpty(fail)){
	                    fail(err); //返回错误码
	                }
          
                }
			},
			error: function(data) {

                  location.href = pageUrl.LOGIN_PAGE;
            }
		});
	},

    reLogin: function() {
        var params =
        {
            userType : 4,
            token : localStorage.getItem(localStorageKey.TOKEN)
        };
    
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_RELOGIN, params, function(data){
           
            localStorage.setItem(localStorageKey.TOKEN, data.token);
        })
    }
};
