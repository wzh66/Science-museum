"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/setting/name', { //app首页
            templateUrl: 'pages/member/setting/name/name.html',
            controller: "memberSettingNameController"
        });
}]).controller('memberSettingNameController', ['$scope', '$location', '$cookieStore', 'authSvc', function ($scope, $location, $cookieStore, authSvc) {
    $scope.key = authSvc.key();
    $scope.params = {
        key: $scope.key,
        name: ''
    };

    $scope.submit = function (form) {
        if (form.$invalid) {
            return false;
        }
        authSvc.updateName($scope.params).then(function success(res) {
            console.log(res.result);
            var user = authSvc.user();
            if (res.code === '0000') {
                user.name = $scope.params.name;
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
