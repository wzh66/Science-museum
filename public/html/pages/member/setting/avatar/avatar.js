"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/setting/avatar', { //app首页
            templateUrl: 'pages/member/setting/avatar/avatar.html',
            controller: "memberSettingAvatarController"
        });
}]).controller('memberSettingAvatarController', ['$scope', '$location', '$cookieStore', 'authSvc', function ($scope, $location, $cookieStore, authSvc) {
    $scope.key = authSvc.key();
    $scope.params = {
        key: $scope.key,
        faceImg: ''
    };
    $scope.uploader = {
        option: {
            url: PREFIX_URL + 'uploadFile',
            paramName: 'file',
            maxFilesize: 5,
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: '上传头像',
            dictRemoveFile: '更换',
            params: {key: $scope.key, type: 'user', dir: 'user'}
        },
        callback: {
            'success': function (file, res) {
                $scope.params.faceImg = res.result;
                console.log(res);
            }
        }
    };
    $scope.dzMethods = {};
    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };

    $scope.submit = function (form) {
        if (form.$invalid) {
            return false;
        }
        authSvc.updateAvatar($scope.params).then(function success(res) {
            console.log(res.result);
            var user = authSvc.user();
            if (res.code === '0000') {
                user.faceImg = $scope.params.faceImg;
                $cookieStore.put('auth', user);
                window.history.back();
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };

    $scope.$on("$destroy", function ($destroy) {
        if ($scope.timePromise) {
            clearInterval($scope.timePromise);
        }
    });
}]);
