(function(global, factory) {
    'use strict';
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error('nativeShare requires a window with a document');
                }
                return factory(w);
			};
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
    'use strict';
    var ua = (function () {
        var result = {
            os: null,
            browser: null,
            version: null
        };
        var agent = window.navigator.userAgent;
        var match = null;
        if (/tieba/i.test(agent)) {
            result.browser = 'tieba';
        } else if (/baiduboxapp/i.test(agent)) {
            result.browser = 'baidubox';
        } else if (/MicroMessenger/i.test(agent)) {
            result.browser = 'weixin';
        } else if (match = /UCBrowser\/([\w.]+)/i.exec(agent)) {
            result.browser = 'uc';
            result.version = match[1];
        } else if (/MQQBrowser/.test(agent)) {
            result.browser = 'qqbrowser';
            if (match = /Version\/([\w.]+)/i.exec(agent)) {
                result.version = match[1];
            }
        } else if (/mobile.*qq/i.test(agent)) {
            result.browser = 'mobileqq';
        } else if (/SogouMobileBrowser/.test(agent)) {
            result.browser = 'sougou';
        }
        if (agent.match('iPhone( Simulator)?;') || agent.match('iPad;') || agent.match('iPod;')) {
            result.os = 'ios';
        } else if (agent.match('Android')) {
            result.os = 'android';
        }
        return result;
    })();
    var defaults = function (target, source) {
        var k = null;
        for(k in source) {
            if (source.hasOwnProperty(k) && !target[k]) {
                target[k] = source[k];
            }
        }
        return target;
    };
    var doc = window.document;
    var intallScript = function (url, callback) {
        var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
        var node = doc.createElement('script');
        var onload = function (error) {
            node.onload = node.onerror = null;
            head.removeChild(node);
            node = null;
            callback(error);
        };
        node.onload = onload;
        node.onerror = function () {
            onload(true);
        };
        node.async = true;
        node.src = url;
        head.appendChild(node);
    };
    var metaHandler = function (metaArr) {
        var docEl = doc.documentElement;
        metaArr.forEach(function (meta) {
            var metaEl = doc.querySelector('meta[name="' + meta.name + '"]');
            if (metaEl) {
                metaEl.setAttribute('content', meta.content);
            } else {
                metaEl = doc.createElement('meta');
                metaEl.setAttribute('name', meta.name);
                metaEl.setAttribute('content', meta.content);
                if (docEl.firstElementChild) {
                    docEl.firstElementChild.appendChild(metaEl);
                } else {
                    var wrap = doc.createElement('div');
                    wrap.appendChild(metaEl);
                    doc.write(wrap.innerHTML);
                }
            }
        });
    };
    var title = doc.title;
    var tmp = null;
    var nativeShare = function (config) {
        defaults(config, {
            link: window.location.href || '',
            title: title,
            desc: title,
            imgUrl: (tmp = doc.getElementsByTagName('img')[0]) && tmp.src || '',
            from: window.location.host
        });
        switch(ua.browser) {
            case 'tieba':
                metaHandler([{
                    name: 'description',
                    content: config.desc
                }, {
                    name: 'share-icon',
                    content: config.imgUrl
                }]);
                break;
            case 'weixin':
                intallScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
                    if (wx) {
                        var url = 'http://sc.qq.com/fx/getToken?url=' + window.location.href;
                        url += '&p=' + initjssdk + '&appId=' + config.appId;
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            var res = JSON.parse(xhr.responseText);
                            wx.config({
                                debug: false,
                                appId: res.appId,
                                timestamp: res.timestamp,
                                nonceStr: res.nonceStr,
                                signature: res.signature,
                                jsApiList: [
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage',
                                    'onMenuShareQQ',
                                    'onMenuShareWeibo',
                                    'onMenuShareQZone'
                                ]
                            });
                            wx.ready(function () {
                                wx.onMenuShareAppMessage(config);
                                wx.onMenuShareTimeline(config);
                                wx.onMenuShareQQ(config);
                                wx.onMenuShareWeibo(config);
                                wx.onMenuShareQZone(config);
                            });
                        };
                        xhr.open('GET', url, true);
                        xhr.send(null);
                    }
                });
                break;
            case 'baiduboxapp':
                intallScript('http://static1.searchbox.baidu.com/static/searchbox/openjs/aio.js?v=201502', function () {
                    if (Box && Box.isBox) {
                        Box.nativeShare({
                            title: config.title,
                            content: config.desc,
                            iconUrl : config.imgUrl,
                            imageUrl: config.imgUrl,
                            linkUrl : config.link
                        });
                    }
                });
                break;
            case 'uc':
                if (ucbrowser) {
                    ucbrowser.web_shareEX(JSON.stringify({
                        title: config.title,
                        content: config.desc,
                        sourceUrl: config.link,
                        imageUrl: config.imgUrl,
                        target: '',
                        disableTarget: '',
                        source: '@' + config.from,
                        htmlNode: ''
                    }));
                } else if (ucweb) {
                    ucweb.startRequest('shell.page_share', [config.title, config.desc, config.link, '', '', '@' + config.from, '']);
                }
                break;
            case 'qqbrowser':
                intallScript('http://jsapi.qq.com/get?api=app.share', function () {
                    if (browser && browser.app) {
                        browser.app.share({
                            url: config.link,
                            title: config.title,
                            description: config.desc,
                            img_url: config.imgUrl
                        });
                    }
                });
                break;
            case 'mobileqq':
                installScript('http://pub.idqqimg.com/qqmobile/qqapi.js', function () {
                    if (mqq && mqq.ui) {
                        mqq.ui.setOnShareHandler(function(type) {
                            mqq.ui.shareMessage({
                                url: config.link,
                                title: config.title,
                                desc: config.desc,
                                image_url: config.imageUrl,
                                share_url: config.link,
                                share_type: type,
                                back: true
                            }, function(t) {});
                        });
                    }
                });
                break;
            case 'sougou':
                if (SogouMse && SogouMse.Utility && SogouMse.Utility.shareWithInfo) {
                    SogouMse.Utility.shareWithInfo({
                        shareTitle: config.title,
                        shareContent: config.desc,
                        shareUrl: config.link,
                        shareImageUrl: config.imageUrl
                    });
                }
                break;
            default:
                break;
        }
    };
    if (!noGlobal) {
        window.nativeShare = nativeShare;
    }
    return nativeShare;
}));
