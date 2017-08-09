/**
 *常量配置文件
 */

/**************服务器基地址*******************/
var API_BASE_URL = '';
var BASE_PAGE_URL = '';

if(location.href.indexOf("yawan365") == -1)
{
	    			    	
//	BASE_PAGE_URL = "http://192.168.0.163/customerWeb/";  
	BASE_PAGE_URL = "http://192.168.0.163/commercialTenant/";
    API_BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口
//  API_BASE_URL =  "http://192.168.0.110:8082/auction/index.php/";
}
else{
	
	    if(location.href.indexOf("8080") == -1)
		{
			
			API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式接口路径
			BASE_PAGE_URL = "http://qian.yawan365.com/";//正式跳转路径
		}
		else
		{
		    API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试接口路径
		    BASE_PAGE_URL = "http://qian.yawan365.com:8080/";//测试跳转路径
		}
}

//const API_BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口
//var API_BASE_URL =  "http://192.168.0.88:8082/auction/index.php/";//明哥接口

//const API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试接口路径
//const API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式接口路径

//const BASE_PAGE_URL = "http://shang.yawan365.com:8080/";//测试跳转路径
//const BASE_PAGE_URL = "http://shang.yawan365.com/";//正式跳转路径

//const BASE_PAGE_URL = "http://192.168.0.163/customerWeb/";
//const BASE_PAGE_URL = "http://192.168.0.163/commercialTenant/";

/***************API 配置接口****************/

var apiUrl = 
{
	API_UPLOAD_IMG : API_BASE_URL + "upload/uploadImages",//上传照片
	API_USER_LOGIN : API_BASE_URL + "account/login",//登录
	API_UP_FILE : API_BASE_URL + "upload/uploadImages",
    API_GET_HAS_READ_MESSAGE : API_BASE_URL + "messagePush/U_messagePush/getHasReadMsg",//获取已读消息 
    API_GET_PERSONALDATA : API_BASE_URL + "x_mch/getSelfInfo",//获取个人信息
    API_USER_ADD_GOOD: API_BASE_URL + "merchant/U_merchant/addCommodity",//用户添加商品   
    API_USER_GETSELF_GOODS : API_BASE_URL + "merchant/U_merchant/getCommodities",//商户获取自己的商品列表
    API_USER_GET_GOOD_DETAIL :API_BASE_URL + "merchant/U_merchant/getCommodifyInfo",//获取商品详情
    API_USERT_MOD_GOOD : API_BASE_URL + "merchant/U_merchant/modCommodity",//修改商品
    API_GET_UNREAD_NUM :  API_BASE_URL + "merchant/U_merchant/getMCHUnReadNum",//获取未读消息数
    API_USER_ASK_TO_UP : API_BASE_URL + 'merchant/U_merchant/merchantRequest',//用户请求上架
    API_DELETE_GOODS :  API_BASE_URL + 'merchant/U_merchant/delCommodity',//删除商品
    API_GET_UNREAD_MESS : API_BASE_URL + "merchant/U_merchant/getUnReadMSGList",//获取未读消息
    API_GET_HAS_READ_MESS : API_BASE_URL + "merchant/U_merchant/getHasReadMSGList",//获取已读消息
    API_TELL_HAS_READ : API_BASE_URL + "merchant/U_merchant/viewMSG",//阅读消息接口
 
};

var localStorageKey =
{
	SESSIONID : "comSessionId",
	TOKEN : "comToken",
	userId : "comUserId",
	
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
	MESSAGE_LIST_PAGE : BASE_PAGE_URL + "myMessagePage.html",//消息列表页
	MY_GOODS_LIST: BASE_PAGE_URL + "myGoodsList.html",//我的商品列表
	MY_MESS_DETAIL : BASE_PAGE_URL + "messDetail.html",//消息详情
	ADD_GOODS_PAGE : BASE_PAGE_URL + "addGoodsPage.html"//添加商品页面
};
