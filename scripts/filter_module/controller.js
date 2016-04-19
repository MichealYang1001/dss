'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('filter_controllers', []);

    /*筛选控制器*/
    controllers.controller('FilterCtrl', [
        '$scope', 'FilterService','ProductService','PageDataService','SearchService','GuideService','$sce',
        function ($scope, filterService,productService, pageDataService, searchService,guideService) {
            filterService.getDropDownData(productService.getProductId(),productService.getCubeId(), callback);
            $scope.$on('selTrade',function () {
                filterService.getDropDownData(productService.getProductId(), productService.getCubeId(),callback);
            });
            $scope.$on('selProduct',function () {
                filterService.getDropDownData(productService.getProductId(), productService.getCubeId(),callback);
            });
            function callback(response) {
                $scope.dropDownData = response;
            };
            $scope.isReset = false;//是否重置筛选内容
            $scope.$on('newSearch',function(e,data){
                $scope.isReset = data;
            });
            var filterData = {};
            //内部资源页面筛选（地区，频度，排序）
            $scope.filterEvent = {
                'click': function (params) {
                    filterData = filterService.getFilterData();
                    filterData[params.type] = params.value;
                    filterService.setFilterData(filterData);
                    searchService.promptEventSearch.confirm(searchService.getInput(),0,filterData);
                }
            };
            //内部资源筛选方法（综合，指标，表格）
            $scope.Filter = function(value){
                filterData = filterService.getFilterData();
                filterData['rscclc'] = value;
                filterService.setFilterData(filterData);
                searchService.promptEventSearch.confirm(searchService.getInput(),0,filterData);
            };
            ////外部资源排序方法（相关性，时间性）
            //$scope.sortEvent = {
            //    'click': function (params) {
            //        var inputParams = {
            //            'size':10,'input':searchService.getInput(),
            //            'tpid':guideService.getTpid(),'page':0,'sort':params.value};
            //        guideService.setPage(0);
            //        guideService.setGuides(inputParams);
            //    }
            //};
        }]);
});
