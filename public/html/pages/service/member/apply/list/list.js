"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/service/member/apply/list', { //科学馆新闻
            templateUrl: 'pages/service/member/apply/list/list.html',
            controller: "serviceMemberApplyListController"
        });
}]).controller('serviceMemberApplyListController', ['$scope', '$location', 'indexSvc', 'authSvc', 'applySvc', 'hallSvc', function ($scope, $location, indexSvc, authSvc, applySvc, hallSvc) {
    $scope.key = authSvc.key();
    //$scope.type = authSvc.type();
    $scope.user = authSvc.user();
    $scope.params = {
        company: $scope.user.companyName ? $scope.user.companyName : '',
        title: '',
        beginTime: '',
        endTime: '',
        address: '',
        phone: '',
        content: '',
        activityForm: '',
        activityType: '',
        plan: '',
        openCeremony: ''
    };

    $scope.plan = {
        option: {
            url: PREFIX_URL + 'uploadFile',
            paramName: 'file',
            maxFilesize: 5,
            acceptedFiles: 'image/jpeg, images/jpg, image/png,application/*,.doc,.docx,.ppt,.pptx,.txt,.xls,.xlsx',
            addRemoveLinks: true,
            dictDefaultMessage: '上传活动方案附件',
            dictRemoveFile: '更换',
            dictCancelUpload: '取消',
            params: {type: 'cust_cert', dir: 'cust_cert'}
        },
        callback: {
            'success': function (file, res) {
                $scope.planFileId = res.result;
            }
        }
    };

    /*if ($scope.type !== 2){
        $scope.$root.dialog.open(true, '系统提示', '您没有权限申请活动，详情请咨询后台工作人员!', ['我知道了'], function () {
            window.history.back();
        });
    }*/

    indexSvc.getImage(8).then(function success(res) {
        res.result.proimg = FILE_PREFIX_URL + res.result.proimg;
        $scope.img = res.result;
    });

    hallSvc.getDictsByKey('form').then(function success(res) {
        $scope.activityForm = res.result;
    });

    hallSvc.getDictsByKey('activityType').then(function success(res) {
        $scope.activityType = res.result;
    });

    hallSvc.getDictsByKey('openCeremony').then(function success(res) {
        $scope.openCeremony = res.result;
    });


    $scope.beginTime = function () {
        laydate({
            elem: '#start',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.beginTime = data;
            }
        });
    };

    $scope.endTime = function () {
        laydate({
            elem: '#end',
            min: minDate(),
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            choose: function (data) { //选择日期完毕的回调
                $scope.params.endTime = data;
            }
        });
    };

    $scope.submit = function (form) {

        if (form.phone.$error.pattern) {
            alert('请输入正确的联系电话！');
            return false;
        }


        var body = {
            key: $scope.key,
            company: $scope.params.company,
            title: $scope.params.title,
            activityBeginTime: $scope.params.beginTime,
            activityEndTime: $scope.params.endTime,
            address: $scope.params.address,
            phone: $scope.params.phone,
            content: $scope.params.content,
            form: $scope.params.activityForm,
            plan: $scope.params.plan,
            planFileId: $scope.planFileId,
            openCeremony: $scope.params.openCeremony,
            activityType: $scope.params.activityType
        };

        applySvc.apply(body).then(function success(res) {
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '提交成功！', ['我知道了'], function () {
                    $location.path('/service/member/apply/record');
                });
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        })

    };


}]);
