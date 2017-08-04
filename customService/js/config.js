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

	BASE_PAGE_URL = "http://192.168.0.163/customService/";  

    API_BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口
}
else{
	
	    if(location.href.indexOf("8080") == -1)
		{
			
			API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式接口路径
			BASE_PAGE_URL = "http://cs.yawan365.com/";//正式跳转路径
		}
		else
		{
		    API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试接口路径
		    BASE_PAGE_URL = "http://cs.yawan365.com:8080/";//测试跳转路径
		}
}


/***************API 配置接口****************/

var apiUrl = 
{
	
	API_USER_LOGIN : API_BASE_URL + "account/login",//登录
	API_CUSTOMER_GET_LIST : API_BASE_URL + "customerService/S_customService/getOrders",//客服获取订单列表
	API_GET_CUSTOMER_DETAIL : API_BASE_URL + "customerService/S_customService/getOrderInfo",//客服获取订单详情
	API_CUSTOMER_CANCLE_OR_SURE : API_BASE_URL + "customerService/S_customService/sureOrCancelOrder",//取消或确认订单
    API_GET_WAIT_SEND : API_BASE_URL + "customerService/S_customService/deliverOrder",//发货
    
};

var localStorageKey =
{
	SESSIONID : "cusSevSessionId",
	TOKEN : "cusSevToken",
	userId : "cusSevUserId",
	Name : 'cusName',
	urlStr : "cusSevStr"
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
	ORDER_LIST : BASE_PAGE_URL + "orderList.html",//二维码页
	ORDER_DETAIL: BASE_PAGE_URL + "orderDetail.html",//我的收支页
	
};
