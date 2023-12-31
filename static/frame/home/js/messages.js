/*
 * Toastr  消息提示
 */
; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.0',
                warning: warning
            };

            var previousToast;

            return toastr;

            //#region Accessible Methods
            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if(create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }
            //#endregion

            //#region Internal Methods

            function clearContainer(options){
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                };
            }

            function clearToast($toastElement, options){
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)
                    .attr('aria-live', 'polite')
                    .attr('role', 'alert');

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    target: 'body',
                    closeHtml: '<button>&times;</button>',
                    newestOnTop: true,
                    preventDuplicates: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions(),
                    iconClass = map.iconClass || options.iconClass;

                if(options.preventDuplicates){
                    if(map.message === previousToast){
                        return;
                    }
                    else{
                        previousToast = map.message;
                    }
                }

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                toastId++;

                $container = getContainer(options, true);
                var intervalId = null,
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    $closeElement = $(options.closeHtml),
                    response = {
                        toastId: toastId,
                        state: 'visible',
                        startTime: new Date(),
                        options: options,
                        map: map
                    };

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass);
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass);
                    $toastElement.append($titleElement);
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass);
                    $toastElement.append($messageElement);
                }

                if (options.closeButton) {
                    $closeElement.addClass('toast-close-button').attr("role", "button");
                    $toastElement.prepend($closeElement);
                }

                $toastElement.hide();
                if (options.newestOnTop) {
                    $container.prepend($toastElement);
                } else {
                    $container.append($toastElement);
                }


                $toastElement[options.showMethod](
                    { duration: options.showDuration, easing: options.showEasing, complete: options.onShown }
                );

                if (options.timeOut > 0) {
                    intervalId = setTimeout(hideToast, options.timeOut);
                }

                $toastElement.hover(stickAround, delayedHideToast);
                if (!options.onclick && options.tapToDismiss) {
                    $toastElement.click(hideToast);
                }

                if (options.closeButton && $closeElement) {
                    $closeElement.click(function (event) {
                        if( event.stopPropagation ) {
                            event.stopPropagation();
                        } else if( event.cancelBubble !== undefined && event.cancelBubble !== true ) {
                            event.cancelBubble = true;
                        }
                        hideToast(true);
                    });
                }

                if (options.onclick) {
                    $toastElement.click(function () {
                        options.onclick();
                        hideToast();
                    });
                }

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function hideToast(override) {
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    return $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    $toastElement.stop(true, true)[options.showMethod](
                        { duration: options.showDuration, easing: options.showEasing }
                    );
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                }
            }
            //#endregion

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window['toastr'] = factory(window['jQuery']);
    }
}));

var defaultToastrOptions = {// toastr插件
	"closeButton": true,
	"debug": false,
	"positionClass": "toast-top-center",
	"onclick": null,
	"showDuration": "1000",
	"hideDuration": "1000",
	"timeOut":"3000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};
//显示成功的消息
function toastrSuccess(msg,time){
	if(msg){
		toastr.options = defaultToastrOptions;
		if(time){
			toastr.options.timeOut = time*1000;
		}else{
			toastr.options.timeOut = 3000;
		}
		toastr.success(msg);
	}
};
//显示错误的消息
 function toastrError(msg,time){
	 if(msg){
		 toastr.options = defaultToastrOptions;
		 if(time){
			toastr.options.timeOut = time*1000;
		}else{
			toastr.options.timeOut = 3000;
		}
		 toastr.error(msg);
	}
};
//显示提示的消息
function toastrInfo(msg,time){
	 if(msg){
		 toastr.options = defaultToastrOptions;
		 if(time){
			toastr.options.timeOut = time*1000;
		}else{
			toastr.options.timeOut = 3000;
		}
		 toastr.info(msg);
	}
};
//显示警告的消息
function toastrWarning(msg,time){
	 if(msg){
		 toastr.options = defaultToastrOptions;
		 if(time){
			toastr.options.timeOut = time*1000;
		}else{
			toastr.options.timeOut = 3000;
		}
		 toastr.warning(msg);
	}
};

//带按钮的提示框
function popConfirm(setting){
	if(  j$(".popover-delete").length>0 ){
		toastrWarning("请先执行完当前的删除操作");
		return;
	}
	var selectedBtn = null;

	if(typeof setting.id == "string"){
		selectedBtn = j$("#"+setting.id);
	}else if(typeof setting.id == "object"){
		selectedBtn = j$(setting.id);
	}else{
		var e=arguments.callee.caller.caller.arguments[0] || window.event ; 
		selectedBtn = e.target || j$(e);
	}
	
	var flag = selectedBtn.data("flag");
	if( flag != "true"){
		var btns = [];
		btns.push('<div class="popover-btn"><button type="button" class="btn btn-sm btn-primary" data-type="yes"><i class="fa fa-check-square-o" aria-hidden="true"></i>确定</button>');
		btns.push('<button type="button" class="btn btn-sm btn-default" data-type="no"><i class="fa fa-close" aria-hidden="true"></i>取消</button><div>');
		var	template = ['<div class="popover popover-delete" role="tooltip">',
		   	            '<div class="arrow"></div>',
		   	            '<h3 class="popover-title"></h3>',
		   	            '<div class="popover-content"></div>',
		   	            '</div>'].join("");
		var content = ['<p class="popover-msg">'+setting.message+'</p>',btns.join("")].join("");
		var options = {
				trigger:"manual",
	            html: true,
	            template: template,
	            container: 'body',
	            title: '<div><i class="fa fa-hand-o-down" aria-hidden="true"></i>温馨提示</div>',
	            content: content,
	            placement:setting.position ? setting.position : 'left'
				
		};
		selectedBtn.popover(options).on('inserted.bs.popover',function(){
			j$(".popover-btn").find("button").on("click",function(){
				if( j$(this).data("type") == "yes"){
					setting.callback(true);
				}else{
					setting.callback(false);
				}
				selectedBtn.popover("destroy");
				selectedBtn.data("flag","false");
			});
		}).popover("show");
		selectedBtn.data("flag","true");
	}
}
//获取请求地址后携带的参数
function getParam(name,str){
	
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var url = "";
 	if(str){
 		url = str;
	}else {
		url = window.location.href;
	}
	var results = regex.exec( url );
	if (results == null){
		return "";
	}else{
		return results[1];	
	}
}


















