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
    $scope.params = {
        paymentA: '',
        paymentB: '',
        payTime: ''
    };
    $scope.paymentShow = false;
    $scope.payment = [];
    $scope.license = {
        A: {
            option: {
                url: PREFIX_URL + 'uploadFile',
                paramName: 'file',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                dictDefaultMessage: '支付凭证',
                dictCancelUpload: '取消',
                dictRemoveFile: '更换',
                params: {type: 'cust_cert', dir: 'cust_cert'}
            },
            callback: {
                'success': function (file, res) {
                    $scope.params.paymentA = res.result;
                    $scope.payment.push($scope.params.paymentA);
                }
            }
        },
        B: {
            option: {
                url: PREFIX_URL + 'uploadFile',
                paramName: 'file',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                dictDefaultMessage: '支付凭证',
                dictCancelUpload: '取消',
                dictRemoveFile: '更换',
                params: {type: 'cust_cert', dir: 'cust_cert'}
            },
            callback: {
                'success': function (file, res) {
                    $scope.params.paymentB = res.result;
                    $scope.payment.push($scope.params.paymentB);
                }
            }
        }
    };

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    orderSvc.getOrderDetail($scope.key, $scope.orderId).then(function success(res) {
        $scope.detail = res.result;
    });

    $scope.wechatPay = function (orderNo) {
        $scope.active = true;
        $scope.show = false;
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

    $scope.offlinePay = function () {
        $scope.active = false;
        $scope.show = true;
    };

    $scope.addPayment = function () {
        $scope.paymentShow = true;
    };

    $scope.hide = function () {
        $scope.paymentShow = false;
    };

    $scope.submit = function (orderNo) {
        var body = {
            key: $scope.key,
            orderNo: orderNo,
            fileIds: JSON.stringify($scope.payment),
            payTime: $scope.params.payTime
        };
        orderSvc.offlinePay(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '线下支付凭证提交成功，请等待后台人员审核！', ['我知道了'], function () {
                    $location.path('/service/member/order/list');
                });
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })
    };


    $scope.$on('$destroy', function () {
        if ($scope.internal) {
            clearInterval($scope.internal);
        }
    });

}]);