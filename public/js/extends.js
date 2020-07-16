function preventDefault(event) {
    if (document.all) {
        window.event.returnValue = false;
    } else {
        event.preventDefault();
    }
}


//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

//回到页面顶部
function toTop() {
    $("html,body").animate({
        scrollTop: $("body").offset().top
    }, 500, 'swing');
}

function formData(body) {
    var form = new FormData();
    for (var kn in body) {
        if (body) {
            form.set(kn, body[kn] === undefined ? '' : body[kn]);
        }
    }
    return form;
}

function formDataToUrl(body, ifFist) {
    var str = '';
    for (var keyName in body) {
        if (!str && ifFist) {
            str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        } else {
            str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        }
    }
    return str;
}

var ua = navigator.userAgent;


function combine(arr) {
    var count = arr.length - 1; //数组长度(从0开始)
    var tmp = [];
    var totalArr = [];// 总数组

    return doCombinationCallback(arr, 0);//从第一个开始
    //js 没有静态数据，为了避免和外部数据混淆，需要使用闭包的形式
    function doCombinationCallback(arr, curr_index) {
        for (val of arr[curr_index]) {
            tmp[curr_index] = val;//以curr_index为索引，加入数组
            //当前循环下标小于数组总长度，则需要继续调用方法
            if (curr_index < count) {
                doCombinationCallback(arr, curr_index + 1);//继续调用
            } else {
                totalArr.push(tmp);//(直接给push进去，push进去的不是值，而是值的地址)
            }

            //js  对象都是 地址引用(引用关系)，每次都需要重新初始化，否则 totalArr的数据都会是最后一次的 tmp 数据；
            oldTmp = tmp;
            tmp = [];
            for (index of oldTmp) {
                tmp.push(index);
            }
        }
        return totalArr;
    }
}

var SKUResult = {};

function getObjKeys(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
            keys[keys.length] = key;
    return keys;
}

//把组合的key放入结果集SKUResult
function add2SKUResult(combArrItem, sku) {
    var key = combArrItem.join(";");
    if (SKUResult[key]) {//SKU信息key属性·
        SKUResult[key].id += sku.id;
        SKUResult[key].price = sku.price;
    } else {
        SKUResult[key] = {
            id: sku.id,
            price: sku.price
        };
    }
}

//初始化得到结果集
function initSKU() {
    var i, j, skuKeys = getObjKeys(data);
    for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i];//一条SKU信息key
        var sku = data[skuKey];	//一条SKU信息value
        var skuKeyAttrs = skuKey.split(";"); //SKU信息key属性值数组
        var len = skuKeyAttrs.length;


        //对每个SKU信息key属性值进行拆分组合
        var combArr = arrayCombine(skuKeyAttrs);
        for (j = 0; j < combArr.length; j++) {
            add2SKUResult(combArr[j], sku);
        }

        //结果集接放入SKUResult
        SKUResult[skuKey] = {
            id: sku.id,
            price: sku.price
        }
    }
}

/**
 * 从数组中生成指定长度的组合
 */
function arrayCombine(targetArr) {
    if (!targetArr || !targetArr.length) {
        return [];
    }

    var len = targetArr.length;
    var resultArrs = [];

    // 所有组合
    for (var n = 1; n < len; n++) {
        var flagArrs = getFlagArrs(len, n);
        while (flagArrs.length) {
            var flagArr = flagArrs.shift();
            var combArr = [];
            for (var i = 0; i < len; i++) {
                flagArr[i] && combArr.push(targetArr[i]);
            }
            resultArrs.push(combArr);
        }
    }

    return resultArrs;
}


/**
 * 获得从m中取n的所有组合
 */
function getFlagArrs(m, n) {
    if (!n || n < 1) {
        return [];
    }

    var resultArrs = [],
        flagArr = [],
        isEnd = false,
        i, j, leftCnt;

    for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }

    resultArrs.push(flagArr.concat());

    while (!isEnd) {
        leftCnt = 0;
        for (i = 0; i < m - 1; i++) {
            if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                for (j = 0; j < i; j++) {
                    flagArr[j] = j < leftCnt ? 1 : 0;
                }
                flagArr[i] = 0;
                flagArr[i + 1] = 1;
                var aTmp = flagArr.concat();
                resultArrs.push(aTmp);
                if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                    isEnd = true;
                }
                break;
            }
            flagArr[i] == 1 && leftCnt++;
        }
    }
    return resultArrs;
}

