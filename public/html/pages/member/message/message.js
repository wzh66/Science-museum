"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/message', { //app首页
            templateUrl: 'pages/member/message/message.html',
            controller: "memberMessageController"
        });
}]).controller('memberMessageController', ['$scope', 'authSvc', 'messageSvc', function ($scope, authSvc, messageSvc) {
    $scope.key = authSvc.key();
    $scope.isRead = '';
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.params = {
        key: $scope.key,
        ids: []
    };

    $scope.statusList = [{label: '全部', value: ''}, {label: '订单状态消息', value: 'ddxx'}];
    $scope.getData = function () {
        messageSvc.items($scope.params).then(function success(res) {
            $scope.messages = res.result.list;
        });
    };

    $scope.dateChange = function (e) {
        console.log(e);
    };

    $scope.selected = function (message) {
        message.selected = message.selected ? false : true;
        var index = $scope.params.ids.indexOf(message.id);
        console.log(index);
        if (index === -1) {
            $scope.params.ids.push(message.id);
        } else {
            $scope.params.ids.splice(index, 1);
        }
        console.log($scope.params.ids);
    };

    $scope.read = function () {
        messageSvc.read($scope.params).then(function success(res) {
            $scope.getData();
        });
    };

    $scope.del = function () {
        messageSvc.delete($scope.params).then(function success(res) {
            $scope.getData();
        });
    };

    $scope.$watch('isRead', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getData();
        }
    });

    $scope.$watch('status', function (n, o) {
        if (n !== o && o !== undefined) {
            console.log(n);
        }
    }, true);
}]);
