'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('guide_services', []);

    /**
     * 指引服务
     */
    services.factory('GuideService',['DataService','$rootScope','$filter',
        function(dataService,$rootScope,$filter){
            var data = {},tpid = 1,page= 0,filter = $filter('tp');
            return{
                'setGuides':function(params){
                    $rootScope.$broadcast('loadingendChange',false);
                    dataService.query('os', params).success(function(res) {
                        data.guides = filter(res.itemLst, params.tpid);
                        data.counts = res.count;
                        $rootScope.$broadcast('loadingendChange',true);
                        $rootScope.$broadcast('guidesChange',data.guides);
                        $rootScope.$broadcast('countsChange',data.counts);
                    });
                },
                'setRelates':function(input){
                    var param = {'input': input, 'size': 10};
                    dataService.query('relate', param).success(function(res) {
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
                },
                //'getPage':function(){
                //    return page;
                //},
                'setTpid':function(input){
                    tpid = input;
                },
                'getTpid':function(){
                    return tpid;
                }
            };
    }]);
    return services;
});

