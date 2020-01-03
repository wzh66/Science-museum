appServices.factory('accountSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.list = function (key, custId, type, tradeType, page) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getAccountFlow&key=' + key + '&custId=' + custId + '&type=' + type + '&tradeType=' + tradeType + '&rows=' + 10 + '&page=' + page).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.get = function (key, custId, type) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getAccount&key=' + key + '&custId=' + custId + '&type=' + type).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
