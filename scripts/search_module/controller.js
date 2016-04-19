'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('search_controllers', []);

    /*首页搜索控制器*/
    controllers.controller('IndexSerCtrl', [
        '$scope', 'SearchService',
        function($scope, searchService) {
            $scope.inputValue = null;
            $scope.promptEvent = searchService.promptEventIndex;
        }]);

    /*结果页面(内部资源)搜索控制器*/
    controllers.controller('ListSerCtrl', [
        '$scope', '$rootScope', 'PageDataService', 'ParamsService', 'ProductService', 'DataService',
        'SearchService','FilterService',
        function($scope, $rootScope, pageDataService ,
                    paramsService, productService, dataService, searchService,filterService) {
            var initData = paramsService.get();
            if(initData&&initData.keyword){
                $scope.inputValue = initData.keyword;
            }
            $scope.$on('inputChange',function(e,input){
                $scope.inputValue = input;
            });
            $scope.$on('selProduct',function(){
                searchService.promptEventSearch.confirm($scope.inputValue);
            });
            $scope.$on('selTrade',function(){
                searchService.promptEventSearch.confirm($scope.inputValue);
            });
            $scope.promptEvent = searchService.promptEventSearch;
            if($scope.inputValue){
                var params = {'size':10,'input':$scope.inputValue,'prodid':initData.productId,'page':0};
                if(initData.cubeid){
                    params.cubeid = initData.cubeid;
                }
                searchService.setInput($scope.inputValue);
                pageDataService.setResults(params); // 获取数据
                pageDataService.setRelatesAndStats($scope.inputValue);
            }else{
                location.href = 'index.html';
            }
        }]);
    //指引页面（外部资源）搜索控制器
    controllers.controller('GuideSerCtrl', [
        '$scope', '$rootScope', 'ParamsService', 'DataService', 'ProductService','SearchService','GuideService',
        function($scope, $rootScope, paramsService, dataService,  productService, searchService,guideService) {
            var initData = paramsService.get();
            if(initData&&initData.keyword&&initData.tpid){       //页面初始化
                $scope.inputValue = initData.keyword;
                $scope.tpid = initData.tpid;
                var inputParams = {
                    'size':10,'input':$scope.inputValue,
                    'tpid':$scope.tpid,'page':0};
                guideService.setTpid($scope.tpid);
                guideService.setGuides(inputParams);
                guideService.setRelates($scope.inputValue);
                searchService.setInput($scope.inputValue);
            }else{
                location.href = 'index.html';
            }
            $scope.promptEvent = searchService.promptEventIndex;
        }]);
});