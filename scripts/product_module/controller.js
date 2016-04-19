'use strict';
window.define(['angular'],function(angular){
    var controllers = angular.module('product_controllers',[]);

    controllers.controller("ProductController",[
        '$scope', '$rootScope', 'ProductService', 'ParamsService','FilterService',
        function($scope, $rootScope, productService, paramsService,filterService){
            var initData = paramsService.get();
            $scope.products = productService.products();
            $scope.trades = productService.trades();
            if(initData && initData.productId){         //初始化产品
                for(var index in $scope.products){
                    if($scope.products[index].id == initData.productId){
                        $scope.product = $scope.products[index];
                    }
                }
            }else{
                $scope.product = $scope.products[0];
            };
            productService.setProductId($scope.product.id);
            if(initData && initData.cubeid){           //初始化贸易产品
                for(var index in $scope.trades){
                    if($scope.trades[index].id == initData.cubeid){
                        $scope.trade = $scope.trades[index];
                    }
                }
            }else{
                $scope.trade = $scope.trades[0];
            };
            productService.setCubeId($scope.trade.id);

            $scope.selProduct = function(product){
                if(productService.getProductId() != product.id){
                    if(product.id==8){                                  //选择贸易数据时默认全部资源
                        productService.setCubeId(-1);
                        $scope.trade = $scope.trades[0];
                    }
                    $scope.product = product;
                    productService.setProductId(product.id);
                    $rootScope.$broadcast('selProduct',product);
                }
            }
            $scope.selTrade = function(trade){
                if(productService.getCubeId() != trade.id){
                    $scope.trade = trade;
                    productService.setCubeId(trade.id);
                    $rootScope.$broadcast('selTrade',trade);
                }
            }
    }]);
})