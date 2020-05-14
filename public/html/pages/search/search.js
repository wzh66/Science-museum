"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/search', { //科学馆新闻
            templateUrl: 'pages/search/search.html',
            controller: "searchController"
        });
}]).controller('searchController', ['$scope', '$location', 'indexSvc','newsSvc', function ($scope, $location, indexSvc,newsSvc) {
    $scope.searchKey = $location.search().searchKey;
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });
    newsSvc.searchNews($scope.searchKey).then(function success(res) {
        $scope.searchResult = res.result.list;
    })
}]);