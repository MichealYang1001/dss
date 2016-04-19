'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('common_services', []);
    /**
     * 数据服务, 根据条件获取数据
     */
    services.factory('DataService', [
        'services_config', '$http',
        function(config, $http) {
            var base = config.base;
            var reqMap = {
                'is': { 'action': 'is' }, // 内部资源
                'sac': { 'action': 'sac' }, //搜索补全, input&size
                'stats': { 'action': 'stats' }, // 外部统计
                'os': { 'action': 'os' }, // 外部搜索
                'screen': { 'action': 'screening' }, // 筛选条件
                'relate': { 'action': 'relate' }, // 相关搜索
                'zwz': {}
            };
            return {
                'query': function(key, params) { // 类型,条件
                    var reqItem = reqMap[key]; //请求项
                    var action = reqItem.action, // 方法名
                        url = base + action,
                        options = {
                            params: ( reqItem.parfn && reqItem.parfn(params) ) || params
                        }; // 选项
                    var //successFn 成功时处理方式； errorFn 错误时处理方式
                        successFn = reqItem.sucfn || config.sucfn({'action': action, 'params': options.params}),
                        errorFn = function(){};
                    /*拼装放回*/
                    return $http.get(url, options).success(successFn).error(errorFn);
                }
            };
        }]);

    /**
     * 参数转接服务
     */
    services.factory('ParamsService', ['$cookieStore',
        function($cookieStore) {
            var key = 'userData';
            return {
                get: function() {
                    var userData = sessionStorage.getItem(key); // 实际的数据
                    if(userData) { userData = JSON.parse(userData); }
                    return userData;
                },
                set: function(data) {
                    data = JSON.stringify(data);
                    sessionStorage.setItem(key, data);
                },
                setCookie: function(keys,data) {
                    data = JSON.stringify(data);
                    $.cookie(keys,data,{domain: 'dfinder.cn'});
                },
                getCookie: function(){
                    return $cookieStore.get(key);
                }
            };
        }]);
    return services;
});

