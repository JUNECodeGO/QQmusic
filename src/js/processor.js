(function($,root){
    var lastPer = 0;
    var lastTime;
    var tT,
        frameId;
    function renderTime (data) {
        tT = data.duration;
        var str =  formatTime(tT);
        $('.alltime').text(str);
        return tT;
    };
    function formatTime(t) {
        t = Math.round(t);
        // t为总的描述
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    function start(p) {
        lastPer = p === undefined ? lastPer : p;
        lastTime = new Date().getTime();
            function frame(){
                var curTime = new Date().getTime();
                var xtime = lastPer + (curTime-lastTime)/(tT*1000);
                updata(xtime);
                frameId = requestAnimationFrame(frame);
            }
            frame();
    }
    function stop(){
        cancelAnimationFrame(frameId);
        var curTime = new Date().getTime();
        var per = (curTime - lastTime) /(tT*1000);
        lastPer += per;
    }
    function updata(s){
        cancelAnimationFrame(frameId);
        var str = formatTime(s*tT);
        $('.curtime').text(str);
        $('.up').css({
            transform:'translateX('+ (s - 1) * 100 + '%)',
        });
        $('.spot').css({
            left: s * 100  + '%',
        })
    }
    root.timeInfo = {
        renderTime : renderTime,
        start:start,
        stop:stop,
        updata:updata,
    };
}(window.Zepto,window.player || (window.player = {})))