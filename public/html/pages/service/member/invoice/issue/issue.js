"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/invoice/issue/:id', { //科学馆新闻
            templateUrl: 'pages/service/member/invoice/issue/issue.html',
            controller: "serviceMemberInvoiceIssueController"
        });
}]).controller('serviceMemberInvoiceIssueController', ['$scope', '$routeParams', '$location', 'indexSvc', 'authSvc', 'orderSvc', function ($scope, $routeParams, $location, indexSvc, authSvc, orderSvc) {
    $scope.id = $routeParams.id;
    $scope.type = authSvc.type();
    $scope.key = authSvc.key();
    $scope.invoiceId = '';
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    orderSvc.getInvoiceList($scope.key).then(function success(res) {
        $scope.invoiceList = res.result.list;
    });

    $scope.addInvoice = function ($event) {
        $scope.invoiceId = $event.target.value;
    };

    $scope.submit = function (form) {
        var body = {
            key: $scope.key,
            orderId: $scope.id,
            invoiceId: $scope.invoiceId
        };

        orderSvc.openInvoice(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '提交成功', ['我知道了'], function () {
                    if ($scope.type === 0) {
                        $location.path('/service/member/registration');
                    } else {
                        $location.path('/service/member/finance');
                    }
                });
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })
    }


}]);