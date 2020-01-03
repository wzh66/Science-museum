"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/index', { //app首页
            templateUrl: 'pages/index/index.html',
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$location', 'productSvc', function ($scope, $location, productSvc) {
    productSvc.get().then(function success(res) {
        $scope.products = res;
    });
    $scope.searchKey = '';
    $scope.searchType = '企业';
    $scope.go = function (url) {
        $location.path(url);
    };
    $scope.setType = function (type) {
        $scope.searchType = type;
    };
    $scope.search = function () {
        window.location.href = 'http://yun.wispclouds.com/#/search?type=' + $scope.searchType + '&searchTxt=' + $scope.searchKey;
    };
}]);
