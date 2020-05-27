"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/auth/register', { //科学馆新闻
            templateUrl: 'pages/service/auth/register/register.html',
            controller: "serviceAuthRegisterController"
        });
}]).controller('serviceAuthRegisterController', ['$scope', '$location', '$cookieStore', 'indexSvc', 'authSvc', function ($scope, $location, $cookieStore, indexSvc, authSvc) {
    $scope.callbackUrl = $location.search().callbackUrl;
    $scope.params = {
        account: '',
        accountType: '',
        type: 1,
        pwd: '',
        confirmPwd: '',
        company: '',
        name: '',
        phone: '',
        idCard: '',
        wechat: ''
    };
    $scope.licenseFileId = '';

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
                $scope.licenseFileId = res.result;
            }
        }
    };

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.submit = function (form) {
        if (form.accountType.$error.required) {
            alert('请选择账户类型!');
            return false;
        }
        if (form.account.$error.required || form.account.$error.pattern) {
            if (form.account.$error.required) {
                alert('请输入登录账号!');
            } else {
                alert('请输入正确的登录账号！');
            }
            return false;
        }
        if (form.pwd.$error.required) {
            alert('请输入登录密码!');
            return false;
        }
        if (form.confirmPwd.$error.required) {
            alert('请再次输入密码!');
            return false;
        }
        if ($scope.params.accountType === '1') {
            if (form.company.$error.required) {
                alert('请输入企业名称!');
                return false;
            }
        }
        if (form.name.$error.required) {
            alert('请输入联系人姓名!');
            return false;
        }
        if (form.phone.$error.required || form.phone.$error.pattern) {
            if (form.phone.$error.required) {
                alert('请输入联系电话!');
            } else {
                alert('请输入正确的联系电话！');
            }
            return false;
        }
        if ($scope.params.accountType === '0') {
            if (form.idCard.$error.required || form.idCard.$error.pattern) {
                if (form.idCard.$error.required) {
                    alert('请输入身份证号!');
                } else {
                    alert('请输入正确的身份证号！');
                }
                return false;
            }
        }
        var body = {
            account: $scope.params.account,
            accountType: $scope.params.accountType,
            type: $scope.params.type,
            name: $scope.params.name,
            phone: $scope.params.phone,
            wechat: $scope.params.wechat
        };

        if ($scope.params.accountType === '0') {
            body.idCard = $scope.params.idCard;
        }

        if ($scope.params.accountType === '1') {
            body.companyName = $scope.params.company;
            body.licenseImg = $scope.licenseFileId;
        }

        body.pwd = $scope.params.pwd;
        body.confirmPwd = $scope.params.confirmPwd;
        if (body.pwd !== body.confirmPwd) {
            $scope.$root.dialog.open(true, '系统提示', '您两次输入的密码不一致', ['我知道了']);
            return false;
        }

        authSvc.register(body).then(function success(res) {
            //window.history.back();
            if (res.code === '0000') {
                if ($scope.callbackUrl) {
                    $location.url($scope.callbackUrl);
                } else {
                    $location.path('/service/auth/login');
                }
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });

    };

}]);
