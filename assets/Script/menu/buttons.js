// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //加载触碰音效
        this.touchSound = this.node.parent.parent.getChildByName("Canvas").getComponent("menu").touchSound;
    },

    start () {

    },

    // update (dt) {},

    //主菜单点击游戏开始
    clickButtonStart(){
        cc.audioEngine.playEffect(this.touchSound);
        cc.tween(this.node.parent).to(1,{x:-1280,angle:360}).call(()=>{
            //加载游戏场景
            cc.director.loadScene("select");
        }).start();
    },

    //主菜单点击设置
    clickButtonOption(){
        cc.audioEngine.playEffect(this.touchSound);
        let father = this.node.parent.parent;
        father.getChildByName("menu Block").active=true;
        cc.tween(father.getChildByName("option menu")).to(0.5,{y:father.getChildByName("Canvas").height/2},{easing:"elasticOut"}).start();
    },

    //主菜单点击退出
    clickButtonExit(){
        cc.audioEngine.playEffect(this.touchSound);
        let father = this.node.parent.parent;
        father.getChildByName("menu Block").active=true;
        cc.tween(father.getChildByName("exit menu")).to(0.1,{y:father.getChildByName("Canvas").height/2,opacity:255}).start();
    },
});
