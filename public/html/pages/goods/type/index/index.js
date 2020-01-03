"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/type/index', { //app首页
            templateUrl: 'pages/goods/type/index/index.html',
            controller: "goodsTypeIndexController"
        });
}]).controller('goodsTypeIndexController', ['$scope', '$routeParams', '$location', 'productSvc', function ($scope, $routeParams, $location, productSvc) {
    $scope.searchKey = '';
    $scope.search = function () {
        console.log('aa');
        window.location.href = '/goods/list?searchKey=' + $scope.searchKey;
    }
}]);
