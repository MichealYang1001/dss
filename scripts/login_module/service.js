'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('login_services', []);

    /**
     * 登录服务
     */
    services.factory('LoginService',['DataService','$rootScope',
        function(dataService,$rootScope){
        }]);
    return services;
});

