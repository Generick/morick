/**
 * Created by Jack on 2016/12/13.
 * 使用方法：
 * 1.引入Blob.js,FileSaver.min.js和toExcel.js。(支持：ie10+, Firefox20+, Chrome, Safari6+, Opera15+)
 * 2.点击导出按钮，初始化eg.toExcel.init(dataArr, titleArr);弹框用户可输入名称选择导出格式(也可限定名称格式不弹框)
 * 3.点击弹框确定按钮，导出文件eg.toExcel.saveName('文件名称', 0);
 * 缺点：只能导出数据格式固定的数据，没有规律的数据格式无法导出，不能选择存储路径
 * 优点：能导出不同格式的文件，支持页面输入数据导出，能更改下载文件名
 */
var toExcel = {
    content: null, //全局变量要导出的数据

    /**
     * 导出excel初始化
     * @param arr 数据数组(注意：数组中的key必须是可排序的且与标题数组一一对应)eg.[{key01: '杰克', key02: '18', key03: 'Japan'}];
     * @param titleArr 标题数组eg.['姓名','年龄','国家'];
     */
    init: function(arr, titleArr){
        var html = '';
        var titleStr = titleArr.join() + '\n';

        for(var i=0; i<arr.length; i++)
        {
            var key = [];
            for(var j in arr[i]){
                if(arr[i].hasOwnProperty(j)) {key.push(j);}
            }
            key = key.sort(); //为了避免for-in在不同浏览器出现排序混乱，先取所有key然后排序

            for(var k = 0; k < key.length; k++)
            {
                if(k != key.length-1) {
                    html += arr[i][key[k]] + ',';
                }
                else {
                    html += arr[i][key[k]];
                }
            }
            html += '\n';
        }

        this.content = titleStr + html;
    },

    /**
     * 导出文件名
     * @param fileName 文件名
     * @param type 导出格式（传数字0,1,2,3表示相应格式，可拓展）
     */
    saveName: function(fileName, type){
        var format = ['.csv','.xls','.txt','.doc'];
        var BB = self.Blob;
        saveAs(new BB(
                ["\ufeff" + this.content] //\ufeff防止utf8 bom防止中文乱码
                , {type: "text/plain;charset=utf8"}
            )
            , fileName + format[type]
        );
    },

    /**
     * 最简单导出.xls格式文件，只需传需要导出table的父元素的ID和文件名即可
     * @param fileName 文件名
     * @param contentId table的*父元素*的ID（注：如果是table的ID会导出所有标签）
     * 缺点：会导出table中的所有内容，导出的excel没有分割线，不能选择存储路径
     * 优点：使用简单
     */
    saveSimple: function(fileName, contentId){
        var BB = new Blob([document.getElementById(contentId).innerHTML], {type: 'text/plain;charset=utf-8'});
        saveAs(BB, fileName +'.xls')
    }
};