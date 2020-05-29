'use strict';

app.directive('ngHeader', ['$location', '$rootScope', 'appSvc', 'authSvc', function ($location, $rootScope, appSvc, authSvc) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/header/header.html',
        link: function (scope, element, attrs) {
            appSvc.get().then(function success(res) {
                scope.appData = res;
            });
            scope.enter = function (e) {
                e.currentTarget.className = 'hover';
            };
            scope.leave = function (e) {
                e.currentTarget.className = '';
            };

            scope.logout = function () {
                authSvc.logout();
            };

            scope.login = function () {
                if (!scope.mobile) {
                    $location.path('/auth/login');
                }
            };

            scope.logout = function () {
                authSvc.logout();
            };
            $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
                scope.account = authSvc.account();
                scope.path = $location.path();
            });
        }
    };
}]);
