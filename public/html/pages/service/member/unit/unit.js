"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/unit', { //科学馆新闻
            templateUrl: 'pages/service/member/unit/unit.html',
            controller: "serviceMemberUnitController"
        });
}]).controller('serviceMemberUnitController', ['$scope', '$cookieStore', '$location', 'indexSvc', 'authSvc', function ($scope, $cookieStore, $location, indexSvc, authSvc) {
    $scope.type = authSvc.type();
    $scope.user = authSvc.user();
    $scope.params = {
        companyName: $scope.user.companyName,
        name: $scope.user.name,
        phone: $scope.user.phone,
        wechat: $scope.user.wechat ? $scope.user.wechat : '-'
    };
    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.modifyCompanyName = function () {
        $('#companyName').removeClass('readonly');
        $('#companyName').removeAttr('readonly');
        $scope.hideCompanyName = true;
        $scope.show = true;
    };

    $scope.saveCompanyName = function () {
        $('#companyName').addClass('readonly');
        $('#companyName').attr('readonly', 'readonly');
        $scope.hideCompanyName = false;
    };

    $scope.modifyName = function () {
        $('#name').removeClass('readonly');
        $('#name').removeAttr('readonly');
        $scope.hideName = true;
        $scope.show = true;
    };

    $scope.saveName = function () {
        $('#name').addClass('readonly');
        $('#name').attr('readonly', 'readonly');
        $scope.hideName = false;
    };

    $scope.modifyPhone = function () {
        $('#phone').removeClass('readonly');
        $('#phone').removeAttr('readonly');
        $scope.hidePhone = true;
        $scope.show = true;
    };

    $scope.savePhone = function () {
        $('#phone').addClass('readonly');
        $('#phone').attr('readonly', 'readonly');
        $scope.hidePhone = false;
    };

    $scope.modifyWechat = function () {
        $('#wechat').removeClass('readonly');
        $('#wechat').removeAttr('readonly');
        $scope.hideWechat = true;
        $scope.show = true;
    };

    $scope.saveWechat = function () {
        $('#wechat').addClass('readonly');
        $('#wechat').attr('readonly', 'readonly');
        $scope.hideWechat = false;
    };

    $scope.submit = function () {
        var body = {
            key: $scope.user.key,
            companyName: $scope.params.companyName,
            name: $scope.params.name,
            phone: $scope.params.phone,
            wechat: $scope.params.wechat
        };

        authSvc.updateMember(body).then(function success(res) {
            if (res.code === '0000') {
                $cookieStore.put('auth', res.result);
                $scope.$root.dialog.open(true, '系统提示', '修改成功', ['我知道了']);
                $scope.show = false;
                if ($scope.hideCompanyName) {
                    $scope.saveCompanyName();
                }
                if ($scope.hideName) {
                    $scope.saveName();
                }
                if ($scope.hidePhone) {
                    $scope.savePhone();
                }
                if ($scope.hideWechat) {
                    $scope.saveWechat();
                }
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了'], function () {
                        console.log(res);
                        if (res.code === '1001') {
                            $cookieStore.remove('auth');
                            $location.path('/service/auth/login');
                        }
                    }
                );
            }
        })
    };


}]);