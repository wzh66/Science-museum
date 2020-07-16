appServices.factory('researchSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getTalentPoolList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getTalentPoolList').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.getTalentPoolDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getTalentPoolDetail&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getIndexNewsList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getIndexNewsList').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getImage = function (type) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getImage&type=' + type).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.introduction = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(_PREFIX_URL + 'getIntroduction').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getRules = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(_PREFIX_URL + 'getRules').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getNewsList = function (page) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(_PREFIX_URL + 'getNewsList?page=' + page).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getNewsDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(_PREFIX_URL + 'getNewsDetail?id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}]);