function listToTree(list) {
    var copyList = list.slice(0);
    var tree = [];
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < copyList.length; i++) {
        // 找出每一项的父节点，并将其作为父节点的children
        // tslint:disable-next-line:prefer-for-of
        for (var j = 0; j < copyList.length; j++) {
            if (copyList[i].parentId === copyList[j].id) {
                if (copyList[j].children === undefined) {
                    copyList[j].children = [];
                }
                copyList[j].children.push(copyList[i]);
            }
        }
        // 把根节点提取出来，parentId为null的就是根节点
        if (copyList[i].parentId === 0) {
            tree.push(copyList[i]);
        }
    }
    return tree;
}

//根据开始日期和结束日期获取所有日期的方法
function get(day1, day2) {
    var date1 = getDate(day1);
    var date2 = getDate(day2);
    if (date1.getTime() > date2.getTime()) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    if (day1 > day2) {
        var tempDate = day1;
        day1 = day2;
        day2 = tempDate;
    }
    if (date1.getTime() === date2.getTime()) {
        date1.setDate(date1.getDate() - 1);
    }
    date1.setDate(date1.getDate() + 1);
    var dateArr = [];
    var i = 0;
    while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
        }
        var monthStr = (date1.getMonth() + 1).toString();
        if (monthStr.length == 1) {
            monthStr = "0" + monthStr;
        }
        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" + dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
    }
    if (day1 !== day2) {
        dateArr.splice(0, 0, day1);
    }
    dateArr.push(day2);
    return dateArr;
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//时间戳转换成日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    /*var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();*/
    return Y + M + D;
}

function minDate() {
    var now = new Date();
    return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}

function getDate(str) {
    var tempDate = getNowFormatDate();
    tempDate = new Date(tempDate);
    var list = str.split("-");
    tempDate.setFullYear(list[0]);
    tempDate.setMonth(list[1] - 1);
    tempDate.setDate(list[2]);
    return tempDate;
}


function showLocale(objD) {
    var str, colorhead, colorfoot;
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objD.getDay();
    if (ww == 0) colorhead = "<font color=\"#16528c\">";
    if (ww > 0 && ww < 6) colorhead = "<font color=\"#16528c\">";
    if (ww == 6) colorhead = "<font color=\"#16528c\">";
    if (ww == 0) ww = "星期日";
    if (ww == 1) ww = "星期一";
    if (ww == 2) ww = "星期二";
    if (ww == 3) ww = "星期三";
    if (ww == 4) ww = "星期四";
    if (ww == 5) ww = "星期五";
    if (ww == 6) ww = "星期六";
    colorfoot = "</font>"
    str = colorhead + yy + "年" + MM + "月" + dd + "日 " + hh + ":" + mm + " " + ww + colorfoot;
    return (str);
}

function tick() {
    var today;
    today = new Date();
    document.getElementById("timesss").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}

