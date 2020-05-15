appServices.factory('indexSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getImageList = function (flag) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getImageList&flag=' + flag).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.getNoticeDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getNoticeDetail&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getNoticeList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getNoticeList').success(function (data) {
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

    service.getFriendUrl = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getFriendUrl').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}]);