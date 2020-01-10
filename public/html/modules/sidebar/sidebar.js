'use strict';

app.directive('ngSidebar', ['$location', 'authSvc', 'subjectSvc', function ($location, authSvc, subjectSvc) {
    return {
        restrict: 'C',
        scope: {key: '='},
        templateUrl: 'modules/sidebar/sidebar.html',
        link: function (scope, element, attrs) {
            scope.path = $location.path();
            scope.menus = [
                {
                    label: '公司主体',
                    path: '/member/subject'
                },
                {
                    label: '我的订单',
                    path: '/member/order/list'
                },
                {
                    label: '我的知产通',
                    path: '/member/zct'
                },
                {
                    label: '我的余额',
                    path: '/member/balance'
                },
                {
                    label: '我的收藏',
                    path: '/member/like/list'
                },
                {
                    label: '消息中心',
                    path: '/member/message'
                },
                {
                    label: '账号设置',
                    path: '/member/setting'
                }
            ];

            scope.$watch('key', function (n, o) {
                console.log(authSvc.user());
                scope.profile = authSvc.user();
                if (n !== o || o !== undefined) {
                    /*subjectSvc.get(scope.key, 0).then(function success(res) {
                        scope.profile = res.result.list[0];
                        console.log(scope.profile);
                    });*/
                    subjectSvc.get(scope.key, 1).then(function success(res) {
                        if (res.result.list.length > 0) {
                            scope.companyName = res.result.list[0].companyName;
                        } else {
                            scope.companyName = '暂无企业';
                        }
                    });
                }
            });
        }
    };
}]);
