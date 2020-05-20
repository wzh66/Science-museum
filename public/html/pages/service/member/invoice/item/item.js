"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/invoice/item/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/invoice/item/item.html',
            controller: "serviceMemberInvoiceItemController"
        });
}]).controller('serviceMemberInvoiceItemController', ['$scope', '$routeParams', '$location', 'indexSvc', 'authSvc', 'orderSvc', function ($scope, $routeParams, $location, indexSvc, authSvc, orderSvc) {
    $scope.id = $routeParams.id;
    $scope.type = authSvc.type();
    $scope.key = authSvc.key();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    orderSvc.getOrderInvoiceDetail($scope.key, $scope.id).then(function success(res) {
        $scope.detail = res.result;
    });


    $scope.return = function () {
        $location.path('/service/member/finance');
    }
}]);