/**
 * Created by Jack on 2016/12/15.
 */
var $dialog = {

    // 记录需要关闭的提示框
    needCloseIndex : [],

    //需要展示photos的父元素ID
    photosID: null,

    // 关闭指定的窗口
    close: function() {
        for (var i in this.needCloseIndex) {
            if(this.needCloseIndex.hasOwnProperty(i))
            {
                layer.close(this.needCloseIndex[i]);
                delete this.needCloseIndex[i];
            }
        }
    },

    // Tips 提示框
    tips: function(content, time, callback) {
        layer.msg(content, {time: (time || 3) * 1000, shadeClose: true}, callback);
    },

    // Loading 消息提示
    loading: function(callback) {
        var index = layer.load(2, {shade: [0.1, '#fff'], end: callback});
        this.needCloseIndex.push(index);
    },

    //普通提示msg
    msg: function(content, time, callback) {
        layer.msg(content, {time: (time || 2) * 1000, anim: 5}, callback);
    },

    //页面层弹窗open
    open: function(title, area, content, callback) {
        layer.open({type: 1, skin: 'layer-ex-skin',btn: ['确定', '取消'],
            title: title,
            shadeClose: true,
            area: area,
            content: content,
            yes: callback
        })
    },
    
    //页面层弹窗open2
    open2: function(title, area, content) {
        layer.open({
        	type: 1,
        	skin: 'layer-ex-skin',
            title: title,
            shadeClose: true,
            area: area,
            content: content
        })
    },

    //成功提示框
    success: function(content, time, callback) {
        layer.msg(content, {time: (time || 3) * 1000, shadeClose: true, icon: 1}, callback);
    },

    //错误提示
    error: function(content, time, callback) {
        layer.msg(content, {time: (time || 3) * 1000, shadeClose: true, icon: 2}, callback);
    },

    //资讯提示框
    confirm: function(content, success, cancel) {
        var index = layer.confirm(content, {btn: ['确定', '取消'], skin: 'layer-ex-skin'}, function() {
            typeof success === 'function' && success.call();
            layer.close(index);
        },function() {
            layer.close(index);
            typeof cancel === 'function' && cancel.call();
        });
    },

    //查看图片
    photos: function(id){
        var self = this;

        if(self.photosID !== id)
        {
            layer.ready(function(){
                layer.photos({photos: id, anim: 5, move: false});
            });

            self.photosID = id;
        }
    }
};