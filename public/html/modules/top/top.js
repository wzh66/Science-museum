'use strict';

app.directive('ngTop', ['$location', 'appSvc', function ($location, appSvc) {
  return {
    restrict: 'C',
    scope: {},
    templateUrl: 'modules/top/top.html',
    link: function (scope, element, attrs) {
      scope.onClick = function () {
        toTop();
      };
    }
  };
}]);
