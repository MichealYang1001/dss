'use strict';
/*过滤器*/
window.define(['angular'], function(angular) {
    /*过滤模块*/
    var filters = angular.module('filters', []);

    filters.filter('tp', [
        function() {
            return function(array, tpid) {
                angular.forEach(array, function(tp) {
                    switch(tpid) {
                        case 1:
                            tp.orz = [];
                            tp.orz[0] = tp.appendix.pername;
                            tp.orz[1] = tp.appendix.year + '年' + tp.appendix.issue + '期';
                            tp.orz[2] = tp.appendix.author;
                            tp.tpname = '期刊论文';
                            break;
                        case 2:
                            tp.orz = [];
                            tp.orz[0] = tp.appendix.confname;
                            tp.orz[1] = tp.appendix.confdate + '年';
                            tp.orz[2] = tp.appendix.author;
                            tp.tpname = '学位论文';
                            break;
                        case 3:
                            tp.orz = [];
                            tp.orz[0] = tp.appendix.confname;
                            tp.orz[1] = tp.appendix.confdate + '年';
                            tp.orz[2] = tp.appendix.author;
                            tp.tpname = '会议论文';
                            break;
                        default:
                            break;
                    }
                });
                return array;
            };
        }]);
    //返回的result的appendix字段中属性如source可能是字符串，也可能是数组，且数组中可能存在null值
    filters.filter("rs",[function(){
        return function(array){
            angular.forEach(array,function(result){
                angular.forEach(result.appendix,function(obj){
                    if(Object.prototype.toString.call(obj) === '[object Array]'){        //数组
                        for(var i=0;i<obj.length;i++){
                            if(obj[i]==null||obj[i]==""||typeof(obj[i])=="undefined"){
                                obj.splice(i,1);
                                i=i-1;
                            }
                        }
                        obj.join("、");
                    }
                });
            });
            return array;
        }
    }]);

    return filters;
});
