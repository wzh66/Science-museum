app.directive("ngSelector", [function () {
    return {
        restrict: 'A',
        scope: {
            data: '=',
            value: '=',
            disabled: '='
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
                console.log(scope.disabled);
                if (!scope.disabled) {
                    scope.show = !scope.show;
                }
            };
        }
    };
}]);
