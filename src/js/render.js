(function ($,root) {
    function renderDom(data){
        var str =' <p class="name">'+data.singer+'</p>\
                   <p>'+data.song+'</p>\
                 <p>'+data.album+'</p>';
        $('.middle').html(str);
    }
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$('.wrapper'));
            $('.wrapper').find(".imgWrapper img").attr("src",src)
        }
    }
    function renderLike(like){
        if(like){
            $('.like').addClass('likeliking');
        }else{
            $('.like').removeClass('likeliking');
        }
    }
    root.render = function(data){
        renderDom(data);
        renderImg(data.image);
        renderLike(data.isLike);
    };
}(window.Zepto,window.player || (window.player={})));