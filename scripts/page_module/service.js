'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('page_services', []);

    /**
     * 页面数据服务
     */
    services.factory('PageDataService',['DataService','$rootScope', '$filter',
        function(dataService,$rootScope,$filter){
        var data = {};
        var page = 0,filterRs = $filter('rs');
        return{
            'setResults':function(params, filter, mode){
                $rootScope.$broadcast('loadingendChange',false);
                if(filter) {
                    for(var key in filter) {
                        if(filter[key] === '-1' || filter[key] === -1) { continue; }
                        params[key] = filter[key];
                    }
                }
                dataService.query('is', params).success(function(response) {
                    if (mode === 'concat') {
                        data.results = data.results.concat(filterRs(response.itemLst)); // 合并
                    } else { data.results = filterRs(response.itemLst); }
                    data.total = response.count;
                    $rootScope.$broadcast('loadingendChange',true);
                    $rootScope.$broadcast('resultsChange',data.results);
                    $rootScope.$broadcast('countsChange',data.total);
                });

            },
            'setRelatesAndStats':function(input){
                dataService.query('stats', {'input': input}).success(function(res) {
                    data.stats=res.stats;
                    $rootScope.$broadcast('statsChange',data.stats);
                });
                var par2 = {'input': input, 'size': 10};
                dataService.query('relate', par2).success(function(res) {
                    var tempdata = res.relates, ilen = tempdata.length, minary = [];
                    data.relates = [];
                    if(ilen>=1){
                        for(var i = 1; i <= ilen; i++) {
                            minary.push(tempdata[i-1]);
                            if(i % 2 === 0) {data.relates.push(minary); minary = []; }
                        }
                        if(ilen < 2) { data.relates.push(minary); }
                    }
                    $rootScope.$broadcast('relatesChange',data.relates);
                });
            },
            'setPage':function(input){
                page = input;
                $rootScope.$broadcast('pageChange',page);
            }
            //'getPage':function(){
            //    return page;
            //}
        };
    }]);
    return services;
});

