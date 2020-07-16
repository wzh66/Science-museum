"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/research/news', { //科学馆新闻
            templateUrl: 'pages/research/news/news.html',
            controller: "researchNewsController"
        });
}]).controller('researchNewsController', ['$scope', 'indexSvc', 'newsSvc', 'researchSvc', function ($scope, indexSvc, newsSvc, researchSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope._FILE_PREFIX_URL = _FILE_PREFIX_URL;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    indexSvc.getImage(2).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getNewsList = function (page) {
        researchSvc.getNewsList(page).then(function success(res) {
            $scope.newsList = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };


    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getNewsList(n);
        }
    }, true);


}]);
