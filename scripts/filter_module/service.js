'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('filter_services', []);
    /**
     * 过滤服务
     */
    services.factory('FilterService' ,['DataService',
        function(dataService) {
            var filterData = {};//过滤数据
            /*过滤事件*/
            return {
                'getDropDownData': function(productId,cubeId,callback){
                    var params = {'prodid': productId};
                    if(productId==8 && cubeId){
                        params.cubeid = cubeId;
                    };
                    dataService.query('screen', params).success(function(response) {
                        //将筛选数组中的"类型"删除，类型筛选另写在页面
                        for(var i=0;i<response.length;i++){
                            if(response[i].type=='rscclc'){
                                response.splice(i,1)
                            }
                        };
                        callback(response);
                    });
                },
                'setFilterData': function(input){
                    if(input!==null){
                        filterData = input;
                    }else{
                        filterData = {}
                    }
                },
                'getFilterData': function(){
                    return filterData;
                }
            };
        }]);

    return services;
});



