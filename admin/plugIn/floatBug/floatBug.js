/**
 * 说明：javascript在两个浮点数进行加减乘除运算时候会出现比较明显误差。
 * 使用方法 alert(num1.add(num2));
 */

//加法函数
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

    return (arg1 * m + arg2 * m) / m;
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

    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成计算。
Number.prototype.sub = function (arg) {
    return Subtr(this, arg);
};


//乘法函数
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
}
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
}
//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

//float 保留两位小数
function numFixed2(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return false;
    }
    f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}