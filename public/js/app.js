var app = angular.module('app', ['ngRoute', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters', 'appDirectives', 'thatisuday.dropzone', 'monospaced.qrcode']);
var PREFIX_URL = '/api/intf/call?action=';
var FILE_PREFIX_URL = '/api/admin/fileupload/previewFile?id=';
var _PREFIX_URL = 'http://admin.ai-fox.net/declareSys/intf/call/';
var _FILE_PREFIX_URL = 'http://admin.ai-fox.net/declareSys/admin/fileupload/previewFile?id=';
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: (function () {
                return 'index';
            })()
        });
        $locationProvider.html5Mode(true);
    }]).config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]).controller('appController', [function () {

}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
        $rootScope.dialog.open(false);
        $rootScope.previewId = '';
        toTop();
    });
}]);
