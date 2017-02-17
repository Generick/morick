
//初始化下拉事件

var slide = function(option)
{
	var defaults =
	{
	    container:'',
	    next:function(){}
	};
	var start,
        end,
	    length,
        isLock = false,//是否锁定整个操作
        isCanDo = false,//是否移动滑块
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad,
        obj = document.querySelector(option.container),
        loading = obj.firstElementChild,
        offset = loading.clientHeight,
        objparent = obj.parentElement,
        ulObj = $(".xzlDown");
    
    var ulHeight = ulObj[0].clientHeight;
//  document.body.style.height = ulHeight - 30 + "px";
    
    /**
     *具体操作方法 
     */
    
    var fn = 
    {
    	//移动容器
        translate: function (diff) {
            obj.style.webkitTransform ='translate3d(0,'+diff+'px,0)';
            obj.style.transform='translate3d(0,'+diff+'px,0)';
        },
        //设置效果时间
        setTransition: function (time) {
            obj.style.webkitTransition='all '+time+'s';
            obj.style.transition='all '+time+'s';
        },
        //返回到初始位置
        back: function () {
            fn.translate(0 - offset);
            //标识操作完成
            isLock = false;
        },
        addEvent:function(element,event_name,event_fn){
            if (element.addEventListener) {
                element.addEventListener(event_name, event_fn, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + event_name, event_fn);
            } else {
                element['on' + event_name] = event_fn;
            }
        }
    };

    //添加监听事件
    fn.translate(0-offset);
    fn.addEvent(obj,'touchstart',startFn);
    fn.addEvent(obj,'touchmove',move);
    fn.addEvent(obj,'touchend',endFn);
    fn.addEvent(obj,'mousedown',startFn);
    fn.addEvent(obj,'mousemove',move);
    fn.addEvent(obj,'mouseup',endFn);
    
    //滑动开始
    function startFn(e) {
        if (objparent.scrollTop <= 0 && !isLock) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            isLock = true;
            isCanDo = true;
            //保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY;
            //消除滑块动画时间
            fn.setTransition(0);
            loading.innerHTML='下拉刷新数据';
        }
        return false;
    }
    
    //滑动中
    function move(e) {
        if (objparent.scrollTop <= 0 && isCanDo) {
            var even = typeof event == "undefined" ? e : event;
            //保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;
            if (start < end) {
                even.preventDefault();
                //消除滑块动画时间
                fn.setTransition(0);
                //移动滑块
                if((end-start-offset)/2<=150) {
                    length=(end - start - offset) / 2;
                    fn.translate(length);
                }
                else {
                    length+=0.3;
                    fn.translate(length);
                }
            }
        }
    }
    
    //滑动结束
    function endFn(e) {
        if (isCanDo) {
            isCanDo = false;
            //判断滑动距离是否大于等于指定值
            if (end - start >= offset) {
                //设置滑块回弹时间
                fn.setTransition(0.2);
                //保留提示部分
                fn.translate(0);
                //执行回调函数
                loading.innerHTML='正在加载...';
                if (typeof option.next == "function") {
                    setTimeout(function(){
                    	option.next.call(fn, e);
                    },300);
                }
            } else {
                //返回初始状态
                fn.back();
            }
        }
    }
};

//初始化容器
slide({container:"#container",next: function (e) {
    //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
    var that = this;
    
    //执行加载数据方法（数据请求等）
    SelectCtrl.initData();
    
    setTimeout(function() {
        that.back.call();
    }, 1500);
}});
