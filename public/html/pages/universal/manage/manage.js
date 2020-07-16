"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/universal/manage', { //科学馆新闻
            templateUrl: 'pages/universal/manage/manage.html',
            controller: "universalManageController"
        });
}]).controller('universalManageController', ['$scope', 'indexSvc', 'venueSvc', function ($scope, indexSvc, venueSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(8).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    venueSvc.rules(3).then(function success(res) {
        res.result.rules=res.result.rules.replace(/musWeb/gi, 'api');
        $scope.rules = res.result;
    });
}]);
