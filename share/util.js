var util = {
	version: '1.0.0',
	files: {
		js: [],
		css: []
	},
    getStaticPath: function() {
		var current_js_path = '/share/util.js';
        /**
         * 获取当前js文档的目录
         * @param current_path 当前所在目录
         * @匿名函数 自动加载
         * @return PATH
         * **/
        var current_path = document.currentScript ? document.currentScript.src : function(){
            var js = document.scripts,
                last = js.length - 1,
                src = null;
            for(var i = last; i > 0; i--) {
				if (js[i].src.indexOf(current_js_path) !== -1) {
                    src = js[i].src;
                    break;
				}
            }
            return src || js[last].src;
        }();
		var path_index = current_path.indexOf(current_js_path);
		var result_path = current_path.substring(0, path_index);
        return result_path;
    },
    getMaxZIndex: function () {
        var maxZ = Math.max.apply(null, $.map($('body *'), function(e,n) {
            if ( $(e).css('position') != 'static' ) {
                return parseInt($(e).css('z-index')) || 1;
            }
        }));
        return maxZ;
    },
	load: function(_src, callback, _href) {
		var that = this;
		that.js(_src, callback);
		_href && that.css(_href);
	},
	js: function(_src, callback) {
		var that = this,
			_v = '',
			_script = document.createElement("script");
		if (_src.indexOf('?v=') != -1) {
			var arr = _src.split('?v=');
			_src = arr[0];
			_v = arr[1];
		}
		if (that.files.js.indexOf(_src) == -1) {
			_script.type = "text/javascript";
			_script.src = _src + '?v=' + that.version + _v;
			document.getElementsByTagName('head')[0].appendChild(_script);
			if (! /*@cc_on!@*/ 0) {
				_script.onload = function() {
					callback();
				}
			} else {
				_script.onreadystatechange = function() {
					if (_script.readyState == 'loaded' || _script.readyState == 'complete') {
						callback();
					}
				}
			}
			that.files.js.push(_src);
		}
	},
	css: function(_href) {
		var that = this,
			_v = '',
			_css = document.createElement('link');
		if (_href.indexOf('?v=') != -1) {
			var arr = _href.split('?v=');
			_href = arr[0];
			_v = arr[1];
		}
		if (that.files.css.indexOf(_href) == -1) {
			_css.rel = 'stylesheet';
			_css.type = 'text/css';
			_css.href = _href + '?v=' + that.version + _v;
			document.getElementsByTagName('head')[0].appendChild(_css);
			that.files.css.push(_href);
		}
	},
	cookie: {
		get: function(name, _return) {
			var nameEQ = name + "=",
				ca = document.cookie.split(';'),
				i,
				c;
			for (i = 0; i < ca.length; i++) {
				c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return typeof _return != 'undefined' ? _return : false;
		},
		set: function(name, value, time) {
			var date = new Date(),
				expires = '';
			if (time == 0) {
				date = 'Fri, 31 Dec 9999 23:59:59 GMT';
			} else if (time > 0) {
				date.setTime(date.getTime() + time);
				date = date.toUTCString();
			} else {
				date.setTime(date.getTime() + 1 * (24 - date.getTimezoneOffset() / 60) * 60 * 60 * 1000);
				date = date.toUTCString();
			}
			expires = "; expires = " + date;
			document.cookie = name + "=" + value + expires + "; path=/";
		},
        del: function(name){
            var that = this,
                c = that.get(name),
                date = new Date(),
                expires = '';
            date.setTime(date.getTime() - 1);
            date = date.toUTCString();
            if( c ){
                expires = "; expires = " + date;
			    document.cookie = name + "=" + expires + "; path=/";
            }
        }
	},
	lazyImg: function(options) {
		var that = this,
			parent = options.parentSelector,
			lazy = options.lazy || 'lazy',
			error = options.error || '',
			$imgs = $(parent).find('img.' + lazy),
			delay = typeof options.delay != 'undefined' ? options.delay : 300,
			isShow = jQuery.isFunction(options.show) ? options.show : function() {
				return true
			};
		if ($imgs.length) {
			that.lazyImgs = that.lazyImgs || [];
			that.lazyImgsTimer = that.lazyImgsTimer || 0;
			if (that.lazyImgs.length == 0) {
				$(window).scroll(function() {
					if (that.lazyImgsTimer) {
						clearInterval(that.lazyImgsTimer);
					}
					that.lazyImgsTimer = setTimeout(function() {
						that.lazyImgLoad();
					}, 300);
				});
			}
			that.lazyImgs.push({
				parent: options.parentSelector,
				lazy: lazy,
				error: error,
				delay: delay,
				show: isShow
			});
			that.lazyImgLoad();
		}
	},
	lazyImgLoad: function(active_parent) {
		var that = this,
			showImgs = [],
			len = 0,
			pushShowImgs = function(i) {
				var parent = that.lazyImgs[i].parent,
					lazy = that.lazyImgs[i].lazy,
					isShow = that.lazyImgs[i].show,
					$imgs = [];
				if (that.isShow($(parent))) {
					$imgs = $(parent).find('img.' + lazy);
					if ($imgs.length) {
						$imgs.each(function(index) {
							if (isShow($(this)) && that.isShow($(this))) {
								showImgs.push({
									i: i,
									index: index
								});
							}
						});
					}
				}
			};
		if (that.lazyImgs.length) {
			var active_i = 0;
			if (active_parent) {
				for (var i = 0; i < that.lazyImgs.length; i++) {
					if (that.lazyImgs[i].parent == active_parent) {
						active_i = i;
						break;
					}
				}
			}
			if (active_i) {
				pushShowImgs(active_i);
			} else {
				for (var i = 0; i < that.lazyImgs.length; i++) {
					pushShowImgs(i);
				}
			}
			len = showImgs.length;
			if (len) {
				var max = len - 1,
					r = that.randomNum(0, max),
					i = showImgs[r].i,
					index = showImgs[r].index,
					parent = that.lazyImgs[i].parent,
					lazy = that.lazyImgs[i].lazy,
					delay = that.lazyImgs[i].delay,
					$img = $(parent).find('img.' + lazy).eq(index),
					src = $img.attr('src'),
					error = that.lazyImgs[i].error || src,
					data_src = $img.attr('data-src') || '';
				$img.attr('src', data_src).removeClass(lazy).addClass('lazy-success').error(function() {
					if ($(this).hasClass('lazy-error')) {
						return false;
					} else {
						$(this).attr('src', error).removeClass('lazy-success').addClass('lazy-error');
					}
				});
				setTimeout(function() {
					that.lazyImgLoad(active_parent);
				}, delay);
			}
		}
	},
	isShow: function($el) {
        if( $el.length && $el.is(':visible') ){
            var scroll_top = $(window).scrollTop(),
                window_height = $(window).height(),
                offset_top = $el.offset().top,
                height = $el.height();
            return scroll_top <= offset_top + height && scroll_top >= offset_top - window_height;
        }else{
            return false;
        }
	},
	randomNum: function(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				break;
			default:
				return 0;
				break;
		}
	},
	// 数组去重
	arrUnique: function(arr) {
		var res = [],
			json = {};
	  for (var i = 0; i < arr.length; i++) {
		if (!json[arr[i]]) {
		  res.push(arr[i]);
		  json[arr[i]] = 1;
		}
	  }
	  return res;
	},
    windowOpen: function(url) {
		var newWindow = window.open();
        newWindow.location.href = url;
    },
	htmlEscape: function(str) {//字符转义
		var escapesMap = {
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		},
		reUnescapedHtml = new RegExp(/[<>"']/g);
		return (str && reUnescapedHtml.test(str))
		? str.replace(reUnescapedHtml, function(chr) {
			return escapesMap[chr];
		}):(str || "");
	},
	htmlUnEscape: function(str) {//反转义
		var unescapes = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#39;': "'"
		},
		reEscapedHtml = new RegExp(/&(?:amp|lt|gt|quot|#39);/g);
		return (str && reEscapedHtml.test(str))
						? str.replace(reEscapedHtml, function(entity) {
							return unescapes[entity];
						}): (str || '')
	},
    loading: function() {
        var that = this,
            z = that.getMaxZIndex() + 9,
            loadingHtml = '<div id="common_loading" style="z-index:'+z+'"><div class="img"></div></div>';
        if (!$('#common_loading').length) {
            $(top.document.body).append(loadingHtml);
        }
    },
    loaded: function() {
        $('#common_loading', top.document)[0] && $('#common_loading', top.document).remove();
    },
	tipmsgTimer: 0,
    tipMsg: function(msg, delay) {
        if (!msg) return
        var that = this,
            delay = typeof delay == 'undefined' ? 2000 : delay,
            id = 'common_tipMsg',
            z = that.getMaxZIndex() + 9,
            c = '<div id="' + id + '" style="z-index:'+z+'">' + msg + '</div>';
        if ($('#'+id).length) {
            clearTimeout(that.tipmsgTimer);
            $('#'+id).html(msg);
        } else {
            $('body').append(c);
        }
        setTimeout(function() {
            var ele = $('#'+id);
            ele.css({
				'display': 'block',
                'margin-left': -ele.outerWidth()/2 + 'px'
            });
        }, 50);
        that.tipmsgTimer = setTimeout(function() {
            $('#'+id).remove();
        }, delay);
    },
    copyText: function(text) {
        var domInput = document.createElement('textarea');
        domInput.value = text;
        document.body.appendChild(domInput);
        domInput.select();
        document.execCommand("Copy");
        domInput.remove()
    },
	share: {
		isIos: function () {
			var UA = navigator.userAgent,
				isIpad = /(iPad).*OS\s([\d_]+)/.test(UA),
				isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA),
				isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA),
				isIos = isIpad || isIpod || isIphone;
			return isIos;
		},
		isQQMBrowser: function () {
			var UA = navigator.userAgent,
				isWechat = /micromessenger/i.test(UA),
				isQQ = /QQ\/([\d\.]+)/.test(UA),
				isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat && !isQQ;
			return isQQMBrowser;
		},
		loadJs: function (src, callback) {
			var ref = document.getElementsByTagName('script')[0],
				script = document.createElement('script');
			script.src = src;
			script.async = true;
			ref.parentNode.insertBefore(script, ref);
			script.onload = callback;
		},
		init: function() {
			var that = this;
			if (that.isQQMBrowser() && that.isIos()) {
				that.loadJs('https://jsapi.qq.com/get?api=app.share');
			}
		},
		tap: function(shareData) {
			if (typeof nativeShare == 'undefined') {
				var _jsPath = util.getStaticPath() + '/share/share.js?v=20230506';
				util.load(_jsPath, function() {
					nativeShare.init(shareData);
				});
			} else {
				nativeShare.init(shareData);
			}
		}
	}
};
