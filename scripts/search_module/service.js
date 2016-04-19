'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('search_services', []);
    /**
     * 搜索建议事件
     */
    services.factory('SearchService', [
        'DataService','ParamsService','$rootScope','ProductService','FilterService',
        'PageDataService','GuideService',
        function( dataService, paramsService, $rootScope, productService, filterService,
                  pageDataService) {
            var inputValue;
            return {
                'promptEventIndex':{
                    'request': function(input,callback){
                        var params = {'input': input,'size': 10};
                        dataService.query('sac', params).success(callback);
                    },
                    'confirm': function(value){
                        var params = {'keyword': value, 'productId':productService.getProductId()};
                        if(params.productId==8){
                            params.cubeid = productService.getCubeId();
                        }
                        paramsService.set(params);
                        if(value!=="" && value!==null){
                            location.href = 'result.html';
                        }else{
                            location.href = 'index.html';
                        }
                    }
                },
                'promptEventSearch':{
                    'request': function(input,callback){
                        var params = {'input': input,'size': 10};
                        dataService.query('sac', params).success(callback);
                    },
                    /*1 通过产品线切换,搜索框搜索只传value
                      2 筛选条件搜索传递value,filterData(筛选条件),page传0
                      3 通过翻页搜索传递value,page,filterData
                    */
                    'confirm': function(value,page,filterData){
                        if(value!==""&& value!==null){
                            inputValue = value;
                            $rootScope.$broadcast('inputChange',value);
                            //params1:存入缓存;params2:搜索参数
                            var params1 = {'keyword': value, 'productId':productService.getProductId()},
                                params2 = {'size':10,'input':value,'prodid':productService.getProductId()};
                            if(params1.productId==8){
                                params1.cubeid = productService.getCubeId();
                                params2.cubeid = productService.getCubeId();
                            }
                            paramsService.set(params1);
                            if(page){
                                params2.page = page;
                            }else{
                                params2.page = 0;
                                pageDataService.setPage(0);
                            }
                            if(filterData){
                                $rootScope.$broadcast('newSearch',false);
                                pageDataService.setResults(params2,filterData);
                            }else{
                                filterService.setFilterData(null);
                                $rootScope.$broadcast('newSearch',true);
                                pageDataService.setResults(params2);
                            }
                            pageDataService.setRelatesAndStats(value);
                        }

                    }
                },
                'setInput': function(input){
                    inputValue = input;
                    $rootScope.$broadcast('inputChange',input);
                },
                'getInput': function(){
                    return inputValue;
                }

            };
        }
    ]);
    return services;
});

