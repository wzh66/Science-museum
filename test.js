var keys = [
    ["18:9980", "18:5980", "18:6980", "18:8880", "18:7980"],
    ["20:0", "20:3", "20:1", "20:2"],
    ["54:2", "54:3", "54:0", "54:1"]
];

//后台读取结果集
var data = {
    "18:5980;20:0;54:3": {id: 65, price: 2},
    "18:5980;20:3;54:0": {id: 69, price: 6},
    "18:5980;20:3;54:1": {id: 71, price: 8},
    "18:6980;20:1;54:0": {id: 75, price: 12},
    "18:6980;20:2;54:2": {id: 74, price: 11},
    "18:6980;20:3;54:3": {id: 66, price: 3},
    "18:7980;20:1;54:1": {id: 77, price: 14},
    "18:8880;20:0;54:3": {id: 67, price: 4},
    "18:8880;20:2;54:0": {id: 73, price: 10},
    "18:8880;20:3;54:2": {id: 68, price: 5},
    "18:9980;20:0;54:2": {id: 64, price: 1},
    "18:9980;20:0;54:3": {id: 70, price: 7},
    "18:9980;20:1;54:0": {id: 72, price: 9},
    "18:9980;20:2;54:1": {id: 76, price: 13}
};
var SKUResult = {};

//获得对象的key
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
        SKUResult[key].id = sku.id;
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
        };
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

initSKU();
console.log(SKUResult);
