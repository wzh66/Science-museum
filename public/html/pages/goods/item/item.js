"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/item/:id', { //app首页
            templateUrl: 'pages/goods/item/item.html',
            controller: "goodsItemController"
        });
}]).controller('goodsItemController', ['$scope', '$routeParams', '$location', 'productSvc', function ($scope, $routeParams, $location, productSvc) {
    $scope.id = $routeParams.id;
    $scope.selected = {
        id: $scope.id,
        vip: '1',
        type: '1',
        quantity: 1
    };

    $scope.reduce = function () {
        if ($scope.selected.quantity === 1) {
            return false;
        }
        $scope.selected.quantity = $scope.selected.quantity - 1;
    };
    $scope.plus = function () {
        $scope.selected.quantity = $scope.selected.quantity + 1;
    };
}]);
