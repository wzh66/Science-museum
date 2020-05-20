"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/contact/consult', { //科学馆新闻
            templateUrl: 'pages/contact/consult/consult.html',
            controller: "contactConsultController"
        });
}]).controller('contactConsultController', ['$scope', 'indexSvc', 'contactSvc', 'authSvc', function ($scope, indexSvc, contactSvc, authSvc) {
    // $scope.mobile = authSvc.mobile();
    $scope.params = {
        name: '',
        phone: '',
        title: '',
        email: '',
        content: ''
    };
    $scope.activeClass = true;

    indexSvc.getImage(7).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    contactSvc.getQuestionAndAnswer().then(function success(res) {
        $scope.consultList = res.result;
    });

    $scope.submit = function (form) {
        if (form.phone) {
            if (form.phone.$error.pattern) {
                alert('请输入正确的手机号！');
                return false;
            }
        }
        if (form.email) {
            if (form.email.$error.pattern) {
                alert('请输入正确的邮箱！');
                return false;
            }
        }
        var body = {
            name: $scope.params.name,
            title: $scope.params.title,
            eMail: $scope.params.email,
            content: $scope.params.content,
            phone: $scope.params.phone
        };

        contactSvc.question(body).then(function success(res) {
            console.log(res.result);
            //window.history.back();
            if (res.code === '0000') {
                $scope.params = '';
                $scope.$root.dialog.open(true, '系统提示', '提交成功', ['我知道了']);

            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    }

}]);