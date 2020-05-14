"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/venue/item/:id', { //科学馆新闻
            templateUrl: 'pages/venue/item/item.html',
            controller: "venueItemController"
        });
}]).controller('venueItemController', ['$scope', '$routeParams', 'indexSvc', 'newsSvc', function ($scope, $routeParams, indexSvc, newsSvc) {
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.img;
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    newsSvc.getNewsDetail($scope.id).then(function success(res) {
        res.result.detail = res.result.detail.replace(/mus_web/gi, 'api');
        $scope.detail = res.result;
    });

}]);