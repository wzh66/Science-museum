appServices.factory("AddressSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getProvinces = function () {
        return CITIES;
    };

    service.getCities = function (province) {
        var index = getIndex(CITIES, 'name', province);
        return CITIES[index].sub;
    };

    service.getDistricts = function (province, city) {
        var index = getIndex(CITIES, 'name', province);
        var cities = CITIES[index].sub;
        index = getIndex(cities, 'name', city);

        return cities[index].sub;
    };

    return service;
}]);