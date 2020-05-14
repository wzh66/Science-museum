"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/list', { //科学馆新闻
            templateUrl: 'pages/hall/list/list.html',
            controller: "hallListController"
        });
}]).controller('hallListController', ['$scope', 'indexSvc', 'hallSvc', 'newsSvc', function ($scope, indexSvc, hallSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    indexSvc.getImage(4).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getVenueList = function (id, page) {
        hallSvc.getVenueList(id, page).then(function success(res) {
            $scope.hallList = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };

    $scope.getVenueList('', $scope.page.page);

    hallSvc.getDictsByKey('venueForm').then(function success(res) {
        $scope.topicList = res.result;
        console.log(res.result);
    });


    $scope.getData = function (id, name) {
        $scope.selectId = id;
        $scope.selectName = name;
        $scope.getVenueList(id, $scope.page.page);
    };

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getVenueList($scope.selectId ? $scope.selectId : '', n);
        }
    }, true);

}]);