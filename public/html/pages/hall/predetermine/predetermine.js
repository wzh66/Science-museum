"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/predetermine/:id', { //科学馆新闻
            templateUrl: 'pages/hall/predetermine/predetermine.html',
            controller: "hallPredetermineController"
        });
}]).controller('hallPredetermineController', ['$scope', '$routeParams', '$location', 'indexSvc', 'hallSvc', 'authSvc', 'orderSvc', function ($scope, $routeParams, $location, indexSvc, hallSvc, authSvc, orderSvc) {
    $scope.id = $routeParams.id;
    $scope.key = authSvc.key();
    $scope.isShow = true;
    $scope.type = authSvc.type();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        meetingName: '',
        meetingTypeId: '',
        beginTime: '',
        endTime: '',
        attendance: '',
        contact: '',
        phone: '',
        remark: '',
        companyName: '',
        address: '',
        bankAccount: '',
        number: '',
        bank: '',
        invoiceType: '',
        type: '',
        invoiceId: ''
    };
    $scope.count = {};
    $scope.result = {};
    $scope.serviceCost = 0;
    $scope.reserveList = [];
    $scope._goodsList = [];
    $scope.detail = {
        dailyRentPrice: ''
    };

    if ($scope.type === 2) {
        $scope.$root.dialog.open(true, '系统提示', '合作单位无法预定场馆!', ['我知道了'], function () {
            window.history.back();
        });
    }

    indexSvc.getImage(4).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getVenueDetail($scope.id).then(function success(res) {
        $scope.detail = res.result;
        $scope.detail.dailyRentPrice = res.result.dailyRentPrice;
    });

    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    hallSvc.getDictsByKey('reserveTimeType').then(function success(res) {
        $scope.reserveTimeType = res.result.slice(0, 3);
    });

    hallSvc.getOrderGoodsList($scope.key, $scope.id).then(function success(res) {
        $scope.goodsList = res.result;
    });

    orderSvc.getInvoiceList($scope.key).then(function success(res) {
        $scope.invoiceList = res.result.list;
    });

    $scope.showing = function () {
        $scope.isShow = !$scope.isShow;
    };


    $scope.getReserveTime = function (beginTime, endTime) {
        var dateList = get(beginTime, endTime);
        var _dateList = [];
        var source = [];
        hallSvc.getReserveTime($scope.id, beginTime, endTime).then(function success(res) {
            if (res.code === '0000') {
                res.result.forEach(item => {
                    item.reserveDate = timestampToTime(item.reserveDate);
                    item.reserveTypes = item.reserveTypes.replace(/[^0-9]/ig, '');
                    item.reserveTypes = item.reserveTypes.split('');
                    dateList.forEach(date => {
                        if (date === item.reserveDate) {
                            _dateList.push({
                                reserveDate: date,
                                reserveTypes: item.reserveTypes
                            });
                        }
                    });
                });
                dateList.forEach(item => {
                    source.push({
                        reserveDate: item,
                        reserveTypes: JSON.parse(JSON.stringify($scope.reserveTimeType))
                    });
                });
                source.forEach(item => {
                    const index = getIndex(_dateList, 'reserveDate', item.reserveDate);
                    let resultItem;
                    if (index >= 0) {
                        resultItem = _dateList[index];
                    } else {
                        resultItem = {reserveDate: item.reserveDate, reserveTypes: []};
                    }
                    resultItem.reserveTypes.forEach(reserveType => {
                        item.reserveTypes[reserveType].disabled = true;
                    });

                });
                $scope.dateList = source;
            }
        });
    };


    $scope.startTime = function () {
        laydate({
            elem: '#start',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
                if ($scope.params.endTime) {
                    $scope.getReserveTime($scope.params.beginTime, $scope.params.endTime);
                }
            }
        });
    };

    $scope.endTime = function () {
        laydate({
            elem: '#end',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
                $scope.$apply($scope.show = true);
                $scope.getReserveTime($scope.params.beginTime, $scope.params.endTime);

            }
        });
    };

    $scope.getInvoiceId = function () {
        var params = {
            key: $scope.key,
            companyName: $scope.params.companyName,
            address: $scope.params.address,
            bankAccount: $scope.params.bankAccount,
            phone: $scope.params.phone,
            number: $scope.params.number,
            bank: $scope.params.bank,
            invoiceType: $scope.params.invoiceType,
            type: $scope.params.type
        };
        orderSvc.addInvoice(params).then(function success(res) {
            if (res.code === '0000') {
                $scope.params.invoiceId = res.result.id;
                $scope.$root.dialog.open(true, '系统提示', '发票信息已成功生成！', ['我知道了']);
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };


    $scope.submit = function (form) {
        if ($scope.params.beginTime && $scope.params.endTime) {
            if (getDate($scope.params.beginTime).getMonth() !== getDate($scope.params.endTime).getMonth()) {
                alert('不允许提交跨月预约，请分别预约！');
                return false;
            }
        }
        if (form.attendance.$error.required) {
            alert('请输入参会人数！');
            return false;
        }
        if (form.contact.$error.required) {
            alert('请输入联系人！');
            return false;
        }
        if (form.phone.$error.required || form.phone.$error.pattern) {
            if (form.phone.$error.required) {
                alert('请输入联系电话!');
            } else {
                alert('请输入正确的联系电话！');
            }
            return false;
        }
        if ($scope.invoiceList.length > 0) {
            if (form.invoiceId.$error.required) {
                alert('请选择发票服务！');
                return false;
            }
        }

        var goodsList = [];
        var result = [];
        $scope._goodsList.forEach(item => {
            var index = $scope.goodsList.findIndex(i => i.baseGoodsId === item);
            if (!$scope.count['' + index]) {
                result.push($scope.goodsList[index].name);
            }
            goodsList.push({
                id: item,
                count: $scope.count['' + index]
            });
        });
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                alert('请填写' + result[i] + '的数量');
            }
            return false;
        }
        $scope._goodsList = goodsList;
        if ($scope.params.beginTime > $scope.params.endTime) {
            var temp = $scope.params.beginTime;
            $scope.params.beginTime = $scope.params.endTime;
            $scope.params.endTime = temp;
        }
        var body = {
            key: $scope.key,
            venueId: $scope.id,
            meetingType: $scope.params.meetingType,
            number: $scope.params.attendance,
            name: $scope.params.contact,
            phone: $scope.params.phone,
            goodsList: JSON.stringify($scope._goodsList),
            reserveList: JSON.stringify($scope.reserveList),
            title: $scope.params.meetingName,
            remark: $scope.params.remark,
            reserveBeginTime: $scope.params.beginTime,
            reserveEndTime: $scope.params.endTime,
            invoiceId: $scope.params.invoiceId
        };
        hallSvc.submitOrder(body).then(function success(res) {
            if (res.code === '0000') {
                $location.path('/service/member/pay/' + res.result);
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };


    $scope.addReserve = function ($event, date) {
        var checked = $event.target;
        if (checked.checked) {
            $scope.reserveList.push({
                reserveDate: date,
                reservType: checked.id
            });
        } else {
            var idx = $scope.reserveList.findIndex(item => item.reserveDate === date && item.reservType === checked.id);
            $scope.reserveList.splice(idx, 1);
        }
    };

    $scope.addGoods = function ($event) {
        var checked = $event.target;
        var index = $scope.goodsList.findIndex(item => item.baseGoodsId === checked.id);
        if (checked.checked) {
            $scope._goodsList.push(checked.id);
        } else {
            var idx = $scope._goodsList.indexOf(checked.id);
            $scope._goodsList.splice(idx, 1);
            $scope.count['' + index] = 0;
            $scope.result['' + index] = 0;

        }
    };

    $scope.$watch('count', function (n, o) {
        if (n !== o && o !== undefined) {
            for (var key in $scope.count) {
                if ($scope.count[key]) {
                    $scope.count[key] = Number(n[key]);
                } else {
                    $scope.count[key] = 0;
                }
                $scope.result[key] = $scope.count[key] * $scope.goodsList[key].price;
            }
        }
    }, true);

    $scope.$watch('result', function (n, o) {
        if (n !== o && o !== undefined) {
            var serviceCost = 0;
            for (var key in $scope.result) {
                if ($scope.result[key]) {
                    serviceCost = serviceCost + n[key];
                }
            }
            $scope.serviceCost = serviceCost;
        }
    }, true);


}]);
