'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('page_controllers', []);

    /*页面数据控制器*/
    controllers.controller('PageDataCtrl', [
        '$scope',  'PageDataService', 'ParamsService','SearchService','ProductService',
        '$sce','services_config','FilterService',
        function($scope, pageDataService, paramsService, searchService, productService,
                 $sce, config,filterService) {
            $scope.page = 0;
            $scope.stats = null; // 指引状态
            $scope.relates = null; // 推荐
            $scope.results = null; // 结果
            $scope.total = 0;//总结果数
            $scope.pageAry=[1,2,3,4,5,6,7,8,9,10];
            $scope.maxpage  = null;
            $scope.loadingend = false;
            $scope.$on('loadingendChange',function(e,input){
                $scope.loadingend = input;
            });
            $scope.$on('resultsChange',function(e,data){
                $scope.results = data;
            });
            $scope.$on('countsChange',function(e,data){
                if(data){
                    $scope.total = data;
                    var total = parseInt(data.replace(',',''));
                    $scope.maxpage = (total%10 === 0?total/10:parseInt(total/10)+1);
                    if($scope.maxpage<=10){
                        $scope.pageAry=[];
                        for (var i = 0; i < $scope.maxpage; i++) {
                            $scope.pageAry.push(i + 1);
                        }
                    }else if($scope.maxpage>10 && $scope.page==0){
                        $scope.pageAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    }
                }else{
                    $scope.total = 0;
                }
            });
            $scope.$on('statsChange',function(e,data){
                $scope.stats = data;
            });
            $scope.$on('relatesChange',function(e,data){
                $scope.relates = data;
            })
            $scope.$on('pageChange',function(e,data){
                $scope.page = data;
            });

            $scope.renderHtml = function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };
            $scope.loadData = function (pageNum) {          //翻页
                if(pageNum<0 || pageNum+1>$scope.maxpage){
                    return;
                }
                $scope.page = pageNum;
                if($scope.maxpage>10){
                    var page = $scope.page+1;
                    if(page<=6){
                        $scope.pageAry = [1,2,3,4,5,6,7,8,9,10];
                    }else if(page>6&&page<$scope.maxpage-4){
                        $scope.pageAry = [1,page-4,page-3,page-2,page-1,page,page+1,page+2,page+3,page+4];
                    }else if(page>6&&page>=$scope.maxpage-4){
                        $scope.pageAry = [1,$scope.maxpage-8,$scope.maxpage-7,$scope.maxpage-6,$scope.maxpage-5,$scope.maxpage-4,
                            $scope.maxpage-3,$scope.maxpage-2,$scope.maxpage-1,$scope.maxpage];
                    }
                }
                searchService.promptEventSearch.confirm(searchService.getInput(),pageNum,filterService.getFilterData());
                window.scrollTo(0,0);
            };
            $scope.resultClick = function (result) {            //结果点击
                switch(result.rscclc) {
                    case "1": // 指标
                        //paramsService.set({'dims': result.parameter});
                        paramsService.setCookie('userData',{'dims': result.parameter});
                        window.open(config.platformSysUrl); break;
                    case "2": // 文件
                        //paramsService.set({
                        //    'id': result.parameter.fileId,
                        //    'adviseInput': searchService.getInput()
                        //});
                        paramsService.setCookie('fileData',{
                            'id': result.parameter.fileId,
                            'adviseInput': searchService.getInput()
                        });
                        window.open(config.fileSysUrl+'#/'+result.parameter.fileId); break;
                    default:
                        console.error('搜索控制器:(不识别的资源类型)', result.rscclc); break;
                }
            };
            $scope.GetGuide = function(tpid){            //内部资源跳外部资源指引页面
                paramsService.set({'keyword':searchService.getInput(),'tpid':tpid,'productId':productService.getProductId()
                	,'cubeid':productService.getCubeId()});
                location.href = 'guide.html';
            };
            $scope.relatesClick = function (value) {       //推荐点击
                searchService.promptEventSearch.confirm(value);
                window.scrollTo(0,0);
            };
        }
    ]);
});