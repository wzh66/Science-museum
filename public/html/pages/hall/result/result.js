"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/result', { //科学馆新闻
            templateUrl: 'pages/hall/result/result.html',
            controller: "hallResultController"
        });
}]).controller('hallResultController', ['$scope', '$cookieStore', 'indexSvc', 'hallSvc', function ($scope, $cookieStore, indexSvc, hallSvc) {
    $scope.body = $cookieStore.get('body');
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.images = [];

    indexSvc.getImage(5).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getData = function () {
        $scope.images = [];
        var body = JSON.parse(JSON.stringify($scope.body));
        body.page = $scope.page.page;
        hallSvc.venueQuery(body).then(function success(res) {
            $scope.result = res.result.list;
            $scope.result.forEach(item => {
                $scope.images.push($scope.FILE_PREFIX_URL + item.logo);
            });
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };


    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getData();
        }
    }, true);


}]);
