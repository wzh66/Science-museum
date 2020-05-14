"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/invoice/add', { //科学馆新闻
            templateUrl: 'pages/service/member/invoice/add/add.html',
            controller: "serviceMemberInvoiceAddController"
        });
}]).controller('serviceMemberInvoiceAddController', ['$scope', '$location', 'authSvc', 'indexSvc', 'orderSvc', function ($scope, $location, authSvc, indexSvc, orderSvc) {
    $scope.key = authSvc.key();
    $scope.type = authSvc.type();
    $scope.params = {
        companyName: '',
        address: '',
        bankAccount: '',
        phone: '',
        number: '',
        bank: '',
        invoiceType: '',
        type: ''
    };


    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.submit = function (form) {
        var body = {
            key: $scope.key,
            companyName: $scope.params.companyName,
            address: $scope.params.address,
            bankAccount: $scope.params.bankAccount,
            phone: $scope.params.phone,
            number: $scope.params.number,
            bank: $scope.params.bank,
            invoiceType: $scope.params.invoiceType,
            type: $scope.params.type
        };

        orderSvc.addInvoice(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '提交成功', ['我知道了'], function () {
                    $location.path('/service/member/invoice/list');
                });
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })
    };

    $scope.$watch('params.type', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope._type = n;

        }
    }, true);

    $scope.$watch('params.invoiceType', function (n, o) {
        if (n !== o || o !== undefined) {
            $scope.invoiceType = n;
        }
    }, true);


}]);