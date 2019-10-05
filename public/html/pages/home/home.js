"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/home', { //app首页
            templateUrl: 'pages/home/home.html',
            controller: "homeController"
        });
}]).controller('homeController', ['$scope', function ($scope) {

}]);;
