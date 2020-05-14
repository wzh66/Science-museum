"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/index', { //app首页
            templateUrl: 'pages/index/index.html',
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$location', 'indexSvc', 'newsSvc', function ($scope, $location, indexSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.imageList;
    $scope.newsImageList;
    $scope.hallImageList;
    $scope.reviewImageList;
    $scope.noticeList;
    $scope.newList;
    indexSvc.getImageList(1).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
        });
        $scope.imageList = res.result.list;
    });

    indexSvc.getImageList(2).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
        });
        $scope.newsImageList = res.result.list;
    });

    indexSvc.getImageList(3).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
        });
        $scope.hallImageList = res.result.list;
    });

    indexSvc.getImageList(4).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
        });
        $scope.reviewImageList = res.result.list;
    });

    indexSvc.getNoticeList().then(function success(res) {
        $scope.noticeList = res.result;
    });

    indexSvc.getIndexNewsList().then(function success(res) {
        $scope.newList = res.result;
    });

    newsSvc.getNewsList(0, '24bfcef570be11ea953000ff578a6576').then(function success(res) {
        $scope.reviewNewList = res.result.list;
    });


}]);



