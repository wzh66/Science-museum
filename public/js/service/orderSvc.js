appServices.factory('orderSvc', ['$q', '$http', '$location', '$cookieStore', function ($q, $http, $location, $cookieStore) {

    var service = {};

    service.getOrderList = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'getOrderList' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.cancelOrder = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'cancelOrder&key=' + key + '&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.offlinePay = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'offlinePay' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderDetail = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getOrderDetail&key=' + key + '&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.updateOrder = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'updateOrder' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getInvoiceList = function (key) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getInvoiceList&key=' + key).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    service.addInvoice = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'addInvoice' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderInvoiceDetail = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'getOrderInvoiceDetail&key=' + key + '&orderInvoiceId=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.openInvoice = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'openInvoice' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.payOrders = function (body) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.post(PREFIX_URL + 'payOrders' + formDataToUrl(body)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.removeInvoice = function (key, id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(PREFIX_URL + 'removeInvoice&key=' + key + '&id=' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}]);
