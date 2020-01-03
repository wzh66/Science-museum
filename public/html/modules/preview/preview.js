app.directive("ngPreview", [function () {
    return {
        restrict: 'A',
        scope: {
            previewId: '=',
        },
        templateUrl: "modules/preview/preview.html",
        link: function (scope, element, attrs) {
            scope.$root.previewId = '';
        }
    };
}]);
