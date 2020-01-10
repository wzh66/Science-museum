"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/product/item/:id', { //app首页
            templateUrl: 'pages/product/item/item.html',
            controller: "productItemController"
        });
}]).controller('productItemController', ['$scope', '$routeParams', '$location', 'productSvc', 'authSvc', function ($scope, $routeParams, $location, productSvc, authSvc) {
    $scope.id = $routeParams.id;
    productSvc.get().then(function success(res) {
        var index = getIndex(res, 'id', $scope.id);
        $scope.product = res[index];
        $scope.products = res;
        $scope.products.splice(index, 1);
    });

    $scope.go = function (id) {
        $location.path('/product/item/' + id);
    };

    $scope.saas = function () {
        $scope.key = authSvc.key();
        if ($scope.key) {
          window.location.href = 'http://saas.wispclouds.com/loader?token=' + authSvc.key();
        }
    };
}]);
