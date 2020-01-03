appServices.factory('goodsSvc', ['$q', '$http', function ($q, $http) {

  var service = {};

  service.item = function (id) {//获取用户信息 promise对象
    var d = $q.defer();
    $http.get(PREFIX_URL + 'goodsInfo' + '&gpId=' + id).success(function (data) {
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
    $http.post(PREFIX_URL + 'searchGoods',body).success(function (data) {
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
