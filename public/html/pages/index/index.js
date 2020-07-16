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
    $scope.images = [];
    indexSvc.getImageList(1).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
            item.href = item.busId ? '/information/item/' + item.busId : item.prourl;
        });
        $scope.imageList = res.result.list;
        scroll();
    });


    indexSvc.getImageList(2).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
            item.href = item.busId ? '/information/item/' + item.busId : item.prourl;
        });
        $scope.newsImageList = res.result.list;
    });

    indexSvc.getImageList(3).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
            item.href = item.busId ? '/hall/item/' + item.busId : item.prourl;
        });
        $scope.hallImageList = res.result.list;
    });

    indexSvc.getVideoList().then(function success(res) {
        res.result.forEach(item => {
            item.videoImg = FILE_PREFIX_URL + item.videoImg;
        });
        $scope.videoList = res.result;
        slide();
    });

    /*indexSvc.getImageList(4).then(function success(res) {
        res.result.list.forEach(item => {
            item.proimg = FILE_PREFIX_URL + item.proimg;
            item.href = item.busId ? '/information/item/' + item.busId : item.prourl;
        });
        $scope.reviewImageList = res.result.list;
    });*/

    indexSvc.getNoticeList().then(function success(res) {
        $scope.noticeList = res.result;
    });

    indexSvc.getIndexNewsList().then(function success(res) {
        $scope.newList = res.result;
    });

    indexSvc.getExhibitionImg().then(function success(res) {
        res.result.forEach(item => {
            item.activityImgs = item.activityImgs.split(',').map(s => {
                return FILE_PREFIX_URL + s;
            });
        });
        $scope.reviewImageList = res.result;
    });

    /*newsSvc.getNewsList(0, '24bfcef570be11ea953000ff578a6576').then(function success(res) {
        $scope.reviewNewList = res.result.list;
    });*/


}
])
;



