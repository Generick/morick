
/**
 * 
 *公共方法
 *
 */



	
(function($) {
  $.fn.numberAnimate = function(setting) {
    var defaults = {
      speed : 1000,//动画速度
      num : "", //初始化值
      iniAnimate : true, //是否要初始化动画效果
      symbol : '',//默认的分割符号，千，万，千万
      dot : 0 //保留几位小数点
    }
    //如果setting为空，就取default的值
    var setting = $.extend(defaults, setting);
    console.log(setting)
    //如果对象有多个，提示出错
    if($(this).length > 1){
      alert("just only one obj!");
      return;
    }
  
    //如果未设置初始化值。提示出错
    if(setting.num == ""){
      alert("must set a num!");
      return;
    }
    var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';
   
    //数字处理
    var numToArr = function(num){
      num = parseFloat(num).toFixed(setting.dot);
      if(typeof(num) == 'number'){
        var arrStr = num.toString().split("");  
      }else{
        var arrStr = num.split("");
      }
//      console.log(arrStr);
      return arrStr;
    }
 
    //设置DOM symbol:分割符号
    var setNumDom = function(arrStr){
      var shtml = '<div class="mt-number-animate">';
      for(var i=0,len=arrStr.length; i<len; i++){
        if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
          shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
        }else{
          shtml += nHtml.replace("{{num}}",arrStr[i]);
        }
//      alert(arrStr[i])
      }
      shtml += '</div>';
      return shtml;
    }
 
    //执行动画
    var runAnimate = function($parent){
      $parent.find(".mt-number-animate-dom").each(function() {
        var num = $(this).attr("data-num");
        num = (num=="."?10:num);
        var spanHei = $(this).height()/11; //11为元素个数
        var thisTop = -num*spanHei+"px";
//      if(thisTop == -225+ "px")
//      {
//      	$(this).css("top","0px")
//      	alert($(this).attr("data-num"))
//
//      }
        if(thisTop != $(this).css("top")){
          if(setting.iniAnimate){
            //HTML5不支持
            if(!window.applicationCache){
              $(this).animate({
                top : thisTop
              }, setting.speed);
            }else{
              $(this).css({
                'transform':'translateY('+thisTop+')',
                '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                '-o-transform':'translateY('+thisTop+')',
                '-ms-transition':setting.speed/1000+'s',
                '-moz-transition':setting.speed/1000+'s',
                '-webkit-transition':setting.speed/1000+'s',
                '-o-transition':setting.speed/1000+'s',
                'transition':setting.speed/1000+'s'
              }); 
            }
          }else{
            setting.iniAnimate = true;
            $(this).css({
              top : thisTop
            });
          }
        }
      });
    }
 
    //初始化
    var init = function($parent){
      //初始化
     
      $parent.html(setNumDom(numToArr(setting.num)));
      runAnimate($parent);
    };
 
    //重置参数
    this.resetData = function(num){
      var newArr = numToArr(num);
      var $dom = $(this).find(".mt-number-animate-dom");
      if($dom.length < newArr.length){
        $(this).html(setNumDom(numToArr(num)));
      }else{
     
        $dom.each(function(index, el) {
          $(this).attr("data-num",newArr[index]);
        });
      }
      runAnimate($(this));
    };
    //init
    init($(this));
    return this;
  }
})($);









  //跳转到指定位置
	$.fn.scrollTo =function(options){
        var defaults = {
            toT : 0, //滚动目标位置
            durTime : 30, //过渡动画时间
            delay : 15, //定时器时间
            callback:null //回调函数
        };
    
        var opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                var per = Math.round(subTop/dur);
                if(index >= dur){
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                }else{
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
    
    
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
	
	
	     //保留两位小数
    toDecimals : function (x) {  
    	
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
        return s;    
    } ,   
	
	
	//正则筛选
	
	returnRightReg : function(comeStr){
	
		var re1 = new RegExp("<.+?>","g");
		var msg2 = comeStr.replace(re1,'');//执行替换成空字符
		msg2 = msg2.replace(/\↵/g,"");
	    msg2 = msg2.replace(/[\f\n\r\t\v]/g,"");
		msg2 = msg2.replace(/[ ]/g,"");
		msg2 = msg2.replace(/&nbsp;/ig,"");
		msg2 = msg2.replace(/&amp;/ig,"");
		msg2 = msg2.replace(/nbsp;/ig,"");
		msg2 = msg2.replace(/nbsp/ig,"");
		msg2 = msg2.replace(/&/ig,"");
		msg2 = msg2.replace(/amp;/ig,"");
		msg2 = msg2.replace(/amp/ig,"");
        msg2 = msg2.replace(/\s/g,"");
		return msg2;
	},
	
	
	 /**
	 * 设置二次分享
	 */
	setShareTimeLine : function(wxParams,shareInfo,URL)
	{     
		wx.config({
		    debug: false,
		    appId: wxParams.appId,
		    timestamp: wxParams.timestamp,
		    nonceStr: wxParams.nonceStr,
		    signature: wxParams.signature,
		    jsApiList: [
				'onMenuShareTimeline',	// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				'onMenuShareAppMessage',  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
		    ]
		});
		
		wx.ready(function(){
			
		        var srcList = [];
		        $.each($('#preImages img'),function(i,item){
		            if(item.src) {
		                srcList.push(item.src);
		                $(item).click(function(e){
		                
		                    wx.previewImage({
		                        current: this.src,
		                        urls: srcList
		                    });
		                });
		            }
		        });
		       
		         var srcList2 = [];
		        $.each($('#preImagesTwo img'),function(i,item){
		            if(item.src) {
		                srcList2.push(item.src);
		                $(item).click(function(e){
		                
		                    wx.previewImage({
		                        current: this.src,
		                        urls: srcList2
		                    });
		                });
		            }
		        });
			//普通 分享到微信好友
			wx.onMenuShareAppMessage({
			    title: shareInfo.title, // 分享标题
			    desc: shareInfo.content, // 分享描述
			    link: URL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: shareInfo.img, // 分享图标
			    success: function () { 
//			        $dialog.msg("已分享");// 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        $dialog.msg("已取消");// 用户取消分享后执行的回调函数
			    }
			});
			
			//普通 分享到微信朋友圈
			wx.onMenuShareTimeline({
			    title: shareInfo.title, // 分享标题
			    desc: shareInfo.content, // 分享描述
			    link: URL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: shareInfo.img, // 分享图标
			    success: function () { 
//			        $dialog.msg("已分享");// 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        $dialog.msg("已取消");// 用户取消分享后执行的回调函数
			    }
			});
			
		})
		
	},
	
	
	getUrlPublic : function(localHref){
		
		var arr = [];
		
		var page  = null,pageId = null;
		if(localHref.indexOf("&") != -1)
		{   
			
			page = localHref.split("&")[1].split("=")[1];
			pageId = localHref.split("&")[0].split("=")[1];
			
            if(String(page).indexOf("#") != -1)
			{
				 page = parseInt(page.split("#")[0]);
				    	    	
			}
			else
			{
				page = parseInt(page);
			}
			if(String(pageId).indexOf("#") != -1)
			{
				pageId = parseInt(pageId.split("#")[0]);
				    	    	
			}
			else
			{
				pageId = parseInt(pageId);
			}
			
			arr.push(page);
			arr.push(pageId);
			
		}
		else{}
		return arr;
	},
	
	
	listGetUrlPublic : function(localHref2){
		
		var arr = [];
		
		var page  = null,pageId = null;
		
		if(localHref2.indexOf("&") !=-1)
		{   
			
			page =  localHref2.split("&")[0].split("=")[1];
			pageId = localHref2.split("&")[1].split("=")[1];
			
	    	if(String(page).indexOf("#") != -1)
			{
			    page = parseInt(page.split("#")[0]);
			    	    	
			}
			else
			{
			    page = parseInt(page);
			}
			if(String(pageId).indexOf("#") != -1)
			{
				pageId = parseInt(pageId.split("#")[0]);
			    
			}
			else
			{
				pageId = parseInt(pageId);
			}
            arr.push(page);
            arr.push(pageId);
                  
		}
		else{}
		return arr;
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
	
	
	//获取当前时间
	getNowFormatDate_2 : function() 
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
	    var hou = date.getHours();
	    var sec = date.getSeconds();
	    var min = date.getMinutes();
	    if(parseInt(min) < 10){
	    	
	    	min = '0'+min;
	    }
	    if(parseInt(sec) < 10){
	    	sec = '0'+sec;
	    }
	    if(parseInt(hou)< 10){
	    	
	    	hou = '0'+hou;
	    }
	    var currentDate = hou + seperator2 + min
	            + seperator2 + sec;
	    
	    return currentDate;
	},
	
	
    //获取当前时间的年
	getNowFormatYear : function() 
	{
	    var date = new Date();
	
	    var currentDate = date.getFullYear();
	    return currentDate;
	},
    
    isSmoothYear : function(){
    	
    	var date = new Date();
	
	    var currentDate = date.getFullYear();
    	
    	var year = parseInt(currentDate);
    	
    	if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0))
    	{
    		return 366;
    	}
    	else
    	{
    		return 365;
    	}
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
};


  
   function Base64() {
 
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
 
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
 
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
        return utftext;
    }
 
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
 }
   



function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
} 