'use strict';

app.directive('ngHeader', ['$location', 'appSvc', function ($location, appSvc) {
  return {
    restrict: 'C',
    scope: {},
    templateUrl: 'modules/header/header.html',
    link: function (scope, element, attrs) {
      scope.path = $location.path();
      appSvc.get().then(function success(res) {
        scope.appData = res;
      });
      scope.enter = function (e) {
        e.currentTarget.className = 'hover';
      };
      scope.leave = function (e) {
        e.currentTarget.className = '';
      };
    }
  };
}]);
