"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/member/subject', { //app首页
            templateUrl: 'pages/member/subject/subject.html',
            controller: "memberSubjectController"
        });
}]).controller('memberSubjectController', ['$scope', 'authSvc', 'industrySvc', 'subjectSvc', function ($scope, authSvc, industrySvc, subjectSvc) {
    $scope.key = authSvc.key();
    $scope.id = '';
    $scope.type = 'view';
    $scope.industries = [];
    $scope.selectedIndustries = [];
    $scope.license = {
        A: {
            option: {
                url: PREFIX_URL + 'uploadFile',
                paramName: 'file',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                dictDefaultMessage: '营业执照',
                dictRemoveFile: '更换',
                params: {key: $scope.key, type: 'cust_cert', dir: 'cust_cert'}
            },
            callback: {
                'success': function (file, res) {
                    $scope.selected.licenseFileId = res.result;
                    console.log(res);
                }
            }
        },
        B: {
            option: {
                url: PREFIX_URL + 'uploadFile',
                paramName: 'file',
                maxFilesize: 5,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                dictDefaultMessage: '组织机构代码证',
                dictRemoveFile: '更换',
                params: {key: $scope.key, type: 'cust_cert', dir: 'cust_cert'}
            },
            callback: {
                'success': function (file, res) {
                    $scope.selected.mechanismId = res.result;
                    console.log(res);
                }
            }
        }
    };

    $scope.checked = function (item) {
        item.checked = !item.checked;
        var index = getIndex($scope.selectedIndustries, 'id', item.id);
        if (index >= 0) {
            $scope.selectedIndustries.splice(index, 1);
        } else {
            $scope.selectedIndustries.push(item);
        }
        $scope.getSelected();
    };

    $scope.getSelected = function () {
        var ids = [];
        var names = [];
        $scope.selectedIndustries.forEach(function (item) {
            ids.push(item.id);
            names.push(item.industryName);
        });
        $scope.selected.industryIds = ids;
        $scope.selected.industryNames = names;
    };

    $scope.dzMethods = {};
    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };
    $scope.page = {
        total: 0,
        totalPages: 1,
        page: 1,
    };
    $scope.selected = {
        key: $scope.key,
        custType: 1,
        custId: '',
        companyName: '',
        creditNumber: '',
        province: '',
        city: '',
        area: '',
        address: '',
        name: '',
        mobile: '',
        email: '',
        licenseFileId: '',
        mechanismId: '',
        industryIds: '',
        industryNames: '',
        isPrimary: 0
    };
    $scope.getItems = function () {
        subjectSvc.get($scope.key, 1, 10000).then(function success(res) {
            $scope.companies = res.result.list;
            if ($scope.companies.length > 0) {
                $scope.id = res.result.list[0].id;
            }
        });
    };
    $scope.getItems();
    $scope.getItem = function () {
        if ($scope.id === '') {
            $scope.selected.custId = '';
            $scope.selected.companyName = '';
            $scope.selected.creditNumber = '';
            $scope.selected.province = '';
            $scope.selected.city = '';
            $scope.selected.area = '';
            $scope.selected.address = '';
            $scope.selected.licenseFileId = '';
            $scope.selected.mechanismId = '';
            $scope.selected.isPrimary = 0;
            $scope.selected.name = '';
            $scope.selected.mobile = '';
            $scope.selected.email = '';
        } else {
            subjectSvc.item($scope.key, $scope.id).then(function success(res) {
                var company = res.result.busCust;
                $scope.selected.custId = company.id;
                $scope.selected.companyName = company.companyName;
                $scope.selected.creditNumber = company.creditNumber;
                $scope.selected.province = company.province;
                $scope.selected.city = company.city;
                $scope.selected.area = company.area;
                $scope.selected.address = company.address;
                $scope.selected.licenseFileId = company.licenseFileId;
                $scope.selected.mechanismId = company.mechanismId;
                $scope.selected.isPrimary = company.isPrimary ? company.isPrimary : 0;
                $scope.selected.name = company.name;
                $scope.selected.mobile = company.mobile;
                $scope.selected.email = company.email;
                $scope.selected.industryIds = company.industryIds;
                $scope.selected.industryNames = company.industryNames;
            });
        }
    };
    $scope.getIndustries = function () {
        console.log('123');
        industrySvc.get($scope.key).then(function success(res) {
            var ids = $scope.selected.industryIds.split(',');
            res.result.forEach(item => {
                if (ids.indexOf(item.id.toString()) !== -1) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            $scope.industries = listToTree(res.result);
        });
    };
    $scope.position = {
        left: 0,
        top: 0
    };
    $scope.showSelector = function (e) {
        $scope.position = {
            left: e.target.offsetLeft,
            top: e.target.offsetTop
        };
        $scope.show = true;
    };

    $scope.setId = function (id) {
        $scope.id = id;
    };

    $scope.loading = false;
    $scope.submit = function (form) {
        if ($scope.loading) {
            return false;
        }
        $scope.loading = true;
        if (form.$invalid) {
            return false;
        }
        subjectSvc.submit($scope.selected).then(function success(res) {
            $scope.loading = false;
            if (res.code === '0000') {
                $scope.$root.dialog.open(true, '系统提示', '您已成功' + ($scope.id ? '修改' : '新增') + '企业主体信息', ['我知道了']);
                $scope.getItems();
                $scope.type = 'view';
                toTop();
            } else {
                $scope.$root.dialog.open(true, '系统提示', res.msg, ['我知道了']);
            }
        });
    };
    $scope.industryPanelShow = false;
    $scope.showIndustryPanel = function () {
        $scope.industryPanelShow = !$scope.industryPanelShow;
        $scope.getIndustries();
    };

    $scope.close = function () {
        $scope.industryPanelShow = !$scope.industryPanelShow;
    };

    $scope.$watch('id', function (n, o) {
        if (n !== o && o !== undefined) {
            $scope.getItem();
            if (n) {
                $scope.type = 'view';
            } else {
                $scope.type = 'edit';
            }
        }
    });

    $scope.edit = function () {
        $scope.type = 'edit';
        toTop();
    };
}]);
