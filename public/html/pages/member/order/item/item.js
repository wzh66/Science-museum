"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/order/item/:id', { //app首页
            templateUrl: 'pages/member/order/item/item.html',
            controller: "memberOrderItemController"
        });
}]).controller('memberOrderItemController', ['$scope', '$routeParams', 'authSvc', 'orderSvc', function ($scope, $routeParams, authSvc, orderSvc) {
    $scope.key = authSvc.key();
    $scope.id = $routeParams.id;
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.FILES_TYPES = {
        CONTRACT: {
            type: 'CONTRACT',
            label: '合同',
            value: '',
            id: '',
            disabled: true
        },

        RECEIPT: {
            type: 'RECEIPT',
            label: '发票',
            value: '',
            id: '',
            disabled: true
        },
        PAYED_VOURCH: {
            type: 'PAYED_VOURCH',
            label: '支付凭证',
            value: '',
            id: '',
            disabled: true
        },
        SER_FILE: {
            type: 'SER_FILE',
            label: '服务文件',
            value: '',
            id: '',
            disabled: true
        },
        SER_OFFI_FILE: {
            type: 'SER_OFFI_FILE',
            label: '官文文件',
            value: '',
            id: '',
            disabled: true
        }
    };
    orderSvc.item($scope.key, $scope.id).then(function success(res) {
        $scope.order = res.result.order;
        $scope.subject = res.result.custInfo;
        $scope.process = res.result.statusTimeMap;
        res.result.attchs.forEach(function (attch) {
            attch.label = $scope.FILES_TYPES[attch.type].label;
            attch.fileIds = attch.fileIds.split(',');
        });
        $scope.attchs = res.result.attchs;
        console.log($scope.attchs);
    });
}]);
