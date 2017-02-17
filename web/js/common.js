
/**
 * 
 *公共方法
 *
 */

var commonFu = {

	//比较两个值是否相等
	equal : function(val1,val2)
	{
		var isEqual = false;
		try
		{
			if(val1.toString() == val2.toString())
			{
				isEqual = true;
			}
		}
		catch(e)
		{
			isEqual = false;
		}
		
		return isEqual;
	},
	
	//判断是否为空
	isEmpty : function(strVal)
	{
		/// <summary>判断一个字符串是否为空 true 表示为空；false 表示不为空</summary>     
   		/// <param name="strVal" type="String">需要判断的字符串</param>        
		var isEmpty = false;
		
		try
		{
			if(strVal == "" || strVal == "''" || strVal == '' || strVal == "null" || strVal == "{}"
			|| strVal == "[]" || strVal == null || strVal == "'[]'" || strVal == "<null>" || strVal == undefined)
			{
				isEmpty = true;
			}
			else
			{
				isEmpty = false;
			}
		}
		catch(e)
		{
			isEmpty = true;
		}
		
		return isEmpty;
	},
	
	//获取当前时间的时间戳
	getTimeStamp : function()
	{
		var timestamp = Date.parse(new Date());
		return timestamp / 1000;
	},

    //比较时间是否大于当前时间
    compareTime: function(timestamp){
        var curTimestamp = Date.parse(new Date()) / 1000;
        return timestamp < curTimestamp;
    },
	
	//获取当前时间
	getNowFormatDate : function() 
	{
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentDate = date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentDate;
	},
	
	//手机号码处理
	telephoneDispose : function(tel)
	{
		var start = tel.substring(0,3);
		var end = tel.substring(7,11);
		return start + "****" + end;
	},

	//修改时间格式
	getFormatDate : function(dateStr, dateType)
	{
		/// <summary>把时间戳转化为2016-05-06格式</summary>     
   		/// <param name="dateStr" type="dateStr">需要转化的时间戳</param> 
   		/// <param name="dateType" type="string">转化时间需要的格式（“2”，表示需要转化为"yyyy-mm-dd","1"表示"yyyy-mm-dd hh:mm"格式）</param> 
   		if(commonFu.equal(dateType,1))
   		{
   			if(commonFu.isEmpty(dateStr))
   			{
				var nowDate = new Date();
				var mm = nowDate.getMonth()+1;
				if(mm < 10){
					mm = "0" + mm;
				}
				return nowDate.getFullYear() + "-" + mm + "-" + nowDate.getDate();
			}
			else
			{
				var dateObj = new Date(parseInt(dateStr)*1000);
				var yy = dateObj.getFullYear();
				var mm = dateObj.getMonth()+1;
				var dd = dateObj.getDate();
				var hh = dateObj.getHours();
				var min = dateObj.getMinutes();
				
				if(mm < 10)
				{
					mm = "0" + mm;
				}
				
				if(min < 10)
				{
					min = "0" + min;
				}
				
				return yy + "-" + mm + "-" + dd + " " + hh + ":" + min;
			}
   		}
   		else
   		{
   			if(commonFu.isEmpty(dateStr))
   			{
				var nowDate = new Date();
				var mm = nowDate.getMonth()+1;
				
				if(mm < 10)
				{
					mm = "0" + mm;
				}
				
				return nowDate.getFullYear() + "-" + mm + "-" + nowDate.getDate();
			}
			else
			{
				var dateObj = new Date(parseInt(dateStr)*1000);
				var yy = dateObj.getFullYear();
				var mm = dateObj.getMonth()+1;
				var dd = dateObj.getDate();
				
				if(mm < 10)
				{
					mm = "0" + mm;
				}
				
				if(dd < 10)
				{
					dd = "0" + dd;
				}
				return yy + "-" + mm + "-" + dd;
			}
   		}
	},
	
	//判断目标字符串中是不是含有中文true表示有
	checkStrHasChinese : function(str)
	{
		var pattern = /^[\u4e00-\u9fa5]/;
        return pattern.test(str);
	},

    //必填项，为空时返回false
    isRequired: function(str){
        var pattern = /[\S]+/;
        return pattern.test(str);
    },
	
	//判断是否含有特殊字符, true 表示含有，false 表示不含
	isIllegalChar: function(str)
	{
		var pattern =/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;
        return pattern.test(str);
	},
	
	//验证手机号码的正则表达式true合法手机号false不合法手机号
    isLegalPhone: function(phoneNum)
	{
		var isPhone = !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phoneNum);
        return !isPhone;
	},

    //过滤非法字符--用onchange事件
    filterIllegalChar: function (s)
    {
        var pattern = new RegExp("[`~!@#$^&*()=+|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        var rs = "";
        for (var i = 0; i < s.length; i++)
        {
            rs = rs+s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    },
	
	//验证邮箱是否合法true正确的邮箱，false错误的邮箱
	isLegalEmail: function(email)
	{
  		var reg  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return reg.test(email);
	},
	
	//验证是不是正整数true是数字，false不是数字
	isIntNumber: function(val)
	{
        var pattern = /^\d+$/;
        return pattern.test(val);
	},
	
	//获得url后面所带参数
	getQueryStringByKey: function(name)
	{
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r!=null) 
	    {
	    	return (r[2]);
	    }
	   	else
	   	{
	   		return null;
	   	}
	},

    /**
     * 解析URL传参中文
     * @param {Object} name
     */
    getQueryStringTxt: function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null)
        {
            return  decodeURI(r[2]);
        }
        else
        {
            return null;
        }
    },


    //检查是否是微信浏览器
    isWeiXin: function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger')
        {
            return true;
        }
        else
        {
            return false;
        }
    }
};

//js  深拷贝方法
var deepCopy = function(source)
{
	var result;
	(source instanceof Array) ? (result = []) : (result = {});
	
	for (var key in source)
	{
        if(source.hasOwnProperty(key))
        {
            result[key] = (typeof source[key]==='object') ? deepCopy(source[key]) : source[key];
        }
	}
	
	return result;
};

var setOpacity = function(elem,level)
{
	if(elem.filters)
		elem.style.filter = "alpha(opacity="+level+")";
	else    
		elem.style.opacity = level/100;
};

//用递归渐渐显示,
//这里的speed参数为显示速率，我将其暂时定义成：speed越大，过度时间越长
function fadeIn(elem,speed)
{
    var e = typeof elem == 'string'? document.getElementById(elem) : elem;
    setOpacity(e,0);//先设置透明度为0
    e.style.display="block";//再让其block
    var i = 0;
    
    function dg()
    {
       if(i<=100)
       {
       	(function(){
            var pos = i;
            setTimeout(function(){
                setOpacity(e,pos);
            },(pos+1)*speed);
        })();
        
        i+=1;dg();
       }
    }
    
    dg();
}