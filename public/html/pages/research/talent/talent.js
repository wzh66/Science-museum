"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/research/talent', { //科学馆新闻
            templateUrl: 'pages/research/talent/talent.html',
            controller: "researchTalentController"
        });
}]).controller('researchTalentController', ['$scope', 'indexSvc', 'researchSvc', function ($scope, indexSvc, researchSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(2).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    researchSvc.getTalentPoolList().then(function success(res) {
        $scope.talentList = res.result;
    });
}]);