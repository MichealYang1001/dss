'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('product_services', []);
    /**
     * 产品服务
     * set:设置当前产品，query：返回当前产品
     * products:返回所有产品
     */
    services.factory('ProductService' ,[
        function() {
            var selProductId = 15,//产品线默认全部资源
                selCubeId=-1;//贸易类别默认全部资源
            var productData = [
                {'id': 15, 'text': '全部'},
                {'id': 1, 'text': '地区'},
                {'id': 2, 'text': '行业'},
                {'id': 4, 'text': '国际'},
                {'id': 8, 'text': '贸易'}
                ],
                tradeDate =[
                    {'id': -1, 'text': '全部资源'},
                    {'id': 4, 'text': '商品贸易'},
                    {'id': 5, 'text': '行业贸易'},
                    {'id': 7, 'text': '贸易指数'}
                ];
            return {
                'products': function(){
                    return productData;
                },
                'trades': function(){
                    return tradeDate;
                },
                'setProductId': function(productId){
                    selProductId = productId;
                },
                'getProductId': function(){
                    return selProductId;
                },
                'setCubeId':function(cubeId){
                    selCubeId = cubeId;
                },
                'getCubeId':function(){
                    return selCubeId;
                }
            };
        }]);

    return services;
});


