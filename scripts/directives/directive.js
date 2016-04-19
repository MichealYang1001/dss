'use strict';

window.define(['angular'],
    /*指令模块*/
    function(angular) {
        var directives = angular.module('directives', []);
        /*首页导航切换*/
        directives.directive('nvlskip',[function(){
            return {
                "restrict": 'A',
                link: function($scope,elem) {
                    elem.delegate("a","click",function(e){
                        $(this).addClass('current-option').siblings().removeClass('current-option');
                        if($(this).index()==2){     //资源导航
                            $("#main").hide();
                            $("#statsSites").show();
                            $("#nvl").addClass('nvl-shadow');
                        }else{
                            $("#main").show();
                            $("#statsSites").hide();
                            $("#nvl").removeClass('nvl-shadow');
                        }
                    })
                }
            };
        }]);
        /*首页选择产品线*/
        directives.directive('selproductIndex',[function(){
            return {
                "restrict": 'A',
                scope: {'seproduct': '='},
                link: function($scope, elem) {
                    var trade = elem.parents("#main").find(".opt-trade");
                    var input = elem.parents("#main").find("input");
                    var suggestion = elem.parents("#main").find(".suggestion");
                    $scope.$watch('seproduct',function(data){
                        if(data.id == 8){       //贸易
                            trade.show();
                            input.css("width","430");
                        }else{
                            trade.hide();
                            input.css("width","560");
                        }
                    })
                }
            };
        }]);
        /*贸易产品下拉框*/
        directives.directive('seldrop',[function(){
            return {
                "restrict": 'A',
                link: function($scope, elem) {
                    var time = new Date().getTime();
                    var ul = elem.find("ul"),
                        li =elem.find("li"),
                        span = elem.find("span");

                    elem.delegate("span","click",function(e){
                        if(ul.css("display")=="none"){
                            ul.show();
                        }else{
                            ul.hide();
                        }
                        $(e.target).attr('mark', time);
                    });
                    elem.delegate("li","click",function(){
                        span.css("color","#000000");
                    });
                    $(window).click(function(e){
                        if($(e.target).attr('mark')!=time){
                            ul.hide();
                        }
                    });
                }
            };
        }]);
        /*搜索提示*/
        directives.directive('serprompt', [
            'directives_config',
            function(config) {
                return {
                    restrict: 'A',
                    scope: {'eventfn': '='},
                    template: '',
                    link: function($scope, elem) {
                        var serValue = null, result = [],// 搜索值, 结果
                            selClass = 'sugitem-over', // 选中类
                            selIndex = null, timeOut = null, // 选择下标, 计时器
                            key13 = false, // 回车关闭标示
                            inputEle = elem.children('input'),
                            wrapper = $('<div>').appendTo(elem).addClass('suggestion'),
                            suglist = $('<ul>').appendTo(wrapper).addClass('suglist');
                            wrapper.hide(); // 隐藏
                        /*初始化状态事件*/
                        suglist.on('mouseover click', function(e) {
                            var $target = $(e.target);
                            if(!$target.is('li')) { return; }
                            if(e.type === 'mouseover') { selItem($target.index()); }
                            else if(e.type === 'click') {
                                inputEle.val($target.text());
                                wrapperHide();
                                $scope.eventfn.confirm(inputEle.val());
                            } else { console.error('没有定义的事件'); }
                        });
                        elem.children('.input-btn').on('click',function(e){
                            $scope.eventfn.confirm(inputEle.val());
                        });
                        /*关联移动*/
                        function associate (dg) {
                            var length = result.length, index = selIndex;
                            if(index === null) { index = 0; }
                            else {
                                index = index + dg;
                                index = index<-1?length-1:index>=length?index=-1:index;
                            }
                            var itemVal = selItem(index); // 选中项,保存选中值在其中
                            if(index === -1) { inputEle.val(serValue); }
                            else { inputEle.val(itemVal); }
                        }
                        /*选中项*/
                        function selItem (index) {
                            var items = suglist.children('li');
                            if(selIndex !== null) { $(items[selIndex]).removeClass(selClass); }
                            var value = $(items[index]).addClass(selClass).text();
                            selIndex = index; // 当前选中
                            return value;
                        }
                        /*填充数据*/
                        function fillingSuglist (result) {
                            suglist.empty(); // 清空子项
                            for(var i = 0, ilen = result.length; i < ilen; i++) {
                                var item = result[i];
                                suglist.append('<li>'+item+'</li>');
                            }
                        }
                        /*请求数据*/
                        function requestData (keyword) {
                            $scope.eventfn.request(keyword, function(response) {
                                selIndex = null; // 清空下标
                                serValue = keyword; // 用户输入的值
                                result = response.keywords; // 结果
                                fillingSuglist(result); // 填充值
                                if(!result.length) { wrapperHide(); }
                                else { wrapperShow(); } // 显示
                                if(key13 === true) { wrapperHide(); key13 = false; }
                            });
                        }
                        /*显示*/
                        function wrapperShow () {
                            var cw = inputEle.innerWidth();
                            wrapper.css("width",cw+1).show();
                        }
                        /*隐藏*/
                        function wrapperHide () {
                            wrapper.hide();
                        }
                        /*抬起监听*/
                        function onkeyup (e) {
                            switch(e.keyCode) {
                                case 38: break;
                                case 39: break;
                                case 37: break;
                                case 40: break;
                                case 27: break;
                                case 16: break;
                                case 13:
                                    $scope.eventfn.confirm(inputEle.val());
                                    wrapperHide();
                                    key13 = true;
                                    break;
                                default: // 请求数据
                                    var value = inputEle.val();
                                    if(!value) { wrapperHide(); }
                                    else {
                                        if(timeOut) { window.clearTimeout(timeOut); }
                                        timeOut = window.setTimeout(function(){
                                            requestData(inputEle.val()); // 时效性
                                            timeOut = null;
                                        }, config.promptTimeout);
                                    }
                                    break;
                            }
                        }
                        /*按下监听*/
                        function onkeydown (e) {
                            switch(e.keyCode) {
                                case 27: wrapperHide(); break; //Esc
                                case 38: wrapperShow(); associate(-1); e.preventDefault(); break; //Up
                                case 40: wrapperShow(); associate(1); e.preventDefault(); break; //Down
                                default: break;
                            }
                        }
                        inputEle.keyup(onkeyup).keydown(onkeydown); // 绑定事件
                        $(window).click(function(){wrapperHide();});
                        //$(window).resize(function(){wrapperHide();wrapperShow();});
                    }
                };
            }]);
        /*搜索页选择产品线*/
        directives.directive('selproductSearch',[function(){
            return {
                "restrict": 'A',
                scope: {'selproduct': '='},
                link: function($scope,elem) {
                    var trade = elem.parents("#search-area").find(".opt-trade"),
                        input = elem.parents("#search-area").find("input"),
                        li1 = elem.parents("body").find(".search-type li:nth-child(1)"),//综合dom
                        li3 = elem.parents("body").find(".search-type li:nth-child(3)");//表格dom
                    $scope.$watch("selproduct",function(data){
                       if(data.id==8||data.id==4){              //贸易、国际
                           li3.hide();
                       } else{
                           li3.show();
                       }
                        if(data.id==8){
                            trade.show();
                        }else{
                            trade.hide();
                        }
                    });
                }
            };
        }]);
        /*下拉过滤组*/
        directives.directive('downgroup', [function() {
            return {
                restrict: 'A',
                scope: {'reset':'=','groupdata': '=', 'filterevent': '='},
                template: '<div class="dropdown" ng-repeat="drop in groupdata">'+
                '<span class="dropdown-target">'+
                '{{drop.text || drop.label}}</span>'+
                '<ul class="dropdown-list">'+
                '<li ng-class="{\'dropdown-radio\': drop.value == item.val}" '+
                'ng-repeat="item in drop.item">{{item.text}}</li>'+
                '</ul></div>',
                link: function($scope, elem) {
                    var groups = null, openIndex = null, result = {}, // 组, 打开下标, 结果
                        openCla = 'dropdown-open';
                    var time = new Date().getTime();

                    /*打开下拉框*/
                    function dropDownToggle (index) {
                        if(index == -1){
                            $(groups[openIndex]).removeClass(openCla);
                            openIndex = index;
                        }else{
                            var dropdown = $(groups[index]);
                            if(dropdown.hasClass(openCla)){
                                dropdown.removeClass(openCla);
                                openIndex = -1;
                            }else{
                                $(groups[openIndex]).removeClass(openCla);
                                dropdown.addClass(openCla);
                                openIndex = index;
                            }
                        }
                    }
                    $scope.$watch('reset',function(data){
                        if(data == true){               //重置
                            angular.forEach($scope.groupdata, function(f) {
                                f.value = -1;
                                f.text = f.label;
                            });
                        }
                    })
                    /*监听数据*/
                    $scope.$watch('groupdata', function(ndata) {
                        angular.forEach(ndata, function(f) { f.value = -1; }); // 处理默认值
                        groups = elem.children('.dropdown');
                        groups.click(function(e) { //绑定事件
                            var $target = $(e.target);
                            if ($target.is('.dropdown-target')) {
                                var groupIndex = $target.parent().index();
                                dropDownToggle(groupIndex); //切换指定位置的条件
                            } else if ($target.is('li')) { // 单击li的话
                                var group = ndata[openIndex],
                                    item = group.item[$target.index()],
                                    text = item.tar;
                                if(item.val === -1) { text = group.label; } // -1为默认
                                $scope.groupdata[openIndex].text = text; // 文本
                                $scope.groupdata[openIndex].value = item.val; // 值
                                $scope.$apply();
                                dropDownToggle(-1); // 收起
                                if($scope.filterevent.click) { // 点击传递
                                    var params = {'type': group.type, 'value': item.val};
                                    $scope.filterevent.click(params);
                                }
                            }
                            $target.attr('mark', time);
                        }); //绑定点击
                    });

                    $(window).click(function(e){
                        if($(e.target).attr('mark')!=time){
                            dropDownToggle(-1);
                        }
                    });
                }
            };
        }]);
        /*加载中指令*/
        directives.directive('loading', [
            function() {
                return {
                    restrict: 'A',
                    link: function($scope, elem, attrs) {
                        var body = elem.parents('body');
                        var div = body.data('loadarea');
                        if(!div) { div = $('<div class="loading">').appendTo('body'); }
                        div.hide();
                        body.data('loadarea', div);
                        /*监听指定字段*/
                        $scope.$watch(attrs.loading, function(isend) {
                            if(isend === true) {
                                div.hide();
                            } else if (isend === false) {
                                var w = body.innerWidth(),
                                    h = '100%',
                                    offset = body.offset();
                                div.height(h).width(w)
                                    .css({'top':offset.top, 'left':offset.left}).show();
                            }
                        }, true);
                    }
                };
            }]);
        //综合，指标，表格点击样式
        directives.directive('filtertype',[function(){
            return {
                "restrict": 'A',
                scope:{'reset':'='},
                link: function($scope, elem) {
                    $scope.$watch("reset",function(data){
                        if(data == true){
                            elem.find("li:nth-child(1)").addClass("currenttype").siblings().removeClass("currenttype");
                        }
                    });
                    elem.delegate("li","click",function(){
                        $(this).addClass("currenttype").siblings().removeClass("currenttype");
                    });
                }
            };
        }]);
        /*下拉排序*/
        directives.directive('sort', [function() {
            return {
                restrict: 'A',
                scope: {'sortevent': '='},
                template: '<div class="dropdown">'+
                '<span class="dropdown-target">'+
                '相关性</span>'+
                '<ul class="dropdown-list">'+
                '<li value="1" class="dropdown-radio">相关性</li>'+
                '<li value="2">时间性</li>'+
                '</ul></div>',
                link: function($scope, elem) {
                    var openCla = 'dropdown-open',
                    dropdown = elem.children('.dropdown');
                    dropdown.click(function(e) { //绑定事件
                        var $target = $(e.target);
                        if ($target.is('.dropdown-target')) {
                            if(dropdown.hasClass(openCla)){
                                dropdown.removeClass(openCla);
                            }else{
                                dropdown.addClass(openCla);
                            }
                        } else if ($target.is('li')) { // 单击li的话
                            dropdown.removeClass(openCla);
                            $target.parent('ul').children('li').removeClass("dropdown-radio");
                            $target.parents('.dropdown').find('span').text($target.text());
                            $target.addClass("dropdown-radio");
                            if($scope.sortevent.click){ // 点击传递
                                var params = {'type': 'sort', 'value': parseInt($target.attr("value"))};
                                $scope.sortevent.click(params);
                            }
                        }
                        e.stopPropagation();
                    }); //绑定点击
                    $(window).click(function(){ dropdown.removeClass(openCla); });
                }
            };
        }]);
        return directives;
    });
