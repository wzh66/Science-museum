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
  $scope.go = function (url) {
    $location.path(url);
  };
}]);
