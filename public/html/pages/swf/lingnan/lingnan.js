"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/swf/lingnan/:id', { //科学馆新闻
            templateUrl: 'pages/swf/lingnan/lingnan.html',
            controller: "swfLingnanController"
        });
}]).controller('swfLingnanController', ['$scope', '$routeParams', 'indexSvc', function ($scope, $routeParams, indexSvc) {
    $scope.id = $routeParams.id;

    indexSvc.getVideoDetail($scope.id).then(function success(res) {
        res.result.videoFile = FILE_PREFIX_URL + res.result.videoFile;
        $scope.detail = res.result;
    });
}]);
