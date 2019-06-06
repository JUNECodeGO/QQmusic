var $ = window.Zepto;
var root = window.player;
var nowIndex = 0;
var len;
var dataList;
var controlMusic = root.audio;
var timeInfo = root.timeInfo;
var timer = null;
var deg = 0;
var time = 0;
var index = null;
function getData() {
    $.ajax({
        url:'../mock/data.json',
        dataType:'json',
        method:'GET',
        success:function(data){
            dataList = data;
            len = data.length;
            time = timeInfo.renderTime(data[nowIndex]);
            index = new root.changIndex(len);
            bindClick();
            root.render(data[nowIndex]);
            bindPlayer();
            touchBind();
            },
        error:function(){
            console.log(' 获取数据失败');}})
}
function bindClick(){
    $('.pre').on('click',function () {
        var i = index.pre()
        $('body').trigger('playChange',i);
    });
    $('.next').on('click',function () {
        var i = index.next()
        $('body').trigger('playChange',i);
    });

    $('.like').on('click',function(){
            $('.like').toggleClass('likeliking');
    })
    $('body').on('playChange',function (e,nowIndex) {
        timeInfo.renderTime(dataList[nowIndex]);
        root.render(dataList[nowIndex]);
        controlMusic.setAudioSource(dataList[nowIndex].audio);
        deg = 0;
        if(controlMusic.status == 'pause'){
            timeInfo.updata(0);
        }else{
            clearInterval(timer);
            timeInfo.start(0);
            controlMusic.playe();
            circleRotate();
        }
        $('.imgWrapper').css({
            transform :'rotateZ('+ deg +'deg)',
            transition: 'none'
        });
    });
}
function bindPlayer(){
    $('.play').on('click',function(){
        if(controlMusic.status == 'pause'){
            controlMusic.playe();
            timeInfo.start();
            circleRotate();
            $(this).addClass('playpause');
        }else{
            clearInterval(timer);
            controlMusic.pause();
            timeInfo.stop();
            $(this).removeClass('playpause');
        }

    });
}
function touchBind() {
    var left = $('.spot').offset().left;
    var width = $('.line').offset().width;
        $('.spot').on('touchstart', function () {
            timeInfo.stop();
        }).on('touchmove', function (e) {
            var x = e.changedTouches[0].clientX - left;
            var p = x / width;
            if (p >= 0 && p < 1) {
                timeInfo.updata(p);
            }
        }).on('touchend', function (e) {
            var x = e.changedTouches[0].clientX - left;
            var p = x / width;
            var curtime = p * time;
            if (p >= 0 && p < 1) {
                controlMusic.playTo(curtime);
                controlMusic.playe();
                timeInfo.start(p);
                $('.play').addClass('playpause');
            }
        })
    }
function circleRotate(){
    timer = setInterval(function(){
        deg += 0.2;
        $('.imgWrapper').css({
            transform :'rotateZ('+ deg +'deg)',
            transition: 'transform 0.2s linear'
        })
    },200)
}
getData();
