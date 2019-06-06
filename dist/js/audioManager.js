(function($,root) {
    function audioManager(src) {
        this.autoPlayer = new Audio();
        this.status = 'pause';
    }

    audioManager.prototype = {
        playe: function () {
            this.autoPlayer.play();
            this.status = 'play';
            console.log(this);
        },
        pause: function () {
            this.autoPlayer.pause();
            this.status = 'pause';
        },
        setAudioSource: function (src) {
            this.autoPlayer.src = src;
            this.autoPlayer.load();
        },
        playTo: function (time) {
            this.autoPlayer.currentTime = time;
        }
    };
    root.audio = new audioManager();

}(window.Zepto,window.player || (window.player = {})));
