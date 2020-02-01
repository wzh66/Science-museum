"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/setting', { //app首页
            templateUrl: 'pages/member/setting/setting.html',
            controller: "memberSettingController"
        });
}]).controller('memberSettingController', ['$scope', '$location', '$cookieStore', 'authSvc', function ($scope, $location, $cookieStore, authSvc) {
    $scope.key = authSvc.key();
    $scope.params = {
        key: $scope.key,
        loginid: '',
        validCode: '',
        type: 2,
        pwd: '',
        confirmPwd: ''
    };
    $scope.activeText = '获取验证码';
    $scope.activeClass = true;
    $scope.second = 59;
    $scope.timePromise = null;
    $scope.captchaObj;
    $scope.randomValidUid = new Date().getTime();
    authSvc.getValidImg($scope.randomValidUid).then(function success(res) {
        var data = JSON.parse(res.result);
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            product: 'popup', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
            offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
        }, $scope.handlerPopup);
    });

    $scope.setType = function (type) {
        $scope.params.type = type;
    };

    $scope.handlerPopup = function (captchaObj) {
        $scope.captchaObj = captchaObj;
        // 弹出式需要绑定触发验证码弹出按钮
        captchaObj.bindOn('#sendValidCode');

        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo('#popup-captcha');
    };

    $scope.sendValidCode = function (form) {
        if (!this.activeClass) {
            return false;
        }

        if (form.loginid.$error.required || form.loginid.$error.pattern) {
            if (form.loginid.$error.required) {
                alert('请输入手机号码');
            } else {
                alert('请输入正确的手机号码');
            }
            return false;
        }

        var validate = $scope.captchaObj.getValidate();
        console.log(validate);
        if (!validate) {
            alert('请先完成验证！');
            return false;
        }

        authSvc.sendValidCode({
            geetest_challenge: validate.geetest_challenge,
            geetest_validate: validate.geetest_validate,
            geetest_seccode: validate.geetest_seccode,
            randomValidUid: this.randomValidUid,
            phone: $scope.params.loginid,
            type: $scope.params.type
        }).then(function success(res) {
            if (res.code === '0000') {
                if (!$scope.activeClass) {
                    return false;
                }
                $scope.activeClass = false;
                // $scope.loadingToast.open(false);
                $scope.timePromise = setInterval(function () {
                    if ($scope.second <= 0) {
                        clearInterval($scope.timePromise);

                        $scope.second = 59;
                        $scope.activeText = '重发验证码';
                        $scope.activeClass = true;
                        document.getElementById('sendValidCode').style.display = 'inline-block';
                        document.getElementById('origin_sendValidCode').style.display = 'none';
                    } else {
                        document.getElementById('sendValidCode').style.display = 'none';
                        document.getElementById('origin_sendValidCode').style.display = 'inline-block';
                        $scope.activeText = '' + $scope.second + 's';
                        $scope.activeClass = false;
                        $scope.second = $scope.second - 1;
                    }
                    $scope.$apply();
                }, 1000);
            } else {
                alert(res.msg);
            }
        });
    };

    $scope.submit = function (form) {
        if (form.$invalid) {
            return false;
        }
        var body = {
            key: $scope.params.key,
            loginid: $scope.params.loginid,
            validCode: $scope.params.validCode,
            type: $scope.params.type
        };
        if ($scope.params.type === 2) {
            authSvc.updateMobile(body).then(function success(res) {
                console.log(res.result);
                //window.history.back();
                if (res.code === '0000') {
                    $cookieStore.remove('auth');
                    $scope.$root.dialog.open(true, '系统提示', '手机号码修改成功', ['我知道了'], function () {
                        $location.path('/auth/login');
                    });
                } else {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
                }
            });
        } else {
            body.pwd = $scope.params.pwd;
            body.confirmPwd = $scope.params.confirmPwd;
            console.log($scope.params.pwd,$scope.params.confirmPwd);
            if(body.pwd !== body.confirmPwd){
                $scope.$root.dialog.open(true, '系统提示', '您两次输入的密码不一致', ['我知道了']);
                return false;
            }
            authSvc.updatePwd(body).then(function success(res) {
                console.log(res.result);
                //window.history.back();
                if (res.code === '0000') {
                    $scope.$root.dialog.open(true, '系统提示', '您的密码修改成功', ['我知道了'], function () {
                        $cookieStore.remove('auth');
                        $location.path('/auth/login');
                    });
                } else {
                    $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
                }
            });
        }
    };

    $scope.$on("$destroy", function ($destroy) {
        if ($scope.timePromise) {
            clearInterval($scope.timePromise);
        }
    });
}]);
