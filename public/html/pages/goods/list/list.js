"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/list', { //app首页
            templateUrl: 'pages/goods/list/list.html',
            controller: "goodsListController"
        });
}]).controller('goodsListController', ['$scope', '$routeParams', 'goodsSvc', 'authSvc', function ($scope, $routeParams, goodsSvc, authSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.searchKey = $routeParams.searchKey;
    $scope.params = {
        goodsName: $scope.searchKey,
        productTypeId: '',
        price: ''
    };

    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };

    $scope.search = function (searchKey) {
        $scope.params.goodsName = searchKey;
    };

    goodsSvc.types().then(function success(res) {
        console.log(res);
        $scope.types = res.result;
    });

    $scope.setTypeId = function (typeId) {
        $scope.params.productTypeId = typeId;
    };

    $scope.getData = function () {
        var body = JSON.parse(JSON.stringify($scope.params));
        body.page = $scope.page.page;
        goodsSvc.find(body).then(function success(res) {
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

    $scope.like = function (e, item) {
        e.preventDefault();
        var key = authSvc.key();
        if (item.isCollect) {
            goodsSvc.unlike(key, item.id).then(function success(res) {
                console.log(res);
                item.isCollect = 0;
            })
        } else {
            goodsSvc.like(key, item.id).then(function success(res) {
                console.log(res);
                item.isCollect = 1;
            })
        }
    }
}]);
