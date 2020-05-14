"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/item/:id', { //科学馆新闻
            templateUrl: 'pages/hall/item/item.html',
            controller: "hallItemController"
        });
}]).controller('hallItemController', ['$scope', '$routeParams', 'indexSvc','hallSvc', function ($scope, $routeParams, indexSvc,hallSvc) {
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(4).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getVenueDetail($scope.id).then(function success(res) {
        res.result.detail = res.result.detail.replace(/musWeb/gi, 'api');
        $scope.detail = res.result;
    });


}]);