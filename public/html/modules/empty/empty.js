'use strict';

app.directive('ngEmpty', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: {
            title:'='
        },
        templateUrl: 'modules/empty/empty.html',
        link: function (scope, element, attrs) {
        }
    };
}]);
