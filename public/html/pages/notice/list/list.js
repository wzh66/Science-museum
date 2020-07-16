"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/notice/list', { //科学馆新闻
            templateUrl: 'pages/notice/list/list.html',
            controller: "noticeListController"
        });
}]).controller('noticeListController', ['$scope', 'indexSvc', function ($scope, indexSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;

    indexSvc.getImage(1).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    indexSvc.getNoticeList().then(function success(res) {
        $scope.noticeList = res.result;
    });


}]);
