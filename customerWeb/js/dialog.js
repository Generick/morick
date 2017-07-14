/**
 * Created by Administrator on 2016/12/30.
 */
var $dialog = {

    msg: function(content, time){
        layer.open({
            content: content
            ,skin: 'msg'
            ,time: (time || 2) //默认2秒后自动关闭
        })
    }
};