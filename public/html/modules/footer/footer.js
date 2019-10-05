'use strict';

app.directive('ngFooter', ['$location', function ($location) {
  return {
    restrict: 'C',
    scope: {},
    templateUrl: 'modules/footer/footer.html',
    link: function (scope, element, attrs) {
    }
  };
}]);
