"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/information/list', { //科学馆新闻
            templateUrl: 'pages/information/list/list.html',
            controller: "informationListController"
        });
}]).controller('informationListController', ['$scope', 'indexSvc', 'newsSvc', function ($scope, indexSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };

    indexSvc.getImage(3).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getNewsList = function (id, page) {
        newsSvc.getNewsList(0, id, page).then(function success(res) {
            $scope.newsList = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };

    $scope.getNewsList('', $scope.page.page);


    newsSvc.getTopicList('new').then(function success(res) {
        $scope.topicList = res.result.list;
    });

    $scope.getData = function (id, name) {
        $scope.selectId = id;
        $scope.selectName = name;
        $scope.getNewsList(id, $scope.page.page);
    };

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getNewsList($scope.selectId ? $scope.selectId : '', n);
        }
    }, true);

}]);