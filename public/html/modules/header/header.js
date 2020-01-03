'use strict';

app.directive('ngHeader', ['$location', 'appSvc', 'authSvc', function ($location, appSvc, authSvc) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/header/header.html',
        link: function (scope, element, attrs) {
            scope.path = $location.path();
            scope.name = authSvc.name();
            appSvc.get().then(function success(res) {
                scope.appData = res;
            });
            scope.enter = function (e) {
                e.currentTarget.className = 'hover';
            };
            scope.leave = function (e) {
                e.currentTarget.className = '';
            };

            scope.login = function () {
                if (!scope.mobile) {
                  $location.path('/auth/login');
                }
            };

            scope.logout = function () {
                authSvc.logout();
            };
        }
    };
}]);
