"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/contact', { //app首页
            templateUrl: 'pages/contact/contact.html',
            controller: "contactController"
        });
}]).controller('contactController', ['$scope', 'indexSvc', function ($scope, indexSvc) {
    indexSvc.getImage(7).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
}]);
