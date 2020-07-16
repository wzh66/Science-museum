"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/list', { //科学馆新闻
            templateUrl: 'pages/hall/list/list.html',
            controller: "hallListController"
        });
}]).controller('hallListController', ['$scope', 'indexSvc', 'hallSvc', 'newsSvc', function ($scope, indexSvc, hallSvc, newsSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.isShow = true;
    $scope.disabled = true;
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1
    };
    $scope.params = {
        meetingTypeId: '',
        inNumber: '',
        reserveDate: '',
        type: ''
    };
    $scope.goodsList = [];


    indexSvc.getImage(4).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getGoodsList().then(function success(res) {
        $scope.goodList = res.result;
    });

    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    hallSvc.getDictsByKey('reserveTimeType').then(function success(res) {
        $scope.reserveTimeType = res.result.slice(0, 3);
    });

    $scope.show = function () {
        $scope.isShow = !$scope.isShow;
    };

    $scope.start = function () {
        laydate({
            elem: '#start',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.reserveDate = data;
                $scope.$apply($scope.disabled = false);
            }
        });
    };

    /*$scope.end = function () {
        laydate({
            elem: '#end',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
            }
        });
    };*/

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
            inNumber: $scope.params.inNumber,
            reserveDate: $scope.params.reserveDate,
            type: $scope.params.type
        };

        hallSvc.venueQuery(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.hallList = res.result.list;
                $scope.page.totalPages = res.result.totalPages;
                $scope.page.total = res.result.total;
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };

    $scope.getVenueList = function (id, page) {
        hallSvc.getVenueList(id, page).then(function success(res) {
            $scope.hallList = res.result.list;
            $scope.page.totalPages = res.result.totalPages;
            $scope.page.total = res.result.total;
        });
    };

    $scope.getVenueList('', $scope.page.page);

    hallSvc.getVenueTypeList().then(function success(res) {
        $scope.topicList = res.result;
    });


    $scope.getData = function (id, name) {
        $scope.selectId = id;
        $scope.selectName = name;
        $scope.getVenueList(id, $scope.page.page);
    };

    $scope.$watch('page.page', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.getVenueList($scope.selectId ? $scope.selectId : '', n);
        }
    }, true);

}]);
