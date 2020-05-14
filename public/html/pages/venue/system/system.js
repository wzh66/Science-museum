"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/venue/system', { //科学馆新闻
            templateUrl: 'pages/venue/system/system.html',
            controller: "venueSystemController"
        });
}]).controller('venueSystemController', ['$scope', 'indexSvc', 'venueSvc', function ($scope, indexSvc, venueSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.img;
    $scope.rules;
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    venueSvc.rules(1).then(function success(res) {
        res.result.rules=res.result.rules.replace(/musWeb/gi, 'api');
        $scope.rules = res.result;
    });
}]);