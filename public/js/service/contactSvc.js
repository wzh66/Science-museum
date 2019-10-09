appServices.factory('contactSvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.post = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post('/api/wisp/intf/call?action=addUserConsult' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
