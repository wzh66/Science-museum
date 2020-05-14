"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/predetermine/:id', { //科学馆新闻
            templateUrl: 'pages/hall/predetermine/predetermine.html',
            controller: "hallPredetermineController"
        });
}]).controller('hallPredetermineController', ['$scope', '$routeParams', '$location', 'indexSvc', 'hallSvc', 'authSvc', function ($scope, $routeParams, $location, indexSvc, hallSvc, authSvc) {
    $scope.id = $routeParams.id;
    $scope.key = authSvc.key();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        meetingName: '',
        meetingTypeId: '',
        beginTime: '',
        endTime: '',
        attendance: '',
        contact: '',
        phone: '',
        remark: ''
    };
    $scope.count = {};
    $scope.result = {};
    $scope.serviceCost = 0;
    $scope.reserveList = [];
    $scope._goodsList = [];
    $scope.detail = {
        dailyRentPrice: ''
    };
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

    hallSvc.getOrderGoodsList($scope.key).then(function success(res) {
        $scope.goodsList = res.result;
    });

    $scope.startTime = function () {
        laydate({
            elem: '#start',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
                if ($scope.params.endTime) {
                    $scope.$apply($scope.dateList = get($scope.params.beginTime, $scope.params.endTime));
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
                $scope.$apply($scope.dateList = get($scope.params.beginTime, $scope.params.endTime));
            }
        });
    };


    /*$scope.checkDate = function (data) {
        if ($scope.params.beginTime <= data) {
            $scope.params.endTime = data;
            $scope.$apply($scope.show = true);
        } else {
            $scope.$root.dialog.open(true, '系统提示', '结束时间应大于或等于开始时间', ['我知道了']);
        }
    }*/

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
            reserveEndTime: $scope.params.endTime
        };
        hallSvc.submitOrder(body).then(function success(res) {
            if (res.code === '0000') {
                $location.path('/service/member/pay/' + res.result);
                // window.location.href = '#/service/member/pay?orderId=' + res.result;
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