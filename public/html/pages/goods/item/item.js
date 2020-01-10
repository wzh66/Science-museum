"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/item/:id', { //app首页
            templateUrl: 'pages/goods/item/item.html',
            controller: "goodsItemController"
        });
}]).controller('goodsItemController', ['$scope', '$routeParams', '$location', '$cookieStore', 'goodsSvc', 'authSvc', function ($scope, $routeParams, $location, $cookieStore, goodsSvc, authSvc) {
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    var data = {};
    var keys = [];
    var selectedIds = [];
    SKUResult = {};
    $scope.tempOrder = {
        gpId: $scope.id,
        name: '',
        specs: [],
        quantity: 1,
        specVals: '',
        price: 0,
        typeId: ''
    };

    goodsSvc.item($scope.id).then(function success(res) {
        $scope.info = res.result.goods;
        $scope.tempOrder.name = $scope.info.name;
        $scope.poster = FILE_PREFIX_URL + $scope.info.dispImgs;
        $scope.skus = res.result.products;
        $scope.specs = (function () {
            res.result.specs.forEach(function (item) {
                var match = $scope.skus[getIndex($scope.skus, 'id', $scope.id)];
                console.log(match.typeId);
                $scope.tempOrder.typeId = match.typeId;
                var matchField = match.specsFields[getIndex(match.specsFields, 'fieldId', item.fieldId)];
                item.specsFields.forEach(function (field) {
                    if (field.fieldValue === matchField.fieldValue) {
                        field.selected = true;
                    }
                });
            });
            return res.result.specs.sort(function (a, b) {
                return a.fieldId - b.fieldId;
            });
        })();

        $scope.specs.forEach(item => {
            key = [];
            item.specsFields.forEach(function (field) {
                key.push(field.fieldId + ':' + field.fieldValue);
            });
            keys.push(key);
        });

        //console.log($scope.skus);
        $scope.getSpecValue();
    });

    $scope.getMatched = function (specs) {
        var result = null;
        $scope.skus.forEach(function (sku) {
            var isThis = true;

            sku.specsFields.forEach(function (skuField) {
                var match = specs[getIndex(specs, 'fieldId', skuField.fieldId)];
                if (skuField.fieldValue !== match.fieldValue) {
                    isThis = false;
                }
            });
            if (isThis) {
                result = sku;
            }
        });
        return result;
    };

    $scope.getPrice = function () {
        var matched = $scope.getMatched($scope.tempOrder.specs);
        if (matched) {
            $scope.tempOrder.gpId = matched.id;
            $scope.tempOrder.price = matched.price;
            $scope.disabled = false;
        } else {
            $scope.disabled = true;
        }
    };


    $scope.getSpecValue = function () {
        var specValue = '';
        var specs = [];
        selectedIds = [];
        $scope.specs.forEach(function (item) {
            item.specsFields.forEach(function (field) {
                if (field.selected) {
                    if (!specValue) {
                        specValue = field.fieldValue;
                    } else {
                        specValue = specValue + '_' + field.fieldValue;
                    }
                    selectedIds.push(field.fieldId + ':' + field.fieldValue);
                    specs.push(field);
                }
            });
        });
        $scope.tempOrder.specVals = specValue;
        $scope.tempOrder.specs = specs;
        $scope.getPrice();
        $scope.setDisabled();
    };

    $scope.getCombine = function () {
        var arr = [];
        $scope.specs.forEach(function (item) {
            arr.push(item.specsFields);
        });
        return combine(arr);
    };

    $scope.selected = function (spec, field) {
        spec.specsFields.forEach(function (item) {
            item.selected = false;
            field.selected = true;
        });
        $scope.getSpecValue();
    };

    $scope.setDisabled = function () {
        /*var arr = [];
        $scope.getCombine().forEach(function (item) {
            var key = '';
            item.forEach(function (field) {
                if (key) {
                    key = key + ';' + field.fieldId + ':' + field.fieldValue;
                } else {
                    key = field.fieldId + ':' + field.fieldValue;
                }
            });
            arr.push(key);
        });
        console.log(arr);
        $scope.skus.forEach(function (item) {//所有存在的组合
            var key = '';
            item.specsFields.forEach(function (field) {
                if (key) {
                    key = key + ';' + field.fieldId + ':' + field.fieldValue;
                } else {
                    key = field.fieldId + ':' + field.fieldValue;
                }
            });
            data[key] = {id: item.id, price: item.price};
        });
        $scope.initSKU();
        $scope.specs.forEach(function (spec) {

        });
        var selectedObjs = $('.selected');
        var selectedIds = [];
        selectedObjs.each(function() {
            selectedIds.push($(this).attr('attr_id'));
        });
        selectedIds.sort(function(value1, value2) {
            return parseInt(value1) - parseInt(value2);
        });
        var len = selectedIds.length;
        $(".sku").not(selectedObjs).not($(e.target)).each(function () {
            var siblingsSelectedObj = $(e.target).siblings('.selected');
            var testAttrIds = [];//从选中节点中去掉选中的兄弟节点
            if (siblingsSelectedObj.length) {
                var siblingsSelectedObjId = siblingsSelectedObj.attr('attr_id');
                for (var i = 0; i < len; i++) {
                    (selectedIds[i] != siblingsSelectedObjId) && testAttrIds.push(selectedIds[i]);
                }
            } else {
                testAttrIds = selectedIds.concat();
            }
            testAttrIds = testAttrIds.concat($(this).attr('attr_id'));
            testAttrIds.sort(function (value1, value2) {
                return parseInt(value1) - parseInt(value2);
            });
            console.log(testAttrIds);
            if (!SKUResult[testAttrIds.join(';')]) {
                $(this).addClass('disabled').removeClass('selected');
            } else {
                $(this).removeClass('disabled');
            }
        });*/
    };
    $scope.initSKU = function () {
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
    };

    $scope.reduce = function () {
        if ($scope.tempOrder.quantity === 1) {
            return false;
        }
        $scope.tempOrder.quantity = $scope.tempOrder.quantity - 1;
    };
    $scope.plus = function () {
        $scope.tempOrder.quantity = $scope.tempOrder.quantity + 1;
    };

    $scope.buy = function (disabled) {
        if (disabled) {
            return false;
        }
        $cookieStore.put('tempOrder', $scope.tempOrder);
        $location.path('/checkout/' + $scope.tempOrder.gpId);
    };
    $scope.addCart = function (disabled) {
        if (disabled) {
            return false;
        }
        $cookieStore.put('tempOrder', $scope.tempOrder);
        $location.path('/checkout/' + $scope.tempOrder.gpId);
    };
    $scope.like = function () {
        var key = authSvc.key();
        goodsSvc.like(key, $scope.id).then(function success(res) {
            console.log(res);
        })
    }
}]);
