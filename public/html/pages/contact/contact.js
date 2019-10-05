"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  // 设定路由
  $routeProvider
    .when('/contact', { //app首页
      templateUrl: 'pages/contact/contact.html',
      controller: "contactController"
    });
}]).controller('contactController', ['$scope', function ($scope) {
  $scope.isSubmit = false;
  $scope.contact = {
    company: '',
    name: '',
    mobile: '',
    employees: '',
    revenue_2016: '',
    revenue_2017: '',
    revenue_2018: '',
    comprehend: true
  };
  $scope.submit = function () {
    $scope.isSubmit = true;
  };
}]);
;
