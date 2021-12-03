/**
 * 得到浏览器每秒帧数FPS
 */
var showFPS = (function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  var e, pe, pid, fps, last, offset, step, appendFps;
  fps = 0;
  last = Date.now();
  step = function () {
    offset = Date.now() - last;
    fps += 1;
    if (offset >= 1000) {
      last += offset;
      appendFps(fps);
      fps = 0;
    }
    requestAnimationFrame(step);
  };
  // 显示FPS；如果未指定元素id，默认<body>标签
  appendFps = function (fps) {
    if (!e) e = document.createElement('span');
    pe = pid
      ? document.getElementById(pid)
      : document.getElementsByTagName('body')[0];
    e.innerHTML = 'fps: ' + fps;
    pe.appendChild(e);
  };
  return {
    // 设置显示FPS的元素id
    setParentElementId: function (id) {
      pid = id;
    },
    go: function () {
      step();
    }
  };
})();

showFPS.go();
