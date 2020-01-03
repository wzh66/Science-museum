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

    service.updateName = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateUserName' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.updateAvatar = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateFaceImg' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.updateMobile = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateMobile' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.logout = function () {
        $cookieStore.remove('auth');
        $location.url('/auth/login');
    };

    service.key = function () {
        if ($cookieStore.get('auth')) {
            return $cookieStore.get('auth').key;
        } else {
            $location.url('/auth/login?callbackUrl=' + $location.url());
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

    service.name = function () {
        return $cookieStore.get('auth') ? $cookieStore.get('auth').name : '';
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
