'use strict';

app.directive('ngPage', ['$location', 'appSvc', function ($location, appSvc) {
    return {
        restrict: 'C',
        scope: {
            page: '=',
            total: '='
        },
        templateUrl: 'modules/page/page.html',
        link: function (scope, element, attrs) {
            scope.getPages = function () {
                var pages = [];
                if (scope.total - scope.page < 5) {
                    for (var i = scope.total - 5 >= 1 ? scope.total - 4 : 1; i <= scope.total; i++) {
                        pages.push(i);
                    }
                } else {
                    for (var i = scope.page; i <= scope.page + 4; i++) {
                        pages.push(i);
                    }
                }
                return pages;
            };
            scope.pages = scope.getPages();
            scope.turning = function (page) {
                scope.page = page;
                if (scope.page === scope.pages[scope.pages.length - 1]) {
                    scope.pages = scope.getPages();
                }
            };
            scope.previous = function () {
                if (scope.page > 1) {
                    scope.page = scope.page - 1;
                    if (scope.page < scope.pages[0]) {
                        scope.pages = scope.getPages();
                    }
                }
            };
            scope.next = function () {
                if (scope.page < scope.total) {
                    scope.page = scope.page + 1;
                    if (scope.page === scope.pages[scope.pages.length - 1]) {
                        scope.pages = scope.getPages();
                    }
                }
            };
        }
    };
}]);
