appServices.factory('subjectSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.get = function (key, type) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getCompCustList&key=' + key + (typeof type === 'number' ? '&custType=' + type : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.item = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getCust&key=' + key + '&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.submit = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateCust', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
