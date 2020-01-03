app.directive("ngIndustry", [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            ngModel: '=',
            value: '=',
            selectIndustry: '&'
        },
        templateUrl: "modules/selector/selector.html",
        link: function (scope, element, attrs) {
            scope.show = false;
            scope.showWaitingIcon = false;//是否等待数据
            scope.value = {label: '请选择', value: ''};
            scope.select = function (e, item) {
                console.log(e);
                scope.value = item;
                scope.show = false;
            };

            scope.showSelector = function () {
                scope.show = !scope.show;
            };
            scope.selectIndustry = function () {
                console.log('1');
            };
        }
    };
}]);