function slide() {
    $(function () {
        var flag = true; //防止用户快速多次点击
        var zoom_n = 1;//鼠标滚轮缩放

        init(); //初始化
        //点击切换图片
        $(".move-img").click(function () {
            $(".move-img").removeClass('active');
            $(this).addClass('active');
            var thisSrc = $(this).attr('src');
            $(".big-img img").attr('src', thisSrc);//获取点击图片的地址并赋值
            $(".big-img .img-parent").attr('style', '');//切换图片从正位开始
            zoom_n = 1;
            $(".big-img .img-parent img").css('transform', 'scale(1)');
        });
        //左右移动
        $(".smallimg .move-left").on('click', function () {
            flag ? left() : "";
        });

        $(".smallimg .move-right").on('click', function () {
            flag ? right() : "";
        });

        function left() {
            flag = false;
            //计算最后
            var imgPosition = $(".move-img:last").offset().left + $(".move-img:last").width();
            var boxPosition = $(".smallimg").offset().left + $(".smallimg").width();
            if (imgPosition >= boxPosition) {
                $('.smallimg ul').animate({
                    left: '-=105'
                }, 500, function () {
                    flag = true;
                });
            } else {
                flag = true;
            }
        }

        function right() {
            flag = false;
            //计算第一个
            var imgPosition = $(".move-img:first").offset().left;
            var boxPosition = $(".smallimg").offset().left;
            if (imgPosition < boxPosition) {
                $('.smallimg ul').animate({
                    left: '+=105'
                }, 500, function () {
                    flag = true;
                });
            } else {
                flag = true;
            }
        }

        function init() {
            var numImg = $('.move-img').length;
            //重新定义ul 宽度
            $(".smallimg ul").css('width', numImg * 105 + 'px');
            $($('.move-img')[0]).addClass('active'); //第一个给默认选中
            $(".big-img img").attr('src', $($('.move-img')[0]).attr('src'));
        }


        //图片拖拽
        var $div_img = $(".big-img .img-parent");
        //绑定鼠标左键按住事件
        $div_img.bind("mousedown", function (event) {
            event.preventDefault && event.preventDefault(); //去掉图片拖动响应
            //获取需要拖动节点的坐标
            var offset_x = $(this)[0].offsetLeft;//x坐标
            var offset_y = $(this)[0].offsetTop;//y坐标
            //获取当前鼠标的坐标
            var mouse_x = event.pageX;
            var mouse_y = event.pageY;
            //绑定拖动事件
            //由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素
            $(".big-img .img-parent").bind("mousemove", function (ev) {
                // 计算鼠标移动了的位置
                var _x = ev.pageX - mouse_x;
                var _y = ev.pageY - mouse_y;
                //设置移动后的元素坐标
                var now_x = (offset_x + _x) + "px";
                var now_y = (offset_y + _y) + "px";
                //改变目标元素的位置
                $div_img.css({
                    top: now_y,
                    left: now_x
                });
            });
        });
        //当鼠标左键松开，接触事件绑定
        $(".big-img .img-parent").bind("mouseup", function () {
            $(this).unbind("mousemove");
        });


        //旋转
        var spin_n = 0;
        $(".img-rotate.left").click(function () {
            spin_n -= 15;
            $(".big-img .img-parent").css({
                "transform": " rotate(" + spin_n + "deg)",
                "-moz-transform": " rotate(" + spin_n + "deg)",
                "-ms-transform": " rotate(" + spin_n + "deg)",
                "-o-transform": " rotate(" + spin_n + "deg)",
                "-webkit-transform": " rotate(" + spin_n + "deg)"
            });
        });
        $(".img-rotate.right").click(function () {
            spin_n += 15;
            $(".big-img .img-parent").css({
                "transform": " rotate(" + spin_n + "deg) ",
                "-moz-transform": " rotate(" + spin_n + "deg) ",
                "-ms-transform": " rotate(" + spin_n + "deg)",
                "-o-transform": " rotate(" + spin_n + "deg)",
                "-webkit-transform": " rotate(" + spin_n + "deg)"
            });
        });


        //鼠标滚轮缩放图片
        function zoomImg(o, delta) {
            if (delta == 'up') {
                zoom_n -= 0.1;
                zoom_n = zoom_n <= 0.1 ? 0.1 : zoom_n;
            } else {
                zoom_n += 0.1;
            }
            $(".big-img .img-parent img").css({
                "transform": "scale(" + zoom_n + ")",
                "-moz-transform": "scale(" + zoom_n + ")",
                "-ms-transform": "scale(" + zoom_n + ")",
                "-o-transform": "scale(" + zoom_n + ")",
                "-webkit-transform": "scale(" + zoom_n + ")"
            });
        }

        //绑定鼠标滚轮缩放图片
        $(".big-img .img-parent img").bind("mousewheel DOMMouseScroll", function (e) {
            console.log(1231);
            e = e || window.event;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail;
            var dir = delta > 0 ? 'up' : 'down';
            zoomImg(this, dir);
            return false;
        });
    });

}



