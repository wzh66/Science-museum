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
    $scope.submit = function (form) {
        $scope.isSubmit = true;
        if (form.$invalid) {
            toTop();
            return false;
        }
        contactSvc.post($scope.contact).then(function success(res) {
            console.log(res);
            var msg = '';
            if (res.code === '0000') {
                msg = '您已成功提交！';
            } else {
                msg = res.msg;
            }
            $scope.$root.dialog.open(true, '系统提示', msg, ['我知道了', '']);
        });
    };
}]);
