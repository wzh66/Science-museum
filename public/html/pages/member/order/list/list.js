"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/order/list', { //app首页
            templateUrl: 'pages/member/order/list/list.html',
            controller: "memberOrderListController"
        });
}]).controller('memberOrderListController', ['$scope', 'authSvc', 'orderSvc', function ($scope, authSvc, orderSvc) {
    $scope.key = authSvc.key();
    $scope.tabIndex = 0;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.params = {
        key: $scope.key,
        status: 0,
        orderNo: ''
    };
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.returnShow = false;
    $scope.setTab = function (status) {
        $scope.params.status = status;
    };

    $scope.getOrders = function () {
        orderSvc.items($scope.params).then(function success(res) {
            $scope.orders = res.result.list;
            console.log($scope.orders);
        });
    };

    $scope.openFile = function (fileId) {
        window.open($scope.FILE_PREFIX_URL + fileId);
    };
    $scope.selected = {
        key: $scope.key,
        orderId: '',
        remark: ''
    };
    $scope.return = function (id) {
        $scope.returnShow = true;
        $scope.selected.orderId = id;
    };

    $scope.close = function () {
        $scope.returnShow = false;
    };

    $scope.loading = false;
    $scope.submit = function (form) {
        if ($scope.loading) {
            return false;
        }
        $scope.loading = true;
        if (form.$invalid) {
            return false;
        }
        orderSvc.return($scope.selected).then(function success(res) {
            $scope.loading = false;
            $scope.returnShow = false;
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '您的退款申请已成功提交', ['我知道了']);
                $scope.getOrders();
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };

    $scope.$watch('params', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getOrders();
        }
    }, true);
}]);
