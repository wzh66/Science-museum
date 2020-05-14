"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/pay/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/pay/pay.html',
            controller: "serviceMemberPayController"
        });
}]).controller('serviceMemberPayController', ['$scope', '$location', '$routeParams', 'authSvc', 'indexSvc', 'orderSvc', function ($scope, $location, $routeParams, authSvc, indexSvc, orderSvc) {
    $scope.type = authSvc.type();
    $scope.key = authSvc.key();
    $scope.orderId = $routeParams.id;

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    orderSvc.getOrderDetail($scope.key, $scope.orderId).then(function success(res) {
        $scope.detail = res.result;
    });

    $scope.wechatPay = function (orderNo) {
        $scope.active = true;
        var body = {
            key: $scope.key,
            orderNo: orderNo,
            payType: 'wxpay_scan'
        };
        orderSvc.payOrders(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.codeShow = true;
                $scope.payCode = res.result.payCode;
                $scope.internal = setInterval(function () {
                    orderSvc.getOrderDetail($scope.key, $scope.orderId).then(function success(res) {
                        if (res.result.isPaid === 1) {
                            $scope.codeShow = false;
                            clearInterval($scope.internal);
                            $scope.$root.dialog.open(true, '系统提示', '您已成功支付', ['确认'], function () {
                                    $location.path('/service/member/order/list');
                            });
                        }
                    });
                }, 1000);
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了'], function () {
                        $location.path('/service/member/order/list');
                });
            }
        });
    };


    $scope.$on('$destroy', function () {
        if ($scope.internal) {
            clearInterval($scope.internal);
        }
    });

}]);