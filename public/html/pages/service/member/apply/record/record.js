"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/apply/record', { //科学馆新闻
            templateUrl: 'pages/service/member/apply/record/record.html',
            controller: "serviceMemberApplyRecordController"
        });
}]).controller('serviceMemberApplyRecordController', ['$scope', 'indexSvc', 'authSvc', 'applySvc', 'hallSvc', function ($scope, indexSvc, authSvc, applySvc, hallSvc) {
    $scope.key = authSvc.key();
    indexSvc.getImage(8).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    applySvc.getApplyList($scope.key).then(function success(res) {
        $scope.record = res.result.list;
    });

    hallSvc.getDictsByKey('form').then(function success(res) {
        $scope.activityForm = res.result;
    });

    $scope.getFormName = function (value) {
        var index = $scope.activityForm.findIndex(item => item.dictValue === value.toString());
        return $scope.activityForm[index].dictName;
    };

    hallSvc.getDictsByKey('activityType').then(function success(res) {
        $scope.activityType = res.result;
    });

    $scope.getActivityType = function (value) {
        var index = $scope.activityType.findIndex(item => item.dictValue === value.toString());
        return $scope.activityType[index].dictName;
    };

    hallSvc.getDictsByKey('openCeremony').then(function success(res) {
        $scope.openCeremony = res.result;
    });

    $scope.getOpenCeremony = function (value) {
        var index = $scope.openCeremony.findIndex(item => item.dictValue === value.toString());
        return $scope.openCeremony[index].dictName;

    };
}]);
