'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

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
appFilters.filter('detail', function () {//订单状态
    return function (html) {
        return html.replace(/<img src="/gi, '<img src="/api');
    };
});
appFilters.filter('thumb', function () {//订单状态
    return function (id) {
        return FILE_PREFIX_URL + id;
    };
});
appFilters.filter('message', function () {//订单状态
    return function (content) {
        return content.split('{{')[0];
    };
});

appFilters.filter('disabled', function () {//订单状态
    return function (field, keys) {
        return keys.indexOf(field.fieldId + ':' + field.fieldValue) !== -1;
    };
});

appFilters.filter("parseHTML", function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
});
