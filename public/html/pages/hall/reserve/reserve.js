"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/hall/reserve', { //科学馆新闻
            templateUrl: 'pages/hall/reserve/reserve.html',
            controller: "hallReserveController"
        });
}]).controller('hallReserveController', ['$scope', '$cookieStore', '$location', 'indexSvc', 'hallSvc', function ($scope, $cookieStore, $location, indexSvc, hallSvc) {
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        meetingTypeId: '',
        beginTime: '',
        endTime: '',
        attendance: '',
        budget: '',
        goods: []
    };
    $scope.goodsList = [];
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
            inNumber: $scope.params.attendance,
            price: $scope.params.budget
        };

        hallSvc.venueQuery(body).then(function success(res) {
            if (res.code === '0000') {
                console.log(res.result.list);
                $cookieStore.put('body', body);
                $location.path('/hall/result');
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    }

}]);