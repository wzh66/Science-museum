appServices.factory('orderSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.items = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'searchOrder', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.item = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'orderInfo&key=' + key + '&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.return = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'refundOrder',body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
