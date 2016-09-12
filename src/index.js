import createCSS from './fn/createCss';
let $imgs = [],
    $length = [],
    $oldload,
    $load = [],
    $layzImgTimeout,
    $layzImgLoadTimeout, t,
    $winHeight = window.innerHeight;

let lazyImgScroll = function () {
    t = document.documentElement.scrollTop || (document.body != null ? document.body.scrollTop : 0);
    clearTimeout($layzImgTimeout);
    t += $winHeight;
    $layzImgTimeout = setTimeout(function () {
        for (var i = 0; i < $length; i++) {
            var $top;
            if ($imgs[i].dataset.top == undefined) {
                $top = $imgs[i].offsetTop;
                var $p = $imgs[i].offsetParent;
                while ($p && $p.tagName != "BODY") {
                    $top += $p.offsetTop;
                    $p = $p.offsetParent;
                }
                $imgs[i].dataset.top = $top;
            }
            $top = $imgs[i].dataset.top;
            //优化点2 考虑记录已经加载的图片INDEX 然后删除它
            if ($top >= (t - $winHeight * 1) && $top <= t && !$imgs[i].dataset.isload) {
                $imgs[i].src = $imgs[i].dataset.src;
                $imgs[i].dataset.isload = true;
                $imgs[i].onload = function () {
                    this.style.opacity = "1.0";
                    this.onload = null;
                };
            }
        }
    }, 50);
};

let init = () => {
    createCSS();
};

export default {
    install (vue, optons) {
        init();
        // 查看是否支持监听DOM变动 MutationObserver
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        $oldload = window.onload;
        if (MutationObserver != null) {
            $load.push(function () {
                var observer = new MutationObserver(function (mutations, observer) {
                    clearTimeout($layzImgLoadTimeout);
                    $layzImgLoadTimeout = setTimeout(function () {
                        lazyImg();
                        window.onscroll();
                    }, 200);
                });
                observer.observe(document, {
                    subtree: true,
                    //attributes: true,
                    childList: true
                    //characterData: true
                });
            });
        } else {
            // 退化选择
            //（1）DOMSubtreeModified：在DOM结构中发生的任何变化时触发。这个事件在其他任何事件触发后都会触发。
            //
            //（2）DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。
            //
            //（3）DOMNodeRemoved：在节点从其父节点中被移除时触发。
            $load.push(function () {
                document.body.addEventListener('DOMSubtreeModified', function () {
                    $layzImgLoadTimeout = setTimeout(function () {
                        lazyImg();
                        window.onscroll();
                    }, 200);
                }, false);
            });
        }
        window.onscroll = lazyImgScroll;
        window.lazyImg = lazyImg;
        $load.push(lazyImg);
        $load.push(lazyImgScroll);
        window.onload = function () {
            $oldload && $oldload();
            $load.forEach(function (p) {
                p();
            });
        };
        window.onscroll();
    }
};