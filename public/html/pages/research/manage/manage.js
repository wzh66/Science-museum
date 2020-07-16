"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/research/manage', { //科学馆新闻
            templateUrl: 'pages/research/manage/manage.html',
            controller: "researchManageController"
        });
}]).controller('researchManageController', ['$scope', 'indexSvc', 'venueSvc', 'researchSvc', function ($scope, indexSvc, venueSvc, researchSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(2).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    /*venueSvc.rules(2).then(function success(res) {
        res.result.rules=res.result.rules.replace(/musWeb/gi, 'api');
        $scope.rules = res.result;
    });*/

    researchSvc.getRules().then(function success(res) {
        res.result.rules = res.result.rules.replace('/declareSys', 'http://admin.ai-fox.net/declareSys');
        $scope.rules = res.result;
    });

}]);
