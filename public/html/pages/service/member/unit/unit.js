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
    $scope.accountType = authSvc.accountType();
    $scope.user = authSvc.user();
    $scope.FILE_PREFIX_URL = FILE_PREFIX_URL;
    $scope.params = {
        companyName: $scope.user.companyName,
        name: $scope.user.name,
        phone: $scope.user.phone,
        wechat: $scope.user.wechat ? $scope.user.wechat : '-',
        licenseImg: $scope.user.licenseImg ? $scope.user.licenseImg : '',
        idCard: $scope.user.idCard ? $scope.user.idCard : ''
    };
    $scope.license = {
        option: {
            url: PREFIX_URL + 'uploadFile',
            paramName: 'file',
            maxFilesize: 5,
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: '营业执照',
            dictRemoveFile: '更换',
            dictCancelUpload: '取消',
            params: {type: 'cust_cert', dir: 'cust_cert'}
        },
        callback: {
            'success': function (file, res) {
                $scope.params.licenseImg = res.result;
                $scope.show = true;
            }
        }
    };

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    if ($scope.user.auditStatus === 0){
        $scope.$root.dialog.open(true, '系统提示', '您的账号正在审核中，审核通过之前暂时无法预定场馆，如您急需预定，可拨打020-28328300联系客服快速审核。', ['我知道了']);
    }

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

    $scope.modifyIdCard = function () {
        $('#idCard').removeClass('readonly');
        $('#idCard').removeAttr('readonly');
        $scope.hideIdCard = true;
        $scope.show = true;
    };

    $scope.saveIdCard = function () {
        $('#idCard').addClass('readonly');
        $('#idCard').attr('readonly', 'readonly');
        $scope.hideIdCard = false;
    };

    $scope.submit = function (form) {
        var body = {
            key: $scope.user.key,
            name: $scope.params.name,
            phone: $scope.params.phone,
            wechat: $scope.params.wechat
        };

        if ($scope.accountType === 0) {
            body.idCard = $scope.params.idCard;
        }

        if ($scope.accountType === 1) {
            body.licenseImg = $scope.params.licenseImg;
            body.companyName = $scope.params.companyName;
        }

        authSvc.updateMember(body).then(function success(res) {
            console.log(res.result);
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
                if ($scope.hideIdCard) {
                    $scope.saveIdCard();
                }
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })
    };


}]);