appServices.factory('industrySvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.get = function (key) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getIndustryList&key=' + key).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
