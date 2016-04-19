'use strict';
/*定义和入口*/

window.define([
    'angular',
    'common_module/service',
    'directives/directive',
    'page_module/controller',
    'page_module/service',
    'search_module/controller',
    'search_module/service',
    'product_module/controller',
    'product_module/service',
    'filter_module/controller',
    'filter_module/service',
    'filter_module/filter',
    'guide_module/controller',
    'guide_module/service',
    'login_module/controller',
    'menu_module/controller',
    'cookie',
    'jquery-cookie',
    'menu_module/service'
], function (angular, commonService, directives) {
    var df = angular.module('df', [
        'product_controllers',
        'search_controllers',
        'common_services',
        'product_services',
        'search_services',
        'directives',
        'page_services',
        'page_controllers',
        'filter_controllers',
        'filter_services',
        'filters',
        'guide_controllers',
        'guide_services',
        'login_controllers',
        'menu_controllers',
        'ngCookies',
        'menu_services'
    ]);
    /*指令配置*/
    directives.value('directives_config', {
        'promptTimeout': 500 // 搜索建议延迟时间
    });
    /*服务配置*/
    commonService.value('services_config', {
        'fileSysUrl': 'http://dfms.dfinder.cn/file.html', // 文件跳转路径
        'platformSysUrl': 'http://dps.dfinder.cn/platform.html', // 平台跳转路径
        'loginUrl' : 'http://login.dfinder.cn/login.html',      //登录页面地址
        'loginCheck' : 'http://login.dfinder.cn/userInfo.do',   //检查是否登录
        'logout': 'http://login.dfinder.cn/logout.do',          //退出登录地址
        'debug': true,
        //'base': 'http://192.168.1.111:8080/DFinderSearchSystem/', // 基础地址
        'base': 'http://dfinder.cn/', // 基础地址
        'sucfn': function(opt) { // 请求日志
            var st = new Date().getTime();
            return function(res) {
                var et = new Date().getTime();
                var info = '方法:' + opt.action + '__' +
                    '耗时:' + (et - st) + 'ms' + '__';
                console.info('Service-<',info, '参数:', [opt.params], '结果:', res);
            };
        }
    });
    return df;
});