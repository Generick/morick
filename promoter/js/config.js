/**
 *常量配置文件
 */

/**************服务器基地址*******************/

//var API_BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口
//var API_BASE_URL =  "http://192.168.0.88:8082/auction/index.php/";//明哥接口

//const API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试接口路径
//const API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式接口路径


//const BASE_PAGE_URL = "http://shang.yawan365.com:8080/";//测试跳转路径
//const BASE_PAGE_URL = "http://shang.yawan365.com/";//正式跳转路径

//const BASE_PAGE_URL = "http://192.168.0.163/promoter/";
var API_BASE_URL = '';
var BASE_PAGE_URL = '';

if(location.href.indexOf("yawan365") == -1)
{
	    			    	
//	BASE_PAGE_URL = "http://192.168.0.163/customerWeb/";  
	BASE_PAGE_URL = "http://192.168.0.163/promoter/";
    API_BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口
}
else{
	
	    if(location.href.indexOf("8080") == -1)
		{
			
			API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式接口路径
			BASE_PAGE_URL = "http://wo.yawan365.com/";//正式跳转路径
		}
		else
		{
		    API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试接口路径
		    BASE_PAGE_URL = "http://wo.yawan365.com:8080/";//测试跳转路径
		}
}


/***************API 配置接口****************/

var apiUrl = 
{
	
	API_USER_LOGIN : API_BASE_URL + "account/login",//登录
	API_PROMOTER_GET_SELF : API_BASE_URL + "promoter/P_promoter/getPromoterInfo",//推广员获取自己的信息
	API_GET_PUSH_LIST : API_BASE_URL + "promoter/P_promoter/myPromptUsers",//获取自己推荐的用户列表
	API_GET_PUSH_USER_DETAIL : API_BASE_URL + "promoter/P_promoter/getPromptUserInfo",//获取自己用户的详情
    API_GET_WAIT_PAY : API_BASE_URL + "promoter/P_promoter/getWaitCheckBill",//获取待结账金额详情
    ADD_REMARK : API_BASE_URL +"promoter/P_promoter/setRemark",//设置用户备注
    SET_PROMOTIONAL : API_BASE_URL + "promoter/P_promoter/setSelfSlogan",//设置推广口号
    GET_PROMOTIONAL : API_BASE_URL + "promoter/Promoter/getPMTSlogan",//获取推广口号

};

var localStorageKey =
{
	SESSIONID : "proSessionId",
	TOKEN : "proToken",
	userId : "proUserId",
	urlStr : "urlStr"
};

/***************数据请求配置参数****************/
var errCode  = 
{
	SUCCESS : 0 ,
	
  
};

var pageUrl = 
{
	LOGIN_PAGE : BASE_PAGE_URL + "login.html",//登录
	HOME_PAGE : BASE_PAGE_URL + "homePage.html",//首页
	ERWEICODE : BASE_PAGE_URL + "erWeiPage.html",//二维码页
	MY_OWN_DETAIL: BASE_PAGE_URL + "myOwnDetail.html",//我的收支页
	PUSHER_DETAIL : BASE_PAGE_URL + "pusherDetail.html",//推荐人详情页
	PUSH_LIST : BASE_PAGE_URL + "pushPersonList.html",//推荐人列表页
    MY_PUSH_PIC : BASE_PAGE_URL + "myPushPic.html",//我的推广图片
    MOD_REMARK : BASE_PAGE_URL + "remarksPage.html",//个人备注
    PROMOTIONAL : BASE_PAGE_URL + "promotionalPage.html",//推广语
};
