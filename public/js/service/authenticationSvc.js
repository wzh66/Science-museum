'use strict';

appServices.factory('AuthenticationSvc', ['$http', '$location', '$q', '$cookieStore', 'md5', function ($http, $location, $q, $cookieStore, md5) {
    var service = {};

    service.requestAuth = function () {
        $cookieStore.remove('appAuth');
        var id = $location.search.id;
        if (!id) {// 无openid
            window.location.href = '/api/wx/auth/mobile?callbackUrl=' + encodeURI(window.location.href);
        } else {
            console.log(id);
        }
    };

    service.login = function (username, password) {//登录时绑定微信openId
        var d = $q.defer();
        console.log(md5.createHash(password || ''));
        $http.post(apiConfig.apiHost + '/auth/signIn', {
            username: username,
            password: md5.createHash(password || '')
        }).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.isLogin = function (callback) {
        if (typeof callback === 'function') {
            if ($cookieStore.get('appAuth')) {
                var appAuth = $cookieStore.get('appAuth');
                return callback({
                    auth: appAuth
                });

            } else {
                return callback(false);
            }
        }
    };

    return service;
}]);
