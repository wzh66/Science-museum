appServices.factory('goodsSvc', ['$q', '$http', function ($q, $http) {

  var service = {};

  service.get = function () {//获取用户信息 promise对象
    var d = $q.defer();
    $http.get('/mockData/goods.json').success(function (data) {
      return d.resolve(data);
    }).error(function (error) {
      d.reject(error);
    });
    return d.promise;
  };

  service.find = function (body) {//获取用户信息 promise对象
    var d = $q.defer();
    $http.post('/api/wisp/intf/call?action=searchGoods' + formDataToUrl(body)).success(function (data) {
      return d.resolve(data);
    }).error(function (error) {
      d.reject(error);
    });
    return d.promise;
  };

  return service;
}]);
