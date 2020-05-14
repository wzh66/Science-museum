appServices.factory('authSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getValidImg = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getValidImg&randomValidUid=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.sendValidCode = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'sendValidCode', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.login = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'login' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.register = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'register' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.findPwd = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'findPwd' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.updatePwd = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updatePwd' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.updateMember = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateMember' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.logout = function () {
        $cookieStore.remove('auth');
        $location.path('/service/auth/login');
    };

    service.key = function () {
        if ($cookieStore.get('auth')) {
            return $cookieStore.get('auth').key;
        } else {
            $location.url('/service/auth/login?callbackUrl=' + $location.url());
        }
    };

    service.storeKey = function () {
        if ($cookieStore.get('auth')) {
            return $cookieStore.get('auth').key;
        } else {
            return '';
        }
    };

    service.user = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth') : '';
    };

    service.id = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth').id : '';
    };

    service.mobile = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth').mobile : '';
    };

    service.account = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth').account : '';
    };

    service.type = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth').type : '';
    };

    service.requestAuth = function () {
        var callback = '';
        if ($location.url().indexOf('/auth/login') === -1) {
            callback = '?callbackUrl=' + $location.url();
        }
        $location.url('/auth/login' + callback);
    };

    return service;
}]);
