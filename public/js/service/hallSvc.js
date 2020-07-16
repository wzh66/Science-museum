appServices.factory('hallSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getVenueList = function (id, page) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getVenueList' + (id ? '&venueForm=' + id : '' + '&page=' + page)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.getVenueDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getVenueDetail&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getDictsByKey = function (key) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getDictsByKey&nodeKey=' + key).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getVenueTypeList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getVenueTypeList').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getGoodsList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getGoodsList').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.venueQuery = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'venueQuery' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.submitOrder = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'submitOrder' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderGoodsList = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getOrderGoodsList&key=' + key + '&venueId=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getReserveTime = function (id, reserveBeginTime, reserveEndTime) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getReserveTime&venueId=' + id + '&reserveBeginTime=' + reserveBeginTime + '&reserveEndTime=' + reserveEndTime).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}]);
