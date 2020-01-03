app.directive("addressSelector", [function () {
    return {
        restrict: 'A',
        scope: {
            inputData: '=',
            selected: '&'
        },
        templateUrl: "modules/address/selector/selector.html",
        link: function (scope, element, attrs) {
            scope.showWaitingIcon = false;//是否等待数据
        }
    };
}]);
