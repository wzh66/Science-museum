"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/venue/news', { //科学馆新闻
            templateUrl: 'pages/venue/news/news.html',
            controller: "venueNewsController"
        });
}]).controller('venueNewsController', ['$scope', 'indexSvc', 'newsSvc', function ($scope, indexSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getNewsList = function (page) {
        newsSvc.getNewsList(1, '', page).then(function success(res) {
            $scope.newsList = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };

    $scope.getNewsList($scope.page.page);

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getNewsList(n);
        }
    }, true);

}]);