"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/order/item/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/order/item/item.html',
            controller: "serviceMemberOrderItemController"
        });
}]).controller('serviceMemberOrderItemController', ['$scope', '$routeParams', '$location', 'indexSvc', 'authSvc', 'orderSvc', 'hallSvc', function ($scope, $routeParams, $location, indexSvc, authSvc, orderSvc, hallSvc) {
    $scope.id = $routeParams.id;
    $scope.key = authSvc.key();
    $scope.type = authSvc.type();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });


    hallSvc.getDictsByKey('meetingType').then(function success(res) {
        $scope.meetingType = res.result;
    });

    $scope.getMeetingTypeName = function (value) {
        if (value){
            var index = $scope.meetingType.findIndex(item => item.dictValue === value);
            return $scope.meetingType[index].dictName;
        }

    };

    orderSvc.getOrderDetail($scope.key, $scope.id).then(function success(res) {
        res.result.timeList.forEach(item => {
                item.reserveTypes = item.reserveTypes.replace(/[^0-9]/ig, '');
                item.reserveTypes = item.reserveTypes.split('');
            }
        );
        res.result.meetingType = $scope.getMeetingTypeName(res.result.meetingType);
        $scope.detail = res.result;
    });


    $scope.return = function () {
        window.history.back();
    }
}]);
