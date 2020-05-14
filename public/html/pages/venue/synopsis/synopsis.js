"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/venue/synopsis', { //科学馆简介
            templateUrl: 'pages/venue/synopsis/synopsis.html',
            controller: "venueSynopsisController"
        });
}]).controller('venueSynopsisController', ['$scope', 'indexSvc', 'venueSvc', function ($scope, indexSvc, venueSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.img;
    $scope.synopsis;
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    venueSvc.introduction(1).then(function success(res) {
        res.result.introduction = res.result.introduction.replace(/musWeb/gi, 'api');
        $scope.synopsis = res.result;
    });


}]);