appServices.factory('goodsSvc', ['$q', '$http', 'authSvc', function ($q, $http, authSvc) {

    var service = {};
    service.list = function () {//获取用户信息 promise对象
        var d = $q.defer();
        var url = PREFIX_URL + 'getMallCloudEdit';
        var key = authSvc.storeKey();
        if (key) {
            url = PREFIX_URL + 'getMallCloudEdit' + '&key=' + key;
        }
        $http.get(url).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };
    service.item = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        var url = PREFIX_URL + 'goodsInfo' + '&gpId=' + id;
        var key = authSvc.storeKey();
        if (key) {
            url = PREFIX_URL + 'goodsInfo' + '&gpId=' + id + '&key=' + key;
        }
        $http.get(url).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.like = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'addGoodsCollect' + '&key=' + key + '&goodsId=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.unlike = function (key, ids) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'delCollect' + '&key=' + key + '&goodsIds=' + ids).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.likes = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'getCollectList', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.types = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getProductTypes').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.find = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        var key = authSvc.storeKey();
        if (key) {
          body.key = key;
        }
        $http.post(PREFIX_URL + 'searchGoods', body).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.price = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'getGoodsPrice' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
