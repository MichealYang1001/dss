'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('guide_controllers', []);

    /*指引控制器*/
    controllers.controller('GuideCtrl', [
        '$scope',  'PageDataService', 'ParamsService','SearchService','ProductService',
        '$sce','services_config','FilterService','GuideService',
        function($scope, pageDataService, paramsService, searchService, productService,
                 $sce, config,filterService,guideService) {
            $scope.stats = null; // 状态数据
            $scope.guides = null; // 指引数据
            $scope.total = 0;//数据总量
            $scope.pageAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $scope.page = 0;
            $scope.maxpage =null;
            $scope.tpid = guideService.getTpid();
            $scope.loadingend = false;
            $scope.$on('loadingendChange',function(e,input){
                $scope.loadingend = input;
            });
            $scope.$on('guidesChange',function(e,data){
                $scope.guides = data;
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
            $scope.$on('relatesChange',function(e,data){
                $scope.relates = data;
            });
            $scope.$on('pageChange',function(e,data){
                $scope.page = data;
            });
            $scope.loadData = function (pageNum) {
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
                var params = {'size':10,'input':searchService.getInput(),'tpid':guideService.getTpid(),'page':pageNum};
                guideService.setGuides(params);
                window.scrollTo(0,0);
            };

            $scope.renderHtml = function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };
            $scope.returnBack = function (){
                location.href = "result.html";
            }
            $scope.relatesClick = function (value) {
                var params = {'keyword': value, 'productId':productService.getProductId()};
                if(params.productId==8){
                    params.cubeid = productService.getCubeId();
                }
                paramsService.set(params);
                location.href = "result.html";
            };
            $scope.toggleStats = function (tpid) {
                $scope.tpid = tpid;
                guideService.setTpid(tpid);
                guideService.setPage(0);
                var params = {'size':10,'input':searchService.getInput(),'tpid':tpid,'page':0};
                guideService.setGuides(params);
            };
        }
    ]);
});