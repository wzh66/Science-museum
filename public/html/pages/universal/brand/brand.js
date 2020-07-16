"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/universal/brand/:id', { //科学馆新闻
            templateUrl: 'pages/universal/brand/brand.html',
            controller: "universalBrandController"
        });
}]).controller('universalBrandController', ['$scope', '$routeParams', 'indexSvc', 'newsSvc', function ($scope, $routeParams, indexSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.id = $routeParams.id;
    indexSvc.getImage(8).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    newsSvc.getBrandList().then(function success(res) {
        $scope.brandList = res.result;
    });

    newsSvc.getExhibitsList($scope.id).then(function success(res) {
        $scope.exhibitsList = res.result;
    });


}]);
