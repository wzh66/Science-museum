"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/apply/list', { //科学馆新闻
            templateUrl: 'pages/service/member/apply/list/list.html',
            controller: "serviceMemberApplyListController"
        });
}]).controller('serviceMemberApplyListController', ['$scope', 'indexSvc', 'authSvc', 'applySvc', 'hallSvc', function ($scope, indexSvc, authSvc, applySvc, hallSvc) {
    $scope.key = authSvc.key();
    $scope.params = {
        title: '',
        beginTime: '',
        endTime: '',
        address: '',
        phone: '',
        content: '',
        activityForm: '',
        activityType: '',
        plan: '',
        openCeremony: ''
    };
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getDictsByKey('form').then(function success(res) {
        $scope.activityForm = res.result;
    });

    hallSvc.getDictsByKey('activityType').then(function success(res) {
        $scope.activityType = res.result;
    });

    hallSvc.getDictsByKey('openCeremony').then(function success(res) {
        $scope.openCeremony = res.result;
    });


    $scope.beginTime = function () {
        laydate({
            elem: '#start',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
            }
        });
    };

    $scope.endTime = function () {
        laydate({
            elem: '#end',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
            }
        });
    };

    $scope.submit = function (form) {
        var body = {
            key: $scope.key,
            title: $scope.params.title,
            activityBeginTime: $scope.params.beginTime,
            activityEndTime: $scope.params.endTime,
            address: $scope.params.address,
            phone: $scope.params.phone,
            content: $scope.params.content,
            form: $scope.params.activityForm,
            plan: $scope.params.plan,
            openCeremony: $scope.params.openCeremony,
            activityType: $scope.params.activityType
        };

        applySvc.apply(body).then(function success(res) {
            if (res.code === '0000') {

            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })

    };



}]);