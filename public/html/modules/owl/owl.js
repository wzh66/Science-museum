'use strict';

app.directive('ngOwl', ['$location', 'appSvc', function ($location, appSvc) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/owl/owl.html',
        link: function (scope, element, attrs) {
            $(".owl-carousel").owlCarousel({
                navigation: true, // Show next and prev buttons
                slideSpeed: 300,
                loop: true,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: 3000,
                items: 1
            });
        }
    };
}]);
