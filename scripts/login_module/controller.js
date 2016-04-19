'use strict';
window.define(['angular'], function(angular) {
    /*控制器模块*/
    var controllers = angular.module('login_controllers', []);

    /*登录控制器*/
    controllers.controller('LoginCtrl', [
        '$scope','services_config','SearchService','ProductService',
        function($scope,config,searchService,productService){

            var loginCheckUrl = config.loginCheck,callbackUrl='';
            if($.cookie('CREDENTIAL')){
                loginCheckUrl+='?type=credential&key='+$.cookie('CREDENTIAL');
            }
            $.cookie('CREDENTIAL','DFINDER_A9D8EF30B7914C62A8189FF6A76FE905','www.dfinder.cn');
            $scope.username = null;
            $scope.isLogined = false;
            $.getJSON(loginCheckUrl).done(function(response) {
                if(response!==null&&response.userName){
                    $scope.isLogined = true;
                    $scope.username = response.userName;
                    $scope.$apply();
                    var userId = response.userID;
                    var map = {
                        '1000000039': '4832051',
                        '1000000040': '4831875',
                        '1000000041': '4831630'
                    };
                    if (!map[userId]||location.href.match('index')) { return false; }
                    var href = 'http://www.sojump.com/jq/'+map[userId]+'.aspx';
                    var html = '<div class="questionnaire">' +'<a href="'+href+'" target="_blank">'
                        +'填写问卷' +'</a>' +'</div>';
                    $('body').append(html);
                }
            });
            $scope.login = function(){
                getCallbackUrl();
                location.href=config.loginUrl+'?url='+callbackUrl;
            };
            $scope.logout = function(){
                getCallbackUrl();
                $.ajax({
                    dataType: 'jsonp',
                    jsonp: 'jsonp_callback',
                    url: config.logout,
                    complete: function () {
                        location.href = config.loginUrl+'?url='+callbackUrl;
                    }
                });
            };
            function getCallbackUrl(){
                if(location.href.match('index')){  //首页
                    callbackUrl = location.href;
                }else{
                    var keyword = searchService.getInput(),
                        proid = productService.getProductId(),
                        cubeid = productService.getCubeId();
                    callbackUrl = location.href+'?'+'keyword='+encodeURIComponent(keyword)+'&'+'proid='+proid
                    +'&'+'cubeid='+cubeid;
                }
                return callbackUrl;
            }
        }
    ]);
});