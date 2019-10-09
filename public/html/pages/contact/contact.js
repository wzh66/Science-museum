"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/contact', { //app首页
            templateUrl: 'pages/contact/contact.html',
            controller: "contactController"
        });
}]).controller('contactController', ['$scope', 'contactSvc', function ($scope, contactSvc) {
    $scope.isSubmit = false;
    $scope.contact = {
        company: '',
        name: '',
        mobile: '',
        employees: '',
        revenue2016: '',
        revenue2017: '',
        revenue2018: '',
        comprehend: ''
    };
    $scope.submit = function () {
        $scope.isSubmit = true;
        contactSvc.post($scope.contact).then(function success(res) {
            console.log(res);
            $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了', '']);
        });
    };
}]);
