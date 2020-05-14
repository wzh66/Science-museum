"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/research/synopsis', { //科学馆简介
            templateUrl: 'pages/research/synopsis/synopsis.html',
            controller: "researchSynopsisController"
        });
}]).controller('researchSynopsisController', ['$scope', 'indexSvc', 'venueSvc', function ($scope, indexSvc, venueSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(2).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    venueSvc.introduction(2).then(function success(res) {
        res.result.introduction = res.result.introduction.replace(/musWeb/gi, 'api');
        $scope.synopsis = res.result;
    });
}]);