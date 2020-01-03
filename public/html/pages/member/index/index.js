"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/index', { //app首页
            templateUrl: 'pages/member/index/index.html',
            controller: "memberIndexController"
        });
}]).controller('memberIndexController', ['$scope', function ($scope) {

}]);
