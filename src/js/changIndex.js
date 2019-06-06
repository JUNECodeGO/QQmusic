(function($,root) {
    function GetIndex(len) {
        this.index = 0;
        this.len = len;
    }
    GetIndex.prototype = {
        pre:function(){
            return this.nowIndex(-1);
        },
        next:function(){
            return this.nowIndex(1);
        },
        nowIndex:function(val){
            var index = this.index;
            var len = this.len;
            this.index = (index + val + len) % len;
            // 改变后的索引
            return this.index;
        }
    };
    root.changIndex = GetIndex;

}(window.Zepto,window.player || (window.player = {})));
