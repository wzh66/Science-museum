'use strict';

app.directive('ngUser', ['$location', '$rootScope', 'authSvc', function ($location, $rootScope, authSvc) {
    return {
        restrict: 'C',
        scope: true,
        templateUrl: 'modules/user/user.html',
        link: function (scope, element, attrs) {
            scope.logout = function () {
                authSvc.logout();
            };
            $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
                scope.account = authSvc.account();
            });
        }
    };
}]);
