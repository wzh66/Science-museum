'use strict';

app.directive('ngTop', ['$location', 'appSvc', function ($location, appSvc) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/top/top.html',
        link: function (scope, element, attrs) {
            scope.show = false;
            $(window).on('scroll', function (e) {
                if (e.currentTarget.scrollY > e.currentTarget.innerHeight) {
                    scope.show = true;
                } else {
                    scope.show = false;
                }
              scope.$apply();
            });
            scope.onClick = function () {
                toTop();
            };
        }
    };
}]);
