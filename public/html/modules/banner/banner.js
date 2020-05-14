'use strict';

app.directive('ngBanner', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: {
            contactHide: '='
        },
        templateUrl: 'modules/banner/banner.html',
        link: function (scope, element, attrs) {
            scope.search = function () {
                window.location.href = '#/search?searchKey=' + scope.searchKey;
            }
        }
    };
}]);
