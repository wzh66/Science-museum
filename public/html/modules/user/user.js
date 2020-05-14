'use strict';

app.directive('ngUser', ['$location', 'authSvc', function ($location, authSvc) {
    return {
        restrict: 'C',
        scope: true,
        templateUrl: 'modules/user/user.html',
        link: function (scope, element, attrs) {
            scope.account = authSvc.account();
            scope.logout = function () {
                authSvc.logout();
            };
        }
    };
}]);