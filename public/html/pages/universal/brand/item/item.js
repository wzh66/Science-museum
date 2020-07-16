"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/universal/brand/item/:id', { //科学馆新闻
            templateUrl: 'pages/universal/brand/item/item.html',
            controller: "universalBrandItemController"
        });
}]).controller('universalBrandItemController', ['$scope', '$routeParams', 'indexSvc', 'newsSvc', function ($scope, $routeParams, indexSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.id = $routeParams.id;
    indexSvc.getImage(8).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });


    newsSvc.getExhibitsDetail($scope.id).then(function success(res) {
        $scope.detail = res.result;
    });


}]);
