"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/order/edit/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/order/edit/edit.html',
            controller: "serviceMemberOrderEditController"
        });
}]).controller('serviceMemberOrderEditController', ['$scope', '$routeParams', '$location', 'indexSvc', 'authSvc', 'orderSvc', 'hallSvc', function ($scope, $routeParams, $location, indexSvc, authSvc, orderSvc, hallSvc) {
    $scope.id = $routeParams.id;
    $scope.key = authSvc.key();
    $scope.type = authSvc.type();
    $scope.detail = {
        title: '',
        meetingType: '',
        reserveBeginTime: '',
        reserveEndTime: '',
        number: '',
        name: '',
        phone: '',
        remark: '',
        dailyRentPrice: '',
        venueId: ''
    };
    $scope.dateList = [];
    $scope.count = {};
    $scope.result = {};
    $scope.serviceCost = 0;
    $scope.reserveList = [];
    $scope._goodsList = [];
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    orderSvc.getOrderDetail($scope.key, $scope.id).then(function success(res) {
        res.result.timeList.forEach(item => {
                item.reserveTypes = item.reserveTypes.replace(/[^0-9]/ig, '');
                item.reserveTypes = item.reserveTypes.split('');
                $scope.dateList.push(timestampToTime(item.reserveDate));
            }
        );
        $scope.detail = res.result;
        $scope.detail.venueId = res.result.venueId;
        $scope.detail.dailyRentPrice = res.result.dailyRentPrice;
        $scope.detail.reserveBeginTime = timestampToTime(res.result.reserveBeginTime);
        $scope.detail.reserveEndTime = timestampToTime(res.result.reserveEndTime);
    });


    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    hallSvc.getDictsByKey('reserveTimeType').then(function success(res) {
        $scope.reserveTimeType = res.result.slice(0, 3);
    });


    hallSvc.getOrderGoodsList($scope.key).then(function success(res) {
        $scope.goodsList = res.result;
    });

    $scope.startTime = function () {
        laydate({
            elem: '#start',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.detail.reserveBeginTime = data;
                if ($scope.detail.reserveEndTime) {
                    $scope.$apply($scope.dateList = get($scope.detail.reserveBeginTime, $scope.detail.reserveEndTime));
                }
            }
        });
    };

    $scope.endTime = function () {
        laydate({
            elem: '#end',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.detail.reserveEndTime = data;
                $scope.$apply($scope.show = true);
                $scope.$apply($scope.dateList = get($scope.detail.reserveBeginTime, $scope.detail.reserveEndTime));
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
        var index = $scope.goodsList.findIndex(item => item.id === checked.id);
        if (checked.checked) {
            $scope._goodsList.push(checked.id);
        } else {
            var idx = $scope._goodsList.indexOf(checked.id);
            $scope._goodsList.splice(idx, 1);
            $scope.count['' + index] = 0;
            $scope.result['' + index] = 0;

        }
    };

    $scope.submit = function (form) {
        var goodsList = [];
        $scope._goodsList.forEach(item => {
            var index = $scope.goodsList.findIndex(i => i.id === item);
            goodsList.push({
                id: item,
                count: $scope.count['' + index]
            });
        });
        $scope._goodsList = goodsList;
        if ($scope.detail.reserveBeginTime > $scope.detail.reserveEndTime) {
            var temp = $scope.detail.reserveBeginTime;
            $scope.detail.reserveBeginTime = $scope.detail.reserveEndTime;
            $scope.detail.reserveEndTime = temp;
        }
        var body = {
            key: $scope.key,
            id: $scope.id,
            venueId: $scope.detail.venueId,
            meetingType: $scope.detail.meetingType,
            number: $scope.detail.number,
            name: $scope.detail.name,
            phone: $scope.detail.phone,
            goodsList: JSON.stringify($scope._goodsList),
            reserveList: JSON.stringify($scope.reserveList),
            title: $scope.detail.title,
            remark: $scope.detail.remark,
            reserveBeginTime: $scope.detail.reserveBeginTime,
            reserveEndTime: $scope.detail.reserveEndTime
        };
        orderSvc.updateOrder(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '修改成功', ['我知道了'], function () {
                    $location.path('/service/member/order/list');
                });
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };

    $scope.$watch('count', function (n, o) {
        if (n !== o && o !== undefined) {
            for (var key in $scope.count) {
                if ($scope.count[key]) {
                    $scope.count[key] = Number(n[key]);
                } else {
                    $scope.count[key] = 0;
                }
                $scope.result[key] = $scope.count[key] * $scope.goodsList[key].costPrice;
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