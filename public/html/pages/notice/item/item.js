"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/notice/item/:id', { //科学馆新闻
            templateUrl: 'pages/notice/item/item.html',
            controller: "noticeItemController"
        });
}]).controller('noticeItemController', ['$scope', '$routeParams', 'indexSvc',  function ($scope, $routeParams, indexSvc) {
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.img;
    $scope.detail;
    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    indexSvc.getNoticeDetail($scope.id).then(function success(res) {
        res.result.content = res.result.content.replace(/musWeb/gi, 'api');
        $scope.detail = res.result;
    });

}]);