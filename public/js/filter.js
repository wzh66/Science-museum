'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('orderState', function () {//订单状态
    return function (type) {
        if (type == 0) {
            return "未支付";
        }
        if (type == 1) {
            return "已支付";
        }
        if (type == 2) {
            return "配送中";
        }
        if (type == 3) {
            return "受理中";
        }
        if (type == 4) {
            return "已完成";
        }
        if (type == 5) {
            return "已失效";
        }
        if (type == 6) {
            return "审核不通过";
        }
    };
});

appFilters.filter('cleanHtml', function () {//订单状态
    return function (html) {
        return html.replace(/<br>/gi, '');
    };
});
appFilters.filter('price', function () {//订单状态
    return function (num) {
        return '<sub>￥</sub><em>' + num + '</em>';
    };
});
