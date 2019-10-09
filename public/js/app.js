var app = angular.module('app', ['ngRoute', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: (function () {
        return 'index';
      })()
    });
    //$locationProvider.html5Mode(true);
  }]).config(['$sceProvider', function ($sceProvider) {
  //For sport ie7
  $sceProvider.enabled(false);
}]).controller('appController', [function () {

}]).run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
    $rootScope.dialog.open(false)
    toTop();
  });
}]);
