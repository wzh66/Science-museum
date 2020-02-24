"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/goods/type/index', { //app首页
            templateUrl: 'pages/goods/type/index/index.html',
            controller: "goodsTypeIndexController"
        });
}]).controller('goodsTypeIndexController', ['$scope', '$routeParams', '$location', 'productSvc', 'goodsSvc', function ($scope, $routeParams, $location, productSvc, goodsSvc) {
    $scope.searchKey = '';
    $scope.items;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    goodsSvc.list().then(function success(res) {
        res.result.forEach(item => {
            item.img = FILE_PREFIX_URL + item.backgroupFileId;
            item.gid = item.linkUrl.slice(item.linkUrl.lastIndexOf('/') + 1);
        });
        $scope.items = res.result;
    });
    $scope.search = function (searchKey) {
        window.location.href = '/goods/list?searchKey=' + searchKey;
    }
}]);
