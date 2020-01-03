"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/balance', { //app首页
            templateUrl: 'pages/member/balance/balance.html',
            controller: "memberBalanceController"
        });
}]).controller('memberBalanceController', ['$scope', 'authSvc', 'subjectSvc', 'accountSvc', function ($scope, authSvc, subjectSvc, accountSvc) {
    $scope.key = authSvc.key();
    $scope.page = {
        total: 0,
        totalPages: 1,
        rows: 10,
        page: 1
    };

    $scope.account = {
        balance: 0
    };

    $scope.tradeType = '';

    $scope.setType = function (type) {
        $scope.tradeType = type;
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
            $scope.selected = $scope.items[0];
            $scope.getData();
        });
    });

    $scope.setItem = function (item) {
        $scope.selected = item;
        $scope.getData();
    };

    $scope.getList = function () {
        accountSvc.list($scope.key, $scope.selected.value, 'qb', $scope.tradeType, $scope.page.page).then(function success(res) {
            if (res.code === '0000') {
                console.log(res);
                $scope.records = res.result.list;
                $scope.page.totalPages = res.result.totalPages;
            }
        });
    };

    $scope.getData = function () {
        accountSvc.get($scope.key, $scope.selected.value, 'qb').then(function success(res) {
            console.log(res);
            if (res.code === '0000') {
                $scope.noExist = false;
                $scope.records = res.result.list;
                $scope.account = res.result.account;
            }
            if (res.code === '1002') {
                $scope.noExist = true;
                $scope.records = [];
                $scope.account = {
                    balance: 0
                };
            }
        });
        $scope.getList();
    };

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            if ($scope.selected) {
                $scope.getData();
            }
        }
    }, true);

    $scope.$watch('tradeType', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.page.page = 1;
            $scope.getList();
        }
    });
}]);
