'use strict';

app.directive('ngBreadcrumb', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/breadcrumb/breadcrumb.html',
        link: function (scope, element, attrs) {
        }
    };
}]);
