
		function accMul(arg1, arg2) {  
		    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();  
		    try {  
		        m += s1.split(".")[1].length;  
		    }  
		    catch (e) {  
		    }  
		    try {  
		        m += s2.split(".")[1].length;  
		    }  
		    catch (e) {  
		    }  
		    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);  
		};   
		
		//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。   
		Number.prototype.mul = function (arg) {  
		    return accMul(arg, this);  
		};   
		
		//除法函数  
		function accDiv(arg1, arg2) {  
		    var t1 = 0, t2 = 0, r1, r2;  
		    try {  
		        t1 = arg1.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		    }  
		    try {  
		        t2 = arg2.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		    }  
		    with (Math) {  
		        r1 = Number(arg1.toString().replace(".", ""));  
		        r2 = Number(arg2.toString().replace(".", ""));  
		        return (r1 / r2) * pow(10, t2 - t1);  
		    }  
		};   
		//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。   
		Number.prototype.div = function (arg) {  
		    return accDiv(this, arg);  
		};
		function accAdd(arg1, arg2) {  
		    var r1, r2, m;  
		    try {  
		        r1 = arg1.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		        r1 = 0;  
		    }  
		    try {  
		        r2 = arg2.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		        r2 = 0;  
		    }  
		    m = Math.pow(10, Math.max(r1, r2));  
		    return (arg1.mul(m) + arg2.mul(m)).div(m);  
		}   
		
		//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。   
		Number.prototype.add = function (arg) {  
		    return accAdd(arg, this);  
		};  
		
		  
		//减法函数  
		function Subtr(arg1, arg2) {  
		    var r1, r2, m, n;  
		    try {  
		        r1 = arg1.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		        r1 = 0;  
		    }  
		    try {  
		        r2 = arg2.toString().split(".")[1].length;  
		    }  
		    catch (e) {  
		        r2 = 0;  
		    }  
		    m = Math.pow(10, Math.max(r1, r2));  
		     //last modify by deeka  
		     //动态控制精度长度  
		    n = (r1 >= r2) ? r1 : r2;  
		    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));  
		}  
		  
		//给Number类型增加一个add方法，，使用时直接用 .sub 即可完成计算。   
		Number.prototype.sub = function (arg) {  
		    return Subtr(this, arg);  
		};
		


	
       function priceToObj(price, index,dataArrs){
		  if(price == 0) {
		    return dataArrs[index]["data"].zero;
		  }
		  price = parseFloat(price);
//		  alert(price)
		  var obj = {};
		  obj.wd = parseInt((price.mul(10000)) % 10);
		  obj.qd = parseInt((price.mul(1000)) % 10);
		  obj.hd = parseInt((price.mul(100)) % 10);
		  obj.td = parseInt((price.mul(10)) % 10);
		  obj.single = parseInt(price % 10);
		  obj.t = parseInt((price.div(10)) % 10);
		  obj.h = parseInt((price.div(100)) % 10);
		  obj.k = parseInt((price.div(1000)) % 10);
		  obj.tk = parseInt((price.div(10000)) % 10);
		  obj.hk = parseInt((price.div(100000)) % 10);
		  obj.qk = parseInt((price.div(1000000)) % 10);
//		  obj.wk = parseInt((price.div(10000000)) % 10);
		  return obj;
		};
		
		function objToPrice(obj) {
		  return obj.qk.mul(1000000).obj.hk.mul(100000).add(obj.tk.mul(10000))
		      .add(obj.k.mul(1000)).add(obj.h.mul(100))
		      .add(obj.t.mul(10)).add(obj.single)
		      .add(obj.td.div(10)).add(obj.hd.div(100)).add(obj.qd.div(1000)).add(obj.wd.div(10000));
		      
//		       obj.wk.mul(10000000).obj.qk.mul(1000000).obj.hk.mul(100000).add(obj.tk.mul(10000))
//		      .add(obj.k.mul(1000)).add(obj.h.mul(100))
//		      .add(obj.t.mul(10)).add(obj.single)
//		      .add(obj.td.div(10)).add(obj.hd.div(100)).add(obj.qd.div(1000)).add(obj.wd.div(10000));
		};
		
		function animateQueue(){
		  locking = false;
		  if(eventQueue.length > 0) {
		    eventQueue.shift()();
		  }
		};
		
		$.fn.extend({
		  scrollToNumber: function(num, pos, index,dataArrs){
		    var $this = $(this);
		    var target = dataArrs[index]["data"].numbers[num];
		    
		    $this.find(".numbers-view").stop(false, true);
		    
		    var top = num * $this.find(".zero").height();
//		    console.log($this);
		    var currentTop = -parseFloat($this.find(".numbers-view").css("marginTop").split("px")[0]);
//		    alert(666)
		    if(top == currentTop) {
		      return;
		    } else if(currentTop < top) {
		      $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing");
		    } else {
		      $this.find(".numbers-view").append($(dataArrs[index]["data"].numbersTmp).addClass("temp"));
		      top = $this.find("." + target + ".temp").offset().top - $this.find(".numbers-view").offset().top;
		      
		      $this.find(".numbers-view").animate({marginTop: -top}, 1500, "swing", function(){
		        if($this.find(".zero").size() > 1) {
		          var top = $this.find("." + target + ":not(.temp)").first().offset().top - $this.find(".numbers-view").offset().top;
		          $this.find(".numbers-view").css({marginTop: -top});
		          $this.find(".numbers-view .temp").remove();
		        }
		      });
		    }
		  }
		});
		
		
		
		
		$.animateToPrice = function(price, index,dataArrs){
		  var obj = priceToObj(price, index,dataArrs);
//		    console.log(dataArrs);
//		  console.log(price);
//		  console.log(index);
//		  console.log(obj);
		  $.each(obj, function(key, value){
//		    console.log(key)
		    dataArrs[index]["data"].targetClass[key].scrollToNumber(value, key, index,dataArrs);
		  });
		};










    
       function priceToObj2(price, index,dataArrs){
		  if(price == 0) {
		    return dataArrs[index]["data"].zero;
		  }
		  price = parseFloat(price);
//		  alert(price)
		  var obj = {};
		  obj.wd = parseInt((price.mul(10000)) % 10);
		  obj.qd = parseInt((price.mul(1000)) % 10);
		  obj.hd = parseInt((price.mul(100)) % 10);
		  obj.td = parseInt((price.mul(10)) % 10);
		  obj.single = parseInt(price % 10);
		  obj.t = parseInt((price.div(10)) % 10);
		  obj.h = parseInt((price.div(100)) % 10);
		  obj.k = parseInt((price.div(1000)) % 10);
		  obj.tk = parseInt((price.div(10000)) % 10);
		  obj.hk = parseInt((price.div(100000)) % 10);
		  obj.qk = parseInt((price.div(1000000)) % 10);
//		  obj.wk = parseInt((price.div(10000000)) % 10);
		  return obj;
		};
		
		function objToPrice2(obj) {
		  return 
		      obj.qk.mul(1000000).obj.hk.mul(100000).add(obj.tk.mul(10000))
		      .add(obj.k.mul(1000)).add(obj.h.mul(100))
		      .add(obj.t.mul(10)).add(obj.single)
		      .add(obj.td.div(10)).add(obj.hd.div(100)).add(obj.qd.div(1000)).add(obj.wd.div(10000));
		      
//		       obj.wk.mul(10000000).obj.qk.mul(1000000).obj.hk.mul(100000).add(obj.tk.mul(10000))
//		      .add(obj.k.mul(1000)).add(obj.h.mul(100))
//		      .add(obj.t.mul(10)).add(obj.single)
//		      .add(obj.td.div(10)).add(obj.hd.div(100)).add(obj.qd.div(1000)).add(obj.wd.div(10000));
		};
		
		function animateQueue2(){
		  locking = false;
		  if(eventQueue.length > 0) {
		    eventQueue.shift()();
		  }
		};
		
		$.fn.extend({
		  scrollToNumber2: function(num, pos, index,dataArrs){
		    var $this = $(this);
		    var target = dataArrs[index]["data"].numbers[num];
		    
		    $this.find(".numbers-view").stop(false, true);
		    
		    var top = num * $this.find(".zero").height();
//		    console.log($this);
		    var currentTop = -parseFloat($this.find(".numbers-view").css("marginTop").split("px")[0]);
//		    alert(666)
		    if(top == currentTop) {
		      return;
		    } else if(currentTop < top) {
		      $this.find(".numbers-view").animate({marginTop: -top}, 1, "swing");
		    } else {
		      $this.find(".numbers-view").append($(dataArrs[index]["data"].numbersTmp).addClass("temp"));
		      top = $this.find("." + target + ".temp").offset().top - $this.find(".numbers-view").offset().top;
		      
		      $this.find(".numbers-view").animate({marginTop: -top}, 1, "swing", function(){
		        if($this.find(".zero").size() > 1) {
		          var top = $this.find("." + target + ":not(.temp)").first().offset().top - $this.find(".numbers-view").offset().top;
		          $this.find(".numbers-view").css({marginTop: -top});
		          $this.find(".numbers-view .temp").remove();
		        }
		      });
		    }
		  }
		});
		
		
		
		
		$.animateToPrice2 = function(price, index,dataArrs){
		  var obj = priceToObj2(price, index,dataArrs);
//		    console.log(dataArrs);
//		  console.log(price);
//		  console.log(index);
//		  console.log(obj);
		  $.each(obj, function(key, value){
//		    console.log(key)
		    dataArrs[index]["data"].targetClass[key].scrollToNumber2(value, key, index,dataArrs);
		  });
		};



		