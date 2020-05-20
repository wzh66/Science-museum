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
    var D = date.getDate();
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