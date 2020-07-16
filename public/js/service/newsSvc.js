appServices.factory('newsSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getNewsList = function (flag, id, page) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getNewsList&flag=' + flag + (id ? '&topicId=' + id : '') + '&page=' + page).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.getNewsDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getNewsDetail&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getTopicList = function (type) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getTopicList&type=' + type).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.searchNews = function (title) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'searchNews&title=' + title).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBrandList = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getBrandList').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getExhibitsList = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getExhibitsList&brandId=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getExhibitsDetail = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getExhibitsDetail&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
