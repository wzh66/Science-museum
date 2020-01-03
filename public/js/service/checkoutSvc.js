appServices.factory('checkoutSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.submit = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'addOrder', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.order = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'payOrders', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
