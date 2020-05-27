"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/auth/login', { //科学馆新闻
            templateUrl: 'pages/service/auth/login/login.html',
            controller: "serviceAuthLoginController"
        });
}]).controller('serviceAuthLoginController', ['$scope', '$location', '$cookieStore', 'indexSvc', 'authSvc', function ($scope, $location, $cookieStore, indexSvc, authSvc) {
    $scope.callbackUrl = $location.search().callbackUrl;
    $scope.user = authSvc.user();
    $scope.type = 0;
    $scope.params = {
        loginid: '',
        validCode: '',
        type: 1,
        pwd: ''
    };
    $scope.activeText = '获取验证码';
    $scope.activeClass = true;
    $scope.second = 59;
    $scope.timePromise = null;
    $scope.captchaObj = null;

    if ($scope.user.key) {
        if ($scope.user.type === 0 || $scope.user.type === 1){
            $location.path('/service/member/unit');
        }else {
            $location.path('/service/member/apply/record');
        }

    }

    indexSvc.getImage(6).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    $scope.setValidImg = function () {
        $scope.captchaObj = null;
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
    };

    $scope.handlerPopup = function (captchaObj) {
        $('#popup-captcha').html('');
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
            account: $scope.params.loginid,
            type: $scope.params.type
        }).then(function success(res) {
            if (res.code === '0000') {
                if (!$scope.activeClass) {
                    return false;
                }
                $scope.activeClass = false;
                // $scope.loadingToast.open(false);
                $scope.timePromise = setInterval(function () {
                    if ($scope.type === 0) {
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
                    }
                }, 1000);
            } else {
                alert(res.msg);
            }
        });
    };

    $scope.setType = function (type) {
        $scope.type = type;
        if (type === 0) {
            $scope.setValidImg();
            $scope.params.type = 1;
        }
        if (type === 1) {
            $scope.params.type = 1;
        }
    };

    $scope.setType(1);

    $scope.submit = function (form) {
        if (form.$invalid) {
            return false;
        }
        var body = {
            account: $scope.params.loginid,
            type: $scope.params.type,
            validCode: ''
        };
        if ($scope.type === 0) {
            body.validCode = $scope.params.validCode;
        }
        if ($scope.type === 1) {
            body.pwd = $scope.params.pwd;
        }


        if ($scope.type === 0 || $scope.type === 1) {
            authSvc.login(body).then(function success(res) {
                console.log(res.result);
                //window.history.back();
                if (res.code === '0000') {
                    $cookieStore.put('auth', res.result);
                    if ($scope.callbackUrl) {
                        $location.url($scope.callbackUrl);
                    } else {
                        if (res.result.type === 0 || res.result.type === 1) {
                            $location.path('/service/member/unit');
                        } else {
                            $location.path('/service/member/apply/record');
                        }
                    }
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