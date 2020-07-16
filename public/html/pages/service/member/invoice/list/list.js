"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/invoice/list', { //科学馆新闻
            templateUrl: 'pages/service/member/invoice/list/list.html',
            controller: "serviceMemberInvoiceListController"
        });
}]).controller('serviceMemberInvoiceListController', ['$scope', 'authSvc', 'indexSvc', 'orderSvc', function ($scope, authSvc, indexSvc, orderSvc) {
    $scope.type = authSvc.type();
    $scope.key = authSvc.key();

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.getData = function () {
        orderSvc.getInvoiceList($scope.key).then(function success(res) {
            $scope.invoiceList = res.result.list;
        });
    };

    $scope.getData();

    $scope.remove = function (id) {
        $scope.$root.dialog.open(true, '系统提示', '你确定要删除？', ['确定'], function () {
            orderSvc.removeInvoice($scope.key, id).then(function success(res) {
                if (res.code === '0000') {
                    $scope.$root.dialog.open(true, '系统提示', '删除成功', ['我知道了'], function () {
                        $scope.getData();
                    });
                } else {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
                }

            })
        });

    }


}]);
