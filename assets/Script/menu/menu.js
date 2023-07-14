// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        backgroundMusic:{
            default: null,
            type:cc.AudioClip,
        },

        touchSound:{
            default: null,
            type:cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //加载播放背景音乐
        cc.audioEngine.playMusic(this.backgroundMusic,true);
    },

    start () {

    },

    // update (dt) {},
});
