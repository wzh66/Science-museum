"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/order/list', { //科学馆新闻
            templateUrl: 'pages/service/member/order/list/list.html',
            controller: "serviceMemberOrderListController"
        });
}]).controller('serviceMemberOrderListController', ['$scope', 'authSvc', 'indexSvc', 'hallSvc', 'orderSvc', function ($scope, authSvc, indexSvc, hallSvc, orderSvc) {
    $scope.key = authSvc.key();
    $scope.type = authSvc.type();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        title: '',
        beginTime: '',
        endTime: '',
        isPaid: ''
    };

    $scope.start = function () {
        laydate({
            elem: '#start',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
            }
        });
    };

    $scope.end = function () {
        laydate({
            elem: '#end',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
            }
        });
    };

    $scope.getData = function (body) {
        orderSvc.getOrderList(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.order = res.result.list;
                $scope.params.beginTime = '';
                $scope.params.endTime = '';
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };

    if ($scope.type === 0) {
        $scope.getData({key: $scope.key, orderType: $scope.type});
    } else {
        $scope.getData({key: $scope.key});
    }


    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.submit = function (form) {
        var body = {
            key: $scope.key,
            title: $scope.params.title,
            reserveBeginTime: $scope.params.beginTime,
            reserveEndTime: $scope.params.endTime,
            isPaid: $scope.params.isPaid,
        };
        if ($scope.type === 0) {
            body.orderType = $scope.type;
        }
        $scope.getData(body);
    };

    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    $scope.getMeetingTypeName = function (value) {
        var index = $scope.meetingType.findIndex(item => item.dictValue === value);
        return $scope.meetingType[index].dictName;
    };

    $scope.cancel = function (id) {
        $scope.$root.dialog.open(true, '系统提示', '您确定要取消订单？', ['确定'], function () {
            orderSvc.cancelOrder($scope.key, id).then(function success(res) {
                if (res.code === '0000') {
                    $scope.$root.dialog.open(true, '系统提示', res.result, ['我知道了'], function () {
                        return false;
                    });
                } else {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了'], function () {
                        return false;
                    });
                }
                $scope.getData({key: $scope.key});
            })
        });

    }


}]);
