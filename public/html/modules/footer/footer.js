'use strict';

app.directive('ngFooter', ['$location', 'indexSvc', function ($location, indexSvc) {
    return {
        restrict: 'C',
        scope: {
            contactHide: '='
        },
        templateUrl: 'modules/footer/footer.html',
        link: function (scope, element, attrs) {
            indexSvc.getFriendUrl().then(function success(res) {
                scope.urls = res.result;
            });
            indexSvc.addAccessLog().then(function success(res) {

            });
            indexSvc.getAccessCount().then(function success(res) {
                res.result = res.result.toString().split('');
                console.log(res.result);
                scope.counts = res.result;
            });
        }
    };
}]);
