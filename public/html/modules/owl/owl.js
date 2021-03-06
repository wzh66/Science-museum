'use strict';

app.directive('ngOwl', ['$location', 'appSvc', function ($location, appSvc) {
    return {
        restrict: 'C',
        scope: {
            items: '=items',
            images: '=images',
            autoplay: '=autoplay'
        },
        templateUrl: 'modules/owl/owl.html',
        link: function (scope, element, attrs) {
            scope.renderFinish = function(){
                $(element).find('.owl-carousel').owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 10,
                    loop: true,
                    animateOut: 'fadeOut',
                    paginationSpeed: 400,
                    singleItem: true,
                    autoplay: !!scope.autoplay,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    items: scope.items ? scope.items : 1,
                    dots: true,
                    mouseDrag: false
                });
            };
        }
    };
}]);
