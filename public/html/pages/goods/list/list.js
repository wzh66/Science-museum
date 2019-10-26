"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/list', { //app首页
            templateUrl: 'pages/goods/list/list.html',
            controller: "goodsListController"
        });
}]).controller('goodsListController', ['$scope', 'goodsSvc', function ($scope, goodsSvc) {
    $scope.params = {
        goodsName: '',
        productTypeId: '',
        price: ''
    };

    $scope.page = {
        total: 20,
        page: 1
    };

    $scope.items = Array(20)
        .fill(0)
        .map(function (_v, i) {
            return i;
        });
    $scope.turnPage = function (page) {
        console.log(page);
    };
    goodsSvc.find($scope.params).then(function success(res) {
        console.log(res);
    });

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            console.log(n);
        }
    }, true);
}]);
