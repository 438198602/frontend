var nativeShare = {
    version: '20230506',
    isIos: function () {
        var UA = navigator.userAgent,
            isIpad = /(iPad).*OS\s([\d_]+)/.test(UA),
            isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA),
            isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA),
            isIos = isIpad || isIpod || isIphone;
        return isIos;
    },
    isAndroid: function () {
        var UA = navigator.userAgent,
            isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA);
        return isAndroid;
    },
    isQQMBrowser: function () {
        var UA = navigator.userAgent,
            isWechat = /micromessenger/i.test(UA),
            isQQ = /QQ\/([\d\.]+)/.test(UA),
            isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat && !isQQ;
        return isQQMBrowser;
    },
    isUCMBrowser: function () {
        var UA = navigator.userAgent,
            isUCMBrowser = /UCBrowser/i.test(UA);
        return isUCMBrowser;
    },
    loadJs: function (src, callback) {
        var ref = document.getElementsByTagName('script')[0],
            script = document.createElement('script');
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
        script.onload = callback;
    },
    ucbrowserShare: function (shareData) {
        if (ucbrowser.web_shareEX) {
            ucbrowser.web_shareEX(
                JSON.stringify({
                    title: shareData.title,
                    content: shareData.desc,
                    sourceUrl: shareData.link,
                    imageUrl: shareData.icon,
                    target: shareData.platform,
                    source: shareData.source
                })
            );
        } else {
            ucbrowser.web_share(
                shareData.title,
                shareData.desc,
                shareData.link,
                shareData.platform,
                '',
                shareData.source,
                shareData.icon
            );
        }
    },
    QQMBrowserShare: function (shareData) {
        var that = this;
        if (browser && browser.app && browser.app.share) {
            browser.app.share({
                title: shareData.title,
                description: shareData.desc,
                url: shareData.link,
                img_url: shareData.icon,
                from: shareData.platform
            });
        } else {
            that.shareFail(shareData);
        }
    },
    navigatorShare: function (shareData) {
        var that = this;
        if (navigator.share) {
            var queryObj = {
                url: shareData.link,
                title: shareData.title,
                text: shareData.desc
            };
            navigator.share(queryObj);
        } else {
            that.shareFail(shareData);
        }
    },
    shareFail: function (shareData) {
        var that = this,
            c = '<div class="share-fail-dialog" style="display:none;z-index:'+(util.getMaxZIndex()+9)+'"><div class="dialog"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAMAAADxPgR5AAAAvVBMVEUAAADl/e7k/e7k/O3m/e/l/+7n/+7l/e7l/e7l/O7m/e/o//Hq///k/e7k/e7l/e7k/O7k/e7m/e7m/e3l/e3l/e7o//Dp//Dm/+7p//T////n//Dl/O7l/O7l/e7m//Dk/O0Mwm0vzILT+OPP9+Bm2qM6z4g1zobX+eYWxXSy79Df/OqP5rsRxHC68dQkyXwex3jY+eWt7cyj68dJ05FB0Y3a+ufH9NzC89mF47R64K9x3ala15xS1Zac6cMnJ3OkAAAAIHRSTlMA/PnHi0xKzuG2cCsM0e7sv5iXg4FqQiIeFwVUxsWpU/NV20UAAAMeSURBVGje1ZuJUuJAEIZnkpCLBBBEUED/yKGIoCvisav7/o+1Vq3UkOLI3IbvAfJVku7JTHeHiNHx42Y0SMO649TDdBA1Y79DDJH4XuBgB07g+YluW7XlUhyAuq2qPtt5HICDID7XojuLKDih0ZmyruJCCLeipOulECa4ko+UBqRoyMVP4jmQxPEk0sQPoUDoC+ouPCjiXYj4ui6UcbsCuVCDBmrcGdKm0AJt8/lOoY1THt8JNHJS7LuEVi4t3R/jhPP9WXqPbRigfSD/KAxA9+ZjtwYj1Lp71k8XhnB3r6sejOHt8vkwiL/tS0IYJEwUH6j6Q606MIpTJXkaMEwj7+vBOL2cMIVx0tyaBgtUCMOFBVzmO4MV2EknghWite+cwgp0fX6MYYn4WxhAB4snFBF8r2rQwd10eoci/q9vLWjgaZplxcaWtiRczrPssJGlYkKhzN8vH4+RJnqWtfsvF5+xovTlZT7GMw7i6UiK9w3f5Bf2wBLDgRq/BXxwCOlAjT8iPqCjujscb/puUYjPt5CO7zX5EJMm123Md4f7h6gPTRLxPbbHEbaYfQr7EJE+52uazLZ8z+I+9EnKGxZj5HlZbfhuOH1IScgdhvnAuZ3I+BCSOm+e5QNneCPlQ714oWFv6oEFzuh60zcEN06x8JZdezWT9jFhHUW8TbMsHzivD7I+1EmIQpZZPnDe5H0ISQqRD8J8ASwe5X1IyQAcfLLAGSr5MODb5r9cM8V0w3ct6kNEmuDhld2Wkg9N3n3+kx4fYu4P8LsWH3z+LcaHDh86/Juo2USDzxHZJo4eN30jyBAIbYTv5qo+eGJb/XtVH3zBw8xY0UcTwePabKXkgyt8IB0+qPjQEj9yL6YKPlQligpLBV9gvWxivTBku/Rlvbhnu3xpvUBruQQd2C6yX9luI1hvlNhuBf18s8twO68MDUujLdlyNJ3NtdXLMzhgZjSiXMMf+sdbyjfAo3dEqZxDWPrGzMo7SKdnVLDcw5DK457HMNAqO7Kb9o5pKFl87PoYB8stj84zksr+nwMqCdEP+/2hv/79oS/x+8M/0RnM1Xrr5ZAAAAAASUVORK5CYII=" class="icon_image"><div class="main_text">已复制链接</div><div class="extra_text">快去分享给好友吧!</div><div class="confirm_button">我知道了</div></div></div>';
        util.css(util.getStaticPath() + '/share/share.css?v=' + that.version);
        if ($('.share-fail-dialog').length) {
            $('.share-fail-dialog').remove();
        }
        $('body').append(c);
        setTimeout(function() {
            util.copyText(shareData.link + '\n' + shareData.title);
            $('.share-fail-dialog').show();
            $('.share-fail-dialog .confirm_button').on('click', function() {
                $('.share-fail-dialog').remove();
            });
        }, 50);
    },
    preLoad: function() {
        var that = this;
        if (that.isQQMBrowser() && that.isIos()) {
            that.loadJs('https://jsapi.qq.com/get?api=app.share');
        }
    },
    init: function (shareData) {
        var that = this;
        try {
            if (that.isUCMBrowser() && that.isIos()) {
                that.ucbrowserShare(shareData);
            } else if (that.isQQMBrowser() && that.isIos()) {
                that.QQMBrowserShare(shareData);
            } else {
                that.navigatorShare(shareData);
            }
        } catch (error) {
            that.shareFail(shareData);
        }
    }
};
