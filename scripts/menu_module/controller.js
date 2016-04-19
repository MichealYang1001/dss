'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('menu_controllers', []);

    /*首頁菜單控制器*/
    controllers.controller('MenuCtrl', [
        '$scope','MenuService',
        function($scope,menuService){
            $scope.categorys = menuService.sites();
            //$scope.category1 = $scope.categorys.;
            //for(var i=0;i<$scope.categorys.length;i++){
            //    if($scope.categorys.[i].id==0){
            //
            //    }
            //}
        }
    ]);
});
