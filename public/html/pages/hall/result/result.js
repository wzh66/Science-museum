"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/result', { //科学馆新闻
            templateUrl: 'pages/hall/result/result.html',
            controller: "hallResultController"
        });
}]).controller('hallResultController', ['$scope', '$cookieStore', 'indexSvc', 'hallSvc', 'authSvc', function ($scope, $cookieStore, indexSvc, hallSvc, authSvc) {
    $scope.body = $cookieStore.get('body');
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.type = authSvc.type();
    $scope.params = {
        meetingTypeId: '',
        beginTime: '',
        endTime: '',
        goods: []
    };
    $scope.goodsList = [];


    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.images = [];

    if ($scope.type === 2) {
        $scope.$root.dialog.open(true, '系统提示', '合作单位无法预定场馆!', ['我知道了'], function () {
            window.history.back();
        });
    }

    indexSvc.getImage(5).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getGoodsList().then(function success(res) {
        $scope.goodList = res.result;
    });

    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    $scope.show = function () {
        $scope.show = false;
    };

    $scope.begin = function () {
        laydate({
            elem: '#startdatepicker',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
            }
        });
    };

    $scope.end = function () {
        laydate({
            elem: '#enddatepicker',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
            }
        });
    };

    $scope.addGoods = function ($event) {
        var checked = $event.target;
        if (checked.checked) {
            $scope.goodsList.push(checked.id);
        } else {
            var idx = $scope.goodsList.indexOf(checked.id);
            $scope.goodsList.splice(idx, 1);
        }
    };


    $scope.submit = function (form) {
        var body = {
            meetingTypeId: $scope.params.meetingTypeId,
            reserveBeginTime: $scope.params.beginTime,
            reserveEndTime: $scope.params.endTime,
            baseGoodsId: JSON.stringify($scope.goodsList),
            page: $scope.page.page
        };

        hallSvc.venueQuery(body).then(function success(res) {
            if (res.code === '0000') {
                res.result.list.forEach(item => {
                    if (item.rotationImgs) {
                        item.rotationImgs = item.rotationImgs.split(',').map(s => {
                            return FILE_PREFIX_URL + s;
                        });
                    } else {
                        item.rotationImgs = [];
                        item.rotationImgs.push($scope.FILE_PREFIX_URL + item.logo);
                    }
                });
                $scope.result = res.result.list;
                $scope.page.totalPages = res.result.totalPages;
                $scope.page.total = res.result.total;
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };


    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.submit();
        }
    }, true);


}]);
