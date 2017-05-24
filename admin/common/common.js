/**
 * Created by Administrator on 2016/10/18.
 */
var commonFn = {
    //删除
    delListByIds : function(delids, delKey, api, delCallback){
        var params = {};
        params[delKey] = delids;
        $data.httpRequest("post", api, params, delCallback);
    },

    //找到当前选中项的ids
    findSelIds : function(curObj, idKey, tips){
        var delArr = [];

        for(var i = 0; i< curObj.modelArr.length; i++){
            if(curObj.modelArr[i].selected)
            {
                delArr.push(curObj.modelArr[i][idKey]);
            }
        }
        if (delArr.length == 0)
        {
            if(tips == undefined)
            {
                tips = "请先勾选要操作的选项";
            }
            layer.msg(tips, {time: 2400, anim: 6});
            return null;
        }
        else
        {
            return JSON.stringify(delArr);
        }
    },
    
    
    
    
    //获取当前时间
	getNowFormatDate : function() 
	{
	    var date = new Date();
	
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var seperator3 = "-";
	    var seperator4 = "-";
	    var seperator5 = " ";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentDate = date.getFullYear() + seperator3 + parseInt(parseInt(date.getMonth())  + parseInt( 1))  + seperator4+ date.getDate()  + seperator5 +  date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentDate;
	},
    
    
    //找到当前obj
    finderCurObj : function(curId, arr, idKey){
        for(var i = 0; i < arr.length; i++ )
        {
            if(curId == arr[i][idKey])
            {
                return arr[i];
            }
        }
        return null;
    },

    //切换单选状态
    switchSelOne : function(curId, curObj, idKey){
        var self = this;
        var curItem =  self.finderCurObj(curId, curObj.modelArr, idKey);
        if(curItem == null)
        {
            return;
        }
        curItem.selected = !curItem.selected;

        self.checkSelAll(curObj);
    },

    //判断是否全部选中
    checkSelAll : function(curObj){
        var isAllSel = true;
        for(var i = 0; i < curObj.modelArr.length; i++ )
        {
            if(!curObj.modelArr[i].selected)
            {
                isAllSel = false;
                break;
            }
        }
        curObj.selectAll = isAllSel;
    },

    //切换全选状态
    switchSelAll : function(curObj){
        var selected = !curObj.selectAll;
        curObj.selectAll = selected;
        for(var i = 0; i < curObj.modelArr.length; i++)
        {
            curObj.modelArr[i].selected = selected;
        }
    },

    //获取管理权限
    getAdminPermissions : function()
    {
        return _utility.objDeepCopy(permissionArr);
    },

    //时间转换为时间戳
    toTime: function(timeStr) {
        var timestamp2 = Date.parse(new Date(timeStr));
        timestamp2 = timestamp2 / 1000;

        return timestamp2;
    }
};