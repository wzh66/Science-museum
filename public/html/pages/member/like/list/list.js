"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/like/list', { //app首页
            templateUrl: 'pages/member/like/list/list.html',
            controller: "memberLikeListController"
        });
}]).controller('memberLikeListController', ['$scope', 'authSvc', 'goodsSvc', function ($scope, authSvc, goodsSvc) {
    $scope.key = authSvc.key();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        key: $scope.key,
        goodsName: '',
    };

    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.type = 0;
    $scope.selected = function (item, e) {
        e.preventDefault();
        item.selected = !item.selected;
    };
    $scope.setType = function (type) {
        $scope.type = type;
        console.log($scope.type);
    };
    $scope.search = function (searchKey) {
        $scope.params.goodsName = searchKey;
    };

    $scope.all = function () {
        $scope.items.forEach(item => {
            item.selected = true;
        });
    };

    $scope.del = function () {
        var ids = '';
        $scope.items.forEach(item => {
            if (item.selected) {
                if (ids) {
                    ids = ids + ',' + item.id
                } else {
                    ids = item.id
                }
            }
        });
        goodsSvc.unlike($scope.key, ids).then(function success(res) {
            console.log(res);
            $scope.getData();
        })
    };

    $scope.getData = function () {
        var body = JSON.parse(JSON.stringify($scope.params));
        body.page = $scope.page.page;
        goodsSvc.likes(body).then(function success(res) {
            $scope.items = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };

    $scope.getData();

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getData();
        }
    }, true);

    $scope.$watch('params', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.page.page = 1;
            $scope.getData();
        }
    }, true);
}]);
