"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/research/news/item/:id', { //科学馆新闻
            templateUrl: 'pages/research/news/item/item.html',
            controller: "researchNewsItemController"
        });
}]).controller('researchNewsItemController', ['$scope', '$routeParams', 'indexSvc', 'newsSvc', 'researchSvc', function ($scope, $routeParams, indexSvc, newsSvc, researchSvc) {
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(2).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    researchSvc.getNewsDetail($scope.id).then(function success(res) {
        res.result.detail = res.result.detail.replace('/declareSys', 'http://admin.ai-fox.net/declareSys');
        $scope.detail = res.result;
    });
}]);
