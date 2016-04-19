'use strict';
/*require启动文件*/

require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'angular': '../bower_components/angular/angular.min', // mv*
        'cookie': '../bower_components/angular-cookies/angular-cookies.min',
        'jquery-cookie':'../bower_components/jquery-cookie/jquery.cookie',
        'jquery-ajaxTransport':'../bower_components/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min'//ie9跨域
    },
    shim: { // 依赖
        'angular': { deps: ['jquery'], exports: 'angular' },
        'cookie': { deps: ['angular'] },
        'jquery-cookie': { deps: ['jquery'] },
        'jquery-ajaxTransport': { deps: ['jquery'] }
    }
});

require( [
    'angular',
    'app',
    'jquery',
    'jquery-ajaxTransport'
], function(angular, app) {
    angular.element().ready(function() {
        //获取URL参数并存到session里
        var urlData={};
        if(GetQueryString("keyword")){
            urlData.keyword = decodeURI(GetQueryString("keyword"));
        }
        if(GetQueryString("proid")){
            urlData.productId = parseInt(GetQueryString("proid"));
        }
        if(GetQueryString("cubeid")){
            urlData.cubeid = parseInt(GetQueryString("cubeid"));
        }
        if(urlData.keyword && urlData.keyword!==''){
            urlData = JSON.stringify(urlData);
            sessionStorage.setItem('userData', urlData);
        }
        //function GetQueryString(name)
        //{
        //    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        //    var r = window.location.search.substr(1).match(reg);
        //    if(r!=null)return  unescape(r[2]); return null;
        //}
        function GetQueryString2(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
        function GetQueryString(name){
            return GetQueryString2()[name];
        }
        angular.bootstrap(document, [app.name]); // 启动angular
    });
});
