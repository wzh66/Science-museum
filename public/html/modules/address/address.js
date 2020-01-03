app.directive("ngAddress", ['AddressSvc', function (AddressSvc) {
    return {
        restrict: 'A',
        scope: {
            show: '=',
            province: '=',
            city: '=',
            area: '='
        },
        templateUrl: "modules/address/address.html",
        link: function (scope, element, attrs) {

            scope.$watch('show', function (n, o) {
                if (n !== o && n) {
                    scope.getProvinces();
                }
            });

            scope.getProvinces = function () {
                scope.selectorData = AddressSvc.getProvinces();
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'province');
                }, 10);
            };

            scope.getCities = function (province) {
                if (!province) {
                    return false;
                }
                scope.selectorData = AddressSvc.getCities(province);
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'city');
                }, 10);
            };

            scope.getDistricts = function (province, city) {
                if (!province || !city) {
                    return false;
                }
                scope.selectorData = AddressSvc.getDistricts(province, city);
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'district');
                }, 10);
            };

            scope.areaSelected = function (e, data) {
                if (scope.tabName === 'province') {
                    scope.province = data.name;

                    scope.city = '';
                    scope.area = '';

                    scope.getCities(data.name);
                }

                if (scope.tabName === 'city') {
                    scope.city = data.name;

                    scope.area = '';
                    scope.getDistricts(scope.province, data.name);
                }

                if (scope.tabName === 'district') {
                    scope.area = data.name;
                    scope.show = false;
                }
            };
        }
    };
}]);
