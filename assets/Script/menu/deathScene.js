// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audioOver:{
            default:null,
            type: cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //监听触摸事件，触摸后返回主菜单
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            cc.director.loadScene("menu");
        });
    },

    start () {
        //标题下落，播放gameover音效
        cc.audioEngine.playMusic(this.audioOver);
        cc.tween(this.node.getChildByName("title")).to(3,{y:100}).call(()=>{
            //播放提示闪烁动画循环
            this.node.getChildByName("tip").getComponent(cc.Animation).play();
            //解除输入锁
            this.node.parent.getChildByName("block").active=false;
        }).start();
    },

    // update (dt) {},
});
