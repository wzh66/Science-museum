"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/apply/item/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/apply/item/item.html',
            controller: "serviceMemberApplyItemController"
        });
}]).controller('serviceMemberApplyItemController', ['$scope', '$routeParams', 'indexSvc', 'authSvc', 'applySvc', 'hallSvc', function ($scope, $routeParams, indexSvc, authSvc, applySvc, hallSvc) {
    $scope.id = $routeParams.id;
    $scope.key = authSvc.key();
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getDictsByKey('form').then(function success(res) {
        $scope.activityForm = res.result;
    });

    $scope.getFormName = function (value) {
        var index = $scope.activityForm.findIndex(item => item.dictValue === value);
        return $scope.activityForm[index].dictName;
    };

    applySvc.getApplyDetail($scope.key, $scope.id).then(function success(res) {
        res.result.form = $scope.getFormName(res.result.form);
        $scope.detail = res.result;
    });

}]);