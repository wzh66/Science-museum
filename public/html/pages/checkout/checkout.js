'use strict';

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
    .when('/checkout/:id', { //app首页
        templateUrl: 'pages/checkout/checkout.html',
        controller: 'checkoutController'
    });
}]).controller('checkoutController', ['$scope', '$routeParams', '$location', '$cookieStore', 'authSvc', 'accountSvc', 'subjectSvc', 'checkoutSvc', 'orderSvc', function ($scope, $routeParams, $location, $cookieStore, authSvc, accountSvc, subjectSvc, checkoutSvc, orderSvc) {
    $scope.id = $routeParams.id;
    $scope.oid = $location.search().id;
    $scope.key = authSvc.key();
    $scope.loading = false;
    $scope.payType = 'wxpay';
    $scope.additionalPayTypes = ['', ''];
    $scope.interval;
    $scope.disabled = false;
    $scope.account = {
        amount: 0,
        total: 0,
        zct: 0,
        qb: 0
    };
    $scope.params = {
        key: $scope.key,
        custId: '',
        merchanName: '',
        goodsListStr: []
    };
    $scope.codeShow = false;
    $scope.codeUrl = '';
    $scope.getAccount = function () {
        accountSvc.get($scope.key, $scope.params.custId, 'zct').then(function success(res) {
            console.log(res);
            if (res.result) {
                $scope.account.zct = res.result.account.balance;
            } else {
                $scope.account.zct = 0;
            }
        });
        accountSvc.get($scope.key, $scope.params.custId, 'qb').then(function success(res) {
            if (res.result) {
                $scope.account.qb = res.result.account.balance;
            } else {
                $scope.account.qb = 0;
            }
        });
    };
    if ($scope.oid) {
        $scope.disabled = true;
        orderSvc.item($scope.key, $scope.oid).then(function success(res) {
            $scope.order = res.result.order;
            $scope.selected = {
                label: $scope.order.merchanName,
                value: $scope.order.custId
            };
            $scope.typeId = $scope.order.goodsList[0].typeId;
        });
    } else {
        if (!$cookieStore.get('tempOrder')) {
            $location.path('/goods/item/' + $scope.id);
        } else {
            $scope.tempOrder = $cookieStore.get('tempOrder');
            $scope.typeId = $scope.tempOrder.typeId;
            $scope.params = {
                key: $scope.key,
                custId: '',
                merchanName: '',
                goodsListStr: [{gpId: $scope.tempOrder.gpId, count: $scope.tempOrder.quantity}]
            };
        }
    }

    $scope.setPay = function (type, disabled) {
        if (disabled) {
            return false;
        }
        $scope.payType = type;
        if (type === 'OFFLINE_PAY') {
            $scope.additionalPayTypes = ['', ''];
        }
    };

    $scope.setAdditionalPay = function (type, index, disabled) {
        if (disabled) {
            return false;
        }
        $scope.additionalPayTypes[index] === type ? $scope.additionalPayTypes[index] = '' : $scope.additionalPayTypes[index] = type;
        $scope.account.amount = 0;
        $scope.additionalPayTypes.forEach(item => {
            if (item) {
                $scope.account.amount = $scope.account.amount + $scope.account[item];
            }
        });
        var total = 0;
        if ($scope.oid) {
            total = $scope.order.totalAmount;
        } else {
            total = $scope.tempOrder.price * $scope.tempOrder.quantity;
        }
        if ($scope.account.amount >= total) {
            $scope.payType = '';
        }
    };

    $scope.setPayTypes = function () {
        var payTypes = this.payType;
        if ($scope.payType !== 'OFFLINE_PAY') {
            $scope.additionalPayTypes.forEach(item => {
                if (item) {
                    if (payTypes) {
                        payTypes = payTypes + ',' + item;
                    } else {
                        payTypes = payTypes + item;
                    }
                }
            });
        }
        return payTypes;
    };

    subjectSvc.get($scope.key, 0).then(function success(res) {
        var items = [];
        res.result.list.forEach(function (item) {
            items.push({
                label: item.companyName + '(个人主体)',
                value: item.id
            });
        });
        subjectSvc.get($scope.key, 1).then(function success(res) {
            if (res.result.list.length > 0) {
                res.result.list.forEach(function (item) {
                    items.push({
                        label: item.companyName + '(企业主体)',
                        value: item.id
                    });
                });
            }
            $scope.items = items;
            if (!$scope.selected.value) {
                $scope.selected = $scope.items[0];
            }
        });
    });

    $scope.checkout = function (orderNo) {
        $scope.loading = true;
        checkoutSvc.order({
            key: $scope.key,
            custId: $scope.params.custId,
            payTypes: $scope.setPayTypes(),
            orderNos: orderNo
        }).then(function success(res) {
            $scope.loading = false;
            if (res.result) {
                var msg = $scope.typeId === 48 || $scope.typeId === '48' ? '充值完成，请在我的余额/知产通中查询，如需人工服务请拨打客服热线0755-86561913' : '您已成功成功支付';
                if (res.result.payCode) {
                    $scope.codeShow = true;
                    $scope.codeUrl = res.result.payCode;
                    $scope.internal = setInterval(function () {
                        orderSvc.item($scope.key, orderNo).then(function success(res) {
                            if (res.result.order.status > 2) {
                                $scope.codeShow = false;
                                clearInterval($scope.internal);
                                $cookieStore.remove('tempOrder');
                                $scope.$root.dialog.open(true, '系统提示', msg, ['确认'], function () {
                                    $location.path('/member/order/list');
                                });
                            }
                        });
                    }, 1000);
                } else {
                    $cookieStore.remove('tempOrder');
                    $scope.$root.dialog.open(true, '系统提示', msg, ['确认'], function () {
                        $location.path('/member/order/list');
                    });
                }
            } else {
                $scope.$root.dialog.open(true, '系统提示', '您已成功下单稍后会有客服通过预留的电话号码和您联系，您也可以通过拨打7055-865619138咨询订单相关事宜。', ['确认'], function () {
                    $location.path('/member/order/list');
                });
            }
        });
    };

    $scope.submit = function () {
        if ($scope.loading) {
            return false;
        }
        $scope.loading = true;
        if ($scope.oid) {
            $scope.checkout($scope.oid);
        } else {
            checkoutSvc.submit($scope.params).then(function success(res) {
                $scope.loading = false;
                if (res.code === '0000') {
                    var orderNo = res.result[0];
                    console.log(orderNo);
                    $scope.checkout(orderNo);
                } else if (res.code === '1001') {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了'], function () {
                        authSvc.requestAuth();
                    });
                } else {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
                }
            });
        }
    };

    $scope.close = function () {
        $scope.codeShow = false;
    };

    $scope.$watch('selected', function (n, o) {
        if (n !== o && o !== undefined) {
            console.log(n);
            $scope.params.custId = n.value;
            $scope.params.merchanName = n.label;
            $scope.getAccount();
        }
    }, true);

    $scope.$on('$destroy', function () {
        if ($scope.internal) {
            clearInterval($scope.internal);
        }
    });

}]);
