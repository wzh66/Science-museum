'use strict';

app.directive('ngTop', ['$location', '$rootScope', 'authSvc', function ($location, $rootScope, authSvc) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/top/top.html',
        link: function (scope, element, attrs) {
            $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
                scope.account = authSvc.account();
            });
        }
    };
}]);
